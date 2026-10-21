import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import SidebarAdmin from '../../components/SidebarAdmin';
// Importamos el contexto global
import { useProductos } from '../../context/ProductosContext';

const FormProductos = () => {
    const { productos, guardarProducto } = useProductos();
    const navigate = useNavigate();
    const { id } = useParams(); // Si hay ID en la URL, significa que estamos EDITANDO

    // Estados del formulario
    const [producto, setProducto] = useState({
        codigo: '',
        nombre: '',
        categoria: '',
        precio: '',
        imagen: 'https://via.placeholder.com/300x200?text=Nuevo+Producto', // Imagen por defecto
        descripcion: ''
    });

    // Si estamos editando, cargamos los datos del producto existente
    useEffect(() => {
        if (id) {
            const productoAEditar = productos.find(p => p.codigo === id);
            if (productoAEditar) {
                setProducto(productoAEditar);
            }
        }
    }, [id, productos]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    };

    // Guardar el producto
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convertimos el precio a número
        const productoGuardar = {
            ...producto,
            precio: Number(producto.precio)
        };

        // Si es nuevo (no hay ID en la URL), le asignamos el código ingresado. 
        // Si ya existía, mantiene su código.
        guardarProducto(productoGuardar);
        
        // Redirigimos de vuelta a la tabla
        navigate('/admin/productos');
    };

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <SidebarAdmin />

                <main className="col-md-10 p-4 bg-light">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>{id ? 'Editar Producto' : 'Nuevo Producto'}</h1>
                        <Link to="/admin/productos" className="btn btn-secondary">Volver al Inventario</Link>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Código del Producto</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="codigo"
                                            value={producto.codigo} 
                                            onChange={handleChange}
                                            disabled={id ? true : false} // No se puede editar el código si ya existe
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label">Nombre del Producto</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="nombre"
                                            value={producto.nombre} 
                                            onChange={handleChange}
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Categoría</label>
                                        <select 
                                            className="form-select" 
                                            name="categoria"
                                            value={producto.categoria} 
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="Consolas">Consolas</option>
                                            <option value="Accesorios">Accesorios</option>
                                            <option value="Sillas Gamers">Sillas Gamers</option>
                                            <option value="Componentes">Componentes</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Precio ($)</label>
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            name="precio"
                                            value={producto.precio} 
                                            onChange={handleChange}
                                            min="1"
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">URL de la Imagen</label>
                                        <input 
                                            type="url" 
                                            className="form-control" 
                                            name="imagen"
                                            value={producto.imagen} 
                                            onChange={handleChange}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="text-end mt-3">
                                    <button type="submit" className="btn btn-primary px-5">
                                        {id ? 'Actualizar Producto' : 'Guardar Producto'}
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