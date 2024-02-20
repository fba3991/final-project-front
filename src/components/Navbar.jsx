import { Link } from "react-router-dom";
import './Navbar.scss';
export default function(){
    
    return (
        <nav className="nav-page">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Players">Lista Giocatori</Link>
            </li>
            <li>
              <Link to="/Players/create">Crea Giocatore</Link>
            </li>
          </ul>
        </nav>
      );
}


