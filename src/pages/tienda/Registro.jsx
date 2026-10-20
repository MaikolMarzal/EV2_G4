import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const vacio = { nombre: "", apellidos: "", correo: "", password: "", confirmar: "" };

export default function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(vacio);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.apellidos.trim()) e.apellidos = "Los apellidos son obligatorios";
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) e.correo = "Correo no válido";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (form.confirmar !== form.password) e.confirmar = "Las contraseñas no coinciden";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (Object.keys(e).length > 0) return;

    try {
      registrar({
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        correo: form.correo.trim(),
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setErrores({ general: err.message });
    }
  };

  const campo = (name, label, type = "text") => (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className={`form-control ${errores[name] ? "is-invalid" : ""}`}
        value={form[name]}
        onChange={handleChange}
      />
      {errores[name] && <div className="invalid-feedback">{errores[name]}</div>}
    </div>
  );

  return (
    <div className="container my-5" style={{ maxWidth: 480 }}>
      <h1 className="mb-4">Crear cuenta</h1>
      {errores.general && <div className="alert alert-danger">{errores.general}</div>}
      <form onSubmit={handleSubmit} noValidate>
        {campo("nombre", "Nombre")}
        {campo("apellidos", "Apellidos")}
        {campo("correo", "Correo", "email")}
        {campo("password", "Contraseña", "password")}
        {campo("confirmar", "Confirmar contraseña", "password")}
        <button type="submit" className="btn btn-primary w-100">Registrarme</button>
      </form>
      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}