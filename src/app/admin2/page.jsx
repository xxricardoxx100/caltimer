"use client";

import { useState } from "react";
import Layout from "../hocs/layouts/Layout";
import { InmobiliariaService } from "@/lib/supabase/services2";

const initialFormData = {
  name: "",
  sectionTitle: "",
  address: "",
  minArea: "",
  district: "",
  price: "USD",
  deliveryStatus: true,
  mediaType: "",
  image: "",
  image2: "",
  description: "",
};

function AdmininmobiliariaForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(() => Date.now());

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setPhotoFiles(files);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPhotoFiles([]);
    setFileInputKey(Date.now());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
  const photosPayload = photoFiles.map((file) => ({ file }));
  const uploadedImageUrls = await InmobiliariaService.uploadinmobiliariaImages(photosPayload);

      const inmobiliariaPayload = {
        name: formData.name.trim(),
        sectionTitle: formData.sectionTitle.trim(),
        address: formData.address ? Number(formData.address) : null,
        minArea: formData.minArea.trim() || null,
        price: formData.price ? Number(formData.price) : null,
        deliveryStatus: formData.deliveryStatus || null,
        mediaType: Boolean(formData.mediaType),
        description: formData.description.trim() || null,
        image: uploadedImageUrls[0] || null,
        image2: formData.image2.trim() || null,
      };

      const insertedinmobiliaria = await InmobiliariaService.createinmobiliariaListing(
        inmobiliariaPayload,
        uploadedImageUrls
      );

      setFeedback({
        type: "success",
        text: `Vehículo ${insertedinmobiliaria.name} ${insertedinmobiliaria.sectionTitle} guardado correctamente.`,
      });
      resetForm();
    } catch (error) {
      console.error("Error creating inmobiliaria listing:", error);
      setFeedback({
        type: "error",
        text:
          error?.message ||
          "No se pudo crear el vehículo. Revisa los datos e intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-neutral-100 py-12">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-10 shadow-xl ring-1 ring-neutral-900/5">
          <header className="border-b border-neutral-200 pb-6">
            <h1 className="text-3xl font-semibold text-neutral-900">
              Panel de Inmuebles
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Completa el formulario para registrar un nuevo inmueble y subir
              sus imágenes.
            </p>
          </header>

          {feedback && (
            <div
              className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
                feedback.type === "success"
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-rose-300 bg-rose-50 text-rose-800"
              }`}
            >
              {feedback.text}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-8"
            noValidate
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="name"
                >
                  Nombre *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder=""
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="sectionTitle"
                >
                  Titulo del inmueble *
                </label>
                <input
                  id="sectionTitle"
                  name="sectionTitle"
                  type="text"
                  required
                  value={formData.sectionTitle}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder=""
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="address"
                >
                  Dirección
                </label>
                <input
                  id="address"
                  name="address"
                  type="number"
                  min="1900"
                  max="2100"
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder=""
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="minArea"
                >
                  Categoría
                </label>
                <input
                  id="minArea"
                  name="minArea"
                  type="text"
                  value={formData.minArea}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Sedán, SUV..."
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="price"
                >
                  Precio *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="25000"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="deliveryimage2"
                >
                  Moneda
                </label>
                <select
                  id="deliveryimage2"
                  name="deliveryimage2"
                  value={formData.deliveryimage2}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="COP">COP</option>
                  <option value="MXN">MXN</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="mileage"
                >
                  Kilometraje
                </label>
                <input
                  id="mileage"
                  name="mileage"
                  type="number"
                  min="0"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="45000"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="color"
                >
                  Color
                </label>
                <input
                  id="color"
                  name="color"
                  type="text"
                  value={formData.color}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Rojo"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="fuel_type"
                >
                  Tipo de combustible
                </label>
                <input
                  id="fuel_type"
                  name="fuel_type"
                  type="text"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Gasolina, Diésel..."
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="transmission"
                >
                  Transmisión
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                >
                  <option value="Automática">Automática</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="drive_type"
                >
                  Tracción
                </label>
                <input
                  id="drive_type"
                  name="drive_type"
                  type="text"
                  value={formData.drive_type}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="4x4, Delantera..."
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="location"
                >
                  Ubicación *
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Ciudad, País"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label
                className="text-sm font-medium text-neutral-800"
                htmlFor="description"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                placeholder="Añade detalles relevantes del vehículo..."
              />
            </div>

            <div className="grid gap-2 md:grid-cols-[auto_1fr] md:items-center">
              <div className="flex items-center gap-3">
                <input
                  id="mediaType"
                  name="mediaType"
                  type="checkbox"
                  checked={formData.mediaType}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                />
                <label
                  htmlFor="mediaType"
                  className="text-sm font-medium text-neutral-800"
                >
                  Disponible para venta
                </label>
              </div>

              <div className="grid gap-2 md:grid-cols-2 md:gap-6">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium text-neutral-800"
                    htmlFor="image2"
                  >
                    Estado del anuncio
                  </label>
                  <input
                    id="image2"
                    name="image2"
                    type="text"
                    value={formData.image2}
                    onChange={handleChange}
                    className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                    placeholder="Disponible, Reservado..."
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium text-neutral-800"
                    htmlFor="photos"
                  >
                    Imágenes del vehículo
                  </label>
                  <input
                    key={fileInputKey}
                    id="photos"
                    name="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="block w-full rounded-lg border border-dashed border-neutral-300 px-3 py-10 text-center text-sm text-neutral-500 shadow-sm hover:border-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  />
                  {photoFiles.length > 0 && (
                    <ul className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                      {photoFiles.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-neutral-200 pt-6 md:flex-row md:justify-end">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 px-5 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Guardando..." : "Guardar vehículo"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default AdmininmobiliariaForm;
