document.querySelector('#demo-hero-app').innerHTML = `
  <nav class="demo-nav">
    <a href="/index.html" class="demo-nav-back">&larr; Volver al sitio</a>
    <div class="demo-nav-links">
      <a href="#tilt">1. Inclinación 3D</a>
      <a href="#glow">2. Pulso con glow</a>
    </div>
  </nav>

  <section id="tilt" class="logo-demo-hero">
    <div class="demo-intro">
      <span class="demo-kicker">Opción 1</span>
      <h2 class="demo-heading">Inclinación 3D</h2>
      <p class="demo-text">El logo se inclina en perspectiva segun donde este el mouse respecto a su centro, como si fuera una placa con volumen.</p>
    </div>
    <img src="/malandrino-3d-negro.svg" alt="Malandrino" class="logo-demo-img" id="tilt-logo" />
  </section>

  <section id="glow" class="logo-demo-hero">
    <div class="demo-intro">
      <span class="demo-kicker">Opción 2</span>
      <h2 class="demo-heading">Pulso con glow</h2>
      <p class="demo-text">El logo no se mueve de lugar: crece levemente y gana un resplandor rojo a medida que el mouse se acerca a el.</p>
    </div>
    <img src="/malandrino-3d-negro.svg" alt="Malandrino" class="logo-demo-img" id="glow-logo" />
  </section>
`

// --- Opcion 1: inclinacion 3D segun posicion del mouse ---
const tiltSection = document.querySelector('#tilt')
const tiltLogo = document.querySelector('#tilt-logo')
const MAX_TILT = 16 // grados maximos de inclinacion

tiltSection.addEventListener('mousemove', (event) => {
  const rect = tiltSection.getBoundingClientRect()
  const relX = (event.clientX - rect.left) / rect.width - 0.5 // -0.5 a 0.5
  const relY = (event.clientY - rect.top) / rect.height - 0.5

  const rotateY = relX * MAX_TILT * 2
  const rotateX = -relY * MAX_TILT * 2

  tiltLogo.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})

tiltSection.addEventListener('mouseleave', () => {
  tiltLogo.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
})

// --- Opcion 2: pulso + glow rojo segun cercania del mouse al centro del logo ---
const glowSection = document.querySelector('#glow')
const glowLogo = document.querySelector('#glow-logo')
const GLOW_RADIUS = 350 // px: distancia desde el centro a partir de la cual el efecto es minimo

glowSection.addEventListener('mousemove', (event) => {
  const rect = glowLogo.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY)

  const proximity = 1 - Math.min(distance / GLOW_RADIUS, 1) // 0 (lejos) a 1 (encima)

  const scale = 1 + proximity * 0.06
  const blur = 10 + proximity * 45
  const alpha = 0.15 + proximity * 0.55

  glowLogo.style.transform = `scale(${scale})`
  glowLogo.style.filter = `drop-shadow(0 0 ${blur}px rgba(230, 55, 56, ${alpha}))`
})

glowSection.addEventListener('mouseleave', () => {
  glowLogo.style.transform = 'scale(1)'
  glowLogo.style.filter = 'drop-shadow(0 0 10px rgba(230, 55, 56, 0.15))'
})
