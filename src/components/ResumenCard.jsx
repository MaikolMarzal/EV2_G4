// src/components/ResumenCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Recibimos las propiedades (props) para personalizar el componente[cite: 4]
const ResumenCard = ({ titulo, total, descripcion, textoBoton, ruta, colorBoton, colorTexto }) => {
    return (
        <div className="card shadow-sm h-100 border-0">
            <div className="card-body d-flex flex-column bg-white rounded">
                {/* Usamos las props para aplicar colores de Bootstrap dinámicamente */}
                <h5 className={`card-title ${colorTexto}`}>{titulo}</h5>
                
                <p className="card-text fs-4 fw-bold">{total}</p>
                <p className="text-muted small mb-4">{descripcion}</p>
                
                {/* El botón se adapta usando la prop 'colorBoton' (ej: 'btn-primary' o 'btn-success') */}
                <Link to={ruta} className={`btn ${colorBoton} w-100 mt-auto`}>
                    {textoBoton}
                </Link>
            </div>
        </div>
    );
};

export default ResumenCard;