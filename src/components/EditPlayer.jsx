import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { VITE_BACKEND_URL } = import.meta.env;

export default function EditPlayer() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${VITE_BACKEND_URL}/player/${id}`)
      .then(response => {
        if (response.data) {
          setPlayer(response.data);
        } else {
          setError("Dati del giocatore non trovati.");
        }
      })
      .catch(error => {
        setError(error.response.data.message || 'Si è verificato un errore durante il recupero del giocatore.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${VITE_BACKEND_URL}/player/${id}`, player)
      .then(() => {
        // Naviga verso la lista dei giocatori dopo il salvataggio delle modifiche
        navigate(-1);
      })
      .catch(error => {
        setError(error.response?.data?.message || 'Si è verificato un errore durante il salvataggio delle modifiche.');
      });
  };




  return (
    <div>
      <h1>Modifica Giocatore</h1>
      {error && <p>Si è verificato un errore: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={player.nome || ''}
            onChange={(e) => setPlayer({ ...player, nome: e.target.value })}
          />
        </label>
        <label>
          Cognome:
          <input
            type="text"
            name="cognome"
            value={player.cognome || ''}
            onChange={(e) => setPlayer({ ...player, cognome: e.target.value })}
          />
        </label>
       
        <label>
          Data di nascita:
          <input
            type="text"
            name="data di nascita"
            value={player.dataNascita || ''}
            onChange={(e) => setPlayer({ ...player, dataNascita: e.target.value })}
          />
        </label>
        <label>
          Nazionalita:
          <input
            type="text"
            name="nazionalita"
            value={player.nazionalita || ''}
            onChange={(e) => setPlayer({ ...player, nazionalitae: e.target.value })}
          />
        </label>
       
        <label>
  Posizione:
  <select
    name="posizione"
    value={player.posizione || ''}
    onChange={(e) => setPlayer({ ...player, posizione: e.target.value })}
  >
    <option value="">Seleziona...</option>
    <option value="Attaccante">Attaccante</option>
    <option value="Centrocampista">Centrocampista</option>
    <option value="Difensore">Difensore</option>
    <option value="Portiere">Portiere</option>
  </select>
  <label>
          Ammonizioni:
          <input
            type="number"
            name="ammonizioni"
            value={player.ammonizioni|| ''}
            onChange={(e) => setPlayer({ ...player, ammonizioni: e.target.value })}
          />
        </label>
  <label>
          Espulsioni:
          <input
            type="number"
            name="espulsioni"
            value={player.espulsioni|| ''}
            onChange={(e) => setPlayer({ ...player, espulsioni: e.target.value })}
          />
        </label>
  <label>
        Asssist:
          <input
            type="number"
            name="espulsioni"
            value={player.assist|| ''}
            onChange={(e) => setPlayer({ ...player, assist: e.target.value })}
          />
        </label>


         {/* Condizione cge renderizza il campo per i gol solo se la posizione non è portiere */}
         {player.posizione !== "Portiere" && (
          <label>
            Gol:
            <input
              type="number"
              name="gol"
              value={player.gol}
              onChange={(e) => setPlayer({ ...player, gol: e.target.value })}
            />
          </label>
        )}

        {/* Condizione che renderizza il campo specifico per il portiere */}
        {player.posizione === "Portiere" && (
          <label>
            Goals Subiti:
            <input
              type="number"
              name="goalsSubiti"
              value={player.golSubiti}
              onChange={(e) =>
                setPlayer({ ...player, golSubiti: e.target.value })
              }
            />
          </label>
        )}
</label>
       
        
       
        <button type="submit">Salva modifiche</button>
        <button><Link to={`/Players/${id}/`}>Torna pagina Giocatore</Link></button>
      </form>
    </div>
  );
};
