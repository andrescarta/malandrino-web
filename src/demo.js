// Fotos de ejemplo de Picsum (banco gratuito respaldado por Unsplash).
// Son PLACEHOLDER — reemplazar por fotos reales de Malandrino cuando esten listas.
const photos = {
  comida: [
    'https://picsum.photos/seed/malandrino-comida-1/1000/1300',
    'https://picsum.photos/seed/malandrino-comida-2/1000/1300',
    'https://picsum.photos/seed/malandrino-comida-3/1000/1300',
  ],
  bebidas: [
    'https://picsum.photos/seed/malandrino-bebidas-1/1000/1300',
    'https://picsum.photos/seed/malandrino-bebidas-2/1000/1300',
  ],
  lugar: [
    'https://picsum.photos/seed/malandrino-lugar-1/1600/1000',
    'https://picsum.photos/seed/malandrino-lugar-2/1600/1000',
    'https://picsum.photos/seed/malandrino-lugar-3/1600/1000',
  ],
  mapa: 'https://picsum.photos/seed/malandrino-mapa/1600/1000',
}

document.querySelector('#demo-app').innerHTML = `
  <nav class="demo-nav">
    <a href="/index.html" class="demo-nav-back">&larr; Volver al sitio</a>
    <div class="demo-nav-links">
      <a href="#patron-1">1. Scroll horizontal</a>
      <a href="#patron-2">2. Revelado progresivo</a>
      <a href="#patron-3">3. Secciones cinematograficas</a>
      <a href="#patron-4">4. Slider full-bleed</a>
    </div>
  </nav>

  <section id="patron-1" class="demo-section">
    <div class="demo-intro">
      <span class="demo-kicker">Patron 1</span>
      <h2 class="demo-heading">Scroll horizontal con snap</h2>
      <p class="demo-text">Deslizá con el mouse, trackpad o flechas del teclado. Cada foto ocupa casi toda la pantalla, sin flechitas ni puntitos de carrusel.</p>
    </div>
    <div class="hscroll" tabindex="0">
      <div class="hscroll-track">
        ${[...photos.comida, ...photos.bebidas]
          .map(
            (src, i) => `
          <figure class="hscroll-slide">
            <img src="${src}" alt="Foto de ejemplo ${i + 1}" loading="lazy" />
            <figcaption>${i < photos.comida.length ? 'Comida' : 'Bebidas'} — ejemplo ${i + 1}</figcaption>
          </figure>
        `
          )
          .join('')}
      </div>
    </div>
  </section>

  <section id="patron-2" class="demo-section">
    <div class="demo-intro">
      <span class="demo-kicker">Patron 2</span>
      <h2 class="demo-heading">Revelado progresivo (scrollytelling)</h2>
      <p class="demo-text">Las fotos del lugar van apareciendo de a una a medida que bajás, en vez de estar todas visibles de entrada.</p>
    </div>
    <div class="reveal-stack">
      ${photos.lugar
        .map(
          (src, i) => `
        <div class="reveal-item">
          <img src="${src}" alt="Foto del lugar ${i + 1}" loading="lazy" />
          <p>Lugar — ejemplo ${i + 1}</p>
        </div>
      `
        )
        .join('')}
    </div>
  </section>

  <section id="patron-3" class="demo-section demo-section--flush">
    <div class="demo-intro">
      <span class="demo-kicker">Patron 3</span>
      <h2 class="demo-heading">Secciones cinematograficas full-bleed</h2>
      <p class="demo-text">Cada tema (mapa, lugar, comida, bebidas) ocupa toda la pantalla, con texto grande superpuesto — estructura de capitulos, no galeria.</p>
    </div>

    <section class="cinematic" style="background-image:url('${photos.mapa}')">
      <div class="cinematic-overlay">
        <span class="cinematic-caption">Encontranos en</span>
        <h3 class="cinematic-title">EL MAPA</h3>
      </div>
    </section>

    <section class="cinematic" style="background-image:url('${photos.lugar[0]}')">
      <div class="cinematic-overlay">
        <span class="cinematic-caption">El espacio</span>
        <h3 class="cinematic-title">EL LUGAR</h3>
      </div>
    </section>

    <section class="cinematic" style="background-image:url('${photos.comida[0]}')">
      <div class="cinematic-overlay">
        <span class="cinematic-caption">Fermentación larga con biga, horno a piedra</span>
        <h3 class="cinematic-title">LA COMIDA</h3>
      </div>
    </section>

    <section class="cinematic" style="background-image:url('${photos.bebidas[0]}')">
      <div class="cinematic-overlay">
        <span class="cinematic-caption">Para acompañar</span>
        <h3 class="cinematic-title">LAS BEBIDAS</h3>
      </div>
    </section>
  </section>

  <section id="patron-4" class="demo-section demo-section--flush">
    <div class="demo-intro">
      <span class="demo-kicker">Patron 4</span>
      <h2 class="demo-heading">Mezcla: slider horizontal full-bleed</h2>
      <p class="demo-text">Cada imagen ocupa la pantalla completa (como el patron 3), pero se desliza de costado (como el patron 1) y aparece con un fade in a medida que se centra.</p>
    </div>
    <div class="hscroll-full" id="hscroll-full" tabindex="0">
      <div class="hscroll-full-track">
        ${[
          { src: photos.mapa, caption: 'Encontranos en', title: 'EL MAPA' },
          { src: photos.lugar[0], caption: 'El espacio', title: 'EL LUGAR' },
          { src: photos.lugar[1], caption: 'El espacio', title: 'EL LUGAR' },
          { src: photos.comida[0], caption: 'Fermentación larga con biga, horno a piedra', title: 'LA COMIDA' },
          { src: photos.comida[1], caption: 'Fermentación larga con biga, horno a piedra', title: 'LA COMIDA' },
          { src: photos.comida[2], caption: 'Fermentación larga con biga, horno a piedra', title: 'LA COMIDA' },
          { src: photos.bebidas[0], caption: 'Para acompañar', title: 'LAS BEBIDAS' },
          { src: photos.bebidas[1], caption: 'Para acompañar', title: 'LAS BEBIDAS' },
        ]
          .map(
            (slide) => `
          <div class="hscroll-full-slide" style="background-image:url('${slide.src}')">
            <div class="cinematic-overlay">
              <span class="cinematic-caption">${slide.caption}</span>
              <h3 class="cinematic-title">${slide.title}</h3>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  </section>
`

// --- Patron 2: revelado progresivo con Intersection Observer ---
const revealItems = document.querySelectorAll('.reveal-item')
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 }
)
revealItems.forEach((item) => observer.observe(item))

// --- Patron 4: slider horizontal full-bleed con fade in ---
const hscrollFull = document.querySelector('#hscroll-full')
const fullSlides = document.querySelectorAll('.hscroll-full-slide')
const observerFull = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Solo sumamos la clase, nunca la sacamos: la imagen que ya se mostro
      // queda visible (no vuelve a blanco) y la siguiente aparece encima al entrar.
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  },
  { root: hscrollFull, threshold: 0.6 }
)
fullSlides.forEach((slide) => observerFull.observe(slide))
