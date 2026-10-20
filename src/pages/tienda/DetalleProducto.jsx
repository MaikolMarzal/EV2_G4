import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { obtenerProductoPorCodigo, formatearPrecio } from '../../data/productos';

export default function DetalleProducto() {
  const { codigo } = useParams();
  const producto = obtenerProductoPorCodigo(codigo);
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  if (!producto) {
    return (
      <section className="container py-5">
        <h1>Producto no encontrado</h1>
        <Link to="/productos" className="btn btn-lu mt-3">Volver a productos</Link>
      </section>
    );
  }

  const manejarAgregar = () => {
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <section className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active text-secundario" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded w-100" />
        </div>

        <div className="col-12 col-md-6">
          <small className="text-secundario">{producto.categoria} · Código {producto.codigo}</small>
          <h1 className="h2 mt-1">{producto.nombre}</h1>
          <p className="precio fs-3">{formatearPrecio(producto.precio)}</p>
          <p className="text-secundario">{producto.descripcion}</p>

          <label htmlFor="cantidad" className="form-label">Cantidad</label>
          <select
            id="cantidad"
            className="form-select w-auto mb-3"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

          <button className="btn btn-lu btn-lg" onClick={manejarAgregar}>
            Añadir al carrito
          </button>
          {agregado && <p className="precio mt-3">✔ Producto añadido al carrito</p>}
        </div>
      </div>
    </section>
  );
}