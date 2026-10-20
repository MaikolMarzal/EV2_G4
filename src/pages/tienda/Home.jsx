import { Link } from 'react-router-dom';
import ProductoCard from '../../components/tienda/ProductoCard';
import { obtenerProductos } from '../../data/productos';

export default function Home() {
  const destacados = obtenerProductos().slice(0, 8);

  return (
    <>
      <header className="hero py-5 text-center">
        <div className="container py-4">
          <h1 className="display-5">Desafía tus límites con Level-Up Gamer</h1>
          <p className="lead text-secundario">
            Consolas, accesorios, computadores y más, con despacho a todo Chile.
          </p>
          <Link to="/productos" className="btn btn-lu btn-lg">Ver productos</Link>
        </div>
      </header>

      <section className="container py-5">
        <h2 className="mb-4">Productos destacados</h2>
        <div className="row g-4">
          {destacados.map((p) => (
            <div className="col-12 col-sm-6 col-lg-3" key={p.codigo}>
              <ProductoCard producto={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}