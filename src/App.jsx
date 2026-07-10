import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import InventoryTable from "./components/InventoryTable";
import OrdersTable from "./components/OrdersTable";
import TicketsTable from "./components/TicketsTable";

function App() {
  const [guitarras, setGuitarras] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('dashboard');

  // --- OBTENER TODOS LOS DATOS DESDE SUPABASE ---
  const cargarDatosCompletos = async () => {
    setLoading(true);
    try {
      // Cargamos el catálogo de guitarras
      const { data: dataGuitarras, error: errGuitarras } = await supabase
        .from('guitarras')
        .select('*')
        .order('id', { ascending: true });
      if (errGuitarras) throw errGuitarras;
      setGuitarras(dataGuitarras);

      // Cargamos el historial de órdenes
      const { data: dataOrdenes, error: errOrdenes } = await supabase
        .from('ordenes')
        .select('*')
        .order('id', { ascending: false });
      if (errOrdenes) throw errOrdenes;
      setOrdenes(dataOrdenes);

      // Cargamos los tickets de soporte abiertos
      const { data: dataTickets, error: errTickets } = await supabase
        .from('tickets')
        .select('*')
        .order('id', { ascending: false });
      if (errTickets) throw errTickets;
      setTickets(dataTickets);

    } catch (error) {
      console.error("Error al cargar datos desde Supabase:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosCompletos();
  }, []);


  // ==========================================
  //  MODULO: INVENTARIO (GUITARRAS)
  // ==========================================
  const eliminarGuitarra = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta guitarra?");
    if (!confirmar) return;

    try {
      const { error } = await supabase.from('guitarras').delete().eq('id', id);
      if (error) throw error;
      setGuitarras(guitarras.filter(g => g.id !== id));
    } catch (error) {
      console.error("Error al eliminar guitarra:", error.message);
    }
  };

  const guardarGuitarra = async (guitarraData) => {
    try {
      if (guitarraData.id) {
        const { error } = await supabase
          .from('guitarras')
          .update({
            name: guitarraData.name,
            price: Number(guitarraData.price),
            stock: Number(guitarraData.stock),
            description: guitarraData.description,
            image: guitarraData.image
          })
          .eq('id', guitarraData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('guitarras')
          .insert([{
            name: guitarraData.name,
            price: Number(guitarraData.price),
            stock: Number(guitarraData.stock),
            description: guitarraData.description,
            image: guitarraData.image || 'guitarra_01'
          }]);
        if (error) throw error;
      }
      await cargarDatosCompletos();
    } catch (error) {
      console.error("Error al guardar guitarra:", error.message);
    }
  };


  // ==========================================
  //  MODULO: ÓRDENES DE COMPRA
  // ==========================================
  const cambiarEstadoOrden = async (id, nuevoEstado) => {
    try {
      const { error } = await supabase
        .from('ordenes')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) throw error;
      
      // Actualizamos estado en memoria de forma limpia
      setOrdenes(ordenes.map(o => o.id === id ? { ...o, estado: nuevoEstado } : o));
    } catch (error) {
      console.error("Error al actualizar orden:", error.message);
    }
  };


  // ==========================================
  //  MODULO: TICKETS DE SOPORTE
  // ==========================================
  const resolverTicket = async (id) => {
    const confirmar = window.confirm("¿Deseas dar por resuelto y cerrar este ticket?");
    if (!confirmar) return;

    try {
      // Lo eliminamos o cambiamos su estado a 'Cerrado' en Supabase.
      // En este caso lo borramos para limpiar la cola de trabajo visual.
      const { error } = await supabase.from('tickets').delete().eq('id', id);
      if (error) throw error;

      setTickets(tickets.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error al cerrar el ticket:", error.message);
    }
  };


  return (
    <div className="w-100 min-vh-100 d-flex" style={{ backgroundColor: '#121212', color: '#ffffff' }}>
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-grow-1 p-5" style={{ marginLeft: '280px' }}>
        
        {/* --- CARGANDO GLOBAL --- */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100 py-5">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        ) : (
          <>
            {/* VISTA 1: INICIO / METRICAS */}
            {view === 'dashboard' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-50" style={{ fontSize: '0.8rem' }}>Overview</span>
                  <h1 className="fw-bold text-uppercase m-0" style={{ fontSize: '2.2rem' }}>Performance Metrics</h1>
                </header>
                <StatsCards guitarras={guitarras} />
                <div className="p-4 rounded-4 mt-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2d2d2d' }}>
                  <h5 className="fw-bold text-uppercase mb-2" style={{ fontSize: '1rem', color: '#e99401' }}>System Status</h5>
                  <p className="text-secondary small m-0">Conexión establecida correctamente con PostgreSQL. Gestionando logs de órdenes y soporte.</p>
                </div>
              </>
            )}

            {/* VISTA 2: INVENTARIO DE GUITARRAS */}
            {view === 'inventory' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-50" style={{ fontSize: '0.8rem' }}>Management</span>
                  <h1 className="fw-bold text-uppercase m-0" style={{ fontSize: '2.2rem' }}>Product Inventory</h1>
                </header>
                <InventoryTable 
                  guitarras={guitarras} 
                  onEliminar={eliminarGuitarra} 
                  onGuardar={guardarGuitarra}
                />
              </>
            )}

            {/* VISTA 3: ÓRDENES DE COMPRA */}
            {view === 'orders' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-50" style={{ fontSize: '0.8rem' }}>Financials</span>
                  <h1 className="fw-bold text-uppercase m-0" style={{ fontSize: '2.2rem' }}>Sales Orders</h1>
                </header>
                <OrdersTable ordenes={ordenes} onCambiarEstado={cambiarEstadoOrden} />
              </>
            )}

            {/* VISTA 4: TICKETS DE SOPORTE */}
            {view === 'tickets' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-50" style={{ fontSize: '0.8rem' }}>Helpdesk</span>
                  <h1 className="fw-bold text-uppercase m-0" style={{ fontSize: '2.2rem' }}>Support Tickets</h1>
                </header>
                <TicketsTable tickets={tickets} onResolverTicket={resolverTicket} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;