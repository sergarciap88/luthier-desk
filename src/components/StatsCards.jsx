export default function StatsCards({ guitarras }) {
    // Calculamos el stock total sumando el campo 'stock' de cada guitarra
    const totalStock = guitarras.reduce((acc, guitarra) => acc + (guitarra.stock || 0), 0);
    
    // Simulamos el total de productos únicos (12 en tu caso)
    const totalModelos = guitarras.length;

    // Supongamos un valor estimado de inventario (precio * stock)
    const valorInventario = guitarras.reduce((acc, guitarra) => acc + ((guitarra.price || 0) * (guitarra.stock || 0)), 0);

    return (
        <div className="row g-4 mb-5">
            {/* Tarjeta 1: Modelos Activos */}
            <div className="col-12 col-md-4">
                <div className="p-4 rounded-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d' }}>
                    <span className="text-uppercase fw-semibold text-secondary small" style={{ letterSpacing: '0.5px' }}>Guitar Models</span>
                    <h3 className="display-6 fw-bold m-0 mt-1 text-white">{totalModelos}</h3>
                    <span className="text-success small fw-medium">● Live in store</span>
                </div>
            </div>

            {/* Tarjeta 2: Stock Total */}
            <div className="col-12 col-md-4">
                <div className="p-4 rounded-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d' }}>
                    <span className="text-uppercase fw-semibold text-secondary small" style={{ letterSpacing: '0.5px' }}>Total Stock Units</span>
                    <h3 className="display-6 fw-bold m-0 mt-1" style={{ color: '#e99401' }}>{totalStock}</h3>
                    <span className="text-secondary small">Items in warehouse</span>
                </div>
            </div>

            {/* Tarjeta 3: Valor del Inventario */}
            <div className="col-12 col-md-4">
                <div className="p-4 rounded-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d' }}>
                    <span className="text-uppercase fw-semibold text-secondary small" style={{ letterSpacing: '0.5px' }}>Inventory Value</span>
                    <h3 className="display-6 fw-bold m-0 mt-1 text-white">
                        ${valorInventario.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h3>
                    <span className="text-secondary small">USD Estimated</span>
                </div>
            </div>
        </div>
    );
}