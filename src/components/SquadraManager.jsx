import React, { useState, useEffect } from 'react';
import { FaUsers, FaFutbol, FaChartBar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './SquadraManager.scss';

const { VITE_BACKEND_URL } = import.meta.env;

const SquadraManager = () => {
  const [squadra, setSquadra] = useState(null);
  const [giocatori, setGiocatori] = useState([]);
  const [formazione, setFormazione] = useState({
    nome: '4-3-3',
    portieri: 1,
    difensori: 4,
    centrocampisti: 3,
    attaccanti: 3
  });
  const [formazioneGiocatori, setFormazioneGiocatori] = useState({
    portieri: [],
    difensori: [],
    centrocampisti: [],
    attaccanti: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [squadraRes, giocatoriRes] = await Promise.all([
        axios.get(`${VITE_BACKEND_URL}/api/squadra/rosa`),
        axios.get(`${VITE_BACKEND_URL}/api/player`)
      ]);

      setSquadra(squadraRes.data);
      setGiocatori(giocatoriRes.data);
      
      // Organizza giocatori per ruolo
      const organizzati = {
        portieri: giocatoriRes.data.filter(g => g.ruolo === 'P'),
        difensori: giocatoriRes.data.filter(g => g.ruolo === 'D'),
        centrocampisti: giocatoriRes.data.filter(g => g.ruolo === 'C'),
        attaccanti: giocatoriRes.data.filter(g => g.ruolo === 'A')
      };
      
      setFormazioneGiocatori(organizzati);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFormazioneChange = (e) => {
    const { name, value } = e.target;
    setFormazione(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveFormazione = () => {
    // Qui potresti salvare la formazione nel backend
    setIsEditing(false);
    // Mostra messaggio di successo
  };

  const getFormazioneValida = () => {
    const totale = formazione.portieri + formazione.difensori + formazione.centrocampisti + formazione.attaccanti;
    return totale === 11;
  };

  const getStatisticheFormazione = () => {
    const giocatoriFormazione = [
      ...formazioneGiocatori.portieri.slice(0, formazione.portieri),
      ...formazioneGiocatori.difensori.slice(0, formazione.difensori),
      ...formazioneGiocatori.centrocampisti.slice(0, formazione.centrocampisti),
      ...formazioneGiocatori.attaccanti.slice(0, formazione.attaccanti)
    ];

    return {
      mediaEta: giocatoriFormazione.reduce((sum, g) => {
        const eta = new Date().getFullYear() - new Date(g.dataNascita).getFullYear();
        return sum + eta;
      }, 0) / giocatoriFormazione.length,
      mediaQuotazione: giocatoriFormazione.reduce((sum, g) => sum + g.quotazione, 0) / giocatoriFormazione.length,
      totaleGol: giocatoriFormazione.reduce((sum, g) => sum + (g.gol || 0), 0),
      totaleAssist: giocatoriFormazione.reduce((sum, g) => sum + (g.assist || 0), 0)
    };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Caricamento gestione squadra...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Errore: {error}</p>
      </div>
    );
  }

  const stats = getStatisticheFormazione();

  return (
    <div className="squadra-manager">
      <header className="manager-header">
        <h1>Gestione Squadra</h1>
        <div className="header-actions">
          <button 
            className={`edit-btn ${isEditing ? 'active' : ''}`}
            onClick={toggleEditing}
          >
            {isEditing ? <FaTimes /> : <FaEdit />}
            {isEditing ? 'Annulla' : 'Modifica'}
          </button>
          {isEditing && (
            <button className="save-btn" onClick={saveFormazione}>
              <FaSave />
              Salva
            </button>
          )}
        </div>
      </header>

      <div className="manager-content">
        {/* Informazioni Squadra */}
        <section className="squadra-info">
          <h2>{squadra?.nome || 'La Nostra Squadra'}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Anno fondazione:</span>
              <span className="value">{squadra?.annoFondazione || '2024'}</span>
            </div>
            <div className="info-item">
              <span className="label">Città:</span>
              <span className="value">{squadra?.citta || 'Milano'}</span>
            </div>
            <div className="info-item">
              <span className="label">Stadio:</span>
              <span className="value">{squadra?.stadio || 'Stadio Comunale'}</span>
            </div>
            <div className="info-item">
              <span className="label">Allenatore:</span>
              <span className="value">{squadra?.allenatore || 'Mister Rossi'}</span>
            </div>
          </div>
        </section>

        {/* Gestione Formazione */}
        <section className="formazione-section">
          <h3>Formazione Tattica</h3>
          
          {isEditing ? (
            <div className="formazione-editor">
              <div className="formazione-inputs">
                <div className="input-group">
                  <label>Portieri:</label>
                  <input
                    type="number"
                    name="portieri"
                    value={formazione.portieri}
                    onChange={handleFormazioneChange}
                    min="1"
                    max="3"
                  />
                </div>
                <div className="input-group">
                  <label>Difensori:</label>
                  <input
                    type="number"
                    name="difensori"
                    value={formazione.difensori}
                    onChange={handleFormazioneChange}
                    min="3"
                    max="6"
                  />
                </div>
                <div className="input-group">
                  <label>Centrocampisti:</label>
                  <input
                    type="number"
                    name="centrocampisti"
                    value={formazione.centrocampisti}
                    onChange={handleFormazioneChange}
                    min="2"
                    max="6"
                  />
                </div>
                <div className="input-group">
                  <label>Attaccanti:</label>
                  <input
                    type="number"
                    name="attaccanti"
                    value={formazione.attaccanti}
                    onChange={handleFormazioneChange}
                    min="1"
                    max="4"
                  />
                </div>
              </div>
              
              <div className="formazione-preview">
                <div className={`formazione-display ${getFormazioneValida() ? 'valid' : 'invalid'}`}>
                  <div className="formazione-line">
                    {Array(formazione.portieri).fill().map((_, i) => (
                      <div key={i} className="player-slot portiere">P</div>
                    ))}
                  </div>
                  <div className="formazione-line">
                    {Array(formazione.difensori).fill().map((_, i) => (
                      <div key={i} className="player-slot difensore">D</div>
                    ))}
                  </div>
                  <div className="formazione-line">
                    {Array(formazione.centrocampisti).fill().map((_, i) => (
                      <div key={i} className="player-slot centrocampista">C</div>
                    ))}
                  </div>
                  <div className="formazione-line">
                    {Array(formazione.attaccanti).fill().map((_, i) => (
                      <div key={i} className="player-slot attaccante">A</div>
                    ))}
                  </div>
                </div>
                <div className="formazione-status">
                  {getFormazioneValida() ? (
                    <span className="status-valid">✓ Formazione valida (11 giocatori)</span>
                  ) : (
                    <span className="status-invalid">✗ Formazione non valida</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="formazione-display">
              <div className="formazione-name">{formazione.nome}</div>
              <div className="formazione-stats">
                <span>P: {formazione.portieri}</span>
                <span>D: {formazione.difensori}</span>
                <span>C: {formazione.centrocampisti}</span>
                <span>A: {formazione.attaccanti}</span>
              </div>
            </div>
          )}
        </section>

        {/* Statistiche Formazione */}
        <section className="stats-section">
          <h3>Statistiche Formazione</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{stats.mediaEta.toFixed(1)}</span>
                <span className="stat-label">Età media</span>
              </div>
            </div>
            <div className="stat-card">
              <FaChartBar className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{stats.mediaQuotazione.toFixed(0)}</span>
                <span className="stat-label">Quotazione media</span>
              </div>
            </div>
            <div className="stat-card">
              <FaFutbol className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{stats.totaleGol}</span>
                <span className="stat-label">Totale gol</span>
              </div>
            </div>
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">{stats.totaleAssist}</span>
                <span className="stat-label">Totale assist</span>
              </div>
            </div>
          </div>
        </section>

        {/* Disponibilità Giocatori */}
        <section className="disponibilita-section">
          <h3>Disponibilità per Ruolo</h3>
          <div className="ruoli-grid">
            <div className="ruolo-card">
              <h4>Portieri ({formazioneGiocatori.portieri.length})</h4>
              <div className="giocatori-list">
                {formazioneGiocatori.portieri.map(giocatore => (
                  <div key={giocatore._id} className="giocatore-item">
                    <span className="nome">{giocatore.nome} {giocatore.cognome}</span>
                    <span className="quotazione">{giocatore.quotazione}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="ruolo-card">
              <h4>Difensori ({formazioneGiocatori.difensori.length})</h4>
              <div className="giocatori-list">
                {formazioneGiocatori.difensori.map(giocatore => (
                  <div key={giocatore._id} className="giocatore-item">
                    <span className="nome">{giocatore.nome} {giocatore.cognome}</span>
                    <span className="quotazione">{giocatore.quotazione}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="ruolo-card">
              <h4>Centrocampisti ({formazioneGiocatori.centrocampisti.length})</h4>
              <div className="giocatori-list">
                {formazioneGiocatori.centrocampisti.map(giocatore => (
                  <div key={giocatore._id} className="giocatore-item">
                    <span className="nome">{giocatore.nome} {giocatore.cognome}</span>
                    <span className="quotazione">{giocatore.quotazione}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="ruolo-card">
              <h4>Attaccanti ({formazioneGiocatori.attaccanti.length})</h4>
              <div className="giocatori-list">
                {formazioneGiocatori.attaccanti.map(giocatore => (
                  <div key={giocatore._id} className="giocatore-item">
                    <span className="nome">{giocatore.nome} {giocatore.cognome}</span>
                    <span className="quotazione">{giocatore.quotazione}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SquadraManager;
