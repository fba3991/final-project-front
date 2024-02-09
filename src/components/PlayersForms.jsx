import { useState } from "react";

export default function(){
    
        const [formData, setFormData] = useState({
          nome: '',
          cognome: '',
          dataNascita: '',
          nazionalita: '',
          posizione: '',
        });
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Logica per inviare i dati del nuovo giocatore al server
          console.log('Form submitted:', formData);
        };
      
        return (
          <div>
            <h2>Create or Edit Player</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
              </label>
              <label>
                Cognome:
                <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} />
              </label>
              <label>
                Data di nascita:
                <input type="date" name="dataNascita" value={formData.dataNascita} onChange={handleChange} />
              </label>
              <label>
                Nazionalità:
                <input type="text" name="nazionalita" value={formData.nazionalita} onChange={handleChange} />
              </label>
              <label>
                Posizione:
                <input type="text" name="posizione" value={formData.posizione} onChange={handleChange} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      }
