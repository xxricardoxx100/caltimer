import { NextResponse } from "next/server";
import { subastaData } from "@/app/components/subastas/SubastaData";

// Alias "latest" de Google: apunta siempre al modelo flash-lite vigente,
// evita que el nombre quede obsoleto cuando Google libere nuevas versiones.
const GEMINI_MODEL = "gemini-flash-lite-latest";
const MAX_PREGUNTA_LENGTH = 300;
const MAX_HISTORIAL_TURNOS = 3;

const construirSystemInstruction = (vehiculo) => {
  const ficha = [
    `Marca: ${vehiculo.marca}`,
    `Modelo: ${vehiculo.modelo}`,
    `Año: ${vehiculo.año}`,
    `Kilometraje: ${vehiculo.kilometraje}`,
    `Transmisión: ${vehiculo.transmision}`,
    `Combustible: ${vehiculo.combustible}`,
    `Color: ${vehiculo.color}`,
    `Puertas: ${vehiculo.puertas}`,
    `Estado general declarado: ${vehiculo.estado}`,
    `Precio base de subasta: $${vehiculo.precio}`,
    `Características: ${(vehiculo.caracteristicas || []).join(", ")}`,
  ].join("\n");

  return [
    "Eres el asistente de Caltimer, una plataforma peruana de subastas de vehículos.",
    "Ayudas a un participante a resolver dudas sobre ESTE vehículo específico antes de pujar.",
    "Estos son los únicos datos verificados de este vehículo:",
    ficha,
    "",
    "Reglas:",
    "- Puedes dar una estimación GENERAL y REFERENCIAL del precio de mercado en Perú para vehículos similares (misma marca/modelo/año/kilometraje aproximado), dejando siempre claro que es una referencia orientativa y no un avalúo oficial.",
    "- Puedes comentar sobre rendimiento, confiabilidad o características típicas de ese modelo en general.",
    "- NUNCA inventes datos específicos de esta unidad que no estén en la ficha (papeletas, choques, dueños previos, mantenimiento, etc.). Si te preguntan algo así, aclara que no tienes esa información y que deben revisar la sección de Descripción/Anexo o contactar al administrador.",
    "- Responde en español, de forma breve y directa (máximo un par de párrafos cortos).",
  ].join("\n");
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { vehiculoId, pregunta, historial } = body || {};

  const vehiculo = subastaData.find((v) => v.id === Number(vehiculoId));
  if (!vehiculo) {
    return NextResponse.json({ error: "Vehículo no encontrado" }, { status: 400 });
  }

  if (typeof pregunta !== "string" || !pregunta.trim()) {
    return NextResponse.json({ error: "La pregunta no puede estar vacía" }, { status: 400 });
  }

  if (pregunta.length > MAX_PREGUNTA_LENGTH) {
    return NextResponse.json(
      { error: `La pregunta es demasiado larga (máximo ${MAX_PREGUNTA_LENGTH} caracteres)` },
      { status: 400 }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Servicio de IA no configurado. Falta GEMINI_API_KEY en el servidor." },
      { status: 500 }
    );
  }

  const historialRecortado = Array.isArray(historial)
    ? historial.slice(-MAX_HISTORIAL_TURNOS * 2)
    : [];

  const contents = [
    ...historialRecortado
      .filter((m) => m && typeof m.texto === "string" && (m.rol === "user" || m.rol === "ai"))
      .map((m) => ({
        role: m.rol === "ai" ? "model" : "user",
        parts: [{ text: m.texto }],
      })),
    { role: "user", parts: [{ text: pregunta }] },
  ];

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: construirSystemInstruction(vehiculo) }],
          },
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.4,
          },
        }),
      }
    );

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      if (geminiResponse.status === 429) {
        return NextResponse.json(
          { error: "Se alcanzó el límite gratuito de consultas por ahora. Intenta de nuevo en unos minutos." },
          { status: 429 }
        );
      }
      console.error("Error de Gemini:", data);
      return NextResponse.json(
        { error: "No se pudo obtener respuesta de la IA en este momento." },
        { status: 502 }
      );
    }

    const respuesta = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

    if (!respuesta) {
      return NextResponse.json(
        { error: "La IA no devolvió una respuesta. Intenta reformular tu pregunta." },
        { status: 502 }
      );
    }

    return NextResponse.json({ respuesta });
  } catch (err) {
    console.error("Error llamando a Gemini:", err);
    return NextResponse.json(
      { error: "No se pudo contactar al servicio de IA." },
      { status: 502 }
    );
  }
}
