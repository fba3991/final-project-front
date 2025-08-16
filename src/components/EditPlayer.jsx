import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { config } from "../config.js";
import "./EditPlayer.scss";

export default function EditPlayer() {
  const { id } = useParams();
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${config.BACKEND_URL}/api/player/${id}`)
      .then((response) => {
        if (response.data) {
          setPlayer(response.data);
        } else {
          setError("Dati del giocatore non trovati.");
        }
      })
      .catch((error) => {
        setError(
          error.response?.data || "Si è verificato un errore durante il recupero del giocatore."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const playerAge = dayjs().diff(player.dataNascita, "year");

    if (playerAge < 15) {
      setError("Il giocatore deve avere almeno 15 anni.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(`${config.BACKEND_URL}/api/player/${id}`, player);
      setPlayer(response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate('/players');
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data || "Si è verificato un errore durante il salvataggio delle modifiche."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setPlayer(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setPlayer(prev => ({ ...prev, [name]: numValue }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setPlayer(prev => ({ ...prev, dataNascita: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPlayer(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="edit-player-container">
      <h1>Modifica Giocatore</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {success && (
        <div className="success-message">
          Giocatore modificato con successo!
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner">
            <FaSpinner />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={player.nome}
            onChange={handleTextChange}
            required
            maxLength={20}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cognome">Cognome</label>
          <input
            type="text"
            id="cognome"
            name="cognome"
            value={player.cognome}
            onChange={handleTextChange}
            required
            maxLength={30}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascita">Data di Nascita</label>
          <input
            type="date"
            id="dataNascita"
            name="dataNascita"
            value={player.dataNascita}
            onChange={handleDateChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nazionalita">Nazionalità</label>
          <input
            type="text"
            id="nazionalita"
            name="nazionalita"
            value={player.nazionalita}
            onChange={handleTextChange}
            required
            maxLength={20}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ruolo">Ruolo</label>
          <select
            id="ruolo"
            name="ruolo"
            value={player.ruolo}
            onChange={handleSelectChange}
            required
          >
            <option value="">Seleziona un ruolo</option>
            <option value="P">Portiere</option>
            <option value="D">Difensore</option>
            <option value="C">Centrocampista</option>
            <option value="A">Attaccante</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="squadra">Squadra</label>
          <input
            type="text"
            id="squadra"
            name="squadra"
            value={player.squadra}
            onChange={handleTextChange}
            required
            maxLength={30}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quotazione">Quotazione (€)</label>
          <input
            type="number"
            id="quotazione"
            name="quotazione"
            value={player.quotazione}
            onChange={handleNumberChange}
            min={1}
            max={1000000}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ammonizioni">Cartellini Gialli</label>
          <input
            type="number"
            id="ammonizioni"
            name="ammonizioni"
            value={player.ammonizioni}
            onChange={handleNumberChange}
            min={0}
            max={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="espulsioni">Cartellini Rossi</label>
          <input
            type="number"
            id="espulsioni"
            name="espulsioni"
            value={player.espulsioni}
            onChange={handleNumberChange}
            min={0}
            max={50}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="assist">Assist</label>
          <input
            type="number"
            id="assist"
            name="assist"
            value={player.assist}
            onChange={handleNumberChange}
            min={0}
            max={100}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gol">Gol</label>
          <input
            type="number"
            id="gol"
            name="gol"
            value={player.gol}
            onChange={handleNumberChange}
            min={0}
            max={100}
            required
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={() => navigate('/players')}>
            <FaArrowLeft /> Annulla
          </button>
          <button type="submit" disabled={loading}>
            <FaSave /> Salva Modifiche
          </button>
        </div>
      </form>
    </div>
  );
}
