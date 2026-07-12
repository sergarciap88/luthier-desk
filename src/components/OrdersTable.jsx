import React from "react";

export default function OrdersTable({ ordenes, onCambiarEstado }) {
    return (
        <div className="table-responsive rounded-4 p-4 orders-panel">
            <h5 className="fw-bold text-uppercase mb-4 header-title-luthier">
                Historial de Ventas
            </h5>
            <table className="table table-hover align-middle m-0">
                <thead>
                    <tr className="text-secondary border-bottom">
                        <th className="py-3 px-3">ID Orden</th>
                        <th className="py-3">Cliente</th>
                        <th className="py-3">Guitarra</th>
                        <th className="py-3">Total</th>
                        <th className="py-3">Estado</th>
                        <th className="py-3 text-end px-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map((orden) => (
                        <tr key={orden.id} className="border-bottom">
                            <td className="py-3 px-3 text-secondary">#00{orden.id}</td>
                            <td className="py-3 fw-semibold text-white">{orden.cliente}</td>
                            <td className="py-3 text-secondary">{orden.guitarras?.name || `ID: ${orden.guitarra_id}`}</td>
                            <td className="py-3 text-success fw-bold">${orden.total}</td>
                            <td className="py-3">
                                <span className={`badge rounded-3 px-2 py-1.5 ${orden.estado === 'Completado' ? 'bg-success' : 'bg-warning'}`}>
                                    {orden.estado}
                                </span>
                            </td>
                            <td className="py-3 text-end px-3">
                                <button 
                                    onClick={() => onCambiarEstado(orden.id, orden.estado === 'Pendiente' ? 'Completado' : 'Pendiente')}
                                    className="btn btn-sm btn-action-edit"
                                >
                                    Alternar Estado
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}