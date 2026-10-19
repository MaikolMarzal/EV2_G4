// src/components/SidebarAdmin.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link de React Router para navegar sin recargar la página

const SidebarAdmin = () => {
    // Función para manejar el cierre de sesión simulado
    const handleCerrarSesion = () => {
        localStorage.removeItem("usuarioRol");
        window.location.href = "/"; // Redirige a la vista principal de la tienda
    };

    return (
        <nav className="col-md-2 bg-dark text-white p-3 d-flex flex-column">
            <h4 className="mb-4 text-center">Level-Up Admin</h4>
            <ul className="nav flex-column mb-auto">
                <li className="nav-item mb-2">
                    <Link to="/admin" className="nav-link text-white">
                        🏠 Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/productos" className="nav-link text-white">
                        📦 Productos
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/admin/usuarios" className="nav-link text-white">
                        👥 Usuarios
                    </Link>
                </li>
            </ul>
            
            <button 
                onClick={handleCerrarSesion} 
                className="btn btn-outline-danger mt-4"
            >
                Cerrar Sesión
            </button>
        </nav>
    );
};

export default SidebarAdmin;