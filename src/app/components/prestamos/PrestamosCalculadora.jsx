"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaCarSide } from "react-icons/fa";

export default function PrestamosCalculadora() {
  const [valorVehiculo, setValorVehiculo] = useState(50000);
  const [plazoMeses, setPlazoMeses] = useState(12);
  const [porcentaje, setPorcentaje] = useState(70);

  // Cálculos
  const montoPrestamo = (valorVehiculo * porcentaje) / 100;
  const tasaMensual = 0.035; // 3.5% mensual (ejemplo)
  const cuotaMensual = (montoPrestamo * tasaMensual * Math.pow(1 + tasaMensual, plazoMeses)) / 
                       (Math.pow(1 + tasaMensual, plazoMeses) - 1);
  const totalPagar = cuotaMensual * plazoMeses;

  const handleWhatsAppClick = () => {
    const phoneNumber = "51928430066";
    const message = encodeURIComponent(
      `Hola, he calculado un préstamo de S/ ${montoPrestamo.toLocaleString('es-PE', {maximumFractionDigits: 0})} con mi vehículo valorizado en S/ ${valorVehiculo.toLocaleString('es-PE')}. ¿Pueden ayudarme con más información?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="calculadora" className="py-16 md:py-24 bg-gradient-to-b from-white to-[#F6F1E8]">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E36C09] font-semibold text-sm uppercase tracking-wider">Simulador</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-[#1F3F58]">
            Calcula tu <span className="text-[#E36C09]">préstamo vehicular</span>
          </h2>
          <p className="text-lg text-gray-600">
            Simula cuánto puedes obtener con tu vehículo y conoce tus cuotas mensuales.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario de cálculo */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#E36C09] p-3 rounded-lg">
                  <FaCalculator className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1F3F58]">Datos del préstamo</h3>
              </div>

              <div className="space-y-8">
                {/* Valor del vehículo */}
                <div>
                  <label className="block text-sm font-semibold text-[#1F3F58] mb-3">
                    Valor aproximado de tu vehículo
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="250000"
                    step="5000"
                    value={valorVehiculo}
                    onChange={(e) => setValorVehiculo(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E36C09]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">S/ 10,000</span>
                    <span className="text-lg font-bold text-[#E36C09]">
                      S/ {valorVehiculo.toLocaleString('es-PE')}
                    </span>
                    <span className="text-sm text-gray-500">S/ 250,000</span>
                  </div>
                </div>

                {/* Porcentaje del préstamo */}
                <div>
                  <label className="block text-sm font-semibold text-[#1F3F58] mb-3">
                    Porcentaje del valor a solicitar
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="80"
                    step="5"
                    value={porcentaje}
                    onChange={(e) => setPorcentaje(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E36C09]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">50%</span>
                    <span className="text-lg font-bold text-[#E36C09]">{porcentaje}%</span>
                    <span className="text-sm text-gray-500">80%</span>
                  </div>
                </div>

                {/* Plazo */}
                <div>
                  <label className="block text-sm font-semibold text-[#1F3F58] mb-3">
                    Plazo del préstamo
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="36"
                    step="3"
                    value={plazoMeses}
                    onChange={(e) => setPlazoMeses(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E36C09]"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-500">3 meses</span>
                    <span className="text-lg font-bold text-[#E36C09]">{plazoMeses} meses</span>
                    <span className="text-sm text-gray-500">36 meses</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#F6F1E8] rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Nota:</strong> Esta es una simulación referencial. Las condiciones finales se definirán tras la evaluación de tu vehículo.
                </p>
              </div>
            </motion.div>

            {/* Resultados */}
            <motion.div
              className="bg-gradient-to-br from-[#1F3F58] to-[#2A5270] text-white rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#E36C09] p-3 rounded-lg">
                  <FaCarSide className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold">Resumen de tu préstamo</h3>
              </div>

              <div className="space-y-6">
                {/* Monto del préstamo */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-sm text-gray-300 mb-2">Monto a recibir</p>
                  <p className="text-4xl md:text-5xl font-extrabold text-[#E36C09]">
                    S/ {montoPrestamo.toLocaleString('es-PE', {maximumFractionDigits: 0})}
                  </p>
                </div>

                {/* Cuota mensual */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-sm text-gray-300 mb-2">Cuota mensual aproximada</p>
                  <p className="text-3xl md:text-4xl font-bold">
                    S/ {cuotaMensual.toLocaleString('es-PE', {maximumFractionDigits: 0})}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Durante {plazoMeses} meses</p>
                </div>

                {/* Total a pagar */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-sm text-gray-300 mb-2">Total a pagar</p>
                  <p className="text-2xl md:text-3xl font-bold">
                    S/ {totalPagar.toLocaleString('es-PE', {maximumFractionDigits: 0})}
                  </p>
                </div>

                {/* Detalles adicionales */}
                <div className="border-t border-white/20 pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Tasa mensual estimada:</span>
                    <span className="font-semibold">3.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Porcentaje del vehículo:</span>
                    <span className="font-semibold">{porcentaje}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Plazo seleccionado:</span>
                    <span className="font-semibold">{plazoMeses} meses</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleWhatsAppClick}
                className="w-full mt-8 bg-[#E36C09] hover:bg-[#C55A07] text-white font-bold py-4 px-6 rounded-full shadow-xl text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicitar este Préstamo
              </motion.button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Un asesor se comunicará contigo para validar la información
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
