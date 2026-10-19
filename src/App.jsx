// 1. IMPORTACIONES DE REACT Y ROUTER
import React from 'react';
// BrowserRouter, Routes y Route son las herramientas que nos permiten navegar sin recargar la página
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Mantenemos tu archivo de estilos global por si tienes algo ahí, aunque usaremos Bootstrap principalmente
import './App.css';

// ==========================================
// 2. IMPORTACIÓN DE VISTAS (PÁGINAS)
// ==========================================

// -> Vistas Públicas (Tienda)
// Aquí importamos la vista del catálogo que creamos antes
import CatalogoProductos from './pages/CatalogoProductos';
// import Contacto from './pages/Contacto'; // (Descomenta esto cuando crees el archivo Contacto.jsx)

// -> Vistas Privadas (Administrador)
import Dashboard from './pages/admin/Dashboard';
import AdminProductos from './pages/admin/AdminProductos';
import FormProductos from './pages/admin/FormProductos';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import FormUsuarios from './pages/admin/FormUsuarios';

// ==========================================
// 3. FUNCIÓN DE SEGURIDAD (RUTA PROTEGIDA)
// ==========================================
// Este pequeño componente envuelve las rutas del administrador.
// Verifica si el usuario guardado en localStorage tiene el rol de "Administrador".
const RutaProtegida = ({ children }) => {
  const rol = localStorage.getItem('usuarioRol');
  
  if (rol !== 'Administrador') {
    // Si alguien intenta entrar a /admin y no es administrador, lo expulsa al inicio "/"
    return <Navigate to="/" />;
  }
  
  // Si es administrador, lo deja ver el contenido (children)
  return children;
};

// ==========================================
// 4. COMPONENTE PRINCIPAL (APP)
// ==========================================
function App() {
  return (
    // <Router> envuelve toda la aplicación para habilitar la navegación
    <Router>
      {/* <Routes> es como un switch: busca qué ruta coincide con la URL actual y muestra ese componente */}
      <Routes>
        
        {/* -----------------------------------------
            ZONA PÚBLICA (Lo que ve cualquier cliente)
            ----------------------------------------- */}
        {/* Cuando el usuario entra a "localhost:5173/", ve el Catalogo de Productos */}
        <Route path="/" element={<CatalogoProductos />} />
        
        {/* ESPACIO PARA TU COMPAÑERO: Aquí él debe agregar sus rutas (Login, Registro, etc.) */}
        {/* Ejemplo: <Route path="/login" element={<Login />} /> */}


        {/* -----------------------------------------
            ZONA PRIVADA (Solo para el Administrador)
            ----------------------------------------- */}
        {/* Fíjate cómo envolvemos los componentes dentro de <RutaProtegida> */}
        
        {/* Panel principal del Administrador */}
        <Route path="/admin" element={ <RutaProtegida><Dashboard /></RutaProtegida> } />

        {/* Rutas para gestionar Productos */}
        <Route path="/admin/productos" element={ <RutaProtegida><AdminProductos /></RutaProtegida> } />
        <Route path="/admin/productos/nuevo" element={ <RutaProtegida><FormProductos /></RutaProtegida> } />
        {/* Esta ruta recibe un ":id" dinámico para saber qué producto editar */}
        <Route path="/admin/productos/editar/:id" element={ <RutaProtegida><FormProductos /></RutaProtegida> } />

        {/* Rutas para gestionar Usuarios */}
        <Route path="/admin/usuarios" element={ <RutaProtegida><AdminUsuarios /></RutaProtegida> } />
        <Route path="/admin/usuarios/nuevo" element={ <RutaProtegida><FormUsuarios /></RutaProtegida> } />
        {/* Esta ruta recibe un ":id" dinámico para saber qué usuario editar */}
        <Route path="/admin/usuarios/editar/:id" element={ <RutaProtegida><FormUsuarios /></RutaProtegida> } />

        {/* -----------------------------------------
            RUTA DE ERROR (404)
            ----------------------------------------- */}
        {/* El "*" significa "Cualquier otra URL que no exista en la lista de arriba" */}
        <Route path="*" element={
          <div className="container mt-5 text-center">
            <h2 className="text-danger">Error 404</h2>
            <p>La página que buscas no existe en Level-Up Gamer.</p>
          </div>
        } />

      </Routes>
    </Router>
  );
}

// Exportamos la App para que main.jsx pueda renderizarla en la pantalla
export default App;