/* import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const { VITE_BACKEND_URL } = import.meta.env;

export default function(){
    const { id } = useParams();
    const [player, setPlayer] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setIsLoading(true);
      axios.get(`${VITE_BACKEND_URL}/player/${id}`)
        .then(response => {
          setPlayer(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.response.data.message || 'Si è verificato un errore durante il recupero del giocatore.');
          setIsLoading(false);
        });
    }, [id]);

   

      return(

            <div>
              <h1>Dettagli Giocatore</h1>
              <ul>
                <li>Nome: {player.nome}</li>
                <li>Cognome: {player.cognome}</li>
                <li>Data di Nascita: {player.dataNascita}</li>
                <li>Nazionalità: {player.nazionalita}</li>
                <li>Posizione: {player.posizione}</li>
                <li>Partite Giocate: {player.partiteGiocate}</li>
                <li>Ammonizioni: {player.ammonizioni}</li>
                <li>Espulsioni: {player.espulsioni}</li>
                <li>Assist: {player.assist}</li>
                <li>Gol: {player.gol}</li>
              </ul>
              <button onClick={handleDeletePlayer}>Elimina Giocatore</button>
              <Link to={`/Players/${id}/edit`}>Modifica Giocatore</Link>
              <Link to="/Players">Torna alla lista dei giocatori</Link>
            </div>
          );
            
      
} */
/* 
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const { VITE_BACKEND_URL } = import.meta.env;
import {  useNavigate } from 'react-router-dom';

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  const navigate= useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/player/${id}`)
      .then(response => {
        setPlayer(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.response.data.message || 'Si è verificato un errore durante il recupero del giocatore.');
        setIsLoading(false);
      });
  }, [id]);



const handleDeletePlayer = async () => {
    const confirmed = confirm('Sei sicuro di voler eliminare questo giocatore?');
    if (confirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/player/${id}`);
        navigate(-1);
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  }; 


  return (

    
    <div>
        <h1>Lista Giocatori</h1>
      {isLoading ? (
        <p>Caricamento...</p>
      ) : (
    
          {error && <p>Si è verificato un errore: {error}</p>}
      <h1>Dettagli Giocatore</h1>
      <ul>
        <li>Nome: {player.nome}</li>
        <li>Cognome: {player.cognome}</li>
        <li>Data di Nascita: {player.dataNascita}</li>
        <li>Nazionalità: {player.nazionalita}</li>
        <li>Posizione: {player.posizione}</li>
        <li>Partite Giocate: {player.partiteGiocate}</li>
        <li>Ammonizioni: {player.ammonizioni}</li>
        <li>Espulsioni: {player.espulsioni}</li>
        <li>Assist: {player.assist}</li>
        <li>Gol: {player.gol}</li>
      </ul>
   
      <button onClick={handleDeletePlayer}>Elimina Giocatore</button>
      <Link to={`/Players/${id}/edit`}>Modifica Giocatore</Link>
      <Link to="/Players">Torna alla lista dei giocatori</Link>
    </div>
  );
} */





{/* if (isLoading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Si è verificato un errore: {error}</p>;
  } */}





{/*    const handleDeletePlayer = async () => {
    const confirmed = window.confirm('Sei sicuro di voler eliminare questo giocatore?');
    if (confirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/player/${id}`);
        // Effettua il reindirizzamento alla lista dei giocatori
        window.location.href = '/Players';
      } catch (error) {
        setError(error.response.data.message || 'Si è verificato un errore durante l\'eliminazione del giocatore.');
      }
    }
}; */}


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
const { VITE_BACKEND_URL } = import.meta.env;
import { useNavigate } from 'react-router-dom';
import "./PlayerPage.scss"

export default function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${VITE_BACKEND_URL}/player/${id}`)
      .then(response => {
        setPlayer(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.response?.data?.message || 'Si è verificato un errore durante il recupero del giocatore.');
        setIsLoading(false);
      });
  }, [id]);

  const handleDeletePlayer = () => {
    const confirmed = confirm('Sei sicuro di voler eliminare questo giocatore?');
    if (confirmed) {
        axios.delete(`${VITE_BACKEND_URL}/player/${id}`)
            .then(() => {
                navigate(-1);
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Si è verificato un errore durante l\'eliminazione del giocatore.');
            });
    }
};


  return (
    <div className='PlayerPage'>
      <h1>Dettagli Giocatore</h1>
      {isLoading ? (
        <p>Caricamento...</p>
      ) : (
        <>
          {error && <p>Si è verificato un errore: {error}</p>}
          <ul>
            <img src={player.immagine} />
            <li>Nome: {player.nome}</li>
            <li>Cognome: {player.cognome}</li>
            <li>Data di Nascita: {player.dataNascita}</li>
            <li>Nazionalità: {player.nazionalita}</li>
            <li>Posizione: {player.posizione}</li>
            <li>Partite Giocate: {player.partiteGiocate}</li>
            <li>Ammonizioni: {player.ammonizioni}</li>
            <li>Espulsioni: {player.espulsioni}</li>
            <li>Assist: {player.assist}</li>
            {player.posizione === "Portiere" && <li>Gol Subiti: {player.golSubiti}</li>}
            {player.posizione !== "Portiere" && <li>Gol: {player.gol}</li>}

          </ul>
          <button className='button-handle' onClick={handleDeletePlayer}>Elimina Giocatore</button>
          <button className='button-edit'><Link to={`/Players/${id}/edit`}>Modifica Giocatore</Link></button>
          <button className='button-list'> <Link to="/Players">Torna alla lista dei giocatori</Link>  </button>
          
       
        </>
      )}
    </div>
  );
}
