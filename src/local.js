import { categoriesMap } from './photos.js'
import { renderNav, initNav } from './nav.js'
import { renderFastGallery, initFastGalleries } from './fast-gallery.js'

const lugarPhotos = categoriesMap['lugar'] || []

const galleryHtml = lugarPhotos.length
  ? renderFastGallery({ key: 'lugar', title: 'El Lugar', photos: lugarPhotos, className: 'fast-gallery--wide' })
  : `<div class="local-placeholder"><p>Muy pronto vas a poder ver acá fotos del local.</p></div>`

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="local-page">
    <header class="local-header">
      <span class="local-kicker">Malandrino</span>
      <h1 class="local-heading">El Lugar</h1>
    </header>

    <section class="local-gallery-section">
      ${galleryHtml}
    </section>
  </main>
`

initNav()
initFastGalleries()
