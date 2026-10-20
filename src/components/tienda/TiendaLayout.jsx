import { Outlet, Link } from 'react-router-dom'; // ---> NUEVO: Importar Link
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext'; // ---> NUEVO: Importar useAuth

export default function TiendaLayout() {
  // ---> NUEVO: Obtenemos el usuario actual del contexto que creaste
  const { usuario } = useAuth();
  
  // ---> NUEVO: Verificamos si hay un usuario logueado y si es el Administrador
  // (Nota: Si en tu base de datos le llamaste "perfil" o "tipo", puedes cambiar "rol" por esa palabra)
  const esAdmin = usuario?.rol === 'Administrador';

  return (
    <>
      <Navbar />
      <main className="min-vh-100">
        <Outlet />
      </main>
      <Footer />

      {/* ---> NUEVO: Botón Flotante que solo aparece si esAdmin es true */}
      {esAdmin && (
        <Link 
          to="/admin" 
          className="btn btn-warning rounded-circle shadow-lg d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            zIndex: 1050,
            fontSize: '24px',
            border: '2px solid #000',
            textDecoration: 'none'
          }}
          title="Ir al Panel de Administración"
        >
          ⚙️
        </Link>
      )}
    </>
  );
}