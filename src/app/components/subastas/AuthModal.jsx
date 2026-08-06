"use client";
import { useState } from "react";
import { UsuariosService } from "@/lib/supabase/usuarios-service";

/**
 * Modal de Autenticación con tabs de Login y Registro
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {function} onClose - Función para cerrar el modal
 * @param {function} onSuccess - Callback cuando login/registro es exitoso
 */
export function AuthModal({ isOpen, onClose, onSuccess }) {
  const [tab, setTab] = useState("login"); // "login" | "registro"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para formulario de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados para formulario de registro
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regNombre, setRegNombre] = useState("");
  const [regTelefono, setRegTelefono] = useState("");
  const [regDni, setRegDni] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validaciones
    if (!loginEmail || !loginPassword) {
      setError("Por favor completa todos los campos");
      setIsLoading(false);
      return;
    }

    try {
      const result = await UsuariosService.iniciarSesion(loginEmail, loginPassword);

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      // Guardar sesión
      UsuariosService.guardarSesion(result.user);

      // Callback de éxito
      if (onSuccess) {
        onSuccess(result.user);
      }

      onClose();
    } catch (err) {
      setError("Error al iniciar sesión");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validaciones
    if (!regEmail || !regPassword || !regNombre) {
      setError("Por favor completa los campos obligatorios");
      setIsLoading(false);
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (regPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      const result = await UsuariosService.registrarUsuario({
        email: regEmail,
        password: regPassword,
        nombreCompleto: regNombre,
        telefono: regTelefono || null,
        dni: regDni || null
      });

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      // Después de registrar, hacer login automático
      const loginResult = await UsuariosService.iniciarSesion(regEmail, regPassword);
      
      if (loginResult.success) {
        UsuariosService.guardarSesion(loginResult.user);
        if (onSuccess) {
          onSuccess(loginResult.user);
        }
        onClose();
      }
    } catch (err) {
      setError("Error al registrar usuario");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#1F3F58]">
              {tab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTab("login");
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                tab === "login"
                  ? "bg-gradient-to-r from-[#F29F05] to-[#E36C09] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setTab("registro");
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                tab === "registro"
                  ? "bg-gradient-to-r from-[#F29F05] to-[#E36C09] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Registrarse
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Tab Login */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="Tu contraseña"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#F29F05] to-[#E36C09] text-white py-3 rounded-lg font-semibold hover:brightness-105 transition disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>
            </form>
          )}

          {/* Tab Registro */}
          {tab === "registro" && (
            <form onSubmit={handleRegistro} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={regNombre}
                  onChange={(e) => setRegNombre(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="Juan Pérez"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={regTelefono}
                  onChange={(e) => setRegTelefono(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="999888777"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNI
                </label>
                <input
                  type="text"
                  value={regDni}
                  onChange={(e) => setRegDni(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F29F05] focus:border-transparent"
                  placeholder="Repite tu contraseña"
                  required
                />
              </div>

              <div className="bg-[#1F3F58]/5 border border-[#1F3F58]/15 rounded-lg p-3 text-xs text-[#1F3F58]">
                💡 <strong>Nota:</strong> Después de registrarte, deberás contactar al administrador para pagar la garantía y poder realizar pujas.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#F29F05] to-[#E36C09] text-white py-3 rounded-lg font-semibold hover:brightness-105 transition disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registrando..." : "Crear Cuenta"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
