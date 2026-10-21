import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { crearUsuario } from "../../data/Usuarios";
import Registro from "./Registro";

function montar() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Registro />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Registro", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  // Renderizado
  it("muestra todos los campos y el botón", () => {
    montar();
    expect(screen.getByLabelText("Nombre")).toBeTruthy();
    expect(screen.getByLabelText("Apellidos")).toBeTruthy();
    expect(screen.getByLabelText("Correo")).toBeTruthy();
    expect(screen.getByLabelText("Contraseña")).toBeTruthy();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Registrarme" })).toBeTruthy();
  });

  // Renderizado condicional
  it("no muestra errores al inicio", () => {
    montar();
    expect(screen.queryByText("El nombre es obligatorio")).toBeNull();
  });

  // Estado
  it("actualiza el valor del input al escribir", () => {
    montar();
    const input = screen.getByLabelText("Nombre");
    fireEvent.change(input, { target: { name: "nombre", value: "Maikol" } });
    expect(input.value).toBe("Maikol");
  });

  // Eventos
  it("muestra errores al enviar el formulario vacío", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Registrarme" }));
    expect(screen.getByText("El nombre es obligatorio")).toBeTruthy();
    expect(screen.getByText("Correo no válido")).toBeTruthy();
    expect(screen.getByText("Mínimo 6 caracteres")).toBeTruthy();
  });

  it("avisa si las contraseñas no coinciden", () => {
    montar();
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { name: "password", value: "123456" } });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), { target: { name: "confirmar", value: "abcdef" } });
    fireEvent.click(screen.getByRole("button", { name: "Registrarme" }));
    expect(screen.getByText("Las contraseñas no coinciden")).toBeTruthy();
  });

  it("muestra error si el correo ya está registrado", () => {
    crearUsuario({ nombre: "Ana", apellidos: "Pérez", correo: "ana@mail.com", password: "123456" });
    montar();
    const llenar = (label, name, value) =>
      fireEvent.change(screen.getByLabelText(label), { target: { name, value } });
    llenar("Nombre", "nombre", "Ana");
    llenar("Apellidos", "apellidos", "Pérez");
    llenar("Correo", "correo", "ana@mail.com");
    llenar("Contraseña", "password", "123456");
    llenar("Confirmar contraseña", "confirmar", "123456");
    fireEvent.click(screen.getByRole("button", { name: "Registrarme" }));
    expect(screen.getByText("Ese correo ya está registrado")).toBeTruthy();
  });
});