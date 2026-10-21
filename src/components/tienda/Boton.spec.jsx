import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Boton from "./Boton";

describe("Boton (props)", () => {
  afterEach(cleanup);

  it("muestra la etiqueta recibida por props", () => {
    render(<Boton etiqueta="Guardar" onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Guardar" })).toBeTruthy();
  });

  it("ejecuta la función onClick recibida por props", () => {
    const espia = jasmine.createSpy("onClick");
    render(<Boton etiqueta="Guardar" onClick={espia} />);
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(espia).toHaveBeenCalledTimes(1);
  });

  it("usa la variante primary por defecto", () => {
    render(<Boton etiqueta="Guardar" onClick={() => {}} />);
    expect(screen.getByRole("button").className).toContain("btn-primary");
  });

  it("aplica la variante recibida por props", () => {
    render(<Boton etiqueta="Borrar" onClick={() => {}} variante="danger" />);
    expect(screen.getByRole("button").className).toContain("btn-danger");
  });
});