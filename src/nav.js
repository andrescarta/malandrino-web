// Nav + modal de "Pedi ya": compartido entre todas las paginas del sitio.
const reservaMessage = encodeURIComponent('Hola, quiero hacer una reserva en Malandrino.')
const reservaHref = `https://wa.me/542646273034?text=${reservaMessage}`

export function renderNav({ ubicacionHref = '/#ubicacion', cartaHref = '/carta.html', eventosHref = '/eventos.html' } = {}) {
  return `
  <nav class="navbar">
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
        <li><a href="${cartaHref}">Carta</a></li>
        <li><a href="${eventosHref}">Eventos</a></li>
      </ul>
    </div>
  </nav>
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
