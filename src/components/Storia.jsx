import "./Storia.scss";
import { Link } from 'react-router-dom';

export default function Storia() {
  return (
    <div>
      <section className="storia-page"></section>
      <div className="content">
        <p>
          Dal 1957, il Salotto FC ha tessuto una storia di passione,
          determinazione e orgoglio calcistico nel cuore della nostra comunità.
          Fondato da un gruppo di amici con una palla e un sogno condiviso, il
          club ha rapidamente guadagnato rispetto sul campo e nel tessuto
          sociale della città. Nei primi anni, i giocatori del Salotto FC si
          sono impegnati a fondo, superando sfide finanziarie e logistiche per
          garantire che il calcio potesse prosperare nella nostra zona. Le
          partite si svolgevano su campi improvvisati, ma l'entusiasmo e la
          determinazione erano sempre al massimo. Negli anni '60, il Salotto FC
          ha iniziato a emergere come una forza nel calcio locale, vincendo
          campionati di quartiere e guadagnandosi rispetto nelle leghe
          circostanti. I giocatori erano uniti da un forte senso di cameratismo,
          alimentato dalla passione per il gioco e dal desiderio di
          rappresentare al meglio il loro quartiere. Negli anni '70 e '80, il
          Salotto FC ha vissuto un periodo di grande crescita e successo. Sotto
          la guida di allenatori dedicati e il sostegno di tifosi sempre più
          numerosi, la squadra ha conquistato trofei e onori, diventando una
          delle più temute nella regione. Negli anni successivi, nonostante alti
          e bassi, il Salotto FC ha continuato a prosperare, attrarre talenti
          locali e a costruire legami più profondi con la comunità circostante.
          La squadra ha affrontato sfide e cambiamenti, ma il suo spirito non è
          mai vacillato. Oggi, il Salotto FC continua a essere una fonte di
          orgoglio per tutti noi. Con una solida base di tifosi devoti e una
          nuova generazione di talenti pronti a portare avanti la tradizione, il
          futuro del club è luminoso e pieno di promesse. La storia del Salotto
          FC è una storia di resilienza, passione e successo, e continuerà a
          ispirare generazioni di giocatori e tifosi nel corso degli anni a
          venire.
        </p>
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
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Players">Squadra</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Salotto FC. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
