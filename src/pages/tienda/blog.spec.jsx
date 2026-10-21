import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { noticias } from "../../data/blog";
import Blog from "./Blog";

describe("Blog (lista)", () => {
  afterEach(cleanup);

  it("renderiza todas las noticias del archivo de datos", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );
    expect(screen.getAllByText("Leer más").length).toBe(noticias.length);
  });

  it("muestra el título de cada noticia", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );
    noticias.forEach((n) => {
      expect(screen.getByText(n.titulo)).toBeTruthy();
    });
  });
});