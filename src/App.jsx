// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

// ==========================================
// 1. IMPORTACIÓN DE CONTEXTOS Y VISTAS
// ==========================================
// ---> NUEVO: Importamos useAuth para proteger las rutas
import { useAuth } from './context/AuthContext';

// -> Layout y Vistas de la Tienda
import TiendaLayout from './components/tienda/TiendaLayout.jsx';
import Home from './pages/tienda/Home';
import Productos from './pages/tienda/Productos';
import DetalleProducto from './pages/tienda/DetalleProducto';
import Carrito from './pages/tienda/Carrito';

import Blog from "./pages/tienda/Blog";
import DetalleBlog from "./pages/tienda/DetallesBlog";
import Login from "./pages/tienda/Login";
import Registro from "./pages/tienda/Registro";

// -> Vistas Privadas (Administrador)
import Dashboard from './pages/admin/Dashboard';
import AdminProductos from './pages/admin/AdminProductos';
import FormProductos from './pages/admin/FormProductos';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import FormUsuarios from './pages/admin/FormUsuarios';

// ==========================================
// 2. FUNCIÓN DE SEGURIDAD (RUTA PROTEGIDA)
// ==========================================
const RutaProtegida = ({ children }) => {
  // ---> NUEVO: Leemos directamente a tu usuario desde el contexto
  const { usuario } = useAuth();
  
  // Si no hay usuario o su rol no es "Administrador", lo expulsamos al Home
  if (usuario?.rol !== 'Administrador') {
    return <Navigate to="/" />;
  }
  
  return children;
};

// ==========================================
// 3. COMPONENTE PRINCIPAL (APP)
// ==========================================
function App() {
  return (
    <Router>
      <Routes>
        
        {/* -----------------------------------------
            ZONA PÚBLICA (Tienda con Layout: Navbar + Footer)
            ----------------------------------------- */}
        <Route element={<TiendaLayout />}>
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:codigo" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Route>

        {/* -----------------------------------------
            ZONA PRIVADA (Solo para Administrador)
            ----------------------------------------- */}
        <Route path="/admin" element={ <RutaProtegida><Dashboard /></RutaProtegida> } />
        <Route path="/admin/productos" element={ <RutaProtegida><AdminProductos /></RutaProtegida> } />
        <Route path="/admin/productos/nuevo" element={ <RutaProtegida><FormProductos /></RutaProtegida> } />
        <Route path="/admin/productos/editar/:id" element={ <RutaProtegida><FormProductos /></RutaProtegida> } />

        <Route path="/admin/usuarios" element={ <RutaProtegida><AdminUsuarios /></RutaProtegida> } />
        <Route path="/admin/usuarios/nuevo" element={ <RutaProtegida><FormUsuarios /></RutaProtegida> } />
        <Route path="/admin/usuarios/editar/:id" element={ <RutaProtegida><FormUsuarios /></RutaProtegida> } />

        {/* -----------------------------------------
            RUTA DE ERROR (404)
            ----------------------------------------- */}
        <Route path="*" element={
          <div className="container mt-5 text-center text-white">
            <h2 className="text-danger">Error 404</h2>
            <p>La página que buscas no existe en Level-Up Gamer.</p>
          </div>
        } />

      </Routes>
    </Router>
  );
}

export default App;