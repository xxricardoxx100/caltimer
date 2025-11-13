-- Script para crear SOLO la tabla de ofertas de subastas
-- Este script NO afectará tus tablas existentes (cars, inmobiliaria, etc.)
-- Ejecutar este script en Supabase SQL Editor

-- Verificar si la tabla ya existe antes de crearla
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'subastas_ofertas') THEN
    
    -- Crear tabla de ofertas
    CREATE TABLE subastas_ofertas (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      subasta_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      user_name TEXT NOT NULL,
      monto NUMERIC NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Crear índices
    CREATE INDEX idx_subastas_ofertas_subasta_id ON subastas_ofertas(subasta_id);
    CREATE INDEX idx_subastas_ofertas_created_at ON subastas_ofertas(created_at DESC);

    -- Habilitar Row Level Security (RLS)
    ALTER TABLE subastas_ofertas ENABLE ROW LEVEL SECURITY;

    -- Política para permitir que todos lean las ofertas
    CREATE POLICY "Permitir lectura de ofertas a todos"
      ON subastas_ofertas
      FOR SELECT
      USING (true);

    -- Política para permitir que todos inserten ofertas
    CREATE POLICY "Permitir inserción de ofertas a todos"
      ON subastas_ofertas
      FOR INSERT
      WITH CHECK (true);

    RAISE NOTICE 'Tabla subastas_ofertas creada exitosamente';
  ELSE
    RAISE NOTICE 'La tabla subastas_ofertas ya existe, no se hicieron cambios';
  END IF;
END $$;

-- Habilitar Realtime SOLO para la nueva tabla (no afecta a otras tablas)
-- Si ya existe en la publicación, no hará nada
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'subastas_ofertas'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE subastas_ofertas;
    RAISE NOTICE 'Realtime habilitado para subastas_ofertas';
  ELSE
    RAISE NOTICE 'Realtime ya estaba habilitado para subastas_ofertas';
  END IF;
END $$;

-- Verificar resultado final
SELECT 
  'subastas_ofertas' as tabla,
  COUNT(*) as total_ofertas,
  'Listo para usar' as estado
FROM subastas_ofertas;
