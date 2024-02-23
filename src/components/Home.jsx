import "./Home.scss";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <div className="home-page">
        <div className="text-home">
          <h3>- Benvenuti -</h3>
          <h1>SALOTTO F.C</h1>
        </div>
        <div className="seconda-immage">
          <div></div>
        </div>
      </div>

      <section className="second-section"></section>

      <div className="second-page">
        <h1>Benvenuti sul nostro sito</h1>
        <p>
          Noi siamo più di una semplice squadra di calcio; siamo una famiglia
          unita dalla passione per il gioco, la determinazione e lo spirito di
          squadra. Fondata con radici profonde nella nostra comunità, ci
          impegniamo a portare avanti il nostro orgoglio e la nostra tradizione
          sul campo, affrontando ogni partita con grinta e impegno. Unisciti a
          noi in questa emozionante avventura calcistica e sostienici mentre
          inseguiamo la gloria sul terreno di gioco!
        </p>
        {/* bottone che reinderizza alla pagina storia */}
        <div>
          <button className="button-container">
            <Link to="/Storia">Storia Squadra</Link>
          </button>
        </div>
      </div>

      <div className="third-page">
        {/* Bottone per la pagina "Crea Il Giocatore" */}
        <button className="button-container2">
          <Link to="/Players/create">Crea Il Giocatore</Link>
        </button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Salotto FC</h3>
            <p>Indirizzo: Via del Calcio, 123</p>
            <p>Città: Calcioville</p>
            <p>Telefono: 0123456789</p>
          </div>
          <div>
            <h3>Link utili</h3>
            {/* Elenco dei link  */}
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Storia">Chi Siamo</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Piè di pagina del footer */}
        <div className="footer-bottom">
          <p>&copy; 2024 Salotto FC. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
