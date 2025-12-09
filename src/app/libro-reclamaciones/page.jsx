'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LibroReclamacionesService } from '@/lib/supabase/libro-reclamaciones-service';

const initialFormState = {
  nombres: '',
  documento_tipo: 'DNI',
  documento_numero: '',
  telefono: '',
  correo: '',
  direccion: '',
  apoderado: '',
  tipo: 'Reclamo',
  detalle: '',
  pedido: '',
  consentimiento: false,
};

const documentOptions = ['DNI', 'CE', 'Pasaporte', 'RUC'];
const claimTypes = ['Reclamo', 'Queja'];

const validateForm = (values) => {
  if (!values.nombres.trim()) {
    return 'Ingresa tus nombres completos.';
  }
  if (!values.documento_numero.trim()) {
    return 'Ingresa el número de documento.';
  }
  if (!values.correo.trim()) {
    return 'Ingresa un correo electrónico válido.';
  }
  if (!values.direccion.trim()) {
    return 'Ingresa tu dirección completa.';
  }
  if (!values.detalle.trim()) {
    return 'Describe el detalle de tu reclamo o queja.';
  }
  if (!values.pedido.trim()) {
    return 'Describe tu pedido o solución solicitada.';
  }
  if (!values.consentimiento) {
    return 'Debes aceptar el uso de tus datos personales.';
  }
  return '';
};

export default function LibroReclamacionesPage() {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [ticket, setTicket] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    const validationMessage = validateForm(formValues);
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await LibroReclamacionesService.registrarReclamo(formValues);
      setTicket(result);
      setFormValues(initialFormState);
    } catch (error) {
      setFormError(error.message || 'Ocurrió un error al registrar el reclamo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-widest text-[#F29F05]">
            Atención al cliente
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Libro de Reclamaciones
          </h1>
          <p className="mt-4 text-base text-gray-600">
            Puedes registrar aquí tu reclamo o queja relacionado con nuestros servicios.
            Te responderemos en un plazo máximo de 15 días hábiles conforme a la normativa vigente.
          </p>
        </div>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nombres" className="block text-sm font-medium text-gray-900">
                  Nombres y apellidos
                </label>
                <input
                  id="nombres"
                  name="nombres"
                  type="text"
                  autoComplete="name"
                  value={formValues.nombres}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                  placeholder="Ej. María Pérez Gómez"
                />
              </div>

              <div>
                <label htmlFor="documento_tipo" className="block text-sm font-medium text-gray-900">
                  Tipo de documento
                </label>
                <select
                  id="documento_tipo"
                  name="documento_tipo"
                  value={formValues.documento_tipo}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                >
                  {documentOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="documento_numero" className="block text-sm font-medium text-gray-900">
                  Número de documento
                </label>
                <input
                  id="documento_numero"
                  name="documento_numero"
                  type="text"
                  value={formValues.documento_numero}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                  placeholder="Ej. 12345678"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-900">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  value={formValues.telefono}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                  placeholder="Ej. 987654321"
                />
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-900">
                  Correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  autoComplete="email"
                  value={formValues.correo}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                  placeholder="Ej. correo@dominio.com"
                />
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-900">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  autoComplete="street-address"
                  value={formValues.direccion}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                  placeholder="Ej. Calle 123, Lima"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="apoderado" className="block text-sm font-medium text-gray-900">
                  Padre, madre o apoderado (opcional)
                </label>
                <input
                  id="apoderado"
                  name="apoderado"
                  type="text"
                  value={formValues.apoderado}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                  placeholder="Completar solo si corresponde"
                />
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-gray-900">Tipo de atención</legend>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {claimTypes.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 shadow-sm transition hover:border-[#F29F05]">
                    <input
                      type="radio"
                      name="tipo"
                      value={option}
                      checked={formValues.tipo === option}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 text-[#F29F05] focus:ring-[#F29F05]"
                    />
                    <span className="text-sm text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="detalle" className="block text-sm font-medium text-gray-900">
                Detalle del reclamo o queja
              </label>
              <textarea
                id="detalle"
                name="detalle"
                rows={4}
                value={formValues.detalle}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                placeholder="Describe los hechos sucedidos, incluyendo fechas y servicio involucrado."
              />
            </div>

            <div>
              <label htmlFor="pedido" className="block text-sm font-medium text-gray-900">
                Pedido o solución solicitada
              </label>
              <textarea
                id="pedido"
                name="pedido"
                rows={3}
                value={formValues.pedido}
                onChange={handleChange}
                className="mt-2 block w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-[#F29F05] focus:ring-[#F29F05]"
                placeholder="Indica la solución o compensación que solicitas."
              />
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <input
                id="consentimiento"
                name="consentimiento"
                type="checkbox"
                checked={formValues.consentimiento}
                onChange={handleChange}
                className="mt-1 h-4 w-4 border-gray-300 text-[#F29F05] focus:ring-[#F29F05]"
              />
              <span className="text-sm text-gray-700">
                Declaro que la información consignada es verdadera y autorizo el tratamiento de mis datos personales conforme a nuestra
                <Link href="/politica-privacidad" className="ml-1 text-[#F29F05] underline">
                  Política de Privacidad
                </Link>
                .
              </span>
            </div>

            {formError ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </p>
            ) : null}

            {ticket ? (
              <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <p>
                  Hemos registrado tu solicitud con el código <span className="font-semibold">{ticket.codigo}</span>.
                  Guarda este número para hacer seguimiento a tu caso. Nos comunicaremos contigo por correo o teléfono.
                </p>
              </div>
            ) : null}

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md bg-[#F29F05] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d88604] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Enviando...' : 'Registrar reclamo'}
              </button>
            </div>
          </form>
        </section>

        <section className="mt-10 space-y-4 text-sm text-gray-600">
          <p>
            * Reclamo: disconformidad relacionada a los productos o servicios brindados.
          </p>
          <p>
            * Queja: malestar o descontento respecto a la atención al público.
          </p>
          <p>
            Si necesitas soporte adicional puedes escribirnos a
            <a href="mailto:contacto@caltimer.com" className="ml-1 font-semibold text-[#F29F05]">
              contacto@caltimer.com
            </a>
            o llamar a nuestra línea directa +51 928 430 066 de lunes a viernes de 9:00 a 18:00.
          </p>
        </section>
      </div>
    </main>
  );
}
