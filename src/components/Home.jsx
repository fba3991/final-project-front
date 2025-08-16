import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaShoppingBag, FaCalendarAlt, FaNewspaper, FaFutbol, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Home.scss";

export default function Home() {
  const slides = [
    { id: 1, image: "/home-page.png", title: "Benvenuti nel club", subtitle: "Passione. Identità. Competizione.", ctaText: "Scopri la rosa", ctaLink: "/rosa" },
    { id: 2, image: "/third-page.png", title: "Prossima stagione", subtitle: "Preparazione e ambizione.", ctaText: "Calendario partite", ctaLink: "/gestione-squadra" },
    { id: 3, image: "/storia-page.png", title: "La nostra storia", subtitle: "Tradizione e orgoglio.", ctaText: "Leggi la storia", ctaLink: "/storia" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setActive((prev) => (prev + 1) % slides.length);

  return (
    <div className="home">
      {/* Hero Slider */}
      <section className="hero">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`slide ${idx === active ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={idx !== active}
          >
            <div className="overlay" />
            <div className="content">
              <h3>{s.subtitle}</h3>
              <h1>{s.title}</h1>
              <Link to={s.ctaLink} className="cta">{s.ctaText}</Link>
            </div>
          </div>
        ))}
        <button className="nav prev" onClick={prevSlide} aria-label="Slide precedente"><FaChevronLeft /></button>
        <button className="nav next" onClick={nextSlide} aria-label="Slide successiva"><FaChevronRight /></button>
        <div className="dots">
          {slides.map((_, i) => (
            <button key={i} className={`dot ${i === active ? "active" : ""}`} onClick={() => setActive(i)} aria-label={`Vai alla slide ${i+1}`} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="quick-actions">
        <a href="#" className="action">
          <FaTicketAlt />
          <span>Biglietti</span>
        </a>
        <a href="#" className="action">
          <FaShoppingBag />
          <span>Store</span>
        </a>
        <Link to="/players" className="action">
          <FaFutbol />
          <span>Giocatori</span>
        </Link>
        <Link to="/gestione-squadra" className="action">
          <FaCalendarAlt />
          <span>Formazioni</span>
        </Link>
      </section>

      {/* Notizie */}
      <section className="news">
        <div className="section-header">
          <h2><FaNewspaper /> Notizie</h2>
          <a className="see-all" href="#">Vedi tutte</a>
        </div>
        <div className="cards">
          <article className="card">
            <img src="/homepage.jpeg" alt="Allenamenti" />
            <div className="body">
              <h3>Allenamenti: la seduta odierna</h3>
              <p>Aggiornamenti dal centro sportivo: intensità e focus tattico.</p>
              <Link to="/rosa" className="more">Approfondisci</Link>
            </div>
          </article>
          <article className="card">
            <img src="/home-page.avif" alt="Amichevole" />
            <div className="body">
              <h3>Amichevole: test superato</h3>
              <p>Buone indicazioni dall'ultima uscita pre-stagionale.</p>
              <Link to="/players" className="more">Leggi di più</Link>
            </div>
          </article>
          <article className="card">
            <img src="/home-page.png" alt="Club" />
            <div className="body">
              <h3>Vita di Club</h3>
              <p>Eventi, community e iniziative: resta aggiornato.</p>
              <Link to="/storia" className="more">Scopri</Link>
            </div>
          </article>
        </div>
      </section>

      {/* Calendario e Risultati (placeholder) */}
      <section className="calendar-results">
        <div className="grid">
          <div className="panel calendar">
            <div className="panel-header">
              <h3><FaCalendarAlt /> Calendario</h3>
              <a href="#" className="see-all">Vedi tutto</a>
            </div>
            <ul>
              <li>
                <span className="date">18 Ago</span>
                <span className="match">Salotto FC vs Neom</span>
                <span className="label">Amichevole</span>
              </li>
              <li>
                <span className="date">25 Ago</span>
                <span className="match">Salotto FC vs Bologna</span>
                <span className="label">Serie A</span>
              </li>
              <li>
                <span className="date">01 Set</span>
                <span className="match">Lens vs Salotto FC</span>
                <span className="label">Amichevole</span>
              </li>
            </ul>
          </div>
          <div className="panel results">
            <div className="panel-header">
              <h3><FaFutbol /> Risultati</h3>
              <a href="#" className="see-all">Vedi tutto</a>
            </div>
            <ul>
              <li>
                <span className="date">09 Ago</span>
                <span className="match">Everton 0 - 1 Salotto FC</span>
                <span className="label">Legends</span>
              </li>
              <li>
                <span className="date">05 Ago</span>
                <span className="match">Salotto FC 2 - 2 Inter</span>
                <span className="label">Femminile</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer ricco */}
      <footer className="club-footer">
        <div className="newsletter">
          <h3>Resta aggiornato con la nostra newsletter</h3>
          <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
            <input type="email" placeholder="La tua email" aria-label="Email" />
            <button type="submit">Iscriviti</button>
          </form>
          <small>Confermo di aver preso visione della privacy policy.</small>
        </div>
        <div className="legal">
          <p>&copy; 2024 Salotto FC – tutti i diritti riservati.</p>
          <p>Non ufficiale. I nomi/loghi citati appartengono ai rispettivi proprietari.</p>
        </div>
      </footer>
    </div>
  );
}
