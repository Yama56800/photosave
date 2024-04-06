import { Link } from "react-router-dom";
function Error() {
  return (
    <div className="error">
      <h1>ERROR 404</h1>

      <Link className="backhome" to={"/"}>
        <div> Retour a la page d'acceuil </div>
      </Link>
    </div>
  );
}

export default Error;
