import { categoriesMap, sectionOrder } from './photos.js'
import { renderNav, initNav } from './nav.js'
import { renderFastGallery, initFastGalleries } from './fast-gallery.js'

// Una galeria "rapida" por categoria (todas menos "lugar", que es la pagina Local).
const platosSections = sectionOrder.filter(
  ({ key }) => key !== 'lugar' && categoriesMap[key] && categoriesMap[key].length
)

const galleriesHtml = platosSections
  .map(({ key, title }) => renderFastGallery({ key, title, photos: categoriesMap[key] }))
  .join('')

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="platos-page">
    <header class="platos-header">
      <h1 class="platos-heading">Nuestros Platos</h1>
    </header>
    <div class="platos-grid">
      ${galleriesHtml}
    </div>
  </main>
`

initNav()
initFastGalleries()
