import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
const { VITE_BACKEND_URL } = import.meta.env;

export default function CreatePlayer() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [dataNascita, setDataNascita] = useState("");
  const [nazionalita, setNazionalita] = useState("");
  const [posizione, setPosizione] = useState("");
  const [partiteGiocate, setPartiteGiocate] = useState(0);
  const [ammonizioni, setAmmonizioni] = useState(0);
  const [espulsioni, setEspulsioni] = useState(0);
  const [assist, setAssist] = useState(0);
  const [gol, setGol] = useState(0);
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

     const newPlayer = {
      nome,
      cognome,
      dataNascita:dataNascita && dayjs(dataNascita).format("YYYY-MM-DD"),
      nazionalita,
      posizione,
      partiteGiocate,
      ammonizioni,
      espulsioni,
      assist,
      gol,
    }; 

    try {
      await axios.post(`${VITE_BACKEND_URL}/player`, newPlayer); // Assicurati che l'endpoint sia correttamente scritto come "/player"
      setNome("");
      setCognome("");
      setDataNascita("");
      setNazionalita("");
      setPosizione("");
      setPartiteGiocate(0);
      setAmmonizioni(0);
      setEspulsioni(0);
      setAssist(0);
      setGol(0);
      setError(null); // Resetta l'errore quando la richiesta ha successo
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Crea Giocatore</h1>
      {error && <p>Si è verificato un errore: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
          required
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label>
          Cognome:
          <input
            type="text"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
          />
        </label>
        <label>
          Data di Nascita:
          <input
            type="date"
            value={FormData.dataNascita}
            onChange={(e) => setDataNascita(e.target.value)}
          />
        </label>
        <label>
          Nazionalità:
          <input
            type="text"
            value={nazionalita}
            onChange={(e) => setNazionalita(e.target.value)}
          />
        </label>
        <label>
          Posizione:
          <input
            type="text"
            value={posizione}
            onChange={(e) => setPosizione(e.target.value)}
          />
        </label>
        <label>
          Partite Giocate:
          <input
            type="number"
            value={partiteGiocate}
            onChange={(e) => setPartiteGiocate((e.target.value))}
          />
        </label>
        <label>
          Ammonizioni:
          <input
            type="number"
            value={ammonizioni}
            onChange={(e) => setAmmonizioni((e.target.value))}
          />
        </label>
        <label>
          Espulsioni:
          <input
            type="number"
            value={espulsioni}
            onChange={(e) => setEspulsioni((e.target.value))}
          />
        </label>
        <label>
          Assist:
          <input
            type="number"
            value={assist}
            onChange={(e) => setAssist((e.target.value))}
          />
        </label>
        <label>
          Gol:
          <input
            type="number"
            value={gol}
            onChange={(e) => setGol((e.target.value))}
          />
        </label>
        <button type="submit">Aggiungi Giocatore</button>
      </form>
    </div>
  );
}
