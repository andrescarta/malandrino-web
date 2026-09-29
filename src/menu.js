import { renderNav, initNav } from './nav.js'

// --- Datos del menu ---
// Cada categoria tiene un titulo y una lista de platos (nombre, descripcion, precio).
// El precio va en pesos argentinos, solo el numero (se formatea abajo).
// Para agregar/editar platos, se edita este array; el resto se arma solo.
const menuData = [
  // Ejemplo (se reemplaza por los platos reales de la carta fisica):
  // {
  //   key: 'pizzas',
  //   title: 'Pizzas',
  //   items: [
  //     { name: 'Margarita', description: 'Muzzarella, tomate, albahaca', price: 8500 },
  //   ],
  // },
]

const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

function renderItem(item) {
  return `
    <li class="menu-item">
      <div class="menu-item-info">
        <span class="menu-item-name">${item.name}</span>
        ${item.description ? `<span class="menu-item-desc">${item.description}</span>` : ''}
      </div>
      <span class="menu-item-price">${priceFormatter.format(item.price)}</span>
    </li>`
}

function renderCategory(category) {
  return `
    <section class="menu-category">
      <h2 class="menu-category-title">${category.title}</h2>
      <ul class="menu-item-list">
        ${category.items.map(renderItem).join('')}
      </ul>
    </section>`
}

const menuContentHtml =
  menuData.length > 0
    ? menuData.map(renderCategory).join('')
    : `
    <div class="menu-placeholder">
      <p>Estamos cargando el menú con los precios actualizados. Mientras tanto, podés ver los platos en la sección Platos.</p>
    </div>`

document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <main class="menu-page">
    <header class="menu-header">
      <span class="menu-kicker">Malandrino</span>
      <h1 class="menu-heading">Menú</h1>
    </header>
    <div class="menu-content">
      ${menuContentHtml}
    </div>
  </main>
`

initNav()
