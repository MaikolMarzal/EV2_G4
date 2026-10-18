// Datos iniciales de prueba
export const productosIniciales = [
    {id: 1, nombre: "Teclado Gamer RGB", precio: 45990, categoria: "Periféricos", stock: 10},
    {id: 2, nombre: "Mouse Inálambrico", precio: 29990, categoria: "Periféricos", stock: 15}
];

//CRUD
export const obtenerProductos = () => {
    const data = localStorage.getItem('productos');
    return data ? JSON.parse(data) : productosIniciales;
};

export const guardarProducto = (nuevoProducto) => {
    const productos = obtenerProductos();
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
};