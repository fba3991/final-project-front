import { Link } from "react-router-dom";
export default function(){
    
    return (
        <nav>
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

            {/* <li>
              <Link to="/Players/:id/edit">Modifica Giocatore</Link>
            </li> */}
          </ul>
        </nav>
      );
}