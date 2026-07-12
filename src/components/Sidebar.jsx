import { useState } from "react";

export default function Sidebar({ currentView, setView, onLogout }) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-4 text-white sidebar-premium-container">

            {/* Identidad Visual Premium */}
            <div className="d-flex align-items-center mb-4 me-md-auto text-white text-decoration-none px-2 py-2">
                <h2 className="fw-bold text-uppercase m-0 tracking-tight" style={{ fontSize: '1.5rem', letterSpacing: '-1px' }}>
                    Luthier<span style={{ color: '#e99401' }}>Desk</span>
                </h2>
            </div>
            
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.05)', margin: '0 0 24px 0' }} />

            {/* Menú de Navegación Estilizado */}
            <ul className="nav nav-pills flex-column mb-auto gap-1.5">
                <li className="nav-item">
                    <button
                        onClick={() => setView('dashboard')}
                        className={`nav-link text-start w-100 py-2.5 px-3 custom-nav-btn ${currentView === 'dashboard' ? 'active-luthier-card' : 'text-nav-inactive'}`}
                    >
                        Inicio / Métricas
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setView('inventory')}
                        className={`nav-link text-start w-100 py-2.5 px-3 custom-nav-btn ${currentView === 'inventory' ? 'active-luthier-card' : 'text-nav-inactive'}`}
                    >
                        Inventario Guitarras
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setView('orders')}
                        className={`nav-link text-start w-100 py-2.5 px-3 custom-nav-btn ${currentView === 'orders' ? 'active-luthier-card' : 'text-nav-inactive'}`}
                    >
                        Órdenes de Compra
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setView('tickets')}
                        className={`nav-link text-start w-100 py-2.5 px-3 custom-nav-btn ${currentView === 'tickets' ? 'active-luthier-card' : 'text-nav-inactive'}`}
                    >
                        Tickets Soporte
                    </button>
                </li>
            </ul>

            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.05)', margin: '24px 0' }} />

            {/* Botón de Cerrar Sesión Minimalista */}
            <div className="px-1 mb-2">
                <button
                    onClick={onLogout}
                    className="btn btn-sm w-100 py-2 rounded-3 fw-bold text-uppercase btn-logout-luthier"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="px-1 text-center text-md-start opacity-25 small" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                ADMIN MODE V1.0
            </div>
        </div>
    );
}