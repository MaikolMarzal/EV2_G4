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
    
    // ---> NUEVO: Si el ID guardado es 999, cargamos el Admin simulado
    if (id === 999) {
      return { id: 999, nombre: "Admin", rol: "Administrador" };
    }

    return obtenerUsuarios().find((u) => u.id === id) || null;
  });

  const registrar = (datos) => crearUsuario(datos); // lanza error si el correo existe

  const login = (correo, password) => {
    // ---> NUEVO: Bypass (Atajo) rápido para el Administrador
    if (correo === "admin@levelup.com" && password === "admin123") {
      const adminUser = { id: 999, nombre: "Admin", rol: "Administrador" };
      localStorage.setItem("sesion", "999");
      setUsuario(adminUser);
      return adminUser;
    }

    // Lógica original para los demás usuarios
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