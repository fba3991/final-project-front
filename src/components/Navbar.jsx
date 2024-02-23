import { Link } from "react-router-dom";
import './Navbar.scss'; 

export default function Navbar() {
  return (
    <nav className="nav-page">
      <div className="logo">
        <img src="/stemma.png" alt="" />
        </div>
        <p className="team-name">Salotto FC</p>
      
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          
          <li>
            <Link to="/Players">Rosa</Link>
          </li>
          <li>
            <Link to="/Players/create">Crea Giocatore</Link>
          </li>
          <li>
            <Link to="/Storia">Storia Squadra</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}


