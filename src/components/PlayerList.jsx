import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PlayerList.scss";

const { VITE_BACKEND_URL } = import.meta.env;

// Definizione del componente funzionale PlayersList
export default function PlayersList() {
  const [players, setPlayers] = useState([]); // Stato per memorizzare la lista dei giocatori
  const [error, setError] = useState(); // Stato per memorizzare eventuali errori
  const [isLoading, setIsLoading] = useState(false); // Stato per gestire lo stato di caricamento

  useEffect(() => {
    setIsLoading(true); // Imposta lo stato di caricamento della pagina

    axios
      .get(`${VITE_BACKEND_URL}/Player`)
      .then((response) => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error.response.data.message); //  messaggio di errore c
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); //verrà eseguito solo una volta dopo il montaggio del componente

  return (
    <div className="players-list-container">
      {isLoading ? ( // Se isLoading è true, visualizza un messaggio di caricamento
        <p className="loading-text">Caricamento...</p>
      ) : (
        // Altrimenti, visualizza la lista dei giocatori
        <>
          {error && (
            <p className="error-message">Si è verificato un errore: {error}</p>
          )}{" "}
          {/* Visualizza un messaggio di errore se presente */}
          <ul>
            {players.map(
              (
                player,
                i // Itera attraverso la lista dei giocatori
              ) => (
                <li key={player._id} className="player-card">
                  <Link to={`/Players/${player._id}`}>
                    <div className="player-info">
                      <div>Nome: {player.nome}</div>
                      <div>Cognome: {player.cognome}</div>
                    </div>
                    <img
                      src="/immagine-calciatore.png"
                      alt="foto profilo"
                      className="player-image"
                    />{" "}
                    {/* Immagine del giocatore che sarà di default */}
                  </Link>
                </li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
