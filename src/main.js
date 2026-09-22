// Importa automaticamente todas las fotos de cada carpeta en src/assets/photos/.
// Al agregar una foto nueva en una de esas carpetas, aparece sola aca sin tocar codigo.
const modules = import.meta.glob('/src/assets/photos/*/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', {
  eager: true,
  import: 'default',
})

const categoriesMap = {}
for (const path in modules) {
  const match = path.match(/\/photos\/([^/]+)\//)
  if (!match) continue
  const category = match[1]
  if (!categoriesMap[category]) categoriesMap[category] = []
  categoriesMap[category].push(modules[path])
}
Object.values(categoriesMap).forEach((files) => files.sort())

// Orden y titulo de cada seccion. Si una carpeta no tiene fotos todavia, se omite sola.
const sectionOrder = [
  { key: 'lugar', title: 'EL LUGAR' },
  { key: 'pizzas', title: 'PIZZAS' },
  { key: 'schiacciatas', title: 'SCHIACCIATAS' },
  { key: 'calzones', title: 'CALZONES' },
  { key: 'picadas', title: 'PICADAS' },
  { key: 'papas-fritas', title: 'PAPAS FRITAS' },
  { key: 'postres', title: 'POSTRES' },
  { key: 'bebidas', title: 'BEBIDAS' },
]

const gallerySections = sectionOrder
  .filter((section) => categoriesMap[section.key]?.length)
  .map(
    (section) => `
    <section class="photo-section" data-category="${section.key}">
      <div class="hscroll-full" tabindex="0">
        <div class="hscroll-full-track">
          ${categoriesMap[section.key]
            .map(
              (src) => `
            <div class="hscroll-full-slide" style="background-image:url('${src}')">
              <div class="cinematic-overlay">
                <h3 class="cinematic-title">${section.title}</h3>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `
  )
  .join('')

document.querySelector('#app').innerHTML = `
  <nav class="navbar">
    <a href="/" class="navbar-logo-link" aria-label="Ir al inicio">
      <img src="/malandrino-favicon-blanco.svg" alt="Malandrino" class="navbar-logo" />
      <span class="navbar-logo-text">Inicio</span>
    </a>

    <a href="#reserva" class="nav-link">Reserva</a>
    <a href="#pedir" class="nav-cta">Pedí ya</a>

    <div class="nav-dropdown">
      <button class="dropdown-toggle" type="button" aria-expanded="false">
        Menú
      </button>
      <ul class="dropdown-menu">
        <li><a href="#ubicacion">Ubicación</a></li>
        <li><a href="#carta">Carta</a></li>
        <li><a href="#local">Local</a></li>
        <li><a href="#platos">Platos</a></li>
      </ul>
    </div>
  </nav>
  <div class="hero">
    <img src="/malandrino-3d-negro.svg" alt="Malandrino" class="hero-logo" />
  </div>
  <section class="map-section">
    <img src="/map.svg" alt="Mapa de ubicación de Malandrino" class="map-image" />
  </section>
  ${gallerySections}
`

// --- Dropdown del nav ---
const dropdown = document.querySelector('.nav-dropdown')
const toggle = document.querySelector('.dropdown-toggle')

toggle.addEventListener('click', (event) => {
  event.stopPropagation()
  const isOpen = dropdown.classList.toggle('open')
  toggle.setAttribute('aria-expanded', String(isOpen))
})

document.addEventListener('click', () => {
  dropdown.classList.remove('open')
  toggle.setAttribute('aria-expanded', 'false')
})

// --- Logo del hero: inclinacion 3D segun posicion del mouse ---
const heroEl = document.querySelector('.hero')
const heroLogoEl = document.querySelector('.hero-logo')

if (heroEl && heroLogoEl) {
  const MAX_TILT = 16 // grados maximos de inclinacion

  heroEl.addEventListener('mousemove', (event) => {
    const rect = heroEl.getBoundingClientRect()
    const relX = (event.clientX - rect.left) / rect.width - 0.5 // -0.5 a 0.5
    const relY = (event.clientY - rect.top) / rect.height - 0.5

    const rotateY = relX * MAX_TILT * 2
    const rotateX = -relY * MAX_TILT * 2

    heroLogoEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  })

  heroEl.addEventListener('mouseleave', () => {
    heroLogoEl.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  })
}

// --- Nav: se esconde al bajar, reaparece al subir (siempre visible al tope) ---
const navbarEl = document.querySelector('.navbar')
let lastScrollY = window.scrollY

window.addEventListener(
  'scroll',
  () => {
    const currentY = window.scrollY

    if (currentY <= 0) {
      navbarEl.classList.remove('nav-hidden')
    } else if (currentY > lastScrollY) {
      // scrolleando hacia abajo
      navbarEl.classList.add('nav-hidden')
    } else {
      // scrolleando hacia arriba
      navbarEl.classList.remove('nav-hidden')
    }

    lastScrollY = currentY
  },
  { passive: true }
)

// --- Sliders full-bleed por categoria (patron 4: fade in, no vuelve a blanco) ---
document.querySelectorAll('.hscroll-full').forEach((container) => {
  const slides = container.querySelectorAll('.hscroll-full-slide')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { root: container, threshold: 0.6 }
  )
  slides.forEach((slide) => observer.observe(slide))
})
