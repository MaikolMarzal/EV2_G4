import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';
export default function Navbar() {
  const { cantidadTotal } = useCarrito();
    const { usuario, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">🎮 Level-Up Gamer</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" end>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/productos">Productos</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blogs">Blogs</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            {usuario ? (
                <>
                    <span className="text-light small">Hola, {usuario.nombre}</span>
                    <button onClick={logout} className="btn btn-outline-light btn-sm">
                        Cerrar sesión
                    </button>
                </>
            ) : (
                <>
                    <Link to="/login" className="btn btn-outline-light btn-sm">Iniciar sesión</Link>
                    <Link to="/registro" className="btn btn-outline-light btn-sm">Registrar usuario</Link>
                </>
            )}
            <Link to="/carrito" className="btn btn-outline-success btn-sm">
                🛒 Carrito ({cantidadTotal})
              </Link>
            </div>  {/* cierra navbar-collapse */}
         </div>     {/* cierra container */}
      </div>
    </nav>
  );
}