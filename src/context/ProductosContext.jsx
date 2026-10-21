// src/context/ProductosContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
// Importamos tu lista original de productos que ya tienes creada
import { getProductos } from "../data/database"; // O cámbialo a "../data/productos" según dónde tengan la lista

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);

  // 1. Cargar los productos compartidos
  useEffect(() => {
    // Revisamos si ya hay productos modificados guardados en el navegador
    const guardados = localStorage.getItem("productosGlobales");
    if (guardados) {
      setProductos(JSON.parse(guardados));
    } else {
      // Si es la primera vez, cargamos la lista original que tu compañero y tú crearon
      const iniciales = obtenerProductos(); 
      setProductos(iniciales);
      localStorage.setItem("productosGlobales", JSON.stringify(iniciales));
    }
  }, []);

  // 2. Función para que el Admin elimine productos
  const eliminarProducto = (codigo) => {
    const nuevaLista = productos.filter(p => p.codigo !== codigo);
    setProductos(nuevaLista);
    localStorage.setItem("productosGlobales", JSON.stringify(nuevaLista));
  };

  // 3. Función para que el Admin cree o edite productos
  const guardarProducto = (productoNuevo) => {
    const existe = productos.find(p => p.codigo === productoNuevo.codigo);
    let nuevaLista;
    if (existe) {
      // Si existe, lo actualiza (Editar)
      nuevaLista = productos.map(p => p.codigo === productoNuevo.codigo ? productoNuevo : p);
    } else {
      // Si no existe, lo agrega (Nuevo)
      nuevaLista = [...productos, productoNuevo];
    }
    setProductos(nuevaLista);
    localStorage.setItem("productosGlobales", JSON.stringify(nuevaLista));
  };

  return (
    <ProductosContext.Provider value={{ productos, eliminarProducto, guardarProducto }}>
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductos = () => useContext(ProductosContext);