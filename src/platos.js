import { categoriesMap, sectionOrder } from './photos.js'
import { renderNav, initNav } from './nav.js'

// Categorias de la galeria de platos: todas menos "lugar" (esa es solo para la home).
const platosSections = sectionOrder.filter(
  ({ key, title }) => key !== 'lugar' && categoriesMap[key] && categoriesMap[key].length
)

function buildCarouselSlides(photos, categoryTitle) {
  return photos
    .map(
      (src, i) => `
    <div class="platos-carousel-slide" style="background-image:url('${src}')">
      <div class="cinematic-overlay">
        <span class="cinematic-caption">${categoryTitle} · ${String(i + 1).padStart(2, '0')}/${String(photos.length).padStart(2, '0')}</span>
      </div>
    </div>`
    )
    .join('')
}

const platosCardsHtml = platosSections
  .map(({ key, title }) => {
    const photos = categoriesMap[key]
    return `
    <article class="platos-card" data-category="${key}">
      <div class="platos-card-header">
        <h2 class="platos-card-title">${title}</h2>
      </div>
      <div class="platos-carousel">
        ${buildCarouselSlides(photos, title)}
      </div>
      ${
        photos.length > 1
          ? `<button type="button" class="platos-carousel-arrow platos-carousel-arrow--prev" aria-label="Anterior">&larr;</button>
      <button type="button" class="platos-carousel-arrow platos-carousel-arrow--next" aria-label="Siguiente">&rarr;</button>`
          : ''
      }
    </article>`
  })
  .join('')

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="platos-page">
    <header class="platos-header">
      <h1 class="platos-heading">Nuestros Platos</h1>
    </header>
    <div class="platos-grid">
      ${platosCardsHtml}
    </div>
  </main>
`

initNav()

// --- Fade-in de cada slide al entrar en pantalla ---
const slideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  },
  { threshold: 0.4 }
)
document.querySelectorAll('.platos-carousel-slide').forEach((slide) => slideObserver.observe(slide))

// --- Flechas de navegacion del carrusel ---
document.querySelectorAll('.platos-card').forEach((card) => {
  const carousel = card.querySelector('.platos-carousel')
  const prevBtn = card.querySelector('.platos-carousel-arrow--prev')
  const nextBtn = card.querySelector('.platos-carousel-arrow--next')
  if (!carousel) return

  const scrollByOneSlide = (dir) => {
    const slideWidth = carousel.clientWidth
    carousel.scrollBy({ left: dir * slideWidth, behavior: 'smooth' })
  }

  prevBtn?.addEventListener('click', () => scrollByOneSlide(-1))
  nextBtn?.addEventListener('click', () => scrollByOneSlide(1))
})
