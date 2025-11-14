-- ========================================
-- OPTIMIZACIONES PARA BASE DE DATOS
-- Sistema de Subastas
-- ========================================

-- 1. ÍNDICES para mejorar velocidad de consultas
-- ========================================

-- Índice en subasta_id (la columna más consultada)
CREATE INDEX IF NOT EXISTS idx_subastas_ofertas_subasta_id 
ON subastas_ofertas(subasta_id);

-- Índice en created_at para ordenamiento rápido
CREATE INDEX IF NOT EXISTS idx_subastas_ofertas_created_at 
ON subastas_ofertas(created_at DESC);

-- Índice compuesto para consultas que filtran por subasta_id y ordenan por fecha
CREATE INDEX IF NOT EXISTS idx_subastas_ofertas_subasta_created 
ON subastas_ofertas(subasta_id, created_at DESC);

-- Índice en user_id para consultas de historial de usuario
CREATE INDEX IF NOT EXISTS idx_subastas_ofertas_user_id 
ON subastas_ofertas(user_id);

-- Índice en fecha_fin_subasta para consultas de extensión de tiempo
CREATE INDEX IF NOT EXISTS idx_subastas_ofertas_fecha_fin 
ON subastas_ofertas(fecha_fin_subasta) 
WHERE fecha_fin_subasta IS NOT NULL;

-- 2. VISTA MATERIALIZADA para última oferta (caché automático)
-- ========================================

-- Vista que guarda la última oferta de cada subasta
CREATE MATERIALIZED VIEW IF NOT EXISTS ultima_oferta_por_subasta AS
SELECT DISTINCT ON (subasta_id)
    subasta_id,
    user_id,
    user_name,
    monto,
    created_at,
    fecha_fin_subasta
FROM subastas_ofertas
ORDER BY subasta_id, created_at DESC;

-- Índice único para la vista materializada
CREATE UNIQUE INDEX IF NOT EXISTS idx_ultima_oferta_subasta_id 
ON ultima_oferta_por_subasta(subasta_id);

-- Refrescar la vista automáticamente cuando hay cambios
CREATE OR REPLACE FUNCTION refresh_ultima_oferta()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY ultima_oferta_por_subasta;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para refrescar vista al insertar
DROP TRIGGER IF EXISTS trigger_refresh_ultima_oferta ON subastas_ofertas;
CREATE TRIGGER trigger_refresh_ultima_oferta
AFTER INSERT ON subastas_ofertas
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_ultima_oferta();

-- 3. FUNCIÓN OPTIMIZADA para obtener ofertas
-- ========================================

-- Reemplazar múltiples consultas con una sola función optimizada
CREATE OR REPLACE FUNCTION get_ofertas_optimizado(p_subasta_id TEXT)
RETURNS TABLE (
    id UUID,
    subasta_id TEXT,
    user_id TEXT,
    user_name TEXT,
    monto NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE,
    fecha_fin_subasta TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.subasta_id,
        o.user_id,
        o.user_name,
        o.monto,
        o.created_at,
        o.fecha_fin_subasta
    FROM subastas_ofertas o
    WHERE o.subasta_id = p_subasta_id
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql STABLE;

-- 4. FUNCIÓN para obtener última oferta (usa vista materializada)
-- ========================================

CREATE OR REPLACE FUNCTION get_ultima_oferta_rapida(p_subasta_id TEXT)
RETURNS TABLE (
    user_name TEXT,
    monto NUMERIC,
    fecha_fin_subasta TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.user_name,
        u.monto,
        u.fecha_fin_subasta
    FROM ultima_oferta_por_subasta u
    WHERE u.subasta_id = p_subasta_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- 5. LIMPIEZA AUTOMÁTICA de datos antiguos
-- ========================================

-- Función para archivar/eliminar ofertas de subastas finalizadas hace más de 30 días
CREATE OR REPLACE FUNCTION cleanup_ofertas_antiguas()
RETURNS void AS $$
BEGIN
    -- Opcional: Mover a tabla de archivo antes de eliminar
    -- INSERT INTO subastas_ofertas_archivo 
    -- SELECT * FROM subastas_ofertas 
    -- WHERE created_at < NOW() - INTERVAL '30 days';
    
    -- Eliminar ofertas de prueba (subasta_id que empiece con 'test-')
    DELETE FROM subastas_ofertas 
    WHERE subasta_id LIKE 'test-%' 
    AND created_at < NOW() - INTERVAL '1 day';
    
    RAISE NOTICE 'Limpieza de ofertas antiguas completada';
END;
$$ LANGUAGE plpgsql;

-- 6. ESTADÍSTICAS para optimizador de consultas
-- ========================================

-- Actualizar estadísticas de la tabla
ANALYZE subastas_ofertas;

-- 7. CONFIGURACIÓN de AUTOVACUUM (mantenimiento automático)
-- ========================================

-- Configurar autovacuum más agresivo para esta tabla
ALTER TABLE subastas_ofertas 
SET (
    autovacuum_vacuum_scale_factor = 0.1,  -- Vacuum cuando 10% de filas cambian
    autovacuum_analyze_scale_factor = 0.05, -- Analyze cuando 5% de filas cambian
    autovacuum_vacuum_cost_delay = 10      -- Reducir delay para vacuum más rápido
);

-- 8. PARTICIONAMIENTO (opcional, para grandes volúmenes)
-- ========================================
-- Comentado porque solo es necesario con millones de registros

/*
-- Convertir tabla a particionada por fecha
CREATE TABLE subastas_ofertas_partitioned (
    LIKE subastas_ofertas INCLUDING ALL
) PARTITION BY RANGE (created_at);

-- Crear particiones por mes
CREATE TABLE subastas_ofertas_2025_11 
PARTITION OF subastas_ofertas_partitioned
FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

CREATE TABLE subastas_ofertas_2025_12 
PARTITION OF subastas_ofertas_partitioned
FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');
*/

-- 9. CONEXIÓN POOL - Configuración recomendada
-- ========================================
-- Estos valores se configuran en Supabase Dashboard → Database → Connection pooling

/*
Pool Mode: Transaction (para mejor rendimiento)
Default Pool Size: 15
Max Client Connections: 100
*/

-- 10. VERIFICACIÓN de optimizaciones
-- ========================================

-- Ver índices creados
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'subastas_ofertas'
ORDER BY indexname;

-- Ver tamaño de la tabla
SELECT 
    pg_size_pretty(pg_total_relation_size('subastas_ofertas')) as total_size,
    pg_size_pretty(pg_relation_size('subastas_ofertas')) as table_size,
    pg_size_pretty(pg_indexes_size('subastas_ofertas')) as indexes_size;

-- Ver estadísticas de uso
SELECT 
    schemaname,
    relname as tablename,
    n_live_tup as filas_activas,
    n_dead_tup as filas_muertas,
    last_vacuum,
    last_autovacuum,
    last_analyze
FROM pg_stat_user_tables
WHERE relname = 'subastas_ofertas';

-- ========================================
-- INSTRUCCIONES DE USO
-- ========================================

/*
1. Ejecutar este script completo en Supabase SQL Editor

2. Verificar que los índices se crearon:
   - Ejecutar la consulta de verificación al final

3. Para usar las funciones optimizadas en el código:
   - get_ofertas_optimizado('subasta-id')
   - get_ultima_oferta_rapida('subasta-id')

4. Programar limpieza periódica (opcional):
   - Crear un cron job o usar Supabase Edge Functions
   - Ejecutar cleanup_ofertas_antiguas() cada semana

5. Monitorear rendimiento:
   - Dashboard → Database → Query Performance
   - Revisar slow queries
*/

-- ========================================
-- RESULTADO ESPERADO
-- ========================================

/*
MEJORAS DE RENDIMIENTO ESPERADAS:

✅ Consultas 5-10x más rápidas con índices
✅ Reducción de carga en base de datos
✅ Mejor manejo de múltiples usuarios simultáneos
✅ Realtime más estable
✅ Menos "congelamiento" durante pujas

MÉTRICAS A MONITOREAR:

- Tiempo de respuesta de consultas (debe ser < 50ms)
- Número de conexiones activas (debe estar < 80% del límite)
- Tamaño de tabla (monitorear crecimiento)
- Dead tuples (deben ser < 10% de live tuples)
*/

SELECT '✅ Script de optimización completado' as status;
