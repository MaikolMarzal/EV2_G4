// src/data/database.js

// 1. DATOS INICIALES SIMULADOS
let productosDB = [
    { codigo: "P001", imagen: "https://via.placeholder.com/50", nombre: "Silla Gamer Pro LevelUp", categoria: "Sillas Gamers", precio: 149990 },
    { codigo: "P002", imagen: "https://via.placeholder.com/50", nombre: "Mouse Logitech G Pro X", categoria: "Mouse", precio: 99990 }
];

let usuariosDB = [
    { id: 101, nombre: "Juan Pérez", correo: "juan.perez@duocuc.cl", region: "Metropolitana", rol: "Administrador" },
    { id: 102, nombre: "María Gómez", correo: "maria.gomez@gmail.com", region: "Valparaíso", rol: "Cliente" }
];

// 2. FUNCIONES CRUD (Crear, Leer, Actualizar, Eliminar)

// --- CRUD PRODUCTOS ---
export const getProductos = () => {
    return [...productosDB]; // Leer
};

export const crearProducto = (nuevoProducto) => {
    productosDB.push(nuevoProducto); // Crear
    return [...productosDB];
};

export const eliminarProductoDB = (codigo) => {
    productosDB = productosDB.filter(prod => prod.codigo !== codigo); // Eliminar
    return [...productosDB];
};

// --- CRUD USUARIOS ---
export const getUsuarios = () => {
    return [...usuariosDB]; // Leer
};

export const crearUsuario = (nuevoUsuario) => {
    usuariosDB.push(nuevoUsuario); // Crear
    return [...usuariosDB];
};

export const eliminarUsuarioDB = (id) => {
    usuariosDB = usuariosDB.filter(user => user.id !== id); // Eliminar
    return [...usuariosDB];
};