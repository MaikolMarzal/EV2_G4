import React from 'react';
import { Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
// Importamos el hook del nuevo contexto compartido en lugar de la base de datos estática
import { useProductos } from '../../context/ProductosContext';

const AdminProductos = () => {
    // Extraemos la lista global y la función de eliminar desde el Contexto
    const { productos, eliminarProducto } = useProductos();

    // Mantenemos tu validación visual antes de ejecutar la eliminación del contexto
    const confirmarEliminacion = (codigo) => {
        if(window.confirm("¿Estás seguro de que deseas eliminar este producto del inventario?")) {
            eliminarProducto(codigo);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                
                {/* Reutilizamos el menú lateral */}
                <SidebarAdmin />

                {/* CONTENIDO PRINCIPAL */}
                <main className="col-md-10 p-4 bg-light">
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Inventario de Productos</h1>
                        <Link to="/admin/productos/nuevo" className="btn btn-primary">+ Nuevo Producto</Link>
                    </div>

                    <div className="card shadow-sm">
                        <div class="card-body">
                            
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
                                        {/* Renderizado dinámico de productos desde el estado global */}
                                        {productos.map((producto) => (
                                            <tr key={producto.codigo}>
                                                <td>{producto.codigo}</td>
                                                <td>
                                                    <img src={producto.imagen} alt={producto.nombre} className="img-thumbnail" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                                                </td>
                                                <td>{producto.nombre}</td>
                                                <td>{producto.categoria}</td>
                                                <td>${producto.precio.toLocaleString('es-CL')}</td>
                                                <td>
                                                    <Link to={`/admin/productos/editar/${producto.codigo}`} className="btn btn-sm btn-outline-secondary me-2">
                                                        Editar
                                                    </Link>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger" 
                                                        // Llamamos a la función con confirmación
                                                        onClick={() => confirmarEliminacion(producto.codigo)}
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