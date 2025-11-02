"use client";

import { useState } from "react";
import Layout from "../hocs/layouts/Layout";
import { carService } from "@/lib/supabase/services";

const initialFormData = {
  brand: "",
  model: "",
  year: "",
  category: "",
  price: "",
  currency: "USD",
  is_available: true,
  mileage: "",
  color: "",
  fuel_type: "",
  transmission: "Automática",
  drive_type: "",
  location: "",
  description: "",
  status: "Disponible",
};

function AdminCarForm() {
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
      const uploadedImageUrls = await carService.uploadCarImages(photosPayload);

      const carPayload = {
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        year: formData.year ? Number(formData.year) : null,
        category: formData.category.trim() || null,
        price: formData.price ? Number(formData.price) : null,
        currency: formData.currency || null,
        is_available: Boolean(formData.is_available),
        mileage: formData.mileage ? Number(formData.mileage) : null,
        color: formData.color.trim() || null,
        fuel_type: formData.fuel_type.trim() || null,
        transmission: formData.transmission || null,
        drive_type: formData.drive_type.trim() || null,
        location: formData.location.trim(),
        description: formData.description.trim() || null,
        posted_at: new Date().toISOString(),
        image: uploadedImageUrls[0] || null,
        status: formData.status.trim() || null,
      };

      const insertedCar = await carService.createCarListing(
        carPayload,
        uploadedImageUrls
      );

      setFeedback({
        type: "success",
        text: `Vehículo ${insertedCar.brand} ${insertedCar.model} guardado correctamente.`,
      });
      resetForm();
    } catch (error) {
      console.error("Error creating car listing:", error);
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
              Panel de Vehículos
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Completa el formulario para registrar un nuevo vehículo y subir
              sus imágenes a Supabase.
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
                  htmlFor="brand"
                >
                  Marca *
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Toyota"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="model"
                >
                  Modelo *
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="Corolla"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="year"
                >
                  Año
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  max="2100"
                  value={formData.year}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200"
                  placeholder="2024"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-neutral-800"
                  htmlFor="category"
                >
                  Categoría
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
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
                  id="is_available"
                  name="is_available"
                  type="checkbox"
                  checked={formData.is_available}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                />
                <label
                  htmlFor="is_available"
                  className="text-sm font-medium text-neutral-800"
                >
                  Disponible para venta
                </label>
              </div>

              <div className="grid gap-2 md:grid-cols-2 md:gap-6">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium text-neutral-800"
                    htmlFor="status"
                  >
                    Estado del anuncio
                  </label>
                  <input
                    id="status"
                    name="status"
                    type="text"
                    value={formData.status}
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

export default AdminCarForm;
