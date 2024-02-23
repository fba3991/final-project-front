import axios from "axios"; // Importo il modulo axios per effettuare richieste HTTP
import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./CreatePlayer.scss";

const { VITE_BACKEND_URL } = import.meta.env;

// Definizione del componente funzionale CreatePlayer
export default function CreatePlayer() {
  const [error, setError] = useState(""); // Stato per memorizzare eventuali errori
  const [successMessage, setSuccessMessage] = useState(""); // Stato per memorizzare  messaggio di successo
  const [loading, setLoading] = useState(false); // Stato per gestire lo stato di caricamento della pagina
  const [player, setPlayer] = useState({
    // Stato per memorizzare i dati del giocatore
    nome: "",
    cognome: "",
    dataNascita: "",
    nazionalita: "",
    posizione: "",
    partiteGiocate: "",
    ammonizioni: 0,
    espulsioni: 0,
    assist: 0,
    gol: 0,
    golSubiti: 0,
  });

  // Funzione per gestire l'invio del form, quindi creo una funziona callback e la passero al form.
  const handleSubmit = (e) => {
    e.preventDefault(); // Impedisce il comportamento predefinito del form
    setLoading(true); // la pagina e carica

    const playerAge = dayjs().diff(player.dataNascita, "year");
    
    if (playerAge < 15) {
      setError("Il giocatore deve avere un eta minima di 15 anni!");
      setLoading(false); // Impost lo stato di caricamento a fals0 che e se è un errore la paggina non viene caricata
      return;
    }
    

    // richiesta  POST al backend per creare il giocatore
    axios
      .post(`${VITE_BACKEND_URL}/player`, player)
      .then(() => {
        // Se la richiesta ha successo
        setSuccessMessage("Giocatore creato con successo!"); // Imposto un messaggio di successo
        // Reimposta lo stato del giocatore a vuoto
        setPlayer({
          nome: "",
          cognome: "",
          dataNascita: "",
          nazionalita: "",
          posizione: "",
          partiteGiocate: 0,
          ammonizioni: 0,
          espulsioni: 0,
          assist: 0,
          gol: 0,
          golSubiti: 0,
        });
      })
      .catch((error) => {
        // Se si verifica un errore durante la richiesta
        setError(
          error.response.data.message ||
            "Si è verificato un errore durante l'aggiunta del giocatore."
        );
        setSuccessMessage(""); // Reimposta il messaggio di successo
      })
      .finally(() => {
        // Alla fine della richiesta
        setLoading(false); // Imposta lo stato di caricamento a false
      });
  };

  // Funzione per gestire i gli input di text, l'utente non potra inserire simboli o numeri
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verifico se il valore contiene solo lettere o spazi
    if (/^[A-Za-z ]*$/.test(value) || value === "") {
      setPlayer({ ...player, [name]: value });
    }
  };

  // Funzione per gestire i cambiamenti della data, se la data e valida l'utente puo creare il giocatore.
 

  return (
    <div className="create-player-container">
      <h1 className="crea">Crea il giocatore</h1>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Visualizza un messaggio di errore se presente */}
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}{" "}
      {/* Visualizza un messaggio di successo se presente */}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            required
            placeholder="Massimo 20 caratteri"
            type="text"
            name="nome"
            value={player.nome}
            onChange={handleChange}
            maxLength={20}
          />
        </label>

        <label>
          Cognome:
          <input
            required
            placeholder="Massimo 30 caratteri"
            type="text"
            name="cognome"
            value={player.cognome}
            onChange={handleChange}
            maxLength={30}
          />
        </label>

        <label>
          Data di Nascita:
          <input
            required
            type="date"
            name="dataNascita"
            value={player.dataNascita}
            onChange={(e) =>
              setPlayer({ ...player, dataNascita: e.target.value })
            }
          />
        </label>

        <label>
          Posizione:
          <select
            required
            name="posizione"
            value={player.posizione}
            onChange={(e) =>
              setPlayer({ ...player, posizione: e.target.value })
            }
          >
            <option value="">Seleziona...</option>
            <option value="Attaccante">Attaccante</option>
            <option value="Centrocampista">Centrocampista</option>
            <option value="Difensore">Difensore</option>
            <option value="Portiere">Portiere</option>
          </select>
        </label>

        <label>
          Nazionalità:
          <input
            required
            placeholder="Massimo 30 caratteri"
            type="text"
            name="nazionalita"
            value={player.nazionalita}
            onChange={handleChange}
            maxLength={30}
          />
        </label>

        <label>
          Partite Giocate:
          <input
            type="number"
            name="partiteGiocate"
            max={100}
            value={player.partiteGiocate}
          
            onChange={(e) =>
              setPlayer({ ...player, partiteGiocate: e.target.value })
            }
           
          />
        </label>

        <label>
          Ammonizioni:
          <input
            type="number"
            name="ammonizioni"
            max={100}
            value={player.ammonizioni}
            onChange={(e) =>
              setPlayer({ ...player, ammonizioni: e.target.value })
            }
          />
        </label>

        <label>
          Espulsioni:
          <input
            type="number"
            name="espulsioni"
            max={50}
            value={player.espulsioni}
            onChange={(e) =>
              setPlayer({ ...player, espulsioni: e.target.value })
            }
          />
        </label>

        <label>
          Assist:
          <input
            type="number"
            name="assist"
            max={100}
            value={player.assist}
            onChange={(e) => setPlayer({ ...player, assist: e.target.value })}
          />
        </label>

        {player.posizione !== "Portiere" && (
          <label>
            Gol:
            <input
              type="number"
              name="gol"
              max={100}
              value={player.gol}
              onChange={(e) => setPlayer({ ...player, gol: e.target.value })}
            />
          </label>
        )}

        {/* gol subiti, visibile solo se la posizione è "Portiere" */}
        {player.posizione === "Portiere" && (
          <label>
            Gol Subiti:
            <input
              type="number"
              name="golSubiti"
              max={200}
              value={player.golSubiti}
              onChange={(e) =>
                setPlayer({ ...player, golSubiti: e.target.value })
              }
            />
          </label>
        )}

        {/* se al click del bottone mostra messaggio di caricamento non sara possibile creare un nuovo giocatore finche i dati 
        non saranno inviati*/}
        <button type="submit" disabled={loading}>
          {loading ? "Caricamento..." : "Aggiungi Giocatore"}
        </button>

        {/* Bottone per tornare alla lista dei giocatori */}
        <button>
          <Link to="/Players">Torna alla lista dei giocatori</Link>
        </button>
      </form>
    </div>
  );
}
