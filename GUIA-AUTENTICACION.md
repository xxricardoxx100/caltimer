# 🔐 SISTEMA DE AUTENTICACIÓN CON CONTROL DE GARANTÍAS
## Guía Completa de Uso

---

## ✅ IMPLEMENTACIÓN COMPLETADA

### 📦 Archivos Creados/Modificados:

1. **`supabase-auth-setup.sql`** - Script SQL completo
2. **`src/lib/supabase/usuarios-service.js`** - Servicio de autenticación
3. **`src/app/components/subastas/AuthModal.jsx`** - Modal login/registro
4. **`src/lib/hooks/useSubastaUser.js`** - Hook actualizado
5. **`src/app/subasta-details/SubastaDetailsContent.jsx`** - Integración completa

---

## 🚀 PASO 1: Configurar Base de Datos

### Ejecutar en Supabase SQL Editor:

1. Ve a tu proyecto en Supabase Dashboard
2. Click en "SQL Editor"
3. Copia y pega TODO el contenido de `supabase-auth-setup.sql`
4. Click en "Run"

**Esto creará:**
- ✅ Tabla `usuarios_subasta`
- ✅ Índices para rendimiento
- ✅ Funciones SQL (registrar_usuario, iniciar_sesion, puede_pujar, etc.)
- ✅ Políticas RLS
- ✅ Vista de administración
- ✅ 2 usuarios de prueba

### Usuarios de Prueba Creados:

```
Usuario CON garantía:
Email: test@test.com
Password: password123
Garantía: ✓ PAGADA
Puede pujar: SÍ

Usuario SIN garantía:
Email: test2@test.com
Password: password123
Garantía: ✗ PENDIENTE
Puede pujar: NO
```

---

## 🧪 PASO 2: Probar el Sistema

### A. Prueba con Usuario SIN Garantía

1. Abre la página de subastas
2. Click en un vehículo
3. Click en "Iniciar Sesión"
4. Tab "Registrarse"
5. Llena el formulario:
   - Nombre: Tu Nombre
   - Email: nuevo@test.com
   - Teléfono: 999888777
   - DNI: 12345678
   - Contraseña: test123
6. Click "Crear Cuenta"

**Resultado esperado:**
- ✅ Usuario creado exitosamente
- ✅ Login automático
- ⚠️ Ver mensaje: "Garantía Pendiente"
- 🔒 Botón de puja: "🔒 Garantía Requerida" (deshabilitado)

### B. Aprobar Garantía Manualmente

1. Ve a Supabase Dashboard
2. Click en "Table Editor"
3. Selecciona tabla `usuarios_subasta`
4. Busca el usuario (nuevo@test.com)
5. Haz doble click en la columna `garantia_pagada`
6. Cambia de `false` → `true`
7. Guarda

### C. Verificar Aprobación

1. Vuelve a la página de subastas
2. Recarga la página (F5)

**Resultado esperado:**
- ✅ Ver mensaje: "Garantía Aprobada"
- ✅ Botón de puja: "Hacer Oferta (+$50)" (activo)
- ✅ Puede hacer pujas normalmente

### D. Prueba con Usuarios de Prueba

**Login con garantía aprobada:**
```
Email: test@test.com
Password: password123
→ Puede pujar inmediatamente
```

**Login sin garantía:**
```
Email: test2@test.com
Password: password123
→ No puede pujar (garantía pendiente)
```

---

## 👨‍💼 PASO 3: Administración de Usuarios

### Ver Todos los Usuarios

```sql
-- En Supabase SQL Editor
SELECT * FROM vista_usuarios_admin;
```

**Muestra:**
- Email
- Nombre completo
- Teléfono
- DNI
- Estado de garantía
- Monto de garantía
- Fecha de registro
- Total de pujas
- Notas admin

### Aprobar Garantía de un Usuario

```sql
UPDATE usuarios_subasta
SET garantia_pagada = true,
    monto_garantia = 500,
    fecha_pago_garantia = NOW(),
    notas_admin = 'Garantía pagada por transferencia'
WHERE email = 'usuario@email.com';
```

### Desactivar Usuario

```sql
UPDATE usuarios_subasta
SET activo = false
WHERE email = 'usuario@email.com';
```

### Reactivar Usuario

```sql
UPDATE usuarios_subasta
SET activo = true
WHERE email = 'usuario@email.com';
```

---

## 🎨 PASO 4: Experiencia del Usuario

### Estados del Sistema:

#### 1. **Sin Autenticación**
```
┌─────────────────────────────┐
│ 🔑 Inicia sesión para       │
│    participar               │
│                             │
│ [Iniciar Sesión/Registrarse]│
└─────────────────────────────┘

Botón de puja:
🔑 Iniciar Sesión para Pujar
```

#### 2. **Autenticado SIN Garantía**
```
┌─────────────────────────────┐
│ Conectado como:             │
│ Juan Pérez                  │
│ juan@email.com              │
│                             │
│ ⚠️ Garantía Pendiente       │
│ Contacta al admin para pujar│
└─────────────────────────────┘

Botón de puja:
🔒 Garantía Requerida
⚠️ Contacta al administrador
```

#### 3. **Autenticado CON Garantía**
```
┌─────────────────────────────┐
│ Conectado como:             │
│ Juan Pérez                  │
│ juan@email.com              │
│                             │
│ ✓ Garantía Aprobada         │
│ Puedes participar en pujas  │
└─────────────────────────────┘

Botón de puja:
Hacer Oferta (+$50) ✓
```

---

## 🔧 PASO 5: Verificar Funcionamiento

### Checklist de Pruebas:

- [ ] **Registro de nuevo usuario**
  - [ ] Formulario valida campos requeridos
  - [ ] Email duplicado muestra error
  - [ ] Contraseñas deben coincidir
  - [ ] Login automático después de registro

- [ ] **Inicio de sesión**
  - [ ] Email incorrecto muestra error
  - [ ] Contraseña incorrecta muestra error
  - [ ] Sesión persiste al recargar página
  - [ ] Botón "Salir" funciona

- [ ] **Restricciones de puja**
  - [ ] Usuario sin login ve botón de login
  - [ ] Usuario sin garantía no puede pujar
  - [ ] Usuario con garantía puede pujar
  - [ ] Mensaje claro en cada caso

- [ ] **Panel de administración**
  - [ ] Ver lista de usuarios en Supabase
  - [ ] Cambiar garantía_pagada funciona
  - [ ] Usuario ve cambios al recargar

- [ ] **Seguridad**
  - [ ] RLS policies funcionan
  - [ ] No se pueden insertar ofertas sin garantía
  - [ ] Datos del usuario protegidos

---

## 📊 PASO 6: Vista de Administrador

### En Supabase Dashboard:

1. **Table Editor → usuarios_subasta**

Columnas importantes:
```
┌─────────────┬──────────────┬─────────────┬─────────────┐
│ email       │ nombre       │ garantia_   │ activo      │
│             │              │ pagada      │             │
├─────────────┼──────────────┼─────────────┼─────────────┤
│ juan@e.com  │ Juan Pérez   │ ✓ true      │ ✓ true      │
│ maria@e.com │ María López  │ ✗ false     │ ✓ true      │
│ old@e.com   │ Usuario Viejo│ ✓ true      │ ✗ false     │
└─────────────┴──────────────┴─────────────┴─────────────┘
```

2. **Para aprobar garantía:**
   - Haz doble click en `garantia_pagada`
   - Cambia a `true`
   - Enter para guardar

3. **Ver ofertas del usuario:**
```sql
SELECT 
  u.nombre_completo,
  u.email,
  COUNT(o.id) as total_pujas,
  MAX(o.monto) as puja_mas_alta
FROM usuarios_subasta u
LEFT JOIN subastas_ofertas o ON u.id::TEXT = o.user_id
GROUP BY u.id, u.nombre_completo, u.email
ORDER BY total_pujas DESC;
```

---

## ⚠️ NOTAS IMPORTANTES

### Contraseñas en Texto Plano (TEMPORAL)

**⚠️ SOLO PARA PRUEBAS:**
- Las contraseñas están guardadas SIN hashear
- Esto es temporal para facilitar pruebas
- **NO USAR EN PRODUCCIÓN**

**Próximo paso (cuando todo funcione):**
- Implementar bcrypt para hashear passwords
- Script de migración para usuarios existentes

### Flujo de Aprobación

1. Usuario se registra
2. Tú revisas en Supabase
3. Usuario te contacta (WhatsApp/Email)
4. Verificas identidad y pago
5. Cambias `garantia_pagada` a `true`
6. Usuario puede pujar

### Recuperación de Contraseña

**Por ahora (manual):**
- Usuario te contacta
- Verificas identidad
- Generas nueva contraseña temporal
- Actualizas en base de datos
- Se la envías

**Futuro (automático):**
- Sistema de códigos de recuperación
- Implementar después

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### Error: "Function registrar_usuario does not exist"

**Solución:**
```sql
-- Ejecutar nuevamente el script completo
-- supabase-auth-setup.sql
```

### Usuario no puede pujar después de aprobar garantía

**Solución:**
```javascript
// En la consola del navegador:
localStorage.clear();
// Recargar página (F5)
// Volver a iniciar sesión
```

### Sesión no persiste al recargar

**Verificar:**
```javascript
// En consola del navegador:
console.log(localStorage.getItem('subasta_user_session'));
// Debe mostrar datos del usuario
```

### RLS Policy bloquea inserts

**Verificar:**
```sql
-- Ver policies activas
SELECT * FROM pg_policies 
WHERE tablename = 'subastas_ofertas';

-- Debe existir policy "Solo usuarios con garantía pueden pujar"
```

---

## 📱 PASO 7: Probar en Múltiples Dispositivos

1. **Dispositivo 1 (con garantía):**
   - Login: test@test.com
   - Hacer pujas

2. **Dispositivo 2 (sin garantía):**
   - Registrar nuevo usuario
   - Ver restricción

3. **Dispositivo 3 (admin):**
   - Aprobar garantía del dispositivo 2
   
4. **Dispositivo 2:**
   - Recargar
   - Ahora puede pujar

---

## ✅ RESUMEN FINAL

**Sistema completo implementado:**
- ✅ Registro de usuarios
- ✅ Login con email/password
- ✅ Control manual de garantías
- ✅ Restricción de pujas
- ✅ Sesión persistente
- ✅ Panel de administración
- ✅ Usuarios de prueba listos
- ✅ Vista para todos (sin login)
- ✅ Puja solo con garantía aprobada

**Próximos pasos (opcional):**
- [ ] Implementar bcrypt para passwords
- [ ] Sistema de recuperación de contraseña
- [ ] Notificaciones por email
- [ ] Dashboard de admin más completo
- [ ] Soft delete de cuentas

---

## 🎯 CONTACTO Y SOPORTE

**Archivos importantes:**
- `supabase-auth-setup.sql` - Base de datos
- `usuarios-service.js` - Lógica de negocio
- `AuthModal.jsx` - UI de login/registro
- `useSubastaUser.js` - Hook de autenticación

**Para cualquier duda:**
- Revisar logs en consola del navegador
- Verificar datos en Supabase Dashboard
- Comprobar RLS policies

---

**✅ Sistema listo para pruebas!**