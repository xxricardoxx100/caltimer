'use client';

import { supabase } from './server';

const TABLE_NAME = 'libro_reclamaciones';

const sanitizeText = (value) => (value || '').trim();

const buildPayload = (formData) => {
  const claimCode = formData?.codigo || `LR-${Date.now()}`;

  return {
    codigo: claimCode,
    nombres: sanitizeText(formData?.nombres),
    documento_tipo: sanitizeText(formData?.documento_tipo),
    documento_numero: sanitizeText(formData?.documento_numero),
    telefono: sanitizeText(formData?.telefono),
    correo: sanitizeText(formData?.correo),
    direccion: sanitizeText(formData?.direccion),
    apoderado: sanitizeText(formData?.apoderado),
    tipo: sanitizeText(formData?.tipo),
    detalle: sanitizeText(formData?.detalle),
    pedido: sanitizeText(formData?.pedido),
    consentimiento: Boolean(formData?.consentimiento),
  };
};

export const LibroReclamacionesService = {
  async registrarReclamo(formData) {
    const payload = buildPayload(formData);

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([payload])
      .select('id, codigo')
      .single();

    if (error) {
      throw new Error(error.message || 'No se pudo registrar el reclamo.');
    }

    return data;
  },
};
