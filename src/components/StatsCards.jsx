import React from 'react';

export default function StatsCards({ guitarras = [] }) {
  // Cálculos dinámicos basados en tus datos de guitarras
  const totalModelos = guitarras.length;
  
  const totalStock = guitarras.reduce((acc, curr) => acc + (Number(curr.stock) || 0), 0);
  
  const valorInventario = guitarras.reduce((acc, curr) => {
    const precio = Number(curr.price) || 0; 
    const stock = Number(curr.stock) || 0;
    return acc + (precio * stock);
  }, 0);

  // Formateador de moneda interna
  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(valor);
  };

  return (
    <div className="row g-4 mb-4 global-font-luthier">
      
      {/* 1. CARD: MODELOS DE GUITARRAS */}
      <div className="col-12 col-md-4">
        <div className="p-4 h-100 glass-metric-card">
          <div className="text-uppercase tracking-widest fw-bold opacity-50 mb-2 metric-card-title">
            Guitar Models
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <span className="fs-1 fw-bold tracking-tight text-white">{totalModelos}</span>
          </div>
          <div className="d-flex align-items-center gap-1.5 mt-2 text-success-luthier">
            <span className="dot-indicator-success"></span>
            <span>Live in store</span>
          </div>
        </div>
      </div>

      {/* 2. CARD: STOCK TOTAL */}
      <div className="col-12 col-md-4">
        <div className="p-4 h-100 glass-metric-card">
          <div className="text-uppercase tracking-widest fw-bold opacity-50 mb-2 metric-card-title">
            Total Stock Units
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <span className="fs-1 fw-bold tracking-tight" style={{ color: '#e99401' }}>{totalStock}</span>
          </div>
          <div className="text-muted mt-2 small-text-luthier">
            Items in warehouse
          </div>
        </div>
      </div>

      {/* 3. CARD: VALOR TOTAL */}
      <div className="col-12 col-md-4">
        <div className="p-4 h-100 glass-metric-card">
          <div className="text-uppercase tracking-widest fw-bold opacity-50 mb-2 metric-card-title">
            Inventory Value
          </div>
          <div className="d-flex align-items-baseline gap-2">
            <span className="fs-1 fw-bold tracking-tight text-white">{formatearMoneda(valorInventario)}</span>
          </div>
          <div className="text-muted mt-2 small-text-luthier">
            USD Estimated
          </div>
        </div>
      </div>

    </div>
  );
}