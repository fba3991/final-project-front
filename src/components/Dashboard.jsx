import React, { useState, useEffect } from 'react';
import { FaUsers, FaFutbol, FaChartLine, FaTrophy, FaCalendarAlt, FaStar } from 'react-icons/fa';
import axios from 'axios';
import { config } from '../config.js';
import './Dashboard.scss';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('season');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [playersRes, squadraRes] = await Promise.all([
        axios.get(`${config.BACKEND_URL}/api/player`),
        axios.get(`${config.BACKEND_URL}/api/squadra/statistiche`)
      ]);

      const players = playersRes.data;
      const squadraStats = squadraRes.data;

      // Calcola statistiche avanzate
      const advancedStats = {
        ...squadraStats,
        mediaEta: players.reduce((sum, p) => {
          const eta = new Date().getFullYear() - new Date(p.dataNascita).getFullYear();
          return sum + eta;
        }, 0) / players.length,
        mediaQuotazione: players.reduce((sum, p) => sum + p.quotazione, 0) / players.length,
        distribuzioneEta: {
          '18-22': players.filter(p => {
            const eta = new Date().getFullYear() - new Date(p.dataNascita).getFullYear();
            return eta >= 18 && eta <= 22;
          }).length,
          '23-27': players.filter(p => {
            const eta = new Date().getFullYear() - new Date(p.dataNascita).getFullYear();
            return eta >= 23 && eta <= 27;
          }).length,
          '28-32': players.filter(p => {
            const eta = new Date().getFullYear() - new Date(p.dataNascita).getFullYear();
            return eta >= 28 && eta <= 32;
          }).length,
          '33+': players.filter(p => {
            const eta = new Date().getFullYear() - new Date(p.dataNascita).getFullYear();
            return eta >= 33;
          }).length
        },
        topPerformers: players
          .sort((a, b) => (b.gol || 0) + (b.assist || 0) - (a.gol || 0) - (a.assist || 0))
          .slice(0, 5)
      };

      setStats(advancedStats);
      setLoading(false);
    } catch (error) {
      console.error('Errore nel caricamento dashboard:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Caricamento dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="error-message">Errore nel caricamento dei dati</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Squadra</h1>
        <p className="dashboard-subtitle">Statistiche e performance della squadra</p>
      </div>

      {/* Statistiche Principali */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-value">{stats.numeroGiocatori}</div>
          <div className="stat-label">Rosa</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaFutbol />
          </div>
          <div className="stat-value">{stats.totaleGol}</div>
          <div className="stat-label">Gol Totali</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-value">€{stats.mediaQuotazione?.toFixed(0) || 0}</div>
          <div className="stat-label">Quotazione Media</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-value">{stats.mediaEta?.toFixed(1) || 0}</div>
          <div className="stat-label">Età Media</div>
        </div>
      </div>

      {/* Azioni Rapide */}
      <div className="quick-actions">
        <a href="/players" className="action-btn">
          <FaUsers /> Gestisci Giocatori
        </a>
        <a href="/rosa" className="action-btn">
          <FaFutbol /> Visualizza Rosa
        </a>
        <a href="/create-player" className="action-btn">
          <FaStar /> Nuovo Giocatore
        </a>
      </div>

      {/* Grafici e Statistiche */}
      <div className="charts-section">
        <h2 className="section-title">Distribuzione per Ruolo</h2>
        <div className="chart-container">
          <div className="role-distribution">
            <div className="role-bar">
              <span className="role-label">Portieri</span>
              <div className="bar-container">
                <div 
                  className="bar-fill portiere" 
                  style={{ width: `${(stats.giocatoriPerRuolo?.portieri / stats.numeroGiocatori) * 100}%` }}
                ></div>
              </div>
              <span className="role-count">{stats.giocatoriPerRuolo?.portieri || 0}</span>
            </div>
            
            <div className="role-bar">
              <span className="role-label">Difensori</span>
              <div className="bar-container">
                <div 
                  className="bar-fill difensore" 
                  style={{ width: `${(stats.giocatoriPerRuolo?.difensori / stats.numeroGiocatori) * 100}%` }}
                ></div>
              </div>
              <span className="role-count">{stats.giocatoriPerRuolo?.difensori || 0}</span>
            </div>
            
            <div className="role-bar">
              <span className="role-label">Centrocampisti</span>
              <div className="bar-container">
                <div 
                  className="bar-fill centrocampista" 
                  style={{ width: `${(stats.giocatoriPerRuolo?.centrocampisti / stats.numeroGiocatori) * 100}%` }}
                ></div>
              </div>
              <span className="role-count">{stats.giocatoriPerRuolo?.centrocampisti || 0}</span>
            </div>
            
            <div className="role-bar">
              <span className="role-label">Attaccanti</span>
              <div className="bar-container">
                <div 
                  className="bar-fill attaccante" 
                  style={{ width: `${(stats.giocatoriPerRuolo?.attaccanti / stats.numeroGiocatori) * 100}%` }}
                ></div>
              </div>
              <span className="role-count">{stats.giocatoriPerRuolo?.attaccanti || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="charts-section">
        <h2 className="section-title">Top Performers</h2>
        <div className="chart-container">
          <div className="performers-grid">
            {stats.topPerformers?.map((player, index) => (
              <div key={player._id} className="performer-card">
                <div className="performer-rank">#{index + 1}</div>
                <div className="performer-info">
                  <h4>{player.nome} {player.cognome}</h4>
                  <p className="performer-role">{player.ruolo === 'P' ? 'Portiere' : 
                     player.ruolo === 'D' ? 'Difensore' : 
                     player.ruolo === 'C' ? 'Centrocampista' : 'Attaccante'}</p>
                </div>
                <div className="performer-stats">
                  <div className="stat">
                    <span className="stat-value">{player.gol || 0}</span>
                    <span className="stat-label">Gol</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{player.assist || 0}</span>
                    <span className="stat-label">Assist</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{player.quotazione}</span>
                    <span className="stat-label">Quot.</span>
                  </div>
                </div>
              </div>
            )) || <p>Nessun giocatore disponibile</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
