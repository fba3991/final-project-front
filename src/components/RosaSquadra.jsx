import React, { useState, useEffect } from 'react';
import { FaUsers, FaFutbol, FaAssistiveListeningSystems, FaSquare } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { config } from '../config.js';
import './RosaSquadra.scss';

const RosaSquadra = () => {
  const [squadra, setSquadra] = useState(null);
  const [statistiche, setStatistiche] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRosa = async () => {
      try {
        const [rosaResponse, statsResponse] = await Promise.all([
          axios.get(`${config.BACKEND_URL}/api/squadra/rosa`),
          axios.get(`${config.BACKEND_URL}/api/squadra/statistiche`)
        ]);

        setSquadra(rosaResponse.data);
        setStatistiche(statsResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || 'Errore nel caricamento della rosa');
        setLoading(false);
      }
    };

    fetchRosa();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Caricamento rosa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <Link to="/" className="back-button">Torna alla Home</Link>
      </div>
    );
  }

  if (!squadra) {
    return (
      <div className="no-squad-container">
        <h2>Nessuna squadra trovata</h2>
        <p>La rosa della squadra non è ancora stata creata.</p>
        <Link to="/create-player" className="create-button">Aggiungi il primo giocatore</Link>
      </div>
    );
  }

  return (
    <div className="rosa-container">
      <header className="rosa-header">
        <h1>{squadra.nome}</h1>
        <p className="anno-fondazione">Anno di fondazione: {squadra.annoFondazione}</p>
      </header>

      <section className="statistiche-section">
        <h2>Statistiche Rosa</h2>
        <div className="statistiche-grid">
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3>Totale Giocatori</h3>
            <p>{statistiche.numeroGiocatori}</p>
          </div>
          <div className="stat-card">
            <FaFutbol className="stat-icon" />
            <h3>Totale Gol</h3>
            <p>{statistiche.totaleGol}</p>
          </div>
          <div className="stat-card">
            <FaAssistiveListeningSystems className="stat-icon" />
            <h3>Totale Assist</h3>
            <p>{statistiche.totaleAssist}</p>
          </div>
          <div className="stat-card">
            <FaSquare className="stat-icon yellow-card" />
            <h3>Cartellini Gialli</h3>
            <p>{statistiche.totaleCartelliniGialli}</p>
          </div>
          <div className="stat-card">
            <FaSquare className="stat-icon red-card" />
            <h3>Cartellini Rossi</h3>
            <p>{statistiche.totaleCartelliniRossi}</p>
          </div>
        </div>

        <div className="ruoli-section">
          <h3>Giocatori per Ruolo</h3>
          <div className="ruoli-grid">
            <div className="ruolo-card">
              <h4>Portieri</h4>
              <p className="ruolo-count">{statistiche.giocatoriPerRuolo.portieri}</p>
            </div>
            <div className="ruolo-card">
              <h4>Difensori</h4>
              <p className="ruolo-count">{statistiche.giocatoriPerRuolo.difensori}</p>
            </div>
            <div className="ruolo-card">
              <h4>Centrocampisti</h4>
              <p className="ruolo-count">{statistiche.giocatoriPerRuolo.centrocampisti}</p>
            </div>
            <div className="ruolo-card">
              <h4>Attaccanti</h4>
              <p className="ruolo-count">{statistiche.giocatoriPerRuolo.attaccanti}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="giocatori-section">
        <h2>Rosa Completa</h2>
        <div className="giocatori-grid">
          {squadra.giocatori && squadra.giocatori.length > 0 ? (
            squadra.giocatori.map((giocatore) => (
              <div key={giocatore._id} className="giocatore-card">
                <img
                  src="/immagine-calciatore.png"
                  alt={`${giocatore.nome} ${giocatore.cognome}`}
                  className="giocatore-image"
                />
                <div className="giocatore-info">
                  <h3>{giocatore.nome} {giocatore.cognome}</h3>
                  <p className="giocatore-ruolo">
                    {giocatore.ruolo === 'P' ? 'Portiere' : 
                     giocatore.ruolo === 'D' ? 'Difensore' : 
                     giocatore.ruolo === 'C' ? 'Centrocampista' : 'Attaccante'}
                  </p>
                  <p className="giocatore-squadra">{giocatore.squadra}</p>
                  <div className="giocatore-stats">
                    <span>Gol: {giocatore.gol || 0}</span>
                    <span>Assist: {giocatore.assist || 0}</span>
                    <span>Quot: €{giocatore.quotazione?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="giocatore-actions">
                  <Link to={`/player/${giocatore._id}`} className="action-btn view-btn">
                    Visualizza
                  </Link>
                  <Link to={`/edit-player/${giocatore._id}`} className="action-btn edit-btn">
                    Modifica
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-giocatori">
              <p>Nessun giocatore nella rosa</p>
              <Link to="/create-player" className="create-button">Aggiungi il primo giocatore</Link>
            </div>
          )}
        </div>
      </section>

      <div className="actions-section">
        <Link to="/create-player" className="action-button primary">
          Aggiungi Nuovo Giocatore
        </Link>
        <Link to="/dashboard" className="action-button secondary">
          Visualizza Dashboard
        </Link>
      </div>
    </div>
  );
};

export default RosaSquadra; 