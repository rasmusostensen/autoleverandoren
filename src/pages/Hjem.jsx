import { useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Hjem.css'

gsap.registerPlugin(ScrollTrigger)

function HeroSection() {
  const trackRef = useRef(null)
  const videoRef = useRef(null)
  const uiRef = useRef(null)

  const setVideoRef = useCallback((node) => {
    if (node) {
      node.muted = true
      node.setAttribute('muted', '')
      node.setAttribute('playsinline', '')
      node.setAttribute('autoplay', '')
    }
    videoRef.current = node
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const video = videoRef.current
    const ui = uiRef.current
    if (!track || !video || !ui) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      track.style.height = '100dvh'
      const setFrame = () => { video.currentTime = 1.2 }
      video.addEventListener('loadedmetadata', setFrame)
      return () => video.removeEventListener('loadedmetadata', setFrame)
    }

    let target = 0
    let current = 0
    let raf = 0
    let duration = 0

    const onMeta = () => { duration = video.duration }
    video.addEventListener('loadedmetadata', onMeta)
    if (video.readyState >= 1) onMeta()

    const forceLoad = () => {
      video.muted = true
      const p = video.play()
      if (p) {
        p.then(() => {
          video.pause()
          video.currentTime = 0
        }).catch(() => {})
      }
    }
    if (video.readyState >= 2) forceLoad()
    else video.addEventListener('canplay', forceLoad, { once: true })

    const ctx = gsap.context(() => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            if (duration) target = self.progress * (duration - 0.1)
            const fade = Math.max(0, 1 - self.progress * 4)
            ui.style.opacity = String(fade)
            ui.style.visibility = fade <= 0 ? 'hidden' : 'visible'
          },
        },
      })
    }, track)

    const tick = () => {
      if (duration) {
        current += (target - current) * 0.1
        if (Math.abs(video.currentTime - current) > 0.015) {
          video.currentTime = current
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('canplay', forceLoad)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={trackRef} className="hero-track">
      <div className="hero-stage">
        <video
          ref={setVideoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          className="hero-video"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-fade" />

        <div className="hero-ui" ref={uiRef}>
          <div className="hero-meta">
            <span className="hero-small-label hero-anim-fade" style={{ animationDelay: '0.2s' }}>Autoleverandøren AS</span>
            <div className="hero-meta-mid hero-anim-fade" style={{ animationDelay: '0.3s' }}>
              <span className="hero-year">Stavanger</span>
            </div>
            <div className="hero-notes hero-anim-fade" style={{ animationDelay: '0.4s' }}>
              <span className="hero-note">Garanti</span>
              <span className="hero-note">Finansiering</span>
              <span className="hero-note">Forsikring</span>
            </div>
          </div>

          <div className="hero-title-wrap hero-anim">
            <h1 className="hero-title" aria-label="Autoleverandøren">
              <span className="hero-title-line" aria-hidden="true">
                {'AUTOLEVERANDØREN'.split('').map((c, i) => (
                  <span className="char" key={i} style={{ animationDelay: `${0.5 + i * 0.04}s` }}>{c}</span>
                ))}
              </span>
            </h1>
            <p className="hero-subtitle-text hero-anim-fade" style={{ animationDelay: '1.2s' }}>Bilforhandler i Stavanger</p>
          </div>

          <dl className="hero-glass hero-anim-fade" style={{ animationDelay: '1.3s' }}>
            <dt>Firma</dt><dd>Autoleverandøren AS</dd>
            <dt>Sted</dt><dd>Sjøhagen 2, Stavanger</dd>
            <dt>Telefon</dt><dd>454 18 964</dd>
            <dt>Type</dt><dd>Bruktbilforhandler</dd>
            <dt>Garanti</dt><dd>Min. 3 mnd / 3 000 km</dd>
          </dl>

          <div className="hero-bottom hero-anim-fade" style={{ animationDelay: '1.4s' }}>
            <div className="hero-actions">
              <Link to="/bruktbiler" className="btn-primary">
                Biler til salgs
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/kontakt" className="btn-outline">Kontakt oss</Link>
            </div>
            <div className="hero-paragraphs">
              <p>
                Velkommen til Autoleverandøren AS - din bilforhandler i Stavanger.
                Alle bruktbiler leveres EU-godkjente med bruktbilgaranti.
              </p>
              <p>
                Over 20 års erfaring i bransjen. Vi strekker oss langt for å
                imøtekomme våre kunders behov og ønsker.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Marquee() {
  const items = [
    'Bruktbiler', 'Garanti', 'Finansiering', 'Forsikring',
    'Innbytte', 'Registrering', 'Frakt', 'EU-godkjent',
  ]

  return (
    <div className="marquee">
      <div className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <span className="marquee__item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}

function ServicesSection() {
  const ref = useScrollReveal()

  const services = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 2L20 10L29 11.5L22.5 18L24 27L16 22.5L8 27L9.5 18L3 11.5L12 10L16 2Z" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Trygghet i garanti',
      text: 'På alle bilene vi selger medfølger det garanti. Dersom bilen ikke har nybilgaranti medfølger det alltid minst 3 måneder / 3 000 kilometers garanti for at du skal være trygg etter bilkjøpet. Garanti kan alltid utvides mot et tillegg i prisen og leveres av vår samarbeidspartner AutoConsept.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="20" rx="2" stroke="var(--color-gold)" strokeWidth="1.5"/>
          <path d="M4 12h24M10 18h4M10 22h8" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Lån til ny bruktbil',
      text: 'Autoleverandøren AS er behjelpelig med finansiering av din neste bil! Vi samarbeider med de beste finansieringsselskaper som tilbyr svært gunstige lånebetingelser og rask behandlingstid. Send inn lånesøknad i dag og din drømmebil vil snart bli din.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="var(--color-gold)" strokeWidth="1.5"/>
          <path d="M16 8v8l5 3" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Forsikring for deg og bilen',
      text: 'Når du kjøper bil er det viktig at du har forsikringspapirene i orden. Vi skaffer meget gunstig forsikring via vår samarbeidspartner IF. Snakk med oss om hva dine behov er og vi vil finne en forsikring som er tilpasset deg og din bil. Kontakt oss for et uforpliktende tilbud.',
    },
  ]

  return (
    <section className="services" ref={ref}>
      <div className="container">
        <div className="services__header" data-reveal="up">
          <span className="section-label">Trygt bilkjøp med gode betingelser</span>
          <h2 className="section-title">Vi tar vare på deg</h2>
        </div>
        <div className="services__grid">
          {services.map((service, i) => (
            <div className="services__card" key={i} data-reveal="up" data-reveal-delay={String(i * 0.15)}>
              <div className="services__card-icon">{service.icon}</div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-text">{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  const ref = useScrollReveal()

  return (
    <section className="about-preview" ref={ref}>
      <div className="container">
        <div className="about-preview__inner">
          <div className="about-preview__content" data-reveal="left">
            <span className="section-label">Om oss</span>
            <h2 className="section-title">Din lokale bilforhandler i Stavanger</h2>
            <p className="section-text">
              Autoleverandøren AS er en lokal bilforhandler i Stavanger med over 20 års erfaring i bransjen.
              Vårt mål er å være den foretrukne forhandleren av bruktbiler i regionen og vi strekker oss
              derfor langt for å imøtekomme våre kunders behov og ønsker.
            </p>
            <div className="about-preview__stats">
              <div className="about-preview__stat">
                <span className="about-preview__stat-number">20+</span>
                <span className="about-preview__stat-label">Års erfaring</span>
              </div>
              <div className="about-preview__stat">
                <span className="about-preview__stat-number">1000+</span>
                <span className="about-preview__stat-label">Fornøyde kunder</span>
              </div>
              <div className="about-preview__stat">
                <span className="about-preview__stat-number">365</span>
                <span className="about-preview__stat-label">Dager i året</span>
              </div>
            </div>
            <Link to="/om-oss" className="btn-outline" style={{ marginTop: '36px' }}>
              Les mer om oss
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="about-preview__visual" data-reveal="right">
            <div className="about-preview__image-frame">
              <div className="about-preview__image-placeholder">
                <span>Bilde kommer</span>
              </div>
              <div className="about-preview__image-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const ref = useScrollReveal()

  return (
    <section className="cta-section" ref={ref}>
      <div className="container">
        <div className="cta-section__inner" data-reveal="scale">
          <span className="section-label">Lyst til å se eller prøvekjøre bil?</span>
          <h2 className="cta-section__title">
            Send oss en melding eller ring oss for å avtale visning av bilen og en prøvetur
          </h2>
          <p className="cta-section__text">
            Ved å gi oss beskjed på forhånd kan vi se til at bilen står klar for deg.
            Du finner oss i flotte lokaler i Sjøhagen 2 i Hillevåg bak Patrioten Bistro.
          </p>
          <div className="cta-section__actions">
            <Link to="/kontakt" className="btn-primary">
              Avtale visning
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="tel:+4745418964" className="btn-outline">
              Ring 454 18 964
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function AdditionalServices() {
  const ref = useScrollReveal()

  const items = [
    {
      title: 'Registrering',
      text: 'Vi er godkjent Autoreg-forhandler av Statens Vegvesen. Vi leverer ferdig registrert bil, alle dager i uken, på bare noen få minutter. Ved kjøp av bil må enten BankID, kodebrikke eller BankID på mobil være tilgjengelig.',
    },
    {
      title: 'Frakt av bil',
      text: 'Har du kjøpt bil og ønsker å få den levert et annet sted i landet? Autoleverandøren AS tilbyr rimelig frakt av din nye bil uansett hvor du bor i Norge. Ring for pristilbud.',
    },
    {
      title: 'Innbytte og kjøp',
      text: 'Ønsker du å bytte inn din gamle bil? Vi tar gjerne din bil i innbytte ved kjøp av ny bruktbil. Vi kan også være behjelpelig med kjøp. Ta kontakt for en vurdering og et innbyttetilbud.',
    },
  ]

  return (
    <section className="additional" ref={ref}>
      <div className="container">
        <div className="additional__header" data-reveal="up">
          <span className="section-label">Flere tjenester</span>
          <h2 className="section-title">Alt du trenger samlet</h2>
        </div>
        <div className="additional__grid">
          {items.map((item, i) => (
            <div className="additional__item" key={i} data-reveal="up" data-reveal-delay={String(i * 0.15)}>
              <span className="additional__number">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="additional__item-title">{item.title}</h3>
              <p className="additional__item-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Hjem() {
  return (
    <PageTransition>
      <HeroSection />
      <Marquee />
      <ServicesSection />
      <AboutPreview />
      <AdditionalServices />
      <CTASection />
    </PageTransition>
  )
}
