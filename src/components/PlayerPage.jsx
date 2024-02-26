import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;
import { useNavigate } from "react-router-dom";
import "./PlayerPage.scss";

export default function PlayerPage() {
  const { id } = useParams(); //
  const [player, setPlayer] = useState({}); // Stato per memorizzare i dati del giocatore
  const [error, setError] = useState(""); // Stato per memorizzare eventuali errori
  const [isLoading, setIsLoading] = useState(true); // Stato per gestire lo stato di caricamento

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true); // Imposta isLoading su true durante il caricamento dei dati
    axios //  richiesta GET al backend per ottenere i dati del giocatore
      .get(`${VITE_BACKEND_URL}/player/${id}`)
      .then((response) => {
        setPlayer(response.data); // Aggiorna lo stato con i dati del giocatore
        setIsLoading(false); // Imposta isLoading su false dopo il caricamento dei dati
      })
      .catch((error) => {
        setError(
          // Gestisce gli errori durante il recupero dei dati del giocatore
          error.response.data.message ||
            "Si è verificato un errore durante il recupero del giocatore."
        );
        setIsLoading(false); // Imposta isLoading su false anche in caso di errore
      });
  }, [id]); // si attiva ogni volta che cambia l'ID del giocatore

  // Gestisce la cancellazione del giocatore
  const handleDeletePlayer = () => {
    const confirmed = confirm(
      // conferma eliminazione calciatore
      "Sei sicuro di voler eliminare questo giocatore?"
    );
    if (confirmed) {
      axios
        .delete(`${VITE_BACKEND_URL}/player/${id}`)
        .then(() => {
          navigate(-1); // Naviga all'indietro dopo la cancellazione del giocatore
        })
        .catch((error) => {
          setError(
            // Gestisce gli errori durante l'eliminazione del giocatore
            error.response.data.message ||
              "Si è verificato un errore durante l'eliminazione del giocatore."
          );
        });
    }
  };

  // Renderizza la pagina del giocatore
  return (
    <div className="PlayerPage">
      <h1>Dettagli Giocatore</h1>
      {isLoading ? ( // Mostra un messaggio di caricamento se isLoading è true
        <p>Caricamento...</p>
      ) : (
        <>
          {" "}
          {/* Utilizzo di React Fragment per restituire più elementi senza un wrapper esterno */}
          {error && <p>{error}</p>}
          <div className="player-card">
            <img
              src="/immagine-calciatore.png"
              alt="foto profilo"
              className="player-image"
            />
            <ul>
              <li>Nome: {player.nome}</li>
              <li>Cognome: {player.cognome}</li>
              <li>Data di Nascita: {player.dataNascita}</li>
              <li>Nazionalità: {player.nazionalita}</li>
              <li>Posizione: {player.posizione}</li>
              <li>Partite Giocate: {player.partiteGiocate}</li>
              <li>Ammonizioni: {player.ammonizioni}</li>
              <li>Espulsioni: {player.espulsioni}</li>
              <li>Assist: {player.assist}</li>
              {player.posizione === "Portiere" && (
                <li>Gol Subiti: {player.golSubiti}</li>
              )}
              {player.posizione !== "Portiere" && <li>Gol: {player.gol}</li>}
            </ul>
            <div className="button-container">
              <button className="button-handle" onClick={handleDeletePlayer}>
                Elimina Giocatore
              </button>
              <button className="button-edit">
                <Link to={`/Players/${id}/edit`}>Modifica Giocatore</Link>
              </button>
              <button className="button-list">
                {" "}
                <Link to="/Players">Torna alla lista dei giocatori</Link>{" "}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
