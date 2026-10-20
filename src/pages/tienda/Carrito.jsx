import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { formatearPrecio } from '../../data/productos';

export default function Carrito() {
  const { items, cambiarCantidad, quitar, vaciar, total } = useCarrito();

  return (
    <section className="container py-5">
      <h1 className="mb-4">Mi carrito de compras</h1>

      {items.length === 0 ? (
        <>
          <p className="text-secundario">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-lu">Ver productos</Link>
        </>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.codigo}>
                    <td>
                      <img src={i.imagen} alt={i.nombre} width="60" className="me-2 rounded" />
                      {i.nombre}
                    </td>
                    <td>{formatearPrecio(i.precio)}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-outline-light btn-sm" onClick={() => cambiarCantidad(i.codigo, i.cantidad - 1)}>−</button>
                        <span>{i.cantidad}</span>
                        <button className="btn btn-outline-light btn-sm" onClick={() => cambiarCantidad(i.codigo, i.cantidad + 1)}>+</button>
                      </div>
                    </td>
                    <td>{formatearPrecio(i.precio * i.cantidad)}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => quitar(i.codigo)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="btn btn-outline-secondary" onClick={vaciar}>Vaciar carrito</button>
            <p className="fs-4 mb-0">Total: <span className="precio">{formatearPrecio(total)}</span></p>
          </div>
        </>
      )}
    </section>
  );
}