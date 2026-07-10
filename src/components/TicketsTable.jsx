export default function TicketsTable({ tickets, onResolverTicket }) {
    return (
        <div className="table-responsive rounded-4 p-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d' }}>
            <h5 className="fw-bold text-uppercase mb-4" style={{ fontSize: '1.1rem', color: '#e99401' }}>
                Casos de Soporte Técnico
            </h5>
            <table className="table table-dark table-hover align-middle m-0">
                <thead>
                    <tr className="text-secondary border-bottom" style={{ borderColor: '#2d2d2d' }}>
                        <th className="py-3 px-3">Cliente</th>
                        <th className="py-3">Asunto / Motivo</th>
                        <th className="py-3">Mensaje</th>
                        <th className="py-3">Prioridad</th>
                        <th className="py-3 text-end px-3">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id} className="border-bottom" style={{ borderColor: '#2d2d2d' }}>
                            <td className="py-3 px-3 fw-semibold text-white">{ticket.cliente}</td>
                            <td className="py-3 text-warning">{ticket.asunto}</td>
                            <td className="py-3 text-secondary small">{ticket.mensaje}</td>
                            <td className="py-3">
                                <span className={`badge rounded-3 ${ticket.prioridad === 'Alta' ? 'bg-danger' : 'bg-secondary'}`}>
                                    {ticket.prioridad}
                                </span>
                            </td>
                            <td className="py-3 text-end px-3">
                                <button 
                                    onClick={() => onResolverTicket(ticket.id)}
                                    className="btn btn-sm btn-outline-danger border-danger opacity-75"
                                >
                                    Cerrar Caso
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}