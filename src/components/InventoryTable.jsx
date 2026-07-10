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
        <div className="table-responsive rounded-4 p-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-uppercase m-0" style={{ fontSize: '1.1rem', color: '#e99401' }}>
                    Live Stock Inventory
                </h5>
                <button onClick={handleAddClick} className="btn btn-sm fw-semibold px-3 py-2" style={{ backgroundColor: '#e99401', color: '#000000' }}>
                    + Add New Guitar
                </button>
            </div>

            <table className="table table-dark table-hover align-middle m-0">
                <thead>
                    <tr className="text-secondary border-bottom" style={{ borderColor: '#2d2d2d' }}>
                        <th className="py-3 px-3" style={{ width: '80px' }}>Image</th>
                        <th className="py-3">Guitar Name</th>
                        <th className="py-3">Price (USD)</th>
                        <th className="py-3">Stock Units</th>
                        <th className="py-3 text-end px-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {guitarras.map((guitarra) => (
                        <tr key={guitarra.id} className="border-bottom" style={{ borderColor: '#2d2d2d' }}>
                            <td className="py-3 px-3">
                                <img 
                                    // Corregimos la ruta: si tu base de datos ya tiene el .jpg no se añade, de lo contrario sí
                                    src={guitarra.image?.includes('.') ? `/img/${guitarra.image}` : `/img/${guitarra.image}.jpg`} 
                                    alt={guitarra.name} 
                                    className="rounded-3"
                                    style={{ width: '50px', height: '65px', objectFit: 'contain', backgroundColor: '#1a1a1a' }}
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = 'https://via.placeholder.com/50x65/222222/ffffff?text=🎸';
                                    }}
                                />
                            </td>
                            <td className="py-3 fw-semibold text-white">{guitarra.name}</td>
                            <td className="py-3 text-secondary">${guitarra.price}</td>
                            <td className="py-3">
                                <span className={`badge px-2.5 py-1.5 rounded-3 ${guitarra.stock > 0 ? 'bg-dark text-success border border-success' : 'bg-danger text-white'}`} style={{ fontSize: '0.85rem' }}>
                                    {guitarra.stock || 0} units
                                </span>
                            </td>
                            <td className="py-3 text-end px-3">
                                <button onClick={() => handleEditClick(guitarra)} className="btn btn-outline-light btn-sm me-2 fw-medium border-secondary text-secondary">
                                    Edit
                                </button>
                                <button onClick={() => onEliminar(guitarra.id)} className="btn btn-outline-danger btn-sm fw-medium border-danger opacity-75">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- MODAL FLOTANTE (FORMULARIO ADD / EDIT) --- */}
            {showModal && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
                    <div className="p-4 rounded-4 w-100" style={{ maxWidth: '500px', backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d', color: '#fff' }}>
                        <h4 className="fw-bold text-uppercase mb-4" style={{ color: '#e99401' }}>
                            {editingGuitar ? 'Edit Guitar' : 'Add New Guitar'}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small text-secondary text-uppercase fw-semibold">Guitar Name</label>
                                <input type="text" className="form-control bg-dark text-white border-secondary" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label small text-secondary text-uppercase fw-semibold">Price (USD)</label>
                                    <input type="number" className="form-control bg-dark text-white border-secondary" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                                </div>
                                <div className="col">
                                    <label className="form-label small text-secondary text-uppercase fw-semibold">Stock</label>
                                    <input type="number" className="form-control bg-dark text-white border-secondary" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small text-secondary text-uppercase fw-semibold">Image File Name</label>
                                <input type="text" className="form-control bg-dark text-white border-secondary" placeholder="e.g. guitarra_01" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small text-secondary text-uppercase fw-semibold">Description</label>
                                <textarea className="form-control bg-dark text-white border-secondary" rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                            </div>
                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-sm btn-outline-secondary px-3">Cancel</button>
                                <button type="submit" className="btn btn-sm fw-semibold px-4" style={{ backgroundColor: '#e99401', color: '#000000' }}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}