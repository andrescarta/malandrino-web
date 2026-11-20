// Interacciones tomadas de la propuesta: cuadros de fotos que cambian solos,
// pop-up de planos con zoom y pop-up de videos en carrusel.

// --- Plantillas ---

export function cuadroHTML({ titulo, fotos, rpm = 30, desfase = 0 }) {
  return `
    <figure class="cuadro" data-fotos="${fotos.join(',')}" data-rpm="${rpm}" data-desfase="${desfase}" aria-label="${titulo}: fotos que cambian solas. Tocá para pausar.">
      <div class="cuadro-img"><img src="${fotos[0]}" alt="${titulo}"></div>
      <figcaption><span class="cuadro-tit">${titulo}</span><span class="cuadro-n">1 / ${fotos.length}</span><span class="cuadro-estado">Tocá para pausar</span></figcaption>
      <button class="cuadro-prev" type="button" aria-label="Foto anterior">‹</button><button class="cuadro-next" type="button" aria-label="Foto siguiente">›</button>
    </figure>`
}

export function videoHTML({ src, poster, titulo, duracion, land = false }) {
  return `<button class="vid" type="button" data-src="${src}" data-titulo="${titulo}" data-land="${land ? 1 : 0}" aria-label="Ver video: ${titulo} (${duracion})"><img src="${poster}" alt="" loading="lazy"><span class="play"></span><span class="cap">${titulo}<small>${duracion}</small></span></button>`
}

export const planoDialogHTML = `
  <dialog id="plano-dlg" class="prop-dlg plano-dlg">
    <div class="prop-dlg-head">
      <div><p class="prop-dlg-tit" id="plano-tit">Plano</p><p class="prop-muted prop-small" style="margin:4px 0 0">Tocá el plano para acercar o alejar.</p></div>
      <button class="prop-dlg-close" type="button" aria-label="Cerrar">×</button>
    </div>
    <div class="prop-dlg-body"><img id="plano-img" src="" alt=""></div>
  </dialog>`

export const videoDialogHTML = `
  <dialog id="video-dlg" class="prop-dlg video-dlg">
    <div class="prop-dlg-head">
      <p class="prop-dlg-tit" id="video-tit">Video</p>
      <span class="vcount" id="video-cnt"></span>
      <button class="prop-dlg-close" type="button" aria-label="Cerrar">×</button>
    </div>
    <div class="prop-dlg-body"><video id="video-el" controls playsinline preload="none"></video><button class="vnav prev" type="button" aria-label="Video anterior">‹</button><button class="vnav next" type="button" aria-label="Video siguiente">›</button></div>
  </dialog>`

// --- Comportamiento ---

function cerrable(d) {
  d.querySelector('.prop-dlg-close').addEventListener('click', () => d.close())
  d.addEventListener('click', (e) => { if (e.target === d) d.close() })
}

export function initCuadros(root = document) {
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
  root.querySelectorAll('.cuadro').forEach((c) => {
    const fotos = c.dataset.fotos.split(',')
    const ritmo = 60000 / (+c.dataset.rpm || 30)
    const desfase = +c.dataset.desfase || 0
    const img = c.querySelector('img')
    const n = c.querySelector('.cuadro-n')
    const est = c.querySelector('.cuadro-estado')
    const box = c.querySelector('.cuadro-img')
    let i = 0, timer = null, espera = null, visible = false, pausado = reduce, cargadas = false

    const precargar = () => { if (cargadas) return; cargadas = true; fotos.forEach((s) => { new Image().src = s }) }
    const mostrar = (j) => {
      i = (j + fotos.length) % fotos.length
      img.src = fotos[i]
      box.style.setProperty('--bg', `url(${fotos[i]})`)
      n.textContent = `${i + 1} / ${fotos.length}`
    }
    const andar = () => {
      clearInterval(timer); clearTimeout(espera); timer = espera = null
      if (!pausado && visible) {
        espera = setTimeout(() => { mostrar(i + 1); timer = setInterval(() => mostrar(i + 1), ritmo) }, ritmo + desfase)
      }
    }
    const estado = () => {
      c.classList.toggle('pausado', pausado)
      est.textContent = pausado ? 'En pausa · tocá para seguir' : 'Tocá para pausar'
      andar()
    }

    c.addEventListener('click', (e) => { if (e.target.closest('button')) return; pausado = !pausado; estado() })
    c.querySelector('.cuadro-prev').addEventListener('click', () => mostrar(i - 1))
    c.querySelector('.cuadro-next').addEventListener('click', () => mostrar(i + 1))
    mostrar(0)
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((es) => es.forEach((e) => { visible = e.isIntersecting; if (visible) precargar(); andar() }), { rootMargin: '200px' }).observe(c)
    } else { visible = true; precargar() }
    estado()
  })
}

export function initPlanos() {
  const d = document.getElementById('plano-dlg'); if (!d) return
  const img = document.getElementById('plano-img')
  const tit = document.getElementById('plano-tit')
  const body = d.querySelector('.prop-dlg-body')
  document.querySelectorAll('.plano-open').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      img.src = a.getAttribute('href'); img.alt = a.querySelector('img').alt
      tit.textContent = a.dataset.titulo
      body.classList.remove('zoom')
      d.showModal()
    })
  })
  img.addEventListener('click', (e) => {
    const r = img.getBoundingClientRect()
    const fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height
    body.classList.toggle('zoom')
    if (body.classList.contains('zoom')) {
      body.scrollLeft = fx * img.offsetWidth - body.clientWidth / 2
      body.scrollTop = fy * img.offsetHeight - body.clientHeight / 2
    }
  })
  cerrable(d)
}

export function initVideos() {
  const d = document.getElementById('video-dlg'); if (!d) return
  const v = document.getElementById('video-el')
  const tit = document.getElementById('video-tit')
  const cnt = document.getElementById('video-cnt')
  const lista = [...document.querySelectorAll('.vid')]
  let i = 0

  const ir = (n) => {
    i = (n + lista.length) % lista.length
    const b = lista[i]
    tit.textContent = b.dataset.titulo
    cnt.textContent = `${i + 1} / ${lista.length}`
    d.classList.toggle('land', b.dataset.land === '1')
    v.src = b.dataset.src
    const p = v.play(); if (p && p.catch) p.catch(() => {})
  }

  lista.forEach((b, n) => b.addEventListener('click', () => { ir(n); d.showModal() }))
  d.querySelector('.vnav.prev').addEventListener('click', () => ir(i - 1))
  d.querySelector('.vnav.next').addEventListener('click', () => ir(i + 1))
  d.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') ir(i - 1)
    else if (e.key === 'ArrowRight') ir(i + 1)
  })
  let x0 = null
  v.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX }, { passive: true })
  v.addEventListener('touchend', (e) => {
    if (x0 === null) return
    const dx = e.changedTouches[0].clientX - x0; x0 = null
    if (Math.abs(dx) > 60) ir(i + (dx < 0 ? 1 : -1))
  }, { passive: true })
  v.addEventListener('ended', () => { if (i < lista.length - 1) ir(i + 1) })
  d.addEventListener('close', () => { v.pause(); v.removeAttribute('src'); v.load() })
  cerrable(d)
}

// --- Galeria con visor (pop-up de fotos con flechas, teclado y swipe) ---

export function galeriaHTML(fotos, clase = "") {
  return `<div class="prop-gallery ${clase}">${fotos
    .map(({ src, alt }, n) => `<button type="button" class="prop-ph prop-ph-btn" data-n="${n}" data-src="${src}" aria-label="Ver foto: ${alt}"><img src="${src}" alt="${alt}" loading="lazy"></button>`)
    .join('')}</div>`
}

export const fotoDialogHTML = `
  <dialog id="foto-dlg" class="prop-dlg foto-dlg">
    <div class="prop-dlg-head">
      <span class="vcount" id="foto-cnt"></span>
      <button class="prop-dlg-close" type="button" aria-label="Cerrar">×</button>
    </div>
    <div class="prop-dlg-body"><img id="foto-el" src="" alt=""><button class="vnav prev" type="button" aria-label="Foto anterior">‹</button><button class="vnav next" type="button" aria-label="Foto siguiente">›</button></div>
  </dialog>`

export function initGaleria() {
  const d = document.getElementById('foto-dlg'); if (!d) return
  const img = document.getElementById('foto-el')
  const cnt = document.getElementById('foto-cnt')
  const lista = [...document.querySelectorAll('.prop-ph-btn')]
  let i = 0
  const ir = (n) => {
    i = (n + lista.length) % lista.length
    img.src = lista[i].dataset.src
    img.alt = lista[i].querySelector('img').alt
    cnt.textContent = `${i + 1} / ${lista.length}`
  }
  lista.forEach((b, n) => b.addEventListener('click', () => { ir(n); d.showModal() }))
  d.querySelector('.vnav.prev').addEventListener('click', () => ir(i - 1))
  d.querySelector('.vnav.next').addEventListener('click', () => ir(i + 1))
  d.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') ir(i - 1)
    else if (e.key === 'ArrowRight') ir(i + 1)
  })
  let x0 = null
  img.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX }, { passive: true })
  img.addEventListener('touchend', (e) => {
    if (x0 === null) return
    const dx = e.changedTouches[0].clientX - x0; x0 = null
    if (Math.abs(dx) > 60) ir(i + (dx < 0 ? 1 : -1))
  }, { passive: true })
  cerrable(d)
}
