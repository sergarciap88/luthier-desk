import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Sidebar from "./components/Sidebar";
import StatsCards from "./components/StatsCards";
import InventoryTable from "./components/InventoryTable";
import OrdersTable from "./components/OrdersTable";
import TicketsTable from "./components/TicketsTable";
import Login from "./components/Login";

// Importamos los estilos globales unificados
import "./index.css";

function App() {
  const [session, setSession] = useState(null);
  const [guitarras, setGuitarras] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('dashboard');

  // --- OBTENER TODOS LOS DATOS DESDE SUPABASE ---
  const cargarDatosCompletos = async () => {
    setLoading(true);
    try {
      const { data: dataGuitarras, error: errGuitarras } = await supabase
        .from('guitarras')
        .select('*')
        .order('id', { ascending: true });
      if (errGuitarras) throw errGuitarras;
      setGuitarras(dataGuitarras);

      const { data: dataOrdenes, error: errOrdenes } = await supabase
        .from('ordenes')
        .select('*')
        .order('id', { ascending: false });
      if (errOrdenes) throw errOrdenes;
      setOrdenes(dataOrdenes);

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

  // --- CONTROL DE SESIÓN ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) cargarDatosCompletos();
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession) {
        cargarDatosCompletos();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // ==========================================
  //  MÓDULOS DE MUTACIÓN (Inventario, Órdenes, Tickets)
  // ==========================================
  const eliminarGuitarra = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar esta guitarra?");
    if (!confirmar) return;
    try {
      const { error } = await supabase.from('guitarras').delete().eq('id', id);
      if (error) throw error;
      setGuitarras(guitarras.filter(g => g.id !== id));
    } catch (error) {
      console.error(error.message);
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
      console.error(error.message);
    }
  };

  const cambiarEstadoOrden = async (id, nuevoEstado) => {
    try {
      const { error } = await supabase.from('ordenes').update({ estado: nuevoEstado }).eq('id', id);
      if (error) throw error;
      setOrdenes(ordenes.map(o => o.id === id ? { ...o, estado: nuevoEstado } : o));
    } catch (error) {
      console.error(error.message);
    }
  };

  const resolverTicket = async (id) => {
    const confirmar = window.confirm("¿Deseas dar por resuelto este ticket?");
    if (!confirmar) return;
    try {
      const { error } = await supabase.from('tickets').delete().eq('id', id);
      if (error) throw error;
      setTickets(tickets.filter(t => t.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // --- RENDER CONDICIONAL SI NO HAY SESIÓN ---
  if (!session) {
    return <Login onLoginSuccess={(nuevaSesion) => setSession(nuevaSesion)} />;
  }

  // --- RENDER DEL PANEL DE ADMINISTRACIÓN ---
  return (
    <div className="app-admin-container">

      {/* BARRA LATERAL */}
      <Sidebar currentView={view} setView={setView} onLogout={cerrarSesion} />

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1 p-5" style={{ marginLeft: '280px' }}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center h-100 py-5">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase tracking-widest fw-bold opacity-50" style={{ fontSize: '0.7rem', color: '#e99401' }}>Overview</span>
                  <h1 className="fw-bold tracking-tight m-0 mt-1" style={{ fontSize: '2.4rem', letterSpacing: '-1px' }}>Performance Metrics</h1>
                </header>

                <StatsCards guitarras={guitarras} />

                {/* Caja de Estado Remodelada (Estilos controlados por index.css) */}
                <div className="p-4 rounded-4 mt-4 glass-status-panel">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#e99401', borderRadius: '50%' }}></div>
                    <h5 className="fw-bold text-uppercase m-0 tracking-wider" style={{ fontSize: '0.8rem', color: '#e99401' }}>System Status</h5>
                  </div>
                  <p className="text-light opacity-50 small m-0">Conexión cifrada activa con el servicio de autenticación Supabase Auth.</p>
                </div>
              </>
            )}

            {view === 'inventory' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase tracking-widest fw-bold opacity-50" style={{ fontSize: '0.7rem', color: '#e99401' }}>Management</span>
                  <h1 className="fw-bold tracking-tight m-0 mt-1" style={{ fontSize: '2.4rem', letterSpacing: '-1px' }}>Product Inventory</h1>
                </header>
                <InventoryTable guitarras={guitarras} onEliminar={eliminarGuitarra} onGuardar={guardarGuitarra} />
              </>
            )}

            {view === 'orders' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase tracking-widest fw-bold opacity-50" style={{ fontSize: '0.7rem', color: '#e99401' }}>Financials</span>
                  <h1 className="fw-bold tracking-tight m-0 mt-1" style={{ fontSize: '2.4rem', letterSpacing: '-1px' }}>Sales Orders</h1>
                </header>
                <OrdersTable ordenes={ordenes} onCambiarEstado={cambiarEstadoOrden} />
              </>
            )}

            {view === 'tickets' && (
              <>
                <header className="mb-5">
                  <span className="text-uppercase tracking-widest fw-bold opacity-50" style={{ fontSize: '0.7rem', color: '#e99401' }}>Helpdesk</span>
                  <h1 className="fw-bold tracking-tight m-0 mt-1" style={{ fontSize: '2.4rem', letterSpacing: '-1px' }}>Support Tickets</h1>
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