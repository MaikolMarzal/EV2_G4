import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-top border-secondary py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between gap-2">
        <span className="text-secundario">© 2026 Level-Up Gamer. Todos los derechos reservados.</span>
        <nav className="d-flex gap-3">
          <Link to="/productos" className="text-secundario text-decoration-none">Productos</Link>
          <Link to="/blogs" className="text-secundario text-decoration-none">Blogs</Link>
          <Link to="/contacto" className="text-secundario text-decoration-none">Contacto</Link>
        </nav>
      </div>
    </footer>
  );
}