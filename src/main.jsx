import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

const params = new URLSearchParams(window.location.search)
const redirect = params.get('redirect')
if (redirect) {
  window.history.replaceState(null, '', '/autoleverandoren' + redirect)
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/autoleverandoren">
    <App />
  </BrowserRouter>,
)
