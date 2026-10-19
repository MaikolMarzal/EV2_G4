import React, { useState } from 'react';
// Usamos Link para el botón "Volver" y useNavigate para redirigir tras guardar
import { Link, useNavigate } from 'react-router-dom'; 
import SidebarAdmin from '../../components/SidebarAdmin';
// Importamos la función para guardar en nuestra base de datos simulada
import { crearProducto } from '../../data/database';

const FormProductos = () => {
    const navigate = useNavigate();

    // ESTADOS: Controlan lo que el usuario escribe en cada input[cite: 4]
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Validación básica (reemplaza las antiguas validaciones manuales de JS)
        if (!codigo || !nombre || !categoria || !precio) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // 2. Armamos el objeto del nuevo producto
        const nuevoProducto = {
            codigo: codigo,
            nombre: nombre,
            categoria: categoria,
            precio: Number(precio),
            // Si no suben imagen, ponemos una por defecto
            imagen: imagen || "https://via.placeholder.com/50" 
        };

        // 3. Guardamos usando la función CRUD de tu database.js
        crearProducto(nuevoProducto);

        // 4. Mostramos mensaje de éxito y redirigimos al listado
        alert("Producto guardado exitosamente en el inventario.");
        navigate('/admin/productos');
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                
                {/* Reutilizamos el menú lateral */}
                <SidebarAdmin />

                {/* CONTENIDO PRINCIPAL */}
                <main className="col-md-10 p-4 bg-light">
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Nuevo Producto</h1>
                        <Link to="/admin/productos" className="btn btn-secondary">
                            Volver al Inventario
                        </Link>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            
                            {/* FORMULARIO CONTROLADO POR REACT */}
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row">
                                    
                                    {/* CÓDIGO */}
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Código del Producto</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Ej: P005"
                                            value={codigo}
                                            onChange={(e) => setCodigo(e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    {/* NOMBRE */}
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Nombre del Producto</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Ej: Audífonos Gamer 7.1"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)} 
                                            required 
                                        />
                                    </div>

                                    {/* CATEGORÍA */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Categoría</label>
                                        <select 
                                            className="form-select" 
                                            value={categoria}
                                            onChange={(e) => setCategoria(e.target.value)} 
                                            required
                                        >
                                            <option value="" disabled>Seleccione una categoría...</option>
                                            <option value="Juegos de mesa">Juegos de mesa</option>
                                            <option value="Accesorios">Accesorios</option>
                                            <option value="Consolas">Consolas</option>
                                            <option value="Computadores gamers">Computadores gamers</option>
                                            <option value="Sillas gamers">Sillas gamers</option>
                                            <option value="Mouse">Mouse</option>
                                        </select>
                                    </div>

                                    {/* PRECIO */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Precio ($)</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            min="1" 
                                            value={precio}
                                            onChange={(e) => setPrecio(e.target.value)} 
                                            required 
                                        />
                                    </div>

                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Guardar Producto
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FormProductos;