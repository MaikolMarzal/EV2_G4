import React, { useState, useEffect } from 'react';
// Importamos los componentes reutilizables desde la carpeta components[cite: 1]
import SidebarAdmin from '../../components/SidebarAdmin';
import ResumenCard from '../../components/ResumenCard';

const Dashboard = () => {
    // Definimos los estados para gestionar la información dinámica del componente[cite: 4, 8]
    const [totalProductos, setTotalProductos] = useState(0);
    const [totalUsuarios, setTotalUsuarios] = useState(0);

    // Simulamos la carga de datos al montar el componente[cite: 4]
    useEffect(() => {
        // En el futuro, aquí llamarás a tu archivo de 'src/data/database.js' para obtener los totales reales
        setTotalProductos(120);
        setTotalUsuarios(45);
    }, []);

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                
                {/* Componente del Menú Lateral importado[cite: 4] */}
                <SidebarAdmin />

                {/* Contenido Central */}
                <main className="col-md-10 p-4 bg-light text-dark">
                    <h1 className="mb-4">Resumen de la Tienda</h1>

                    <div className="row">
                        {/* Componente de Tarjeta de Resumen (Productos) pasándole propiedades (props)[cite: 4, 8] */}
                        <div className="col-md-6 mb-3">
                            <ResumenCard 
                                titulo="📦 Inventario de Productos"
                                total={`${totalProductos} Productos Registrados`}
                                descripcion="Haz clic abajo para ir al listado completo, donde podrás editar, crear o eliminar productos."
                                textoBoton="Ver Listado Completo"
                                ruta="/admin/productos"
                                colorBoton="btn-primary"
                                colorTexto="text-primary"
                            />
                        </div>

                        {/* Componente de Tarjeta de Resumen (Usuarios) pasándole propiedades (props)[cite: 4, 8] */}
                        <div className="col-md-6 mb-3">
                            <ResumenCard 
                                titulo="👥 Usuarios Registrados"
                                total={`${totalUsuarios} Clientes Activos`}
                                descripcion="Haz clic abajo para ir al listado de usuarios, donde podrás gestionar los accesos y roles."
                                textoBoton="Gestionar Usuarios"
                                ruta="/admin/usuarios"
                                colorBoton="btn-success"
                                colorTexto="text-success"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;