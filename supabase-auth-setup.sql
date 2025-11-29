-- ========================================
-- SISTEMA DE AUTENTICACIÓN Y CONTROL DE GARANTÍAS
-- Sistema de Subastas - Fase 1
-- ========================================

-- 1. CREAR TABLA DE USUARIOS
-- ========================================

CREATE TABLE IF NOT EXISTS usuarios_subasta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- Por ahora sin hashear (para pruebas)
  nombre_completo TEXT NOT NULL,
  telefono TEXT,
  dni TEXT,
  
  -- Control de garantías (administrado manualmente)
  garantia_pagada BOOLEAN DEFAULT false,
  monto_garantia NUMERIC DEFAULT 0,
  fecha_pago_garantia TIMESTAMP WITH TIME ZONE,
  notas_admin TEXT,  -- Notas internas para el administrador
  
  -- Para futuro: recuperación de contraseña
  codigo_recuperacion TEXT,
  codigo_expira TIMESTAMP WITH TIME ZONE,
  requiere_cambio_password BOOLEAN DEFAULT false,
  
  -- Control de cuenta
  activo BOOLEAN DEFAULT true,
  fecha_eliminacion TIMESTAMP WITH TIME ZONE,
  
  -- Auditoría
  fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultima_conexion TIMESTAMP WITH TIME ZONE,
  
  -- Validaciones
  CONSTRAINT email_formato CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT telefono_formato CHECK (telefono IS NULL OR LENGTH(telefono) >= 9)
);

-- 2. ÍNDICES PARA RENDIMIENTO
-- ========================================

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios_subasta(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_garantia ON usuarios_subasta(garantia_pagada);
CREATE INDEX IF NOT EXISTS idx_usuarios_activo ON usuarios_subasta(activo);
CREATE INDEX IF NOT EXISTS idx_usuarios_dni ON usuarios_subasta(dni);

-- 3. MODIFICAR TABLA subastas_ofertas
-- ========================================

-- Agregar columna para verificar garantía
ALTER TABLE subastas_ofertas 
ADD COLUMN IF NOT EXISTS garantia_verificada BOOLEAN DEFAULT false;

-- Agregar índice
CREATE INDEX IF NOT EXISTS idx_ofertas_garantia ON subastas_ofertas(garantia_verificada);

-- 4. FUNCIONES ÚTILES
-- ========================================

-- Función para registrar nuevo usuario
CREATE OR REPLACE FUNCTION registrar_usuario(
  p_email TEXT,
  p_password TEXT,
  p_nombre_completo TEXT,
  p_telefono TEXT DEFAULT NULL,
  p_dni TEXT DEFAULT NULL
)
RETURNS TABLE(
  success BOOLEAN,
  user_id UUID,
  message TEXT
) AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Verificar si el email ya existe
  IF EXISTS(SELECT 1 FROM usuarios_subasta WHERE email = p_email AND activo = true) THEN
    RETURN QUERY SELECT false, NULL::UUID, 'El email ya está registrado'::TEXT;
    RETURN;
  END IF;
  
  -- Insertar nuevo usuario
  INSERT INTO usuarios_subasta (email, password, nombre_completo, telefono, dni)
  VALUES (p_email, p_password, p_nombre_completo, p_telefono, p_dni)
  RETURNING id INTO v_user_id;
  
  RETURN QUERY SELECT true, v_user_id, 'Usuario registrado exitosamente'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Función para iniciar sesión
CREATE OR REPLACE FUNCTION iniciar_sesion(
  p_email TEXT,
  p_password TEXT
)
RETURNS TABLE(
  success BOOLEAN,
  user_data JSON,
  message TEXT
) AS $$
DECLARE
  v_user usuarios_subasta;
BEGIN
  -- Buscar usuario activo
  SELECT * INTO v_user
  FROM usuarios_subasta
  WHERE email = p_email
  AND activo = true;
  
  -- Verificar si existe
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::JSON, 'Usuario no encontrado'::TEXT;
    RETURN;
  END IF;
  
  -- Verificar contraseña
  IF v_user.password != p_password THEN
    RETURN QUERY SELECT false, NULL::JSON, 'Contraseña incorrecta'::TEXT;
    RETURN;
  END IF;
  
  -- Actualizar última conexión
  UPDATE usuarios_subasta
  SET ultima_conexion = NOW()
  WHERE id = v_user.id;
  
  -- Retornar datos del usuario
  RETURN QUERY SELECT 
    true,
    json_build_object(
      'id', v_user.id,
      'email', v_user.email,
      'nombre', v_user.nombre_completo,
      'telefono', v_user.telefono,
      'dni', v_user.dni,
      'garantiaPagada', v_user.garantia_pagada,
      'montoGarantia', v_user.monto_garantia,
      'fechaRegistro', v_user.fecha_registro,
      'requiereCambioPassword', v_user.requiere_cambio_password
    ),
    'Login exitoso'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Función para verificar si usuario puede pujar
CREATE OR REPLACE FUNCTION puede_pujar(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM usuarios_subasta
    WHERE id = p_user_id
    AND activo = true
    AND garantia_pagada = true
  );
END;
$$ LANGUAGE plpgsql;

-- Función para obtener datos de usuario
CREATE OR REPLACE FUNCTION obtener_usuario(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_user usuarios_subasta;
BEGIN
  SELECT * INTO v_user
  FROM usuarios_subasta
  WHERE id = p_user_id
  AND activo = true;
  
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  
  RETURN json_build_object(
    'id', v_user.id,
    'email', v_user.email,
    'nombre', v_user.nombre_completo,
    'telefono', v_user.telefono,
    'dni', v_user.dni,
    'garantiaPagada', v_user.garantia_pagada,
    'montoGarantia', v_user.monto_garantia,
    'fechaRegistro', v_user.fecha_registro
  );
END;
$$ LANGUAGE plpgsql;

-- 5. POLÍTICAS DE SEGURIDAD (RLS)
-- ========================================

-- Habilitar RLS en usuarios_subasta
ALTER TABLE usuarios_subasta ENABLE ROW LEVEL SECURITY;

-- Permitir que todos lean usuarios (para login)
CREATE POLICY "Permitir lectura de usuarios"
ON usuarios_subasta FOR SELECT
USING (activo = true);

-- Permitir que todos creen usuarios (para registro)
CREATE POLICY "Permitir registro de usuarios"
ON usuarios_subasta FOR INSERT
WITH CHECK (true);

-- Solo permitir pujar si garantía está pagada
CREATE POLICY "Solo usuarios con garantía pueden pujar"
ON subastas_ofertas FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM usuarios_subasta
    WHERE id = subastas_ofertas.user_id::UUID
    AND garantia_pagada = true
    AND activo = true
  )
);

-- 6. VISTA PARA ADMINISTRACIÓN
-- ========================================

CREATE OR REPLACE VIEW vista_usuarios_admin AS
SELECT 
  id,
  email,
  nombre_completo,
  telefono,
  dni,
  garantia_pagada,
  monto_garantia,
  fecha_pago_garantia,
  fecha_registro,
  ultima_conexion,
  activo,
  (SELECT COUNT(*) FROM subastas_ofertas WHERE user_id::TEXT = id::TEXT) as total_pujas,
  notas_admin
FROM usuarios_subasta
ORDER BY fecha_registro DESC;

-- 7. DATOS DE PRUEBA (OPCIONAL)
-- ========================================

-- Usuario de prueba CON garantía pagada
INSERT INTO usuarios_subasta (
  email, 
  password, 
  nombre_completo, 
  telefono, 
  dni, 
  garantia_pagada, 
  monto_garantia
) VALUES (
  'test@test.com',
  'password123',
  'Usuario de Prueba',
  '999888777',
  '12345678',
  true,
  500
) ON CONFLICT (email) DO NOTHING;

-- Usuario de prueba SIN garantía pagada
INSERT INTO usuarios_subasta (
  email, 
  password, 
  nombre_completo, 
  telefono, 
  dni, 
  garantia_pagada
) VALUES (
  'test2@test.com',
  'password123',
  'Usuario Sin Garantía',
  '999888666',
  '87654321',
  false
) ON CONFLICT (email) DO NOTHING;

-- 8. VERIFICACIÓN
-- ========================================

-- Ver usuarios creados
SELECT 
  email,
  nombre_completo,
  garantia_pagada,
  activo,
  fecha_registro
FROM usuarios_subasta
ORDER BY fecha_registro DESC;

-- Probar función de login
SELECT * FROM iniciar_sesion('test@test.com', 'password123');

-- Ver vista de administración
SELECT * FROM vista_usuarios_admin;

-- ========================================
-- RESULTADO ESPERADO
-- ========================================

/*
✅ Tabla usuarios_subasta creada
✅ Índices para rendimiento
✅ Funciones para registro y login
✅ Políticas de seguridad configuradas
✅ Vista de administración lista
✅ Usuarios de prueba insertados

PRÓXIMOS PASOS:
1. Crear servicio UsuariosService.js en el frontend
2. Crear componente AuthModal.jsx
3. Modificar useSubastaUser.js
4. Integrar en SubastaDetailsContent.jsx

NOTA: Las contraseñas están en texto plano para pruebas.
Una vez que todo funcione, se implementará bcrypt.
*/

SELECT '✅ Sistema de autenticación listo para pruebas' as status;
