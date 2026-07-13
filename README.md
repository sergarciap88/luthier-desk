# 🎸 Luthier Desk - Dashboard de Gestión Operativa

**Luthier Desk** es un panel de administración interactivo desarrollado en **React** y **Vite** para talleres de luthiería. La aplicación optimiza la gestión diaria permitiendo controlar inventarios, dar seguimiento a órdenes de servicio, emitir tickets de asistencia y visualizar estadísticas de rendimiento técnico desde una interfaz centralizada y segura.

---

## 🚀 Estructura del Proyecto e Interfaz

La aplicación está construida de forma modular basándose en los siguientes componentes principales:

*   **🔑 Control de Acceso (`Login.jsx`):** Vista inicial que gestiona la autenticación y el ingreso seguro de los administradores o técnicos del taller.
*   **📊 Panel Principal de Métricas (`StatsCards.jsx`):** Mapeo de indicadores clave de rendimiento (KPIs), tales como volumen de ingresos, servicios activos y estados de entrega rápida.
*   **📋 Control de Inventario (`InventoryTable.jsx`):** Tabla interactiva para administrar existencias de insumos, herramientas y guitarras en stock.
*   **🛠️ Gestión de Reparaciones (`OrdersTable.jsx`):** Trazabilidad y seguimiento del flujo de las órdenes de trabajo activas de los clientes.
*   **🎫 Emisión de Soporte (`TicketsTable.jsx`):** Organización y atención de tickets asociados a solicitudes específicas, consultas o garantías.
*   **🧭 Navegación Fluida (`Sidebar.jsx`):** Barra lateral de navegación que conecta dinámicamente las diferentes secciones del sistema de manera intuitiva.

---

## 🛠️ Tecnologías Utilizadas

*   **Frontend:** React (componentes `.jsx`), HTML5, CSS3 / Tailwind CSS (estilos globales en `index.css` y de la app en `App.css`).
*   **Herramienta de Construcción (Bundler):** Vite (configurado en `vite.config.js`).
*   **Entorno de Configuración:** Variables de entorno seguras gestionadas a través de `.env.local` (para endpoints de API o integraciones).
*   **Calidad de Código (Linter):** Oxlint (reglas definidas en `.oxlintrc.json`).
*   **Control de Versiones:** Git & GitHub.

---

## 📦 Instalación y Configuración Local

Sigue estos pasos para levantar el entorno de desarrollo en tu computadora:

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/sergarciap88/luthier-desk.git](https://github.com/sergarciap88/luthier-desk.git)
