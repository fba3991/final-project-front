

import axios from '/axios/axiosConfig';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./PlayerList.scss"
const { VITE_BACKEND_URL } = import.meta.env;

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/Player`)
      .then(response => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="players-list-container">
      <h1>Lista Giocatori</h1>
      {isLoading ? (
        <p className="loading-text">Caricamento...</p>
      ) : (
        <>
          {error && <p className="error-message">Si è verificato un errore: {error}</p>}
          <ul>
            {players.map((player,i) => (
              <li key={player._id}>
                <Link to={`/Players/${player._id}`}>
                <img src={player.immagine} alt="foto calciatore" />
                  <div className="player-info">
                    <div>Nome: {player.nome}</div>
                    <div>Cognome: {player.cognome}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}



