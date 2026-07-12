import { useState } from "react";

export default function InventoryTable({ guitarras, onEliminar, onGuardar }) {
    // Estados para controlar el modal de agregar/editar
    const [showModal, setShowModal] = useState(false);
    const [editingGuitar, setEditingGuitar] = useState(null);

    // Estado del formulario
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: ''
    });

    // Abrir modal para añadir nueva guitarra
    const handleAddClick = () => {
        setEditingGuitar(null);
        setFormData({ name: '', price: '', stock: '10', description: '', image: 'guitarra_01' });
        setShowModal(true);
    };

    // Abrir modal para editar guitarra existente
    const handleEditClick = (guitarra) => {
        setEditingGuitar(guitarra);
        setFormData({
            id: guitarra.id,
            name: guitarra.name,
            price: guitarra.price,
            stock: guitarra.stock || 0,
            description: guitarra.description || '',
            image: guitarra.image
        });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuardar(formData);
        setShowModal(false);
    };

    return (
        <div className="table-responsive rounded-4 p-4 inventory-panel">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-uppercase m-0 header-title-luthier">
                    Live Stock Inventory
                </h5>
                <button onClick={handleAddClick} className="btn btn-sm fw-semibold px-3 py-2 btn-premium-center-submit">
                    + Add New Guitar
                </button>
            </div>

            <table className="table table-hover align-middle m-0">
                <thead>
                    <tr className="text-secondary border-bottom">
                        <th className="py-3 px-3 th-img-col">Image</th>
                        <th className="py-3">Guitar Name</th>
                        <th className="py-3">Price (USD)</th>
                        <th className="py-3">Stock Units</th>
                        <th className="py-3 text-end px-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {guitarras.map((guitarra) => (
                        <tr key={guitarra.id} className="border-bottom">
                            <td className="py-3 px-3">
                                <img 
                                    src={guitarra.image?.includes('.') ? `/img/${guitarra.image}` : `/img/${guitarra.image}.jpg`} 
                                    alt={guitarra.name} 
                                    className="rounded-3 inventory-guitar-thumb"
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = 'https://via.placeholder.com/50x65/222222/ffffff?text=🎸';
                                    }}
                                />
                            </td>
                            <td className="py-3 fw-semibold text-white">{guitarra.name}</td>
                            <td className="py-3 text-secondary">${guitarra.price}</td>
                            <td className="py-3">
                                <span className={`badge px-2.5 py-1.5 rounded-3 ${guitarra.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                    {guitarra.stock || 0} units
                                </span>
                            </td>
                            <td className="py-3 text-end px-3">
                                <button onClick={() => handleEditClick(guitarra)} className="btn btn-sm me-2 btn-action-edit">
                                    Edit
                                </button>
                                <button onClick={() => onEliminar(guitarra.id)} className="btn btn-sm btn-action-delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FLOTANTE (FORMULARIO ADD / EDIT COHERENTE CON BOOTSTRAP) --- */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '500px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title fw-bold text-uppercase" style={{ color: '#e99401' }}>
                                    {editingGuitar ? 'Edit Guitar' : 'Add New Guitar'}
                                </h4>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label small text-secondary text-uppercase fw-semibold">Guitar Name</label>
                                        <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <label className="form-label small text-secondary text-uppercase fw-semibold">Price (USD)</label>
                                            <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                                        </div>
                                        <div className="col">
                                            <label className="form-label small text-secondary text-uppercase fw-semibold">Stock</label>
                                            <input type="number" className="form-control" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-secondary text-uppercase fw-semibold">Image File Name</label>
                                        <input type="text" className="form-control" placeholder="e.g. guitarra_01" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                                    </div>
                                    <div className="mb-1">
                                        <label className="form-label small text-secondary text-uppercase fw-semibold">Description</label>
                                        <textarea className="form-control" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-sm btn-outline-secondary px-3">Cancel</button>
                                    <button type="submit" className="btn btn-sm fw-semibold px-4 btn-premium-center-submit">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}