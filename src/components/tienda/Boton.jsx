export default function Boton({ etiqueta, onClick, tipo = "button", variante = "primary" }) {
  return (
    <button type={tipo} className={`btn btn-${variante}`} onClick={onClick}>
      {etiqueta}
    </button>
  );
}