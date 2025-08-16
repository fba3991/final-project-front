import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { useNavigate } from "react-router-dom";
import { config } from "../config.js";
import "./PlayerPage.scss";

// Imposta la localizzazione italiana
dayjs.locale("it");

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.BACKEND_URL}/api/player/${id}`)
      .then((response) => {
        setPlayer(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          error.response?.data || "Si è verificato un errore durante il recupero del giocatore."
        );
        setIsLoading(false);
      });
  }, [id]);

  const handleDeletePlayer = () => {
    const confirmed = confirm("Sei sicuro di voler eliminare questo giocatore?");
    if (confirmed) {
      axios
        .delete(`${config.BACKEND_URL}/api/player/${id}`)
        .then(() => {
          navigate('/players');
        })
        .catch((error) => {
          setError(
            error.response?.data || "Si è verificato un errore durante l'eliminazione del giocatore."
          );
        });
    }
  };

  const getRuoloName = (ruolo) => {
    switch(ruolo) {
      case 'P': return 'Portiere';
      case 'D': return 'Difensore';
      case 'C': return 'Centrocampista';
      case 'A': return 'Attaccante';
      default: return ruolo;
    }
  };

  return (
    <div className="PlayerPage">
      <h1>Dettagli Giocatore</h1>
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Caricamento...</p>
        </div>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          <div className="player-card">
            <img
              src="/immagine-calciatore.png"
              alt="foto profilo"
              className="player-image"
            />
            <div className="player-info">
              <h2>{player.nome} {player.cognome}</h2>
              <div className="player-details">
                <div className="detail-item">
                  <span className="label">Data di Nascita:</span>
                  <span className="value">{dayjs(player.dataNascita).format("DD/MM/YYYY")}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Nazionalità:</span>
                  <span className="value">{player.nazionalita}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Ruolo:</span>
                  <span className="value role-badge role-{player.ruolo?.toLowerCase()}">
                    {getRuoloName(player.ruolo)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="label">Squadra:</span>
                  <span className="value">{player.squadra}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Quotazione:</span>
                  <span className="value">€{player.quotazione?.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Gol:</span>
                  <span className="value">{player.gol || 0}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Assist:</span>
                  <span className="value">{player.assist || 0}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Ammonizioni:</span>
                  <span className="value">{player.ammonizioni || 0}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Espulsioni:</span>
                  <span className="value">{player.espulsioni || 0}</span>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button className="button-handle" onClick={handleDeletePlayer}>
                Elimina Giocatore
              </button>
              <button className="button-edit">
                <Link to={`/edit-player/${id}`}>Modifica Giocatore</Link>
              </button>
              <button className="button-list">
                <Link to="/players">Torna alla lista</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
