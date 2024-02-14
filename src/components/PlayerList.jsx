import axios from '/axios/axiosConfig';
import { useEffect, useState } from "react";
const { VITE_BACKEND_URL } = import.meta.env;
import { Link } from 'react-router-dom';

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPLayers = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/Player`);
        setPlayers(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchPLayers();
  }, []);

 

  const handleDeletePlayer = async (playerId) => {
    if (window.confirm("Sei sicuro di voler eliminare questo giocatore?")) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/player/${playerId}`);
        setPlayers(players.filter(player => player._id !== playerId));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  } 

  return (
    <div>
      <h1>Lista Giocatori</h1>
      {error && <p>Si è verificato un errore: {error}</p>}
      <ul>
        {players.map((player) => (
    
          <li key={player._id}>
            <div>Nome: {player.nome}</div>
            <div>Cognome: {player.cognome}</div>
            <div>Data di Nascita: {player.dataNascita}</div>
            <div>Nazionalità: {player.nazionalita}</div>
            <div>Posizione: {player.posizione}</div>
            <div>Partite Giocate: {player.partiteGiocate}</div>
            <div>Ammonizioni: {player.ammonizioni}</div>
            <div>Espulsioni: {player.espulsioni}</div>
            <div>Assist: {player.assist}</div>
            <div>Gol: {player.gol}</div>
            <button onClick={() => handleDeletePlayer(player._id)}>Elimina</button>
          <Link to={`/Players/${player._id}/edit`}>Modifica</Link>
          </li>
   
        ))}
      </ul>
    </div>
  );
}


