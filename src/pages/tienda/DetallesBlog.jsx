import { Link, useParams } from "react-router-dom";
import { noticias } from "../../data/blog";

export default function DetalleBlog() {
  const { id } = useParams();
  const noticia = noticias.find((n) => n.id === Number(id));

  if (!noticia) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">Noticia no encontrada.</div>
        <Link to="/blogs" className="btn btn-secondary">Volver al blog</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <Link to="/blogs" className="btn btn-outline-secondary mb-3">
        ← Volver al blog
      </Link>
      <h1>{noticia.titulo}</h1>
      <p className="text-muted">{noticia.fecha}</p>
      <p>{noticia.contenido}</p>
    </div>
  );
}