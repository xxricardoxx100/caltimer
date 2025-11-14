// Script para probar la conexión y configuración de Supabase
// Ejecutar con: node test-supabase-connection.js

import { createClient } from '@supabase/supabase-js';

// Cargar variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Verificando configuración de Supabase...\n");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Variables de entorno no encontradas");
  console.log("Asegúrate de tener:");
  console.log("- NEXT_PUBLIC_SUPABASE_URL");
  console.log("- NEXT_PUBLIC_SUPABASE_ANON_KEY");
  process.exit(1);
}

console.log("✅ Variables de entorno encontradas");
console.log("📍 Supabase URL:", supabaseUrl);
console.log("🔑 Key (primeros 20 chars):", supabaseKey.substring(0, 20) + "...\n");

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("🧪 Test 1: Conexión básica a Supabase");
  try {
    const { data, error } = await supabase
      .from('subastas_ofertas')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error("❌ Error conectando:", error.message);
      return false;
    }
    console.log("✅ Conexión exitosa\n");
    return true;
  } catch (err) {
    console.error("❌ Error crítico:", err.message);
    return false;
  }
}

async function testTableStructure() {
  console.log("🧪 Test 2: Estructura de tabla subastas_ofertas");
  try {
    const { data, error } = await supabase
      .from('subastas_ofertas')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error("❌ Error:", error.message);
      return;
    }
    
    if (data && data.length > 0) {
      console.log("✅ Columnas encontradas:");
      Object.keys(data[0]).forEach(col => {
        console.log("  -", col);
      });
    } else {
      console.log("⚠️ Tabla vacía, no se pueden verificar columnas");
    }
    console.log();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

async function testRealtime() {
  console.log("🧪 Test 3: Configuración de Realtime");
  try {
    const channel = supabase
      .channel('test-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'subastas_ofertas'
        },
        (payload) => {
          console.log("📨 Evento recibido:", payload);
        }
      )
      .subscribe((status) => {
        console.log("📡 Estado de suscripción:", status);
      });

    // Esperar 3 segundos para ver el estado
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log("✅ Suscripción creada (verificar en consola si status = SUBSCRIBED)");
    
    await supabase.removeChannel(channel);
    console.log("🔚 Canal cerrado\n");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

async function testRPC() {
  console.log("🧪 Test 4: Función RPC get_server_time");
  try {
    const { data, error } = await supabase.rpc('get_server_time');
    
    if (error) {
      console.error("❌ Error:", error.message);
      console.log("⚠️ La función get_server_time no existe o no está configurada");
      return;
    }
    
    console.log("✅ Función RPC funciona");
    console.log("⏰ Hora del servidor:", new Date(data).toISOString());
    console.log();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

async function testInsert() {
  console.log("🧪 Test 5: Insertar registro de prueba");
  try {
    const testData = {
      subasta_id: 'test-' + Date.now(),
      user_id: 'test-user',
      user_name: 'Test Usuario',
      monto: 1000
    };

    console.log("📤 Insertando:", testData);

    const { data, error } = await supabase
      .from('subastas_ofertas')
      .insert([testData])
      .select()
      .single();
    
    if (error) {
      console.error("❌ Error insertando:", error.message);
      console.log("Código:", error.code);
      console.log("Detalles:", error.details);
      return;
    }
    
    console.log("✅ Registro insertado exitosamente");
    console.log("ID:", data.id);
    
    // Eliminar el registro de prueba
    const { error: deleteError } = await supabase
      .from('subastas_ofertas')
      .delete()
      .eq('id', data.id);
    
    if (!deleteError) {
      console.log("🗑️ Registro de prueba eliminado\n");
    }
  } catch (err) {
    console.error("❌ Error crítico:", err.message);
  }
}

async function runAllTests() {
  console.log("=" .repeat(60));
  console.log("      DIAGNÓSTICO DE SUPABASE - SISTEMA DE SUBASTAS");
  console.log("=" .repeat(60) + "\n");

  const connected = await testConnection();
  if (!connected) {
    console.log("\n❌ No se pudo conectar a Supabase. Verifica la configuración.");
    return;
  }

  await testTableStructure();
  await testRealtime();
  await testRPC();
  await testInsert();

  console.log("=" .repeat(60));
  console.log("                   DIAGNÓSTICO COMPLETO");
  console.log("=" .repeat(60));
  console.log("\n💡 Revisa los resultados arriba para identificar problemas.\n");
}

runAllTests();
