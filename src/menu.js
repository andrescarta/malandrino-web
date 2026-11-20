import { renderNav, initNav } from './nav.js'
import { fetchCartaPages } from './carta.js'

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="menu-page">
    <header class="menu-header">
      <span class="menu-kicker">Malandrino</span>
      <h1 class="menu-heading">Carta</h1>
    </header>
    <div class="menu-pages-scroll" id="menu-pages-scroll">
      <p class="menu-loading">Cargando la carta…</p>
    </div>
    <p class="menu-scroll-hint" id="menu-scroll-hint">Deslizá para ver las demás páginas &rarr;</p>
  </main>
`

initNav()
loadCarta()

async function loadCarta() {
  const container = document.querySelector('#menu-pages-scroll')
  const hint = document.querySelector('#menu-scroll-hint')

  try {
    const pages = await fetchCartaPages()

    container.innerHTML = pages
      .map((pageSvg, i) => `<div class="menu-page-slide" role="img" aria-label="Página ${i + 1} de la carta">${pageSvg}</div>`)
      .join('')

    if (hint && pages.length <= 1) hint.remove()
  } catch (err) {
    console.error(err)
    container.innerHTML = `<p class="menu-loading">No se pudo cargar la carta. Probá recargar la página.</p>`
    if (hint) hint.remove()
  }
}
