import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "./Usuarios";

describe("CRUD de usuarios", () => {
  const datos = { nombre: "Ana", apellidos: "Pérez", correo: "ana@mail.com", password: "123456" };

  beforeEach(() => localStorage.clear());

  it("crea un usuario y lo guarda", () => {
    crearUsuario(datos);
    expect(obtenerUsuarios().length).toBe(1);
  });

  it("no permite correos repetidos", () => {
    crearUsuario(datos);
    expect(() => crearUsuario(datos)).toThrowError("Ese correo ya está registrado");
  });

  it("actualiza un usuario", () => {
    const u = crearUsuario(datos);
    actualizarUsuario(u.id, { nombre: "Laura" });
    expect(obtenerUsuarios()[0].nombre).toBe("Laura");
  });

  it("elimina un usuario", () => {
    const u = crearUsuario(datos);
    eliminarUsuario(u.id);
    expect(obtenerUsuarios().length).toBe(0);
  });
});