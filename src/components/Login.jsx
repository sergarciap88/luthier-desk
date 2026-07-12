import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;
      onLoginSuccess(data.session);
    } catch (err) {
      setError(err.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden login-bg-container">
      
      {/* Capa de oscurecimiento general sobre la imagen de fondo */}
      <div className="position-absolute w-100 h-100 top-0 start-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}></div>

      {/* CONTENEDOR PRINCIPAL: Tarjeta de Cristal Centrada */}
      <div className="position-relative p-5 text-center glass-portal-card animate__animated animate__fadeIn z-2" 
           style={{ maxWidth: '440px', width: '90%' }}>
        
        {/* Identidad de la Marca / Logo superior */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2 opacity-75">
            <div style={{ width: '6px', height: '6px', backgroundColor: '#e99401', borderRadius: '50%' }}></div>
            <span className="text-uppercase tracking-widest fw-bold" style={{ fontSize: '0.65rem', color: '#888888' }}>
              Portal de Administración
            </span>
          </div>
          <h2 className="fw-bold text-uppercase m-0 tracking-tight" style={{ color: '#ffffff', fontSize: '2.4rem' }}>
            Luthier<span style={{ color: '#e99401' }}>Desk</span>
          </h2>
          <p className="small mt-1 m-0" style={{ color: '#555555' }}>Ingresa tus credenciales internas de acceso</p>
        </div>

        {/* Banner de alerta de error estilizado */}
        {error && (
          <div className="alert py-2.5 small mb-4 rounded-3 d-flex align-items-center border-0 text-start animate__animated animate__shakeX" 
               style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderLeft: '3px solid #ef4444' }}>
            <span className="me-2">✕</span> {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleLogin} className="text-start">
          
          /* Input Email */
          <div className="mb-3.5">
            <label className="form-label d-flex justify-content-between text-uppercase tracking-widest fw-bold" style={{ fontSize: '0.65rem', color: '#777777' }}>
              <span>Correo Electrónico</span>
            </label>
            <div className="position-relative">
              <input
                type="email"
                className="form-control luthier-input-premium"
                placeholder="admin@luthierdesk.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          /* Input Password */
          <div className="mb-4.5 mt-3">
            <label className="form-label d-flex justify-content-between text-uppercase tracking-widest fw-bold" style={{ fontSize: '0.65rem', color: '#777777' }}>
              <span>Contraseña</span>
            </label>
            <div className="position-relative">
              <input
                type="password"
                className="form-control luthier-input-premium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          /* Botón de envío Premium */
          <button
            type="submit"
            className="btn w-100 fw-bold text-uppercase py-2.5 rounded-3 btn-premium-center-submit mt-2"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-dark" role="status"></div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        {/* Pie de página sutil integrado */}
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-10" style={{ color: '#444444', fontSize: '0.65rem' }}>
          <span>&copy; {new Date().getFullYear()} LuthierDesk. Acceso restringido y cifrado.</span>
        </div>

      </div>
    </div>
  );
}