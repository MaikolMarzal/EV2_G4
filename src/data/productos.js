const img = (texto) =>
  `https://placehold.co/400x300/111111/39FF14?text=${encodeURIComponent(texto)}`;

export const productos = [
  { codigo: 'JM001', categoria: 'Juegos de Mesa', nombre: 'Catan', precio: 29990, imagen: img('Catan'),
    descripcion: 'Clásico juego de estrategia para colonizar la isla de Catan. Ideal para 3-4 jugadores.' },
  { codigo: 'JM002', categoria: 'Juegos de Mesa', nombre: 'Carcassonne', precio: 24990, imagen: img('Carcassonne'),
    descripcion: 'Juego de colocación de fichas para construir el paisaje de la fortaleza medieval. Para 2-5 jugadores.' },
  { codigo: 'AC001', categoria: 'Accesorios', nombre: 'Controlador Inalámbrico Xbox Series X', precio: 59990, imagen: img('Xbox Controller'),
    descripcion: 'Botones mapeables y respuesta táctil mejorada. Compatible con Xbox y PC.' },
  { codigo: 'AC002', categoria: 'Accesorios', nombre: 'Auriculares Gamer HyperX Cloud II', precio: 79990, imagen: img('HyperX Cloud II'),
    descripcion: 'Sonido envolvente, micrófono desmontable y almohadillas de espuma viscoelástica.' },
  { codigo: 'CO001', categoria: 'Consolas', nombre: 'PlayStation 5', precio: 549990, imagen: img('PlayStation 5'),
    descripcion: 'Consola de última generación con gráficos impresionantes y tiempos de carga ultrarrápidos.' },
  { codigo: 'CG001', categoria: 'Computadores Gamers', nombre: 'PC Gamer ASUS ROG Strix', precio: 1299990, imagen: img('ASUS ROG Strix'),
    descripcion: 'Equipo potente para gamers exigentes, con los últimos componentes.' },
  { codigo: 'SG001', categoria: 'Sillas Gamers', nombre: 'Silla Gamer Secretlab Titan', precio: 349990, imagen: img('Secretlab Titan'),
    descripcion: 'Soporte ergonómico y ajustes personalizables para sesiones de juego prolongadas.' },
  { codigo: 'MS001', categoria: 'Mouse', nombre: 'Mouse Gamer Logitech G502 HERO', precio: 49990, imagen: img('Logitech G502'),
    descripcion: 'Sensor de alta precisión y botones personalizables para un control preciso.' },
  { codigo: 'MP001', categoria: 'Mousepad', nombre: 'Mousepad Razer Goliathus Extended Chroma', precio: 29990, imagen: img('Razer Goliathus'),
    descripcion: 'Área de juego amplia con iluminación RGB personalizable.' },
  { codigo: 'PP001', categoria: 'Poleras Personalizadas', nombre: "Polera Gamer Personalizada 'Level-Up'", precio: 14990, imagen: img('Polera Level-Up'),
    descripcion: 'Polera cómoda y estilizada que puedes personalizar con tu gamer tag.' },
];

export const obtenerProductos = () => productos;

export const obtenerProductoPorCodigo = (codigo) =>
  productos.find((p) => p.codigo === codigo);

export const obtenerCategorias = () => [...new Set(productos.map((p) => p.categoria))];

export const formatearPrecio = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);