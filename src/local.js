import { renderNav, initNav, reservaHref } from './nav.js'
import { galeriaHTML, fotoDialogHTML, planoDialogHTML, initGaleria, initPlanos } from './prop-ui.js'

const mapsHref = 'https://www.google.com/maps/search/?api=1&query=Malandrino%2C+Urquiza+Sur+991%2C+San+Juan'
const eventoMessage = encodeURIComponent('Hola, quiero consultar por un evento en la planta alta de Malandrino.')
const eventoHref = reservaHref.split('?')[0] + `?text=${eventoMessage}`

const fotos = Array.from({ length: 22 }, (_, k) => {
  const n = String(k + 1).padStart(2, '0')
  return { src: `/lugar/fotos/${n}.jpg`, alt: `El espacio de Malandrino, foto ${k + 1}` }
})

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="prop">
    <header class="prop-hero">
      <div class="prop-wrap">
        <p class="prop-kicker">Malandrino · Urquiza Sur 991</p>
        <h1>El lugar<span>Una esquina para encontrarse</span></h1>
        <p class="prop-lead">Dos plantas, cada una con su barra, un jardín y la vereda en esquina. Abrimos de miércoles a domingo, de 20 a 2.</p>
        <div class="prop-actions">
          <a href="${reservaHref}" target="_blank" rel="noopener" class="prop-btn">Reservá tu mesa</a>
          <a href="${mapsHref}" target="_blank" rel="noopener" class="prop-btn ghost">Cómo llegar</a>
        </div>
        <div class="prop-facts">
          <div><b>440 m²</b><span>Entre salones, jardín y vereda</span></div>
          <div><b>121</b><span>Cubiertos</span></div>
          <div><b>2 plantas</b><span>Cada una con su barra</span></div>
        </div>
      </div>
    </header>

    <div class="prop-banda"><img src="/lugar/banda-dron.jpg" alt="Malandrino visto desde el aire, en la esquina de Urquiza Sur" loading="lazy"></div>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">01</span><h2>Cada rincón</h2></div>
        <div class="prop-cards">
          <div class="prop-card"><h3>Salón de abajo</h3><p>110 m² con la barra principal y la cocina con horno a piedra de 1,90 m.</p></div>
          <div class="prop-card"><h3>Planta alta</h3><p>87 m² con barra propia. Recibe eventos de hasta 70 personas.</p></div>
          <div class="prop-card"><h3>Vereda en esquina</h3><p>80 m² al aire libre, con sombrillas.</p></div>
          <div class="prop-card"><h3>Jardín</h3><p>80 m² ambientados con plantas.</p></div>
        </div>
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">02</span><h2>Galería</h2></div>
        <p class="prop-muted" style="margin:0">Tocá una foto para verla en grande.</p>
        ${galeriaHTML(fotos, 'grande')}
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">03</span><h2>Dónde estamos</h2></div>
        <div class="prop-two">
          <div>
            <p class="prop-intro" style="margin-bottom:16px">En esquina, en Urquiza Sur 991, Capital, San Juan.</p>
            <a href="${mapsHref}" target="_blank" rel="noopener" class="prop-btn ghost">Abrir en Google Maps</a>
          </div>
          <div class="prop-mapa"><iframe src="https://www.google.com/maps?q=Malandrino,+Urquiza+Sur+991,+San+Juan,+Argentina&amp;z=16&amp;output=embed" title="Mapa: Urquiza Sur 991, San Juan" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        </div>
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">04</span><h2>Las dos plantas</h2></div>
        <div class="prop-planos">
          <a href="/lugar/planos/planta-baja.jpg" class="plano-open" data-titulo="Planta baja"><img src="/lugar/planos/planta-baja.jpg" alt="Plano de la planta baja: salón, cocina, barra, baños y vereda en esquina" loading="lazy"></a>
          <a href="/lugar/planos/planta-alta.jpg" class="plano-open" data-titulo="Planta alta"><img src="/lugar/planos/planta-alta.jpg" alt="Plano de la planta alta: salón para eventos, balcón y doble altura" loading="lazy"></a>
        </div>
        <p class="prop-muted prop-small">Tocá un plano para verlo en grande.</p>
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">05</span><h2>¿Querés hacer tu evento?</h2></div>
        <p class="prop-intro">La planta alta tiene barra propia y recibe hasta 70 personas. Escribinos y lo armamos.</p>
        <a href="${eventoHref}" target="_blank" rel="noopener" class="prop-btn">Consultar por WhatsApp</a>
      </div>
    </section>
  </main>
  ${fotoDialogHTML}
  ${planoDialogHTML}
`

initNav()
initGaleria()
initPlanos()
