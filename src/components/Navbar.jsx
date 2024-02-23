import { Link } from "react-router-dom";
import "./Navbar.scss";

// Definizione del componente funzionale Navbar
export default function Navbar() {
  return (
    <nav className="nav-page">
      <div className="logo">
        <img src="/stemma.png" alt="" /> {/* Immagine del logo */}
      </div>
      <p className="team-name">Salotto FC</p> {/* Nome del team */}
      <div className="menu">
        <menu>
          <ul>
            {/* Elemento del menu per la pagina Home */}
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* Elemento del menu per la pagina della Rosa dei giocatori */}
            <li>
              <Link to="/Players">Rosa</Link>
            </li>

            {/* Elemento del menu per la pagina di creazione di un nuovo giocatore */}
            <li>
              <Link to="/Players/create">Crea Giocatore</Link>
            </li>

            {/* Elemento del menu per la pagina della Storia della squadra */}
            <li className="storia-link">
              <Link to="/Storia">Storia Squadra</Link>
            </li>
          </ul>
        </menu>
      </div>
    </nav>
  );
}
