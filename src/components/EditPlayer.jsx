import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
const { VITE_BACKEND_URL } = import.meta.env;

export default function EditPlayer() {
    const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayer = async () => {
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/player/${id}`);
            if (response.data) {
              setPlayer(response.data);
            } else {
              setError("Dati del giocatore non trovati.");
            }
          } catch (error) {
            setError(error.response.data.message);
          }
        }

    fetchPlayer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${VITE_BACKEND_URL}/player/${id}`, player);
      // Naviga verso la lista dei giocatori dopo il salvataggio delle modifiche
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
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
            onChange={handleChange}
          />
        </label>
        <label>
          Data di nascita:
          <input
            type="text"
            name="data di nascita"
            value={player.dataNascita || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Nazionalita:
          <input
            type="text"
            name="nazionalita"
            value={player.nazionalita || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Cognome:
          <input
            type="text"
            name="cognome"
            value={player.cognome || ''}
            onChange={handleChange}
          />
        </label>
        <label>
  Posizione:
  <select
    name="posizione"
    value={player.posizione || ''}
    onChange={handleChange}
  >
    <option value="">Seleziona...</option>
    <option value="Attaccante">Attaccante</option>
    <option value="Centrocampista">Centrocampista</option>
    <option value="Difensore">Difensore</option>
    <option value="Portiere">Portiere</option>
    {/* Aggiungi altre opzioni secondo le posizioni disponibili */}
  </select>
</label>
       
        
        {/* Altri campi del giocatore */}
        <button type="submit">Salva modifiche</button>
        {/* Link per tornare alla lista dei giocatori */}
        <Link to="/Players">Torna alla lista dei giocatori</Link>
      </form>
    </div>
  );
};


