import { modules, categoriesMap } from './photos.js'
import { renderNav, initNav } from './nav.js'

// --- Foto para el resumen (about): al azar entre todas las categorias, menos pizza-cenital ---
const aboutPhotoPool = Object.entries(categoriesMap)
  .filter(([category]) => category !== 'pizza-cenital')
  .flatMap(([, files]) => files)
const aboutPhoto = aboutPhotoPool.length
  ? aboutPhotoPool[Math.floor(Math.random() * aboutPhotoPool.length)]
  : ''

// --- Marquee de palabras: config y helpers ---
const allPhotos = Object.values(modules)
const marqueeRows = [
  { word: 'PIZZA', dir: 'left' },
  { word: 'SCHIACCIATA', dir: 'right' },
  { word: 'CALZONES', dir: 'left' },
  { word: 'NEGRONI', dir: 'right' },
  { word: 'BIRRA', dir: 'left' },
  { word: 'TIRAMISÚ', dir: 'right' },
]
const MARQUEE_REPEATS = 12 // cuantas veces se repite la palabra por tramo (asegura loop sin cortes)
const MARQUEE_ACCENT_CHANCE = 0.05 // probabilidad de que una repeticion salga en rojo
const MARQUEE_SPEED = 55 // px por segundo: misma velocidad visual para todas las filas
const MARQUEE_FONT = { family: 'var(--font-body)', weight: 900 } // Spirits Neutral Black

function buildMarqueeTrack(word, accentPattern) {
  return `
    <div class="marquee-track">
      ${accentPattern.map((isAccent) => `<span class="${isAccent ? 'is-accent' : ''}">${word}</span>`).join('')}
    </div>
  `
}

const marqueeRowsHtml = marqueeRows
  .map((row) => {
    const accentPattern = Array.from({ length: MARQUEE_REPEATS }, () => Math.random() < MARQUEE_ACCENT_CHANCE)
    return `
    <div class="marquee-row marquee-${row.dir}">
      ${buildMarqueeTrack(row.word, accentPattern)}
      ${buildMarqueeTrack(row.word, accentPattern)}
    </div>
  `
  })
  .join('')

const marqueePhoto = allPhotos.length ? allPhotos[Math.floor(Math.random() * allPhotos.length)] : ''

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <div class="hero">
    <img src="/malandrino-3d-negro.svg" alt="Malandrino" class="hero-logo" />
  </div>
  <section class="about-section">
    <div class="about-text">
      <span class="about-kicker">Malandrino</span>
      <h2 class="about-heading">Simple.<br />Auténtico.<br />Nuestro.</h2>
      <p class="about-copy">Pizzería, schiacciateria y bar cultural en pleno San Juan capital. Masa de fermentación larga con biga y horneado a la piedra. Además de pizzas y schiacciatas, tenés tragos clásicos, buena música en vivo y un ambiente pensado para el encuentro.</p>
    </div>
    <div class="about-photo">
      <img src="${aboutPhoto}" alt="Pizza de Malandrino" class="about-photo-img" />
    </div>
  </section>
  <section class="word-marquee" style="font-family:${MARQUEE_FONT.family};font-weight:${MARQUEE_FONT.weight}">
    <div class="word-marquee-rows">
      ${marqueeRowsHtml}
    </div>
    <img src="${marqueePhoto}" alt="" class="word-marquee-image" />
  </section>
  <section class="map-section" id="ubicacion">
    <a href="https://maps.app.goo.gl/jLTDVqsv6c8ZxT6M9" target="_blank" rel="noopener" class="map-link" aria-label="Ver Malandrino en Google Maps">
      <img src="/map.svg" alt="Mapa de ubicación de Malandrino" class="map-image" />
    </a>
  </section>
  <footer class="site-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="/malandrino-hrizontal-blanco.svg" alt="Malandrino" class="footer-logo" />
        <p class="footer-line">Urquiza Sur 991, Capital, San Juan</p>
        <p class="footer-line">Miércoles a Domingo &middot; 20:00 a 02:00</p>
      </div>

      <div class="footer-extra">
        <p class="footer-extra-title">Más</p>
        <a href="https://forms.gle/fgz293U4Pm69zvH78" target="_blank" rel="noopener" class="footer-extra-link">Sumate al equipo</a>
        <a href="https://forms.gle/yp7Q11MC4cFJqdnk8" target="_blank" rel="noopener" class="footer-extra-link">Organizá tu evento en Malandrino</a>
        <a href="https://forms.gle/KEa8T3n4dSS7wmZX7" target="_blank" rel="noopener" class="footer-extra-link">Encuesta de satisfacción</a>
      </div>

      <div class="footer-links">
        <a href="https://instagram.com/malandrino.sj" target="_blank" rel="noopener" class="footer-social">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 9.837a3.837 3.837 0 1 1 0-7.674 3.837 3.837 0 0 1 0 7.674zm6.406-10.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          <span>@malandrino.sj</span>
        </a>
        <a href="https://wa.me/542646273034" target="_blank" rel="noopener" class="footer-social">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.148.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.412-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2c-5.514 0-9.996 4.48-9.996 9.997 0 1.762.462 3.484 1.34 5.003L2 22l5.117-1.342a9.96 9.96 0 0 0 4.887 1.244h.004c5.514 0 9.996-4.48 9.996-9.997C21.996 6.48 17.518 2 12.004 2zm5.835 15.827a8.283 8.283 0 0 1-5.835 2.416h-.003a8.294 8.294 0 0 1-4.226-1.157l-.303-.18-3.036.797.81-2.96-.198-.304a8.278 8.278 0 0 1-1.27-4.426c0-4.583 3.73-8.312 8.316-8.312a8.266 8.266 0 0 1 5.878 2.437 8.262 8.262 0 0 1 2.432 5.876 8.282 8.282 0 0 1-2.412 5.813z"/></svg>
          <span>+54 264 627-3034</span>
        </a>
        <a href="tel:+542646273034" class="footer-social">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
          <span>+54 264 627-3034</span>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Malandrino. Todos los derechos reservados.</p>
    </div>
  </footer>
`

initNav()

// --- Inclinacion 3D segun posicion del mouse (reutilizable) ---
function setupTilt(containerEl, targetEl, maxTilt = 16, baseTransform = '') {
  if (!containerEl || !targetEl) return
  // baseTransform: para elementos que ya tienen un transform propio (ej. centrado con
  // translate(-50%,-50%) o una rotacion fija) y no lo pueden perder al aplicar el tilt.
  const prefix = baseTransform ? `${baseTransform} ` : ''

  containerEl.addEventListener('mousemove', (event) => {
    const rect = containerEl.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5 // -0.5 a 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5

    const rotateY = relX * maxTilt * 2
    const rotateX = -relY * maxTilt * 2

    targetEl.style.transform = `${prefix}perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  containerEl.addEventListener('mouseleave', () => {
    targetEl.style.transform = `${prefix}perspective(900px) rotateX(0deg) rotateY(0deg)`
  })
}

// Logo del hero
setupTilt(document.querySelector('.hero'), document.querySelector('.hero-logo'))

// Imagen del marquee (mismo movimiento que el logo del hero; mantiene su centrado y su inclinacion fija de 3deg como base)
setupTilt(
  document.querySelector('.word-marquee'),
  document.querySelector('.word-marquee-image'),
  16,
  'translate(-50%, -50%) rotate(3deg)'
)

// --- Marquee: ajusta la duracion de cada fila segun su ancho real, para que todas
// se desplacen a la misma velocidad en px/seg (no en segundos por vuelta) ---
function syncMarqueeSpeeds() {
  document.querySelectorAll('.marquee-row').forEach((row) => {
    const track = row.querySelector('.marquee-track')
    if (!track) return
    const width = track.getBoundingClientRect().width
    if (width > 0) {
      row.style.animationDuration = `${width / MARQUEE_SPEED}s`
    }
  })
}

syncMarqueeSpeeds()
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(syncMarqueeSpeeds)
}
