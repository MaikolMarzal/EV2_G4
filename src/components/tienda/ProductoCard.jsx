import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { formatearPrecio } from '../../data/productos';

export default function ProductoCard({ producto }) {
  const { agregar } = useCarrito();

  return (
    <article className="card card-lu h-100">
      <Link to={`/producto/${producto.codigo}`}>
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      </Link>
      <div className="card-body d-flex flex-column">
        <small className="text-secundario">{producto.categoria}</small>
        <h5 className="card-title fs-6">{producto.nombre}</h5>
        <p className="precio">{formatearPrecio(producto.precio)}</p>
        <button className="btn btn-lu mt-auto" onClick={() => agregar(producto)}>
          Añadir
        </button>
      </div>
    </article>
  );
}