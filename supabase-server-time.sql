-- Función para obtener la hora del servidor
-- Esto ayuda a sincronizar contadores entre usuarios

CREATE OR REPLACE FUNCTION get_server_time()
RETURNS TIMESTAMP WITH TIME ZONE
LANGUAGE SQL
STABLE
AS $$
  SELECT NOW();
$$;

-- Verificar
SELECT 
  'Función creada' as status,
  get_server_time() as server_time;
