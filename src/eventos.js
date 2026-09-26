import { renderNav, initNav } from './nav.js'

const tocarFormHref = 'https://forms.gle/2KYuxFMatmJvtSn48'

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="eventos-page">
    <header class="eventos-header">
      <span class="eventos-kicker">Malandrino</span>
      <h1 class="eventos-heading">Eventos</h1>
      <p class="eventos-copy">Música en vivo y programación cultural, parte de lo que somos.</p>
    </header>

    <section class="agenda-section">
      <h2 class="agenda-title">Agenda cultural</h2>
      <div class="agenda-placeholder">
        <p>Estamos armando el calendario. Muy pronto vas a poder ver acá los próximos shows y eventos.</p>
        <a href="https://instagram.com/malandrino.sj" target="_blank" rel="noopener" class="agenda-link">Mientras tanto, seguinos en @malandrino.sj</a>
      </div>
    </section>

    <section class="tocar-section">
      <div class="tocar-content">
        <h2 class="tocar-title">¿Sos artista o músico?</h2>
        <p class="tocar-copy">Si querés tocar en Malandrino, contanos sobre tu propuesta.</p>
        <a href="${tocarFormHref}" target="_blank" rel="noopener" class="tocar-button">Quiero tocar en Malandrino</a>
      </div>
    </section>
  </main>
`

initNav()
