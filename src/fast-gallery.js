// Componente reutilizable: un "mosaico" que cicla rapido entre varias fotos de una
// categoria, con titulo + contador superpuestos y un toque para pausar/seguir.
// Mismo patron que viste en malandrino-propuesta.vercel.app (Comida/Bebidas/El Espacio),
// reutilizado aca para Platos (una por categoria) y para Local (fotos del lugar).

export function renderFastGallery({ key, title, photos, className = '' }) {
  if (!photos || !photos.length) return ''
  const photosJson = JSON.stringify(photos).replace(/"/g, '&quot;')
  const hasMultiple = photos.length > 1

  return `
    <div class="fast-gallery ${className}" data-gallery="${key}" data-photos="${photosJson}">
      <div class="fast-gallery-frame fast-gallery-frame--base" style="background-image:url('${photos[0]}')"></div>
      <div class="fast-gallery-frame fast-gallery-frame--top" style="background-image:url('${photos[0]}')"></div>
      <div class="fast-gallery-info">
        <span class="fast-gallery-title">${title}</span>
        ${hasMultiple ? `<span class="fast-gallery-count">1 / ${photos.length}</span>` : ''}
      </div>
      ${hasMultiple ? `<span class="fast-gallery-hint">Tocá para pausar</span>` : ''}
    </div>`
}

export function initFastGalleries(root = document) {
  root.querySelectorAll('.fast-gallery').forEach((el) => {
    let photos
    try {
      photos = JSON.parse(el.dataset.photos || '[]')
    } catch {
      photos = []
    }
    if (photos.length <= 1) return // nada para ciclar

    const baseFrame = el.querySelector('.fast-gallery-frame--base')
    const topFrame = el.querySelector('.fast-gallery-frame--top')
    const countEl = el.querySelector('.fast-gallery-count')
    const hintEl = el.querySelector('.fast-gallery-hint')

    let index = 0
    let paused = false
    // ciclo mas pausado que antes (antes ~4s en total); igual se achica un poco si hay
    // muchas fotos para que no quede eterno (min 1.2s, max 3.5s por foto)
    const interval = Math.min(3500, Math.max(1200, Math.round(8000 / photos.length)))

    function show(i) {
      index = i
      if (countEl) countEl.textContent = `${index + 1} / ${photos.length}`

      // Fade in de la foto nueva (capa de arriba) sobre la anterior, que queda
      // visible debajo en la capa base mientras dura la transicion.
      topFrame.style.transition = 'none'
      topFrame.style.opacity = '0'
      topFrame.style.backgroundImage = `url('${photos[index]}')`
      topFrame.offsetHeight // forzar reflow para que el opacity:0 se aplique antes del fade
      topFrame.style.transition = ''
      topFrame.style.opacity = '1'

      // Una vez terminado el fade, igualamos la capa base para que quede lista
      // como fondo de la proxima transicion.
      setTimeout(() => {
        baseFrame.style.backgroundImage = `url('${photos[index]}')`
      }, 700)
    }

    setInterval(() => {
      if (paused) return
      show((index + 1) % photos.length)
    }, interval)

    el.addEventListener('click', () => {
      paused = !paused
      if (hintEl) hintEl.textContent = paused ? 'En pausa · tocá para seguir' : 'Tocá para pausar'
    })
  })
}
