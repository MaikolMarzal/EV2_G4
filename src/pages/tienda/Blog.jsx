import { Link } from "react-router-dom";
import { noticias } from "../../data/blog";

export default function Blog() {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Blog</h1>
      <div className="row g-4">
        {noticias.map((n) => (
          <div className="col-12 col-md-6 col-lg-4" key={n.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <small className="text-muted">{n.fecha}</small>
                <h5 className="card-title mt-1">{n.titulo}</h5>
                <p className="card-text">{n.resumen}</p>
                <Link to={`/blogs/${n.id}`} className="btn btn-primary mt-auto">
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}