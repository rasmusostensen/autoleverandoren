import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './OmOss.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" />
      <div className="container page-hero__content">
        <span className="page-hero__label section-label">Om oss</span>
        <h1 className="page-hero__title">Din lokale bilforhandler i Stavanger</h1>
        <p className="page-hero__text">
          Autoleverandøren AS er en lokal bilforhandler i Stavanger med over 20 års erfaring i bransjen.
        </p>
      </div>
    </section>
  )
}

function StorySection() {
  const ref = useScrollReveal()

  return (
    <section className="story" ref={ref}>
      <div className="container">
        <div className="story__grid">
          <div className="story__content" data-reveal="left">
            <span className="section-label">Vår historie</span>
            <h2 className="section-title">Erfaring og tillit gjennom 20 år</h2>
            <p className="section-text">
              Autoleverandøren AS er en bilforhandler i Stavanger som selger et bredt utvalg av bruktbiler
              i alle prisklasser. Kjøper du bil hos oss kan du være trygg på at du gjør en god handel.
              Alle våre bruktbiler leveres EU-godkjente med bruktbilgaranti og 14 dagers angrerett
              dersom ikke annet er oppgitt.
            </p>
            <p className="section-text" style={{ marginTop: '20px' }}>
              Vårt mål er å være den foretrukne forhandleren av bruktbiler i regionen og vi strekker oss
              derfor langt for å imøtekomme våre kunders behov og ønsker.
            </p>
          </div>
          <div className="story__visual" data-reveal="right">
            <div className="story__image-placeholder">
              <span>Bilde kommer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const ref = useScrollReveal()

  const values = [
    {
      title: 'Biler for enhver smak',
      text: 'Vi selger og kjøper biler som vi vet våre kunder vil ha. Hos oss finner du velholdte bruktbiler, fra små elbiler og småbiler til SUV-er og varebiler. Alle biler leveres i EU-godkjent tilstand og med bruktbilgaranti for å gi deg en ekstra trygghet når du skal kjøpe en bruktbil.',
    },
    {
      title: 'Autoreg-forhandler',
      text: 'Autoleverandøren AS er godkjent Autoreg-forhandler av Statens Vegvesen og ordner registreringen selv. Derfor kan vi levere bilen ferdig registrert alle dager i uken på få minutter.',
    },
    {
      title: 'Besøk oss',
      text: 'Ønsker du å komme innom oss for å se på våre biler? Visningslokalene til Autoleverandøren AS ligger sentralt til i Hillevåg bydel. Det er kort vei til både buss og tog, samt 10 minutter med bil fra Sola flyplass. Vi er behjelpelig med transport til våre lokaler dersom du kommer med fly, buss eller tog.',
    },
  ]

  return (
    <section className="values" ref={ref}>
      <div className="container">
        <div className="values__header" data-reveal="up">
          <span className="section-label">Hva vi tilbyr</span>
          <h2 className="section-title">Kvalitet i alle ledd</h2>
        </div>
        <div className="values__grid">
          {values.map((value, i) => (
            <div className="values__card" key={i} data-reveal="up" data-reveal-delay={String(i * 0.15)}>
              <div className="values__card-number">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="values__card-title">{value.title}</h3>
              <p className="values__card-text">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  const ref = useScrollReveal()

  return (
    <section className="cta-banner" ref={ref}>
      <div className="container">
        <div className="cta-banner__inner" data-reveal="scale">
          <h2 className="cta-banner__title">Velkommen innom for en god og trygg handel!</h2>
          <p className="cta-banner__text">
            Kjøpe bruktbil? Vi har flotte og velholdte bruktbiler til salgs til enhver tid.
          </p>
          <div className="cta-banner__actions">
            <Link to="/bruktbiler" className="btn-primary">
              Se våre biler
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/kontakt" className="btn-outline">Kontakt oss</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OmOss() {
  return (
    <PageTransition>
      <PageHero />
      <StorySection />
      <ValuesSection />
      <CtaBanner />
    </PageTransition>
  )
}
