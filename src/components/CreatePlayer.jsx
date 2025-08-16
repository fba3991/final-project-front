import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { config } from "../config.js";
import "./CreatePlayer.scss";

// Definizione del componente funzionale CreatePlayer
export default function CreatePlayer() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState({
    nome: "",
    cognome: "",
    dataNascita: "",
    nazionalita: "",
    ruolo: "",
    squadra: "",
    quotazione: 0,
    ammonizioni: 0,
    espulsioni: 0,
    assist: 0,
    gol: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const playerAge = dayjs().diff(player.dataNascita, "year");
    if (playerAge < 15) {
      setError("Il giocatore deve avere un'età minima di 15 anni!");
      setLoading(false);
      return;
    }

    axios
      .post(`${config.BACKEND_URL}/api/player`, player)
      .then((response) => {
        setSuccessMessage("Giocatore creato con successo!");
        setPlayer({
          nome: "",
          cognome: "",
          dataNascita: "",
          nazionalita: "",
          ruolo: "",
          squadra: "",
          quotazione: 0,
          ammonizioni: 0,
          espulsioni: 0,
          assist: 0,
          gol: 0,
        });
      })
      .catch((error) => {
        setError(
          error.response?.data || "Si è verificato un errore durante la creazione del giocatore"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^[A-Za-z ]*$/.test(value) || value === "") {
      setPlayer({ ...player, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setPlayer({ ...player, [name]: numValue });
  };

  return (
    <div className="create-player-container">
      <h1 className="crea">Crea il giocatore</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            placeholder="Massimo 20 caratteri"
            type="text"
            name="nome"
            value={player.nome}
            onChange={handleChange}
            maxLength={20}
            required
          />
        </label>

        <label>
          Cognome:
          <input
            placeholder="Massimo 30 caratteri"
            type="text"
            name="cognome"
            value={player.cognome}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </label>

        <label>
          Data di Nascita:
          <input
            type="date"
            name="dataNascita"
            value={player.dataNascita}
            onChange={(e) =>
              setPlayer({ ...player, dataNascita: e.target.value })
            }
            required
          />
        </label>

        <label>
          Nazionalità:
          <input
            placeholder="Massimo 30 caratteri"
            type="text"
            name="nazionalita"
            value={player.nazionalita}
            onChange={handleChange}
            maxLength={30}
            required
          />
        </label>

        <label>
          Ruolo:
          <select
            name="ruolo"
            value={player.ruolo}
            onChange={(e) =>
              setPlayer({ ...player, ruolo: e.target.value })
            }
            required
          >
            <option value="">Seleziona...</option>
            <option value="P">Portiere</option>
            <option value="D">Difensore</option>
            <option value="C">Centrocampista</option>
            <option value="A">Attaccante</option>
          </select>
        </label>

        <label>
          Squadra:
          <input
            type="text"
            name="squadra"
            value={player.squadra}
            onChange={handleChange}
            required
            placeholder="Nome della squadra"
            maxLength={30}
          />
        </label>

        <label>
          Quotazione:
          <input
            type="number"
            name="quotazione"
            value={player.quotazione}
            onChange={handleNumberChange}
            required
            min={1}
            max={1000000}
            placeholder="Quotazione del giocatore"
          />
        </label>

        <label>
          Gol:
          <input
            type="number"
            name="gol"
            min={0}
            max={100}
            value={player.gol}
            onChange={handleNumberChange}
          />
        </label>

        <label>
          Assist:
          <input
            type="number"
            name="assist"
            min={0}
            max={100}
            value={player.assist}
            onChange={handleNumberChange}
          />
        </label>

        <label>
          Ammonizioni:
          <input
            type="number"
            name="ammonizioni"
            min={0}
            max={100}
            value={player.ammonizioni}
            onChange={handleNumberChange}
          />
        </label>

        <label>
          Espulsioni:
          <input
            type="number"
            name="espulsioni"
            min={0}
            max={50}
            value={player.espulsioni}
            onChange={handleNumberChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Caricamento..." : "Aggiungi Giocatore"}
        </button>

        <button type="button">
          <Link to="/players">Torna alla lista dei giocatori</Link>
        </button>
      </form>
    </div>
  );
}
