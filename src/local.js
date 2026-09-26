import { renderNav, initNav } from './nav.js'

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="local-page">
    <header class="local-header">
      <span class="local-kicker">Malandrino</span>
      <h1 class="local-heading">El Lugar</h1>
    </header>

    <section class="local-placeholder-section">
      <div class="local-placeholder">
        <p>Muy pronto vas a poder ver acá fotos del local.</p>
      </div>
    </section>
  </main>
`

initNav()
