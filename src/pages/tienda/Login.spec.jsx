import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { crearUsuario } from "../../data/Usuarios";
import Login from "./Login";

function montar() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Login", () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it("muestra los campos y el botón", () => {
    montar();
    expect(screen.getByLabelText("Correo")).toBeTruthy();
    expect(screen.getByLabelText("Contraseña")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeTruthy();
  });

  it("no muestra error al inicio", () => {
    montar();
    expect(screen.queryByText("Completa correo y contraseña")).toBeNull();
  });

  it("muestra error si se envía vacío", () => {
    montar();
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(screen.getByText("Completa correo y contraseña")).toBeTruthy();
  });

  it("muestra error con credenciales incorrectas", () => {
    montar();
    fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "x@mail.com" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "000000" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(screen.getByText("Correo o contraseña incorrectos")).toBeTruthy();
  });

  it("guarda la sesión con credenciales correctas", () => {
    crearUsuario({ nombre: "Ana", apellidos: "Pérez", correo: "ana@mail.com", password: "123456" });
    montar();
    fireEvent.change(screen.getByLabelText("Correo"), { target: { value: "ana@mail.com" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "123456" } });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(localStorage.getItem("sesion")).not.toBeNull();
  });
});