import React, { useState } from 'react';
import ProductoCard from '../../components/tienda/ProductoCard';
// Importamos el contexto global en lugar de la base de datos estática
import { useProductos } from '../../context/ProductosContext';

export default function Productos() {
  // Extraemos la lista compartida de productos
  const { productos } = useProductos();
  
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  // Generamos las categorías dinámicamente basándonos en los productos que existen actualmente
  const categoriasDisponibles = [...new Set(productos.map(p => p.categoria))];

  // Filtramos utilizando la variable global 'productos'
  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoria === '' || p.categoria === categoria)
  );

  return (
    <section className="container py-5 min-vh-100">
      <h1 className="mb-4">Catálogo de Productos</h1>

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
            {/* Renderizamos las categorías que detectamos dinámicamente */}
            {categoriasDisponibles.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-muted text-center mt-5">No se encontraron productos con esos filtros.</p>
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