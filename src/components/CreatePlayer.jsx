import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./CreatePlayer.scss";

const { VITE_BACKEND_URL } = import.meta.env;

export default function CreatePlayer() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState({
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
          golSubiti: 0,
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Verifica se il valore contiene solo lettere
    if (/^[A-Za-z]+$/.test(value) || value === "") {
      setPlayer({ ...player, [name]: value });
    }
  };
  return (
    <div className="create-player-container">
      <h1>Crea il giocatore</h1>
      {error && <p> {error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            required
            type="text"
            name="nome"
            value={player.nome}
            onChange={handleChange}
          />
        </label>

        <label>
          Cognome:
          <input
            required
            type="text"
            name="cognome"
            value={player.cognome}
            onChange={handleChange}
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
            type="text"
            name="nazionalita"
            value={player.nazionalita}
            onChange={handleChange}
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
        <button>
          <Link to="/Players">Torna alla lista dei giocatori</Link>
        </button>
      </form>
    </div>
  );
}
