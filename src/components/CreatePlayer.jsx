/* import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

export default function () {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState({
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
    specificFieldForGoalkeeper: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    
  

    axios.post(`${VITE_BACKEND_URL}/player`, player)
      .then(() => {
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

        })
        
      })
      .catch((error) => {
        setError(error.response.data.message || "Si è verificato un errore durante l'aggiunta del giocatore.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <h1>Crea Giocatore</h1>
      {error && <p>Si è verificato un errore: {error}</p>}
      <form
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>
          Nome:
          <input
            required
            type="text"
            name="nome"
            value={player.nome}
            onChange={(e) => setPlayer({ ...player, nome: e.target.value })}
          />
        </label>
        <label>
          Cognome:
          <input
            type="text"
            name="cognome"
            value={player.cognome}
            onChange={(e) => setPlayer({ ...player, cognome: e.target.value })}
          />
        </label>
        <label>
          Data di Nascita:
          <input
            type="date"
            name="dataNascita"
            value={player.dataNascita}
            onChange={(e) =>
              setPlayer({ ...player, dataNascita: e.target.value })
            }
          />
        </label>
        <label>
          Nazionalità:
          <input
            type="text"
            name="nazionalita"
            value={player.nazionalita}
            onChange={(e) =>
              setPlayer({ ...player, nazionalita: e.target.value })
            }
          />
        </label>
         <label>
          Posizione:
          <select
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
          Partite Giocate:
          <input
            type="number"
            name="partiteGiocate"
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
            value={player.assist}
            onChange={(e) => setPlayer({ ...player, assist: e.target.value })}
          />
        </label>
        <label>
          Gol:
          <input
            type="number"
            name="gol"
            value={player.gol}
            onChange={(e) => setPlayer({ ...player, gol: e.target.value })}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Caricamento..." : "Aggiungi Giocatore"}
        </button>
        <Link to="/Players">Torna alla lista dei giocatori</Link>
      </form>
    </div>
  );
 
}

 */
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

export default function () {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState({
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
    golSubiti: 0, // Renomina il campo per i gol subiti
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${VITE_BACKEND_URL}/player`, player)
      .then(() => {
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
          golSubiti: 0, // Resetta il campo per i gol subiti
        });
      })
      .catch((error) => {
        setError(
          error.response.data.message ||
            "Si è verificato un errore durante l'aggiunta del giocatore."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Crea Giocatore</h1>
      {error && <p>Si è verificato un errore: {error}</p>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Nome:
          <input
            required
            type="text"
            name="nome"
            value={player.nome}
            onChange={(e) => setPlayer({ ...player, nome: e.target.value })}
          />
        </label>

        <label>
          Cognome:
          <input
            type="text"
            name="cognome"
            value={player.cognome}
            onChange={(e) => setPlayer({ ...player, cognome: e.target.value })}
          />
        </label>
        <label>
          Data di Nascita:
          <input
            type="date"
            name="dataNascita"
            value={player.dataNascita}
            onChange={(e) =>
              setPlayer({ ...player, dataNascita: e.target.value })
            }
          />
        </label>
        {/* Aggiunto campo per la posizione */}
        <label>
          Posizione:
          <select
            name="posizione"
            value={player.posizione}
            onChange={(e) => {
              const newPosition = e.target.value;
              // Se la nuova posizione è "Portiere", impostare il campo specifico per il portiere a vuoto
              const goalsSubiti =
                newPosition === "Portiere" ? 0 : player.goalSubiti;
              setPlayer({ ...player, posizione: newPosition, goalsSubiti });
            }}
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
            type="text"
            name="nazionalita"
            value={player.nazionalita}
            onChange={(e) =>
              setPlayer({ ...player, nazionalita: e.target.value })
            }
          />
        </label>
        <label>
          Partite Giocate:
          <input
            type="number"
            name="partiteGiocate"
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
            value={player.assist}
            onChange={(e) => setPlayer({ ...player, assist: e.target.value })}
          />
        </label>
        {/* Condizionalmente renderizza il campo per i gol solo se la posizione NON è portiere */}
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
        {/* Condizionalmente renderizza il campo specifico per il portiere */}
        {player.posizione === "Portiere" && (
          <label>
            Gol Subiti:
            <input
              type="number"
              name="golSubiti"
              value={player.golSubiti}
              onChange={(e) =>
                setPlayer({ ...player, golSubiti: e.target.value })
              }
            />
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Caricamento..." : "Aggiungi Giocatore"}
        </button>
        <Link to="/Players">Torna alla lista dei giocatori</Link>
      </form>
    </div>
  );
}

