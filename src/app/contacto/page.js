"use client";
import { useState } from "react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    servicio: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje = `Servicio: ${formData.servicio}
Nombres: ${formData.nombres}
Apellidos: ${formData.apellidos}
Teléfono: ${formData.telefono}
Correo electrónico: ${formData.email}
Mensaje: ${formData.mensaje}`;
    const url = `https://wa.me/51928430066?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-25">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">Contáctanos</h1>
          <p className="text-gray-600 mb-6 text-center">
            Ingresa tus datos y un asesor se comunicará contigo a la brevedad
            posible
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="servicio"
              value={formData.servicio}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 bg-white"
              required
            >
              <option value="">Servicio al cliente</option>
              <option value="soporte">Soporte técnico</option>
              <option value="ventas">Ventas</option>
              <option value="facturacion">Facturación</option>
              <option value="general">Consulta general</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="nombres"
                type="text"
                placeholder="Nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-3 bg-white"
                required
              />
              <input
                name="apellidos"
                type="text"
                placeholder="Apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-3 bg-white"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="telefono"
                type="tel"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-3 bg-white"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-3 bg-white"
                required
              />
            </div>
            <textarea
              name="mensaje"
              placeholder="Mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md p-3 bg-white min-h-[100px] resize-none w-full"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold"
            >
              ENVIAR
            </button>
          </form>
        </div>
        {/* Mapa simple a la derecha */}
        <div className="flex items-center justify-center md:pl-8">
          <iframe
            title="Ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.5035383477234!2d-76.89574186655851!3d-12.016831940499948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7ff599ef7c1%3A0xcf9d4ee91a3410d1!2sMECATRONICA%20CALTIMER%20SAC.!5e0!3m2!1ses-419!2spe!4v1759267930201!5m2!1ses-419!2spe"
            width="100%"
            height="550"
            allowFullScreen=""
            loading="lazy"
            className="rounded-xl border-0 w-full h-[550px] md:w-[650px]"
          ></iframe>
        </div>
      </div>
    </div>  
  );
}