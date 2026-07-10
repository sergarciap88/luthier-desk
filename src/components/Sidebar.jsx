export default function Sidebar({ currentView, setView }) {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white"
            style={{ width: '280px', height: '100vh', backgroundColor: '#1a1a1a', borderRight: '1px solid #2d2d2d', position: 'fixed' }}>

            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none px-2 py-3">
                <span className="fs-4 fw-black text-uppercase" style={{ letterSpacing: '-1px' }}>
                    Luthier<span style={{ color: '#e99401' }}>Desk</span>
                </span>
            </div>
            <hr style={{ borderColor: '#2d2d2d' }} />

            <ul className="nav nav-pills flex-column mb-auto gap-2">
                <li className="nav-item">
                    <button
                        onClick={() => setView('dashboard')}
                        className={`nav-link text-start w-100 py-3 px-3 custom-nav-btn ${currentView === 'dashboard' ? 'active-orange' : 'text-white'}`}
                    >
                        Inicio / Métricas
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setView('inventory')}
                        className={`nav-link text-start w-100 py-3 px-3 custom-nav-btn ${currentView === 'inventory' ? 'active-orange' : 'text-white'}`}
                    >
                        Inventario Guitarras
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setView('orders')}
                        className={`nav-link text-start w-100 py-3 px-3 custom-nav-btn ${currentView === 'orders' ? 'active-orange' : 'text-white'}`}
                    >
                        Órdenes de Compra
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setView('tickets')}
                        className={`nav-link text-start w-100 py-3 px-3 custom-nav-btn ${currentView === 'tickets' ? 'active-orange' : 'text-white'}`}
                    >
                        Tickets Soporte
                    </button>
                </li>
            </ul>

            <hr style={{ borderColor: '#2d2d2d' }} />
            <div className="px-2 pb-3 text-secondary small">
                Admin Mode v1.0
            </div>

            <style>{`
                .custom-nav-btn {
                    background: transparent;
                    border: none;
                    transition: all 0.2s ease;
                }
                .custom-nav-btn:hover {
                    background-color: #222222 !important;
                    color: #e99401 !important;
                }
                .active-orange {
                    background-color: #e99401 !important;
                    color: #000000 !important;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}