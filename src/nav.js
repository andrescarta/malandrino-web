// Nav + modales ("Pedi ya" y la Carta): compartido entre todas las paginas del sitio.
import { fetchCartaPages } from './carta.js'

const reservaMessage = encodeURIComponent('Hola, quiero hacer una reserva en Malandrino.')
const reservaHref = `https://wa.me/542646273034?text=${reservaMessage}`

export function renderNav({ ubicacionHref = '/#ubicacion', menuHref = '/menu.html', platosHref = '/platos.html', eventosHref = '/eventos.html', localHref = '/local.html' } = {}) {
  return `
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="/" class="navbar-logo-link" aria-label="Ir al inicio">
        <img src="/malandrino-favicon-blanco.svg" alt="Malandrino" class="navbar-logo" />
      </a>

      <a href="${reservaHref}" target="_blank" rel="noopener" class="nav-link">Reserva</a>
      <button type="button" class="nav-cta" id="pedir-ya-btn">Pedí ya</button>

      <div class="nav-dropdown">
        <button class="dropdown-toggle" type="button" aria-expanded="false">
          Menú
        </button>
        <ul class="dropdown-menu">
          <li><a href="${ubicacionHref}">Ubicación</a></li>
          <li><a href="${menuHref}" data-open-carta>Menú</a></li>
          <li><a href="${platosHref}">Platos</a></li>
          <li><a href="${eventosHref}">Eventos</a></li>
          <li><a href="${localHref}">Local</a></li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="carta-modal" id="carta-modal">
    <div class="carta-modal-backdrop" data-close-carta></div>
    <div class="carta-modal-panel" role="dialog" aria-modal="true" aria-label="Carta de Malandrino">
      <button type="button" class="carta-modal-close" data-close-carta aria-label="Cerrar">&times;</button>
      <span class="carta-modal-count" id="carta-modal-count"></span>
      <div class="carta-modal-pages" id="carta-modal-pages">
        <p class="carta-modal-loading">Cargando la carta…</p>
      </div>
    </div>
  </div>
  <div class="pedir-modal" id="pedir-modal">
    <div class="pedir-modal-backdrop" data-close-modal></div>
    <div class="pedir-modal-panel" role="dialog" aria-modal="true" aria-label="Elegí cómo pedir">
      <button type="button" class="pedir-modal-close" data-close-modal aria-label="Cerrar">&times;</button>
      <h3 class="pedir-modal-title">¿Cómo querés pedir?</h3>
      <div class="pedir-options">
        <a href="https://menu.fu.do/malandrino" target="_blank" rel="noopener" class="pedir-option">
          <div class="pedir-option-info">
            <span class="pedir-option-name">Retirar por el local</span>
            <span class="pedir-option-tag">Más barato</span>
          </div>
          <span class="pedir-option-arrow" aria-hidden="true">&rarr;</span>
        </a>
        <div class="pedir-option is-disabled">
          <div class="pedir-option-info">
            <span class="pedir-option-name">Uber Eats</span>
            <span class="pedir-option-tag">Delivery más barato</span>
          </div>
          <span class="pedir-option-badge">Próximamente</span>
        </div>
        <a href="https://www.pedidosya.com.ar/restaurantes/san-juan/malandrino-cdf44ad5-af2c-41cc-86c2-506996ba8395-menu" target="_blank" rel="noopener" class="pedir-option">
          <div class="pedir-option-info">
            <span class="pedir-option-name">PedidosYa</span>
            <span class="pedir-option-tag">Menos barato</span>
          </div>
          <span class="pedir-option-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  </div>
  `
}

export function initNav() {
  // --- Modal de "Pedi ya" ---
  const pedirBtn = document.querySelector('#pedir-ya-btn')
  const pedirModal = document.querySelector('#pedir-modal')

  if (pedirBtn && pedirModal) {
    pedirBtn.addEventListener('click', () => {
      pedirModal.classList.add('is-open')
    })

    pedirModal.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => pedirModal.classList.remove('is-open'))
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') pedirModal.classList.remove('is-open')
    })
  }

  // --- Modal de la Carta (SVG, pagina por pagina, a pantalla completa) ---
  const cartaModal = document.querySelector('#carta-modal')
  const cartaPagesEl = document.querySelector('#carta-modal-pages')
  const cartaCountEl = document.querySelector('#carta-modal-count')
  const cartaLink = document.querySelector('[data-open-carta]')
  let cartaLoaded = false

  function updateCartaCount() {
    if (!cartaCountEl || !cartaPagesEl) return
    const slides = cartaPagesEl.querySelectorAll('.carta-modal-page')
    if (!slides.length) {
      cartaCountEl.textContent = ''
      return
    }
    const index = Math.round(cartaPagesEl.scrollLeft / cartaPagesEl.clientWidth)
    cartaCountEl.textContent = `${Math.min(index + 1, slides.length)} / ${slides.length}`
  }

  async function openCartaModal() {
    if (!cartaModal) return
    cartaModal.classList.add('is-open')
    document.body.style.overflow = 'hidden'

    if (!cartaLoaded) {
      cartaLoaded = true
      try {
        const pages = await fetchCartaPages()
        cartaPagesEl.innerHTML = pages
          .map((pageSvg, i) => `<div class="carta-modal-page" role="img" aria-label="Página ${i + 1} de la carta">${pageSvg}</div>`)
          .join('')
        cartaPagesEl.addEventListener('scroll', updateCartaCount, { passive: true })
        updateCartaCount()
      } catch (err) {
        console.error(err)
        cartaPagesEl.innerHTML = '<p class="carta-modal-loading">No se pudo cargar la carta. Probá de nuevo más tarde.</p>'
        cartaLoaded = false
      }
    }
  }

  function closeCartaModal() {
    if (!cartaModal) return
    cartaModal.classList.remove('is-open')
    document.body.style.overflow = ''
  }

  if (cartaLink && cartaModal) {
    cartaLink.addEventListener('click', (event) => {
      // Click simple: abre el popup. Con modificadores (abrir en pestaña nueva, etc.)
      // dejamos que el link funcione normal y vaya a /menu.html.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1) return
      event.preventDefault()
      openCartaModal()
    })

    cartaModal.querySelectorAll('[data-close-carta]').forEach((el) => {
      el.addEventListener('click', closeCartaModal)
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeCartaModal()
    })
  }

  // --- Dropdown del nav ---
  const dropdown = document.querySelector('.nav-dropdown')
  const toggle = document.querySelector('.dropdown-toggle')

  if (dropdown && toggle) {
    toggle.addEventListener('click', (event) => {
      event.stopPropagation()
      const isOpen = dropdown.classList.toggle('open')
      toggle.setAttribute('aria-expanded', String(isOpen))
    })

    document.addEventListener('click', () => {
      dropdown.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    })

    // Cerrar el drawer al clickear un link de adentro (sino queda tapando la pagina)
    dropdown.querySelectorAll('.dropdown-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        dropdown.classList.remove('open')
        toggle.setAttribute('aria-expanded', 'false')
      })
    })
  }
}
