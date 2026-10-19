import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
import { getProductos, eliminarProductoDB } from '../../data/database';

const AdminProductos = () => {
    const [productos, setProductos] = useState(getProductos());

    const eliminarProducto = (codigo) => {
        if(window.confirm("¿Estás seguro de que deseas eliminar este producto del inventario?")) {
            const nuevaLista = eliminarProductoDB(codigo);
            setProductos(nuevaLista);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                
                {/* Reutilizamos el menú lateral[cite: 4] */}
                <SidebarAdmin />

                {/* CONTENIDO PRINCIPAL */}
                <main className="col-md-10 p-4 bg-light">
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Inventario de Productos</h1>
                        <Link to="/admin/productos/nuevo" className="btn btn-primary">+ Nuevo Producto</Link>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Código</th>
                                            <th>Imagen</th>
                                            <th>Nombre del Producto</th>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Renderizado dinámico de productos[cite: 4] */}
                                        {productos.map((producto) => (
                                            <tr key={producto.codigo}>
                                                <td>{producto.codigo}</td>
                                                <td>
                                                    {/* En React, las etiquetas img deben cerrarse con /> */}
                                                    <img src={producto.imagen} alt={producto.nombre} className="img-thumbnail" />
                                                </td>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.categoria}</td>
                                                {/* Formateamos el precio para Chile */}
                                                <td>${producto.precio.toLocaleString('es-CL')}</td>
                                                <td>
                                                    <Link to={`/admin/productos/editar/${producto.codigo}`} className="btn btn-sm btn-outline-secondary me-2">
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger" 
                                                        onClick={() => eliminarProducto(producto.codigo)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {productos.length === 0 && <p className="text-center mt-3 text-muted">No hay productos en el inventario.</p>}
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProductos;