import { createContext, useContext, useState } from "react";
import {
  crearUsuario,
  obtenerUsuarioPorCorreo,
  obtenerUsuarios,
} from "../data/Usuarios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const id = Number(localStorage.getItem("sesion"));
    return obtenerUsuarios().find((u) => u.id === id) || null;
  });

  const registrar = (datos) => crearUsuario(datos); // lanza error si el correo existe

  const login = (correo, password) => {
    const encontrado = obtenerUsuarioPorCorreo(correo);
    if (!encontrado || encontrado.password !== password) {
      throw new Error("Correo o contraseña incorrectos");
    }
    localStorage.setItem("sesion", encontrado.id);
    setUsuario(encontrado);
    return encontrado;
  };

  const logout = () => {
    localStorage.removeItem("sesion");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, registrar, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}