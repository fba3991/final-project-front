import { NavLink } from "react-router-dom";
import './Navbar.scss'
export default function () {
    return (
        <nav className="nav-page">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/PlayersList">Players</NavLink></li>
            <li><NavLink to="/PlayersForms">Create Players</NavLink></li>
          </ul>
        </nav>
      );
    
}