import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Kontakt.css'

function PageHero() {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" />
      <div className="container page-hero__content">
        <span className="page-hero__label section-label">Kontakt</span>
        <h1 className="page-hero__title">Har du spørsmål om en bil eller ønsker å avtale en visning?</h1>
        <p className="page-hero__text">
          Send oss en melding via vårt kontaktskjema eller ring 454 18 964 for å avtale tid for visning.
        </p>
      </div>
    </section>
  )
}

function ContactForm() {
  const ref = useScrollReveal()
  const [formData, setFormData] = useState({
    navn: '',
    telefon: '',
    epost: '',
    melding: '',
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className="contact" ref={ref}>
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info" data-reveal="left">
            <h2 className="contact__info-title">Kontaktinformasjon</h2>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 11 7 11s7-5.75 7-11c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__info-label">Adresse</h4>
                <p>Sjøhagen 2, 4016 Stavanger</p>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 5.5A2.5 2.5 0 015.5 3h9A2.5 2.5 0 0117 5.5v9a2.5 2.5 0 01-2.5 2.5h-9A2.5 2.5 0 013 14.5v-9z" stroke="var(--color-gold)" strokeWidth="1.5"/>
                  <path d="M3 6l7 5 7-5" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__info-label">E-post</h4>
                <a href="mailto:kenneth@autoleverandoren.no">kenneth@autoleverandoren.no</a>
              </div>
            </div>

            <div className="contact__info-item">
              <div className="contact__info-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4h3l2 5-2.5 1.5A11 11 0 009.5 13.5L11 11l5 2v3a1 1 0 01-1 1A14 14 0 013 4a1 1 0 011-1z" stroke="var(--color-gold)" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <div>
                <h4 className="contact__info-label">Telefon</h4>
                <a href="tel:+4745418964">+47 454 18 964</a>
              </div>
            </div>

            <div className="contact__info-divider" />

            <div className="contact__hours">
              <h4 className="contact__info-label">Ordinære åpningstider</h4>
              <p>
                Vi er mye på kontoret, men for å være mest mulig fleksible har vi ikke faste åpningstider.
              </p>
              <p style={{ marginTop: '12px' }}>
                Ta kontakt så avtaler vi å møtes når det passer for deg, også kveld/helg etter avtale.
              </p>
              <p style={{ marginTop: '12px' }}>
                Vi henter deg gjerne på Sola flyplass eller Stavanger togstasjon.
              </p>
            </div>
          </div>

          <div className="contact__form-wrap" data-reveal="right">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__form-group">
                <label htmlFor="navn">Navn *</label>
                <input
                  type="text"
                  id="navn"
                  name="navn"
                  value={formData.navn}
                  onChange={handleChange}
                  required
                  placeholder="Ditt fulle navn"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="telefon">Telefon *</label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  required
                  placeholder="Ditt telefonnummer"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="epost">E-post *</label>
                <input
                  type="email"
                  id="epost"
                  name="epost"
                  value={formData.epost}
                  onChange={handleChange}
                  required
                  placeholder="Din e-postadresse"
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="melding">Melding</label>
                <textarea
                  id="melding"
                  name="melding"
                  rows="5"
                  value={formData.melding}
                  onChange={handleChange}
                  placeholder="Skriv din melding her..."
                />
              </div>

              <button type="submit" className="btn-primary contact__form-btn">
                Send melding
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapSection() {
  const ref = useScrollReveal()

  return (
    <section className="map-section" ref={ref}>
      <div className="container">
        <div className="map-section__inner" data-reveal="up">
          <div className="map-section__header">
            <span className="section-label">Finn oss</span>
            <h2 className="section-title">Sjøhagen 2, Stavanger</h2>
            <p className="section-text">
              Visningslokalene til Autoleverandøren AS ligger sentralt til i Hillevåg bydel.
              Det er kort vei til både buss og tog, samt 10 minutter med bil fra Sola flyplass.
            </p>
          </div>
          <div className="map-section__embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2100.5!2d5.7308!3d58.9535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a44f8d3e1e0001%3A0x0!2sSj%C3%B8hagen+2%2C+4016+Stavanger!5e0!3m2!1sno!2sno!4v1"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '4px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Autoleverandøren AS lokasjon"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Kontakt() {
  return (
    <PageTransition>
      <PageHero />
      <ContactForm />
      <MapSection />
    </PageTransition>
  )
}
