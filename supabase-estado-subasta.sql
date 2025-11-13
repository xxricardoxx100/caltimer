-- Script ALTERNATIVO: Agregar columna fecha_fin a tabla existente
-- Esto evita crear una tabla adicional

-- Agregar columna fecha_fin a subastas_ofertas
ALTER TABLE subastas_ofertas 
ADD COLUMN IF NOT EXISTS fecha_fin_subasta TIMESTAMP WITH TIME ZONE;

-- Crear una vista para obtener la fecha_fin más reciente por subasta
CREATE OR REPLACE VIEW subastas_estado_actual AS
SELECT 
  subasta_id,
  MAX(fecha_fin_subasta) as fecha_fin,
  MAX(created_at) as updated_at
FROM subastas_ofertas
WHERE fecha_fin_subasta IS NOT NULL
GROUP BY subasta_id;

-- Verificar
SELECT 
  'Columna agregada a subastas_ofertas' as estado,
  'Ahora puedes guardar fecha_fin con cada oferta' as mensaje;
