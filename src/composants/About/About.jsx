import React from "react";
import photo from "../../images/photo-profil.jpg";

export default function About() {
  return (
    <div className="out-about">
      <div className="about" id="presentation">
        <div class="overlay"></div>
        <h2> Présentons Nous !</h2>
        <div className="about-content">
          <img className="photo-profil" src={photo} alt="photo de profil" />
          <div className="description">
            <p>
              Moi ? C'est Thomas Mahias,{" "}
              <span>développeur front-end React</span>. Je crée des sites web
              qui sont à la fois esthétiques et fonctionnels. Mon objectif est
              de construire des{" "}
              <span>expériences web fluides et réactives</span>, en accord avec
              les besoins spécifiques de chaque projet.
              <br />
              <br />
              Basé à <span> Ploërmel, Morbihan</span>, je suis ouvert à toutes
              opportunités, que ce soit sur place ou à distance. Si vous êtes à
              la recherche d'un développeur pour donner vie à vos idées et
              projets innovants, <span>n'hésitez pas à me contacter !</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
