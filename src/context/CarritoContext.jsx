import { createContext, useContext, useEffect, useState } from 'react';

const CarritoContext = createContext(null);

export const useCarrito = () => useContext(CarritoContext);

const leerCarrito = () => {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    return [];
  }
};

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(leerCarrito);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const agregar = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.codigo === producto.codigo);
      if (existe) {
        return prev.map((i) =>
          i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [
        ...prev,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad,
        },
      ];
    });
  };

  const cambiarCantidad = (codigo, cantidad) => {
    if (cantidad < 1) return;
    setItems((prev) => prev.map((i) => (i.codigo === codigo ? { ...i, cantidad } : i)));
  };

  const quitar = (codigo) => setItems((prev) => prev.filter((i) => i.codigo !== codigo));
  const vaciar = () => setItems([]);

  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0);
  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, agregar, cambiarCantidad, quitar, vaciar, cantidadTotal, total }}
    >
      {children}
    </CarritoContext.Provider>
  );
}