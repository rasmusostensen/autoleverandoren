import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">A</span>
            <span className="footer__logo-text">Autoleverandøren</span>
          </div>
          <p className="footer__tagline">
            Din bilforhandler i Stavanger med over 20 års erfaring i bransjen.
          </p>
        </div>

        <div className="footer__columns">
          <div className="footer__col">
            <h4 className="footer__col-title">Sider</h4>
            <ul>
              <li><Link to="/">Hjem</Link></li>
              <li><Link to="/bruktbiler">Bruktbiler</Link></li>
              <li><Link to="/om-oss">Om oss</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Tjenester</h4>
            <ul>
              <li><Link to="/bruktbiler">Bilsalg</Link></li>
              <li><Link to="/kontakt">Finansiering</Link></li>
              <li><Link to="/kontakt">Forsikring</Link></li>
              <li><Link to="/kontakt">Innbytte</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Kontakt</h4>
            <ul>
              <li>
                <a href="tel:+4745418964">+47 454 18 964</a>
              </li>
              <li>
                <a href="mailto:kenneth@autoleverandoren.no">kenneth@autoleverandoren.no</a>
              </li>
              <li>Sjøhagen 2, 4016 Stavanger</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>&copy; {new Date().getFullYear()} Autoleverandøren AS. Alle rettigheter reservert.</p>
        <p className="footer__credit">
          Utviklet av{' '}
          <a
            href="https://rasmusostensen.github.io/Pixora/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixora
          </a>
        </p>
      </div>
    </footer>
  )
}
