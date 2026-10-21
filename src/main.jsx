import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importaciones de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Ruta de tu CSS
import "./index.css";
import "./assets/custom.css";
import "./assets/css/style.css";

// 1. IMPORTAMOS TUS CONTEXTOS
import { AuthProvider } from './context/AuthContext.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        {/* ---> NUEVO: Envolver la app */}
        <ProductosProvider>
          <App />
        </ProductosProvider>
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>,
);