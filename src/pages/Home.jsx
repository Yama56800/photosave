import { useContext } from "react";
import { UserContext } from "../Context/userContext";
import backgroundImage from "../assets/images/background.webp";
import landingimage from "../assets/images/landingimage.webp";
export default function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="landing">
      <div
        className="landing-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <h1>PHOTOSAVE</h1>
        <h1 className="display-3 text-light">
          {currentUser ? "Welcome buddy" : "Hi, Sign Up or Sign In"}
        </h1>
        <h2>Stockez vos photo en ligne !</h2>
        <div className="landing-content" id="landing-content">
          <img
            className="landingimage"
            src={landingimage}
            alt="photo de profil"
          />
          <div className="description">
            <p>
              PhotoSave, votre solution ultime de stockage de photos en ligne.
              Sécurisez, organisez et partagez vos précieux souvenirs avec
              facilité et tranquillité d'esprit. Accessible partout, à tout
              moment. Rejoignez-nous et redécouvrez la liberté de photographier!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
