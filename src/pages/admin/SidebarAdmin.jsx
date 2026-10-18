import { Link, useNavigate } from 'react-router-dom';

export default function SidebarAdmin() {
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        localStorage.removeItem('usuarioRol');
        navigate('login');
    };

    return (
        <nav className="col-md-3 col-lg-2 bg-dark text-white p-3 min-vh-100 d-flex flex-column">
            
        </nav>
    )
}