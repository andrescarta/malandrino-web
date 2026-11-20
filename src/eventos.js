import { renderNav, initNav } from './nav.js'
import { videoHTML, videoDialogHTML, initVideos } from './prop-ui.js'

const tocarFormHref = 'https://forms.gle/2KYuxFMatmJvtSn48'
const igHref = 'https://instagram.com/malandrino.sj'

const cultura = [
  ['01', 'Público en una noche de Sop Sopa'],
  ['02', 'Público en un evento del local'],
  ['03', 'Banda en vivo en Notte Italiana, vista desde arriba'],
  ['04', 'DJ en vivo'],
  ['05', 'Mesas llenas en Sop Sopa'],
  ['06', 'Gente charlando en un evento'],
  ['07', 'Brindis'],
  ['08', 'Patio en una noche de Sop Sopa'],
]

const videos = [
  { id: 'drone', titulo: 'El local desde el aire', duracion: '1:01', land: true },
  { id: 'social', titulo: 'Social', duracion: '0:11' },
  { id: 'schiacciata', titulo: 'Schiacciata', duracion: '0:20' },
  { id: 'pizza', titulo: 'Pizza', duracion: '0:13' },
  { id: 'ultimo', titulo: 'Armando la pizza', duracion: '0:19' },
  { id: 'calzone-vermouth', titulo: 'Calzone y vermut', duracion: '0:08' },
  { id: 'hielo', titulo: 'Vermut con hielo', duracion: '0:18' },
  { id: 'comanda', titulo: 'Comanda', duracion: '0:15' },
  { id: 'iced-coffee', titulo: 'Café helado', duracion: '0:13' },
]

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="prop">
    <header class="prop-hero">
      <div class="prop-wrap">
        <p class="prop-kicker">Malandrino · Agenda cultural</p>
        <h1>Eventos<span>Parte de lo que somos</span></h1>
        <p class="prop-lead">Música en vivo, poesía, catas con productores y artistas de San Juan. La planta alta, con barra propia, recibe eventos de hasta 70 personas.</p>
        <div class="prop-actions">
          <a href="${igHref}" target="_blank" rel="noopener" class="prop-btn">Ver la agenda en Instagram</a>
          <a href="${tocarFormHref}" target="_blank" rel="noopener" class="prop-btn ghost">Quiero tocar en Malandrino</a>
        </div>
      </div>
    </header>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">01</span><h2>Lo que pasa acá</h2></div>
        <div class="prop-cards">
          <div class="prop-card"><h3>Música en vivo</h3><p>Jams de músicos, noches de jazz y live sets de música electrónica.</p></div>
          <div class="prop-card"><h3>Boca de Zorro</h3><p>El slam poético de San Juan, con dos ediciones en Malandrino.</p></div>
          <div class="prop-card"><h3>Catas y maridajes</h3><p>Con productores locales: aceite de oliva, vinos, aceto y dulces.</p></div>
          <div class="prop-card"><h3>Arte y talleres</h3><p>Exposiciones, y talleres de telar, tejido y cerámica.</p></div>
        </div>

        <p class="prop-subtitle" style="margin-top:48px">Con los de acá</p>
        <p class="prop-intro" style="margin-bottom:16px">Nos gusta darles un lugar en nuestras mesas a los otros emprendimientos de San Juan.</p>
        <ul class="prop-list">
          <li><strong>Productos locales.</strong> Vinos, destilados, aceite de oliva y aceitunas de productores sanjuaninos, y en la cocina priorizamos proveedores de acá.</li>
          <li><strong>Eventos con productores.</strong> Cata de aceite de oliva con Montefino; maridaje con Montefino, aceto Donna Arletti y dulces de Entre Raíces; cata y maridaje con Obon Wines.</li>
          <li><strong>Espacio para artistas.</strong> Si tenés una propuesta, <a href="${tocarFormHref}" target="_blank" rel="noopener">contanos</a>.</li>
        </ul>

        <div class="prop-gallery">
          ${cultura.map(([n, alt]) => `<figure class="prop-ph"><img src="/eventos/fotos/${n}.jpg" alt="${alt}" loading="lazy"></figure>`).join('')}
        </div>
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">02</span><h2>Malandrino en movimiento</h2></div>
        <p class="prop-muted" style="margin:0">Tocá un video para verlo.</p>
        <div class="prop-videos">
          ${videos.map((v) => videoHTML({ src: `/eventos/videos/${v.id}.mp4`, poster: `/eventos/videos/${v.id}.jpg`, titulo: v.titulo, duracion: v.duracion, land: v.land })).join('')}
        </div>
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">03</span><h2>¿Sos artista o músico?</h2></div>
        <p class="prop-intro">Si querés tocar o mostrar lo tuyo en Malandrino, contanos sobre tu propuesta.</p>
        <a href="${tocarFormHref}" target="_blank" rel="noopener" class="prop-btn">Quiero tocar en Malandrino</a>
      </div>
    </section>
  </main>
  ${videoDialogHTML}
`

initNav()
initVideos()
