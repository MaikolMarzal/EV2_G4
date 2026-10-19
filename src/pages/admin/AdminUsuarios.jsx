// src/pages/admin/AdminUsuarios.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
// 1. Importamos las funciones CRUD de tu base de datos[cite: 5]
import { getUsuarios, eliminarUsuarioDB } from '../../data/database';

const AdminUsuarios = () => {
    // 2. Iniciamos el estado leyendo la BD simulada[cite: 5]
    const [usuarios, setUsuarios] = useState(getUsuarios());

    const eliminarUsuario = (id) => {
        if(window.confirm("¿Estás seguro de que deseas eliminar este usuario del sistema?")) {
            // 3. Eliminamos en la BD y actualizamos la vista[cite: 5]
            const nuevaLista = eliminarUsuarioDB(id);
            setUsuarios(nuevaLista);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <SidebarAdmin />
                <main className="col-md-10 p-4 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Gestión de Usuarios</h1>
                        <Link to="/admin/usuarios/nuevo" className="btn btn-success">+ Nuevo Usuario</Link>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID/RUN</th>
                                            <th>Nombre Completo</th>
                                            <th>Correo</th>
                                            <th>Región</th>
                                            <th>Perfil/Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.id}>
                                                <td>{usuario.id}</td>
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.correo}</td>
                                                <td>{usuario.region}</td>
                                                <td>
                                                    <span className={`badge ${usuario.rol === 'Administrador' ? 'bg-primary' : 'bg-info text-dark'}`}>
                                                        {usuario.rol}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link to={`/admin/usuarios/editar/${usuario.id}`} className="btn btn-sm btn-outline-secondary me-2">
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger" 
                                                        onClick={() => eliminarUsuario(usuario.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {usuarios.length === 0 && <p className="text-center mt-3 text-muted">No hay usuarios registrados.</p>}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminUsuarios;