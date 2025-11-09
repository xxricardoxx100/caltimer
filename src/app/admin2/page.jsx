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
  price: "",
  currency: "USD",
  deliveryStatus: "",
  mediaType: "image",
  image2: "",
  features: "",
  description: "",
};

function AdmininmobiliariaForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [secondaryMediaFiles, setSecondaryMediaFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(() => Date.now());
  const [secondaryFileInputKey, setSecondaryFileInputKey] = useState(
    () => Date.now() + 1
  );

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

  const handleSecondaryMediaChange = (event) => {
    const files = Array.from(event.target.files || []);
    setSecondaryMediaFiles(files);
    if (files.length) {
      setFormData((previous) => ({
        ...previous,
        image2: "",
      }));
    }
  };

  const handleRemoveSecondaryFile = (index) => {
    setSecondaryMediaFiles((previous) => {
      const next = previous.filter((_, idx) => idx !== index);
      if (!next.length) {
        setSecondaryFileInputKey(Date.now());
      }
      return next;
    });
  };

  const resetForm = () => {
    setFormData({ ...initialFormData });
    setPhotoFiles([]);
    setSecondaryMediaFiles([]);
    const timestamp = Date.now();
    setFileInputKey(timestamp);
    setSecondaryFileInputKey(timestamp + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const photosPayload = photoFiles.map((file) => ({ file }));
      const uploadedImageUrls =
        await InmobiliariaService.uploadinmobiliariaImages(photosPayload);

      const priceValue = formData.price.trim();
      const numericLike =
        priceValue !== "" && /^[0-9.,]+$/.test(priceValue.replace(/\s/g, ""));
      const formattedPrice = priceValue
        ? numericLike && formData.currency
          ? `${formData.currency} ${priceValue}`
          : priceValue
        : null;
      let secondaryMediaUrl = formData.image2.trim() || null;
      let secondaryUploadedUrls = [];

      if (secondaryMediaFiles.length) {
        secondaryUploadedUrls =
          await InmobiliariaService.uploadinmobiliariaImages(
            secondaryMediaFiles.map((file) => ({ file }))
          );

        if (!secondaryMediaUrl && secondaryUploadedUrls.length) {
          [secondaryMediaUrl] = secondaryUploadedUrls;
        }
      }
      const galleryUrls = [...uploadedImageUrls, ...secondaryUploadedUrls];

      const inmobiliariaPayload = {
        name: formData.name.trim(),
        sectionTitle: formData.sectionTitle.trim(),
        address: formData.address.trim() || null,
        minArea: formData.minArea.trim() || null,
        district: formData.district.trim() || null,
        price: formattedPrice,
        deliveryStatus: formData.deliveryStatus.trim() || null,
        mediaType: formData.mediaType,
        description: formData.description.trim() || null,
        image: uploadedImageUrls[0] || null,
        image2: secondaryMediaUrl,
        features: formData.features.trim() || null,
      };

      const insertedinmobiliaria =
        await InmobiliariaService.createinmobiliariaListing(
          inmobiliariaPayload,
          galleryUrls
        );

      setFeedback({
        type: "success",
        text: `Inmueble ${insertedinmobiliaria.name} guardado correctamente.`,
      });
      resetForm();
    } catch (error) {
      console.error("Error creating inmobiliaria listing:", error);
      setFeedback({
        type: "error",
        text:
          error?.message ||
          "No se pudo crear el inmueble. Revisa los datos e intenta nuevamente.",
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

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8" noValidate>
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
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="JR, AV., Calle"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="district"
                >
                  Distrito / Ciudad
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  value={formData.district}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Ciudad, Provincia"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="minArea"
                >
                  Area del inmueble
                </label>
                <input
                  id="minArea"
                  name="minArea"
                  type="text"
                  value={formData.minArea}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="m2 "
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
                  type="text"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder='120000 o "Desde 45,600"'
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="currency"
                >
                  Moneda
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                >
                  <option value="USD">USD</option>
                  <option value="PEN">PEN</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="deliveryStatus"
                >
                  Estado del anuncio
                </label>
                <input
                  id="deliveryStatus"
                  name="deliveryStatus"
                  type="text"
                  value={formData.deliveryStatus}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Pre-venta, Entrega inmediata..."
                />
              </div>

              <div className="grid gap-2 md:col-span-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="features"
                >
                  Características principales
                </label>
                <input
                  id="features"
                  name="features"
                  type="text"
                  value={formData.features}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Terreno, Departamento, 3 habitaciones..."
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
                placeholder="Añade detalles relevantes del inmueble..."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="mediaType"
                >
                  Tipo de media secundaria
                </label>
                <select
                  id="mediaType"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                >
                  <option value="image">Imagen</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-xs font-medium text-neutral-500"
                  htmlFor="image2File"
                >
                  Suba un archivo para guardarlo como media secundaria
                </label>
                <input
                  id="image2File"
                  name="image2File"
                  type="file"
                  accept="image/*,video/*"
                  key={secondaryFileInputKey}
                  multiple
                  onChange={handleSecondaryMediaChange}
                  className="rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-xs text-neutral-700 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                />
                {secondaryMediaFiles.length > 0 && (
                  <ul className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-600">
                    {secondaryMediaFiles.map((file, index) => (
                      <li
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSecondaryFile(index)}
                          className="text-rose-600 transition hover:text-rose-500"
                        >
                          Quitar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <label
                className="text-sm font-medium text-neutral-800"
                htmlFor="photos"
              >
                Imágenes del inmueble
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
                {isSubmitting ? "Guardando..." : "Guardar inmueble"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default AdmininmobiliariaForm;
