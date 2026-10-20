import { useState } from 'react';
import ProductoCard from '../../components/tienda/ProductoCard';
import { obtenerProductos, obtenerCategorias } from '../../data/productos';

export default function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  const filtrados = obtenerProductos().filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoria === '' || p.categoria === categoria)
  );

  return (
    <section className="container py-5">
      <h1 className="mb-4">Productos</h1>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <label htmlFor="busqueda" className="form-label">Buscar</label>
          <input
            id="busqueda"
            type="search"
            className="form-control"
            placeholder="Ej: mouse, silla, consola..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            id="categoria"
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas</option>
            {obtenerCategorias().map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-secundario">No se encontraron productos con esos filtros.</p>
      ) : (
        <div className="row g-4">
          {filtrados.map((p) => (
            <div className="col-12 col-sm-6 col-lg-3" key={p.codigo}>
              <ProductoCard producto={p} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}