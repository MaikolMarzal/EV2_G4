const CLAVE = "usuarios";

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista));
}

// READ
export function obtenerUsuarios() {
  return leer();
}

export function obtenerUsuarioPorCorreo(correo) {
  return leer().find((u) => u.correo.toLowerCase() === correo.toLowerCase());
}

// CREATE
export function crearUsuario({ nombre, apellidos, correo, password, rol = "cliente" }) {
  if (obtenerUsuarioPorCorreo(correo)) {
    throw new Error("Ese correo ya está registrado");
  }
  const usuario = { id: Date.now(), nombre, apellidos, correo, password, rol };
  guardar([...leer(), usuario]);
  return usuario;
}

// UPDATE
export function actualizarUsuario(id, cambios) {
  const lista = leer().map((u) => (u.id === id ? { ...u, ...cambios } : u));
  guardar(lista);
  return lista.find((u) => u.id === id);
}

// DELETE
export function eliminarUsuario(id) {
  guardar(leer().filter((u) => u.id !== id));
}