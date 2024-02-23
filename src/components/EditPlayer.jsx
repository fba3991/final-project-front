import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./EditPlayer.scss";

const { VITE_BACKEND_URL } = import.meta.env;

export default function EditPlayer() {
  const { id } = useParams(); // Ottenimento del parametro dell'ID del giocatore dall'URL
  const [player, setPlayer] = useState({
    // Definizione dello stato per i dati del giocatore
    nome: "",
    cognome: "",
    dataNascita: "",
    nazionalita: "",
    posizione: "",
    partiteGiocate: 0,
    ammonizioni: 0,
    espulsioni: 0,
    assist: 0,
    gol: 0,
    golSubiti: 0,
  });
  const [error, setError] = useState(""); // Definizione dello stato per gli errori
  const [loading, setLoading] = useState(""); // Definizione dello stato per il caricamento
  const navigate = useNavigate(); // Hook per la navigazione tra le pagine

  // Effetto per ottenere i dati del giocatore dal backend al caricamento della pagina
  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/player/${id}`)
      .then((response) => {
        if (response.data) {
          setPlayer(response.data); // Impostazione dei dati del giocatore nello stato
        } else {
          setError("Dati del giocatore non trovati."); // Gestione degli errori se i dati non sono disponibili
        }
      })
      .catch((error) => {
        setError(
          error.response.data.message ||
            "Si è verificato un errore durante il recupero del giocatore."
        );
      });
  }, [id]); // Dipendenza dell'effetto sull'ID del giocatore

  // Funzione per gestire l'invio del modulo di modifica del giocatore
  const handleSubmit = (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del modulo

    const playerAge = dayjs().diff(player.dataNascita, "year"); // Calcolo dell'età del giocatore

    if (playerAge < 15) {
      setError("Il giocatore deve avere almeno 15 anni.");
      setLoading(false);
      return;
    }

    // Invio dei dati del giocatore modificati al backend
    axios
      .put(`${VITE_BACKEND_URL}/player/${id}`, player)
      .then(() => {
        navigate(-1);
      })
      .catch((error) => {
        setError(
          error.response.data.message ||
            "Si è verificato un errore durante il salvataggio delle modifiche."
        );
      });
  };

  // Funzione per gestire i gli input di text, l'utente non potra inserire simboli o numeri
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^[A-Za-z]+$/.test(value) || value === "") {
      setPlayer({ ...player, [name]: value });
    }
  };

  return (
    <div className="EditPlayer">
      <h1>Modifica Giocatore</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            required
            placeholder="Massimo 20 caratteri"
            type="text"
            name="nome"
            value={player.nome}
            onChange={handleChange}
            maxLength={20}
          />
        </label>
        <label>
          Cognome:
          <input
            required
            placeholder="Massimo 30 caratteri "
            type="text"
            name="cognome"
            value={player.cognome}
            onChange={handleChange}
            maxLength={30}
          />
        </label>

        <label>
          Data di nascita:
          <input
            type="date"
            name="data di nascita"
            value={player.dataNascita || ""}
            onChange={(e) =>
              setPlayer({ ...player, dataNascita: e.target.value })
            }
          />
        </label>
        <label>
          Nazionalita:
          <input
            required
            placeholder="Massimo 20 caratteri"
            type="text"
            name="nazionalita"
            value={player.nazionalita}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Posizione:
          <select
            name="posizione"
            value={player.posizione || ""}
            onChange={(e) =>
              setPlayer({ ...player, posizione: e.target.value })
            }
          >
            <option value="">Seleziona...</option>
            <option value="Attaccante">Attaccante</option>
            <option value="Centrocampista">Centrocampista</option>
            <option value="Difensore">Difensore</option>
            <option value="Portiere">Portiere</option>
          </select>
          <label>
            Partite Giocate
            <input
              type="Number"
              name="partite Giocate"
              value={player.partiteGiocate || ""}
              onChange={(e) =>
                setPlayer({ ...player, partiteGiocate: e.target.value })
              }
            />
          </label>
          <label>
            Ammonizioni:
            <input
              type="number"
              name="ammonizioni"
              value={player.ammonizioni || ""}
              onChange={(e) =>
                setPlayer({ ...player, ammonizioni: e.target.value })
              }
            />
          </label>
          <label>
            Espulsioni:
            <input
              type="number"
              name="espulsioni"
              value={player.espulsioni || ""}
              onChange={(e) =>
                setPlayer({ ...player, espulsioni: e.target.value })
              }
            />
          </label>
          <label>
            Asssist:
            <input
              type="number"
              name="espulsioni"
              value={player.assist || ""}
              onChange={(e) => setPlayer({ ...player, assist: e.target.value })}
            />
          </label>
          {/* Condizione cge renderizza il campo per i gol solo se la posizione non è portiere */}
          {player.posizione !== "Portiere" && (
            <label>
              Gol:
              <input
                type="number"
                name="gol"
                value={player.gol}
                onChange={(e) => setPlayer({ ...player, gol: e.target.value })}
              />
            </label>
          )}
          {/* Condizione che renderizza il campo specifico per il portiere */}
          {player.posizione === "Portiere" && (
            <label>
              Goals Subiti:
              <input
                type="number"
                name="goalsSubiti"
                value={player.golSubiti}
                onChange={(e) =>
                  setPlayer({ ...player, golSubiti: e.target.value })
                }
              />
            </label>
          )}
        </label>

        <button type="submit">Salva modifiche</button>
        <button>
          <Link to={`/Players/${id}/`}>Torna pagina Giocatore</Link>
        </button>
      </form>
    </div>
  );
}
