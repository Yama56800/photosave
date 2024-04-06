import Landingimage from "../../assets/landingimage.webp";
export default function About() {
  return (
    <div className="landing">
      <div className="landing-container">
        <h1> Stockez vos photo en ligne !</h1>
        <div className="landing-content" id="landing-content">
          <img
            className="landingimage"
            src={Landingimage}
            alt="photo de profil"
          />
          <div className="description">
            <p>
              PhotoSave, votre solution ultime de stockage de photos en ligne.
              Sécurisez, organisez et partagez vos précieux souvenirs avec
              facilité et tranquillité d esprit. Accessible partout, à tout
              moment. Rejoignez-nous et redécouvrez la liberté de photographier!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
