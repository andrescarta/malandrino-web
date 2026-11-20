import { renderNav, initNav } from './nav.js'
import { cuadroHTML, planoDialogHTML, initCuadros, initPlanos } from './prop-ui.js'

const fotos = (nums) => nums.map((n) => `/lugar/fotos/${String(n).padStart(2, '0')}.jpg`)
const impares = fotos([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21])
const pares = fotos([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22])

const mapsHref = 'https://www.google.com/maps/search/?api=1&query=Malandrino%2C+Urquiza+Sur+991%2C+San+Juan'

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="prop">
    <header class="prop-hero">
      <div class="prop-wrap">
        <p class="prop-kicker">Malandrino · Capital, San Juan</p>
        <h1>El lugar<span>440 m² de encuentro</span></h1>
        <p class="prop-lead">Una esquina en Urquiza Sur 991, con dos plantas, patio y vereda. Pizzería, schiacciateria y bar con agenda cultural.</p>
        <div class="prop-facts">
          <div><b>440 m²</b><span>Entre salones, patio y vereda</span></div>
          <div><b>121</b><span>Cubiertos</span></div>
          <div><b>2 plantas</b><span>Cada una con su barra</span></div>
        </div>
      </div>
    </header>

    <div class="prop-banda"><img src="/lugar/banda-dron.jpg" alt="Malandrino visto desde el aire, en la esquina de Urquiza Sur" loading="lazy"></div>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">01</span><h2>El espacio</h2></div>
        <div class="prop-two">
          <div>
            <p class="prop-intro" style="margin-bottom:16px">Estamos en esquina, en Urquiza Sur 991. Son 280 m² cubiertos en dos plantas, más 160 m² al aire libre entre la vereda y el jardín.</p>
            <p class="prop-muted" style="margin:0">Abrimos de miércoles a domingo, de 20 a 2. <a href="${mapsHref}" target="_blank" rel="noopener">Abrir en Google Maps</a></p>
          </div>
          <div class="prop-mapa"><iframe src="https://www.google.com/maps?q=Malandrino,+Urquiza+Sur+991,+San+Juan,+Argentina&amp;z=16&amp;output=embed" title="Mapa: Urquiza Sur 991, San Juan" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
        </div>

        <div class="prop-two" style="margin-top:32px">
          <div class="prop-scroll">
            <p class="prop-subtitle">Adentro: 280 m²</p>
            <table>
              <tr><th>Planta</th><th>Sector</th><th>Superficie</th><th>Detalle</th></tr>
              <tr><td>Baja</td><td>Salón</td><td class="n">110 m²</td><td>Salón principal con barra</td></tr>
              <tr><td>Baja</td><td>Cocina</td><td class="n">53 m²</td><td>Horno pizzero a piedra de 1,90 m</td></tr>
              <tr><td>Baja</td><td>Baños</td><td class="n">30 m²</td><td>Hombres, mujeres y accesible</td></tr>
              <tr><td>Alta</td><td>Salón</td><td class="n">87 m²</td><td>Barra propia; eventos de hasta 70 personas</td></tr>
            </table>
          </div>
          <div class="prop-scroll">
            <p class="prop-subtitle">Afuera: 160 m²</p>
            <table>
              <tr><th>Sector</th><th>Superficie</th><th>Detalle</th></tr>
              <tr><td>Vereda en esquina</td><td class="n">80 m²</td><td>Con sombrillas</td></tr>
              <tr><td>Jardín</td><td class="n">80 m²</td><td>Ambientado con plantas</td></tr>
            </table>
          </div>
        </div>
      </div>
    </section>

    <section class="prop-block">
      <div class="prop-wrap">
        <div class="prop-head"><span class="num">02</span><h2>Las dos plantas</h2></div>
        <div class="prop-planos">
          <a href="/lugar/planos/planta-baja.jpg" class="plano-open" data-titulo="Planta baja"><img src="/lugar/planos/planta-baja.jpg" alt="Plano de la planta baja: salón, cocina, barra, baños y vereda en esquina" loading="lazy"></a>
          <a href="/lugar/planos/planta-alta.jpg" class="plano-open" data-titulo="Planta alta"><img src="/lugar/planos/planta-alta.jpg" alt="Plano de la planta alta: salón para eventos, balcón y doble altura" loading="lazy"></a>
        </div>
        <p class="prop-muted prop-small">Tocá un plano para verlo en grande.</p>
        <div class="prop-cuadros">
          ${cuadroHTML({ titulo: 'El espacio', fotos: impares, rpm: 30, desfase: 0 })}
          ${cuadroHTML({ titulo: 'El espacio', fotos: pares, rpm: 30, desfase: 1000 })}
        </div>
      </div>
    </section>
  </main>
  ${planoDialogHTML}
`

initNav()
initCuadros()
initPlanos()
