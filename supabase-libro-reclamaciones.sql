-- Script de apoyo para crear la tabla del Libro de Reclamaciones en Supabase.
-- Ejecuta este script desde el editor SQL de Supabase.

create extension if not exists "uuid-ossp";

create table public.libro_reclamaciones (
  id uuid primary key default uuid_generate_v4(),
  codigo text not null unique,
  nombres text not null,
  documento_tipo text not null,
  documento_numero text not null,
  telefono text,
  correo text not null,
  direccion text not null,
  apoderado text,
  tipo text not null,
  detalle text not null,
  pedido text not null,
  consentimiento boolean not null default false,
  estado text not null default 'Pendiente',
  fecha_registro timestamptz not null default now()
);

alter table public.libro_reclamaciones enable row level security;

create policy "Permitir inserts anónimos" on public.libro_reclamaciones
  for insert to anon with check (true);

create policy "Permitir lectura por servicio" on public.libro_reclamaciones
  for select to service_role using (true);
