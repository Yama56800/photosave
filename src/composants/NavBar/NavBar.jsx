import { useEffect, useState } from "react";
export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 910;

      setIsSticky(scrollY > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
      <a className="link-logo" href="#balls">
        <i className="logo">
          <img src="" alt="logo" />
          PHOTOSAVE
        </i>
      </a>
      <ul className="nav-ul">
        <li className="nav-item">
          <a href="#presentation" className="nav-link">
            Présentation
          </a>
        </li>
        <li className="nav-li">
          <a href="#Unprojet" className="nav-link">
            SE CONNECTER
          </a>
        </li>
      </ul>
    </nav>
  );
}
