import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import logo from "../../assets/images/logo/logo.webp";
import UploadModal from "../ModalUpload/ModalUpload";

export default function Navbar() {
  const {
    currentUser,
    toggleModals,
    uploadModalShow,
    toggleUploadModal,
    logOut,
  } = useContext(UserContext);

  return (
    <nav>
      <Link to="/" className="brand">
        <img src={logo} alt="" />
      </Link>

      <div className="nav-btn">
        {!currentUser && ( // Affiche ces boutons uniquement si l'utilisateur n'est pas connecté
          <>
            <button
              onClick={() => toggleModals("signUp")}
              className="button-sign-up btn-login"
            >
              Sign Up
            </button>
            <button
              onClick={() => toggleModals("signIn")}
              className="button-sign-in btn-login"
            >
              Sign In
            </button>
          </>
        )}
        {currentUser && ( // Affiche ce bouton uniquement si l'utilisateur est connecté
          <>
            <button onClick={toggleUploadModal} className="button-upload">
              Upload Image
            </button>
            <button onClick={logOut} className="button-log-out">
              Log Out
            </button>
          </>
        )}
        <UploadModal
          showModal={uploadModalShow}
          setShowModal={toggleUploadModal}
        />
      </div>
    </nav>
  );
}
