import { categoriesMap, sectionOrder } from './photos.js'
import { renderNav, initNav } from './nav.js'

// Categorias de la carta: todas menos "lugar" (esa es solo para la home).
const cartaSections = sectionOrder.filter(
  ({ key, title }) => key !== 'lugar' && categoriesMap[key] && categoriesMap[key].length
)

function buildCarouselSlides(photos, categoryTitle) {
  return photos
    .map(
      (src, i) => `
    <div class="carta-carousel-slide" style="background-image:url('${src}')">
      <div class="cinematic-overlay">
        <span class="cinematic-caption">${categoryTitle} · ${String(i + 1).padStart(2, '0')}/${String(photos.length).padStart(2, '0')}</span>
      </div>
    </div>`
    )
    .join('')
}

const cartaCardsHtml = cartaSections
  .map(({ key, title }) => {
    const photos = categoriesMap[key]
    return `
    <article class="carta-card" data-category="${key}">
      <div class="carta-card-header">
        <h2 class="carta-card-title">${title}</h2>
      </div>
      <div class="carta-carousel">
        ${buildCarouselSlides(photos, title)}
      </div>
      ${
        photos.length > 1
          ? `<button type="button" class="carta-carousel-arrow carta-carousel-arrow--prev" aria-label="Anterior">&larr;</button>
      <button type="button" class="carta-carousel-arrow carta-carousel-arrow--next" aria-label="Siguiente">&rarr;</button>`
          : ''
      }
    </article>`
  })
  .join('')

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="carta-page">
    <header class="carta-header">
      <h1 class="carta-heading">La Carta</h1>
    </header>
    <div class="carta-grid">
      ${cartaCardsHtml}
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
document.querySelectorAll('.carta-carousel-slide').forEach((slide) => slideObserver.observe(slide))

// --- Flechas de navegacion del carrusel ---
document.querySelectorAll('.carta-card').forEach((card) => {
  const carousel = card.querySelector('.carta-carousel')
  const prevBtn = card.querySelector('.carta-carousel-arrow--prev')
  const nextBtn = card.querySelector('.carta-carousel-arrow--next')
  if (!carousel) return

  const scrollByOneSlide = (dir) => {
    const slideWidth = carousel.clientWidth
    carousel.scrollBy({ left: dir * slideWidth, behavior: 'smooth' })
  }

  prevBtn?.addEventListener('click', () => scrollByOneSlide(-1))
  nextBtn?.addEventListener('click', () => scrollByOneSlide(1))
})
