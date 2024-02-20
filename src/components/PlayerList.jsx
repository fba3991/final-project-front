/* import axios from '/axios/axiosConfig';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './PLayerList.scss';
const { VITE_BACKEND_URL } = import.meta.env; */

/* export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/Player`)
      .then(response => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); */
 
  /* const handleDeletePlayer = async (playerId) => {
    const confirmed = confirm('Sei sicuro di voler eliminare questo giocatore?');
    if (confirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/player/${playerId}`);

        setPlayers(players.filter(player => player._id !== playerId));
  
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };  */

 
/* 
  return (
    <div>
      <h1>Lista Giocatori</h1>
      {isLoading ? (
        <p>Caricamento...</p>
      ) : (
        <>
          {error && <p>Si è verificato un errore: {error}</p>}
          <ul>
            {players.map((player) => (
          <li key={player._id}>
            <Link to={`/Players/${player._id}`}>
              <img src={player.immagine} alt="Immagine giocatore" />
              <div>Nome: {player.nome}</div>
              <div>Cognome: {player.cognome}</div>
         
            </Link>
          </li>
        ))}
          </ul>
        </>
      )}
    </div>
  );
} */

 

/* import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const { VITE_BACKEND_URL } = import.meta.env;

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/Player`)
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        setError(error.response.data.message || 'Si è verificato un errore durante il recupero dei giocatori.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  }

  return (
    <div>
      <h1>Lista Giocatori</h1>
      <ul>
        {players.map((player) => (
          <li key={player._id}>
            <Link to={`/Players/${player._id}`}>
              <img src={player.immagine} alt="Immagine giocatore" />
              <div>Nome: {player.nome}</div>
              <div>Cognome: {player.cognome}</div>
         
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} */


// PlayersList.jsx
import axios from '/axios/axiosConfig';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./PlayerList.scss"
const { VITE_BACKEND_URL } = import.meta.env;

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/Player`)
      .then(response => {
        setPlayers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="players-list-container">
      <h1>Lista Giocatori</h1>
      {isLoading ? (
        <p className="loading-text">Caricamento...</p>
      ) : (
        <>
          {error && <p className="error-message">Si è verificato un errore: {error}</p>}
          <ul>
            {players.map((player,i) => (
              <li key={player._id}>
                <Link to={`/Players/${player._id}`}>
                <img src={player.immagine}  />
                  <div className="player-info">
                    <div>Nome: {player.nome}</div>
                    <div>Cognome: {player.cognome}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}



