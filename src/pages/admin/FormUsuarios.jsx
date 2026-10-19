// src/pages/admin/FormUsuarios.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
// Importamos la función para crear usuarios[cite: 5]
import { crearUsuario } from '../../data/database';

const FormUsuarios = () => {
    const navigate = useNavigate();

    // ESTADOS DEL FORMULARIO[cite: 5]
    const [run, setRun] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [region, setRegion] = useState('');
    const [rol, setRol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones básicas antes de enviar
        if (!run || !nombre || !correo || !region || !rol) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const nuevoUsuario = {
            id: run, // Usamos el RUN como ID único
            nombre: nombre,
            correo: correo,
            region: region,
            rol: rol
        };

        // Guardar en la base de datos simulada[cite: 5]
        crearUsuario(nuevoUsuario);

        alert("Usuario creado exitosamente.");
        navigate('/admin/usuarios');
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <SidebarAdmin />
                <main className="col-md-10 p-4 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Nuevo Usuario</h1>
                        <Link to="/admin/usuarios" className="btn btn-secondary">Volver al Listado</Link>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">RUN (Sin puntos ni guion)</label>
                                        <input 
                                            type="text" className="form-control" 
                                            value={run} onChange={(e) => setRun(e.target.value)} required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nombre Completo</label>
                                        <input 
                                            type="text" className="form-control" 
                                            value={nombre} onChange={(e) => setNombre(e.target.value)} required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Correo Electrónico</label>
                                        <input 
                                            type="email" className="form-control" 
                                            value={correo} onChange={(e) => setCorreo(e.target.value)} required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Perfil de Usuario</label>
                                        <select 
                                            className="form-select" 
                                            value={rol} onChange={(e) => setRol(e.target.value)} required
                                        >
                                            <option value="" disabled>Seleccione un perfil...</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Cliente">Cliente</option>
                                            <option value="Vendedor">Vendedor</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Región</label>
                                        <select 
                                            className="form-select" 
                                            value={region} onChange={(e) => setRegion(e.target.value)} required
                                        >
                                            <option value="" disabled>Seleccione región...</option>
                                            <option value="Metropolitana">Metropolitana</option>
                                            <option value="Valparaíso">Valparaíso</option>
                                            <option value="Biobío">Biobío</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                                    <button type="submit" className="btn btn-primary">Guardar Usuario</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FormUsuarios;