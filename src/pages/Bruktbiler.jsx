import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Bruktbiler.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" />
      <div className="container page-hero__content">
        <span className="page-hero__label section-label">Bruktbiler</span>
        <h1 className="page-hero__title">Bruktbiler til salg</h1>
        <p className="page-hero__text">
          Sjekk ut våre velholdte og godt utstyrte biler som står klare for nye eiere.
        </p>
      </div>
    </section>
  )
}

function FinnSection() {
  const ref = useScrollReveal()

  return (
    <section className="finn-section" ref={ref}>
      <div className="container">
        <div className="finn-section__content" data-reveal="up">
          <div className="finn-section__icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="10" width="36" height="28" rx="3" stroke="var(--color-gold)" strokeWidth="1.5"/>
              <path d="M6 18h36M14 26h8M14 32h12" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="34" cy="30" r="6" stroke="var(--color-gold)" strokeWidth="1.5"/>
              <path d="M38.5 34.5L42 38" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="section-title">Se alle våre biler på Finn.no</h2>
          <p className="section-text" style={{ margin: '0 auto 40px' }}>
            Vi legger ut alle våre biler på Finn.no med detaljerte bilder og beskrivelser.
            Klikk knappen under for å se vårt komplette utvalg.
          </p>
          <a
            href="https://www.finn.no/pw/search/car-norway?orgId=9104049"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary finn-section__btn"
          >
            Se våre biler på Finn.no
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function InfoCards() {
  const ref = useScrollReveal()

  const cards = [
    {
      title: 'EU-godkjent',
      text: 'Alle våre bruktbiler leveres EU-godkjente med bruktbilgaranti og 14 dagers angrerett dersom ikke annet er oppgitt.',
    },
    {
      title: 'Garanti inkludert',
      text: 'På alle bilene vi selger medfølger det garanti. Minst 3 måneder / 3 000 kilometers garanti for din trygghet.',
    },
    {
      title: 'Finansiering',
      text: 'Vi samarbeider med de beste finansieringsselskaper som tilbyr svært gunstige lånebetingelser og rask behandlingstid.',
    },
    {
      title: 'Frakt i hele Norge',
      text: 'Har du kjøpt bil og ønsker å få den levert et annet sted i landet? Vi tilbyr rimelig frakt uansett hvor du bor.',
    },
  ]

  return (
    <section className="info-cards" ref={ref}>
      <div className="container">
        <div className="info-cards__header" data-reveal="up">
          <span className="section-label">Hvorfor handle hos oss</span>
          <h2 className="section-title">Trygt bilkjøp</h2>
        </div>
        <div className="info-cards__grid">
          {cards.map((card, i) => (
            <div className="info-cards__card" key={i} data-reveal="up" data-reveal-delay={String(i * 0.1)}>
              <div className="info-cards__card-line" />
              <h3 className="info-cards__card-title">{card.title}</h3>
              <p className="info-cards__card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Bruktbiler() {
  return (
    <PageTransition>
      <PageHero />
      <FinnSection />
      <InfoCards />
    </PageTransition>
  )
}
