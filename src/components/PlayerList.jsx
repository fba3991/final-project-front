import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaSort, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../config.js";
import "./PlayerList.scss";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    ruolo: "",
    squadra: "",
    minQuotazione: "",
    maxQuotazione: "",
  });
  const [sortBy, setSortBy] = useState("nome");
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [players, searchTerm, filters, sortBy, sortOrder]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.BACKEND_URL}/api/player`);
      setPlayers(response.data);
      setError("");
    } catch (err) {
      setError("Errore nel caricamento dei giocatori");
      console.error("Errore:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let result = [...players];

    // Applica ricerca
    if (searchTerm) {
      result = result.filter(
        (player) =>
          player.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.squadra.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Applica filtri
    if (filters.ruolo) {
      result = result.filter((player) => player.ruolo === filters.ruolo);
    }
    if (filters.squadra) {
      result = result.filter((player) =>
        player.squadra.toLowerCase().includes(filters.squadra.toLowerCase())
      );
    }
    if (filters.minQuotazione) {
      result = result.filter((player) => player.quotazione >= parseInt(filters.minQuotazione));
    }
    if (filters.maxQuotazione) {
      result = result.filter((player) => player.quotazione <= parseInt(filters.maxQuotazione));
    }

    // Applica ordinamento
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredPlayers(result);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const resetFilters = () => {
    setFilters({
      ruolo: "",
      squadra: "",
      minQuotazione: "",
      maxQuotazione: "",
    });
    setSearchTerm("");
    setSortBy("nome");
    setSortOrder("asc");
  };

  const handleDeletePlayer = async (playerId) => {
    try {
      await axios.delete(`${config.BACKEND_URL}/api/player/${playerId}`);
      setPlayers(players.filter(player => player._id !== playerId));
      setDeleteConfirm(null);
      alert("Giocatore eliminato con successo!");
    } catch (error) {
      console.error("Errore nell'eliminazione:", error);
      alert("Errore nell'eliminazione del giocatore");
    }
  };

  const handleEditPlayer = (playerId) => {
    navigate(`/edit-player/${playerId}`);
  };

  const handleViewPlayer = (playerId) => {
    navigate(`/player/${playerId}`);
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Caricamento giocatori...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="players-list-container">
      <div className="search-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Cerca giocatori..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="filters-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> Filtri
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Ruolo:</label>
            <select name="ruolo" value={filters.ruolo} onChange={handleFilterChange}>
              <option value="">Tutti</option>
              <option value="P">Portiere</option>
              <option value="D">Difensore</option>
              <option value="C">Centrocampista</option>
              <option value="A">Attaccante</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Squadra:</label>
            <input
              type="text"
              name="squadra"
              value={filters.squadra}
              onChange={handleFilterChange}
              placeholder="Nome squadra"
            />
          </div>
          <div className="filter-group">
            <label>Quotazione Min:</label>
            <input
              type="number"
              name="minQuotazione"
              value={filters.minQuotazione}
              onChange={handleFilterChange}
              placeholder="€"
            />
          </div>
          <div className="filter-group">
            <label>Quotazione Max:</label>
            <input
              type="number"
              name="maxQuotazione"
              value={filters.maxQuotazione}
              onChange={handleFilterChange}
              placeholder="€"
            />
          </div>
          <button className="reset-filters" onClick={resetFilters}>
            Reset Filtri
          </button>
        </div>
      )}

      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-label">Totale Giocatori:</span>
          <span className="stat-value">{filteredPlayers.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Valore Totale:</span>
          <span className="stat-value">
            €{filteredPlayers.reduce((sum, p) => sum + p.quotazione, 0).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="players-grid">
        {filteredPlayers.map((player) => (
          <div key={player._id} className="player-card">
            <div className="player-content">
              <img
                src="/immagine-calciatore.png"
                alt={`${player.nome} ${player.cognome}`}
                className="player-image"
              />
              <div className="player-info">
                <h3>{player.nome} {player.cognome}</h3>
                <span className="role-badge role-{player.ruolo?.toLowerCase()}">
                  {getRuoloName(player.ruolo)}
                </span>
                <p className="team-name">{player.squadra}</p>
                <div className="player-stats">
                  <span>Gol: {player.gol || 0}</span>
                  <span>Assist: {player.assist || 0}</span>
                  <span>Quot: €{player.quotazione?.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="player-actions">
              <button
                className="action-btn view-btn"
                onClick={() => handleViewPlayer(player._id)}
                title="Visualizza"
              >
                <FaEye />
              </button>
              <button
                className="action-btn edit-btn"
                onClick={() => handleEditPlayer(player._id)}
                title="Modifica"
              >
                <FaEdit />
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => setDeleteConfirm(player._id)}
                title="Elimina"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPlayers.length === 0 && !loading && (
        <div className="no-results">
          <p>Nessun giocatore trovato</p>
          <button className="reset-filters-btn" onClick={resetFilters}>
            Reset Filtri
          </button>
        </div>
      )}

      {/* Modal di conferma eliminazione */}
      {deleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Conferma Eliminazione</h3>
            <p>Sei sicuro di voler eliminare questo giocatore? L'azione non può essere annullata.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteConfirm(null)}>
                Annulla
              </button>
              <button className="btn-delete" onClick={() => handleDeletePlayer(deleteConfirm)}>
                Elimina
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
