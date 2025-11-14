# 🔍 GUÍA DE DIAGNÓSTICO - PROBLEMA DE PUJAS EN SUBASTAS

## Problema Reportado
- Un usuario hace una puja pero no se actualiza en ningún equipo
- Solo se actualiza el tiempo pero no el nombre del postor ni el precio
- Parece que la base de datos se está "cargando" o bloqueando

## ✅ PASOS PARA DIAGNOSTICAR

### 1. Verificar Logs en Consola del Navegador

Abre la consola del navegador (F12) y busca estos mensajes cuando hagas una puja:

#### Logs que DEBERÍAS ver (flujo correcto):
```
🎯 [COMPONENTE] hacerOferta iniciado
⏰ [COMPONENTE] Obteniendo hora del servidor...
⏱️ [COMPONENTE] Tiempo restante: X segundos
🎬 [HOOK crearOferta] Iniciando...
💰 [HOOK] Nuevo monto calculado: $XXXX
🔵 [CREAR OFERTA] Iniciando...
📤 [SUPABASE] Enviando payload
✅ [ÉXITO] Oferta creada en Supabase
✅ [HOOK] Oferta creada exitosamente
📨 [REALTIME] Evento recibido
📊 [NUEVA OFERTA] Datos: {...}
🔄 [HOOK] Actualizando estado con nueva oferta
💰 [ESTADO] Precio actualizado a: $XXXX
👤 [ESTADO] Último postor actualizado a: NombreUsuario
✅ [COMPONENTE] Oferta creada exitosamente
```

#### Logs que indican PROBLEMAS:

❌ **Si ves este error:**
```
❌ [ERROR SUPABASE] Error creando oferta
```
**Causa:** Problema con permisos RLS o conexión a Supabase
**Solución:** Verificar políticas de seguridad en Supabase

❌ **Si ves:**
```
⚠️ [COMPONENTE] No se puede hacer oferta
```
**Causa:** Falta userId, userName o la subasta está inactiva
**Solución:** Verificar que el usuario haya ingresado su nombre

❌ **Si NO ves:**
```
📨 [REALTIME] Evento recibido
```
**Causa:** Realtime no está funcionando o no está habilitado
**Solución:** Verificar configuración de Realtime en Supabase

### 2. Verificar Estado de Supabase Realtime

En la consola de Supabase (https://supabase.com/dashboard):

1. Ve a tu proyecto → Database → Replication
2. Verifica que la tabla `subastas_ofertas` tenga **Realtime habilitado**
3. Debería mostrar un toggle verde

### 3. Verificar Políticas de Seguridad (RLS)

En Supabase → Authentication → Policies:

La tabla `subastas_ofertas` debe tener:
- ✅ Policy para SELECT (permitir lectura a todos)
- ✅ Policy para INSERT (permitir inserción a todos)

**Ejemplo de políticas necesarias:**
```sql
-- Permitir leer todas las ofertas
CREATE POLICY "Permitir lectura de ofertas"
ON subastas_ofertas FOR SELECT
USING (true);

-- Permitir insertar ofertas
CREATE POLICY "Permitir insertar ofertas"
ON subastas_ofertas FOR INSERT
WITH CHECK (true);
```

### 4. Ejecutar Script de Diagnóstico

En la terminal, ejecuta:
```bash
node test-supabase-connection.js
```

Este script verificará:
- ✅ Conexión a Supabase
- ✅ Estructura de la tabla
- ✅ Configuración de Realtime
- ✅ Función RPC get_server_time
- ✅ Capacidad de insertar registros

### 5. Verificar Variables de Entorno

Asegúrate de que existen estos valores en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-aqui
```

### 6. Probar con Múltiples Usuarios

**Escenario de prueba:**

1. Abre la página en 2 navegadores diferentes (o incógnito)
2. En cada uno, ingresa un nombre diferente
3. Usuario A hace una puja
4. Observa la consola de ambos navegadores

**Resultado esperado:**
- Usuario A: Ve su puja inmediatamente
- Usuario B: Recibe evento de Realtime y ve la puja de A

**Si falla:**
- Revisar logs de ambos navegadores
- Verificar que el canal de Realtime esté SUBSCRIBED

### 7. Verificar en Base de Datos

En Supabase → Table Editor → subastas_ofertas:

Después de hacer una puja:
1. Refresca la tabla
2. Verifica que el registro se haya insertado
3. Revisa los valores de: user_id, user_name, monto, created_at

Si el registro NO aparece:
- Problema con el INSERT (verificar RLS policies)

Si el registro aparece pero no se actualiza en el frontend:
- Problema con Realtime (verificar suscripción)

## 🔧 SOLUCIONES COMUNES

### Problema: Realtime no funciona

**Solución 1: Verificar estado del canal**
Busca en consola:
```
🔔 [ESTADO SUSCRIPCIÓN] SUBSCRIBED
```

Si dice `CLOSED` o `CHANNEL_ERROR`:
```javascript
// En Supabase Dashboard → Project Settings → API
// Verificar que Realtime esté habilitado
```

**Solución 2: Reiniciar la suscripción**
```bash
# Recargar la página completamente (Ctrl+Shift+R)
```

### Problema: "Faltan parámetros para crear oferta"

**Solución:**
```javascript
// Verificar en consola:
console.log({
  userId: localStorage.getItem('subasta_user_id'),
  userName: localStorage.getItem('subasta_user_name')
});
```

Si están vacíos, limpiar localStorage:
```javascript
localStorage.removeItem('subasta_user_id');
localStorage.removeItem('subasta_user_name');
// Recargar página e ingresar nombre nuevamente
```

### Problema: "Error creando oferta: 42501"

**Causa:** Políticas RLS muy restrictivas

**Solución:** Ejecutar en SQL Editor de Supabase:
```sql
-- Ver políticas actuales
SELECT * FROM pg_policies WHERE tablename = 'subastas_ofertas';

-- Crear políticas permisivas para desarrollo
DROP POLICY IF EXISTS "Permitir todo en desarrollo" ON subastas_ofertas;
CREATE POLICY "Permitir todo en desarrollo"
ON subastas_ofertas
FOR ALL
USING (true)
WITH CHECK (true);
```

## 📊 CHECKLIST DE VERIFICACIÓN

Marca cada ítem conforme lo verificas:

- [ ] Variables de entorno configuradas
- [ ] Realtime habilitado en tabla subastas_ofertas
- [ ] Políticas RLS configuradas (SELECT e INSERT)
- [ ] Función get_server_time existe y funciona
- [ ] Logs de consola muestran flujo completo
- [ ] Canal de Realtime en estado SUBSCRIBED
- [ ] Múltiples usuarios pueden ver las mismas pujas
- [ ] Registros aparecen en la tabla de Supabase

## 🆘 SI NADA FUNCIONA

1. **Reiniciar servicios:**
   ```bash
   # Detener servidor Next.js (Ctrl+C)
   # Limpiar caché
   rm -rf .next
   # Reinstalar dependencias
   npm install
   # Iniciar de nuevo
   npm run dev
   ```

2. **Verificar red:**
   - Abre las DevTools → Network
   - Filtra por "realtime"
   - Verifica que hay conexión WebSocket activa

3. **Contactar soporte:**
   - Captura de pantalla de los logs
   - Código de error específico
   - Estado de suscripción de Realtime

## 📝 INFORMACIÓN PARA REPORTAR

Si el problema persiste, incluye esta información:

1. Logs completos de la consola (ambos usuarios)
2. Resultado del script `test-supabase-connection.js`
3. Estado de Realtime en Supabase Dashboard
4. Capturas de la tabla subastas_ofertas después de hacer puja
5. Navegadores y versiones usadas para la prueba

---

**Última actualización:** 14 de noviembre, 2025
