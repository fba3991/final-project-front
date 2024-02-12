import axios from "axios";
import { useEffect, useState } from "react";
const { VITE_BACKEND_URL} = import.meta.env;

export default function(){
const [players, setPlayers] = useState([]);
const [error, setError]= useState();

useEffect(()=>{
const fetchPLayers=async() =>{
    try{
        const response = await axios.get(`${VITE_BACKEND_URL}/Player`)
        setPlayers(response.data)
        console.log(response.data);
    }catch(error){
        setError(error.response.data.messagge);
    }
}
fetchPLayers()
},[])
return (
    <div>
      <h1>Lista Giocatori</h1>
      {error && <p>Si è verificato un errore: {error}</p>}
      <ul>
        {players.map(player => (
          <li key={player._id}>
            <div>Nome: {player.nome}</div> 
            <div>Cognome: {player.cognome}</div>
            <div>Data di Nascita: {player.dataNascita}</div>
            <div>Nazionalità: {player.nazionalita}</div>
            <div>Posizione: {player.posizione}</div>
            {/* Altri dettagli del giocatore */}
          </li>
        ))}
      </ul>
    </div>
  );
 


}

