// --- Carta visual (SVG), compartido entre la pagina /menu.html y el popup del nav ---
// El diseño completo vive en /public/carta-menu.svg: un unico lienzo con todas las
// paginas dibujadas una al lado de la otra. Cada pagina esta marcada con un rect guia
// id="Página-N" (x/y/width/height = su recorte dentro del lienzo).
//
// Para cada pagina generamos una copia COMPLETA del svg original, cambiando solo su
// viewBox al recorte de esa pagina (en vez de reusar el contenido con <use>: en algunos
// navegadores el <use> entre svgs separados no pinta bien fuera de la primera pagina).
// Es un poco mas pesado pero siempre se ve bien.
const CARTA_SVG_URL = '/carta-menu.svg'

export async function fetchCartaPages(url = CARTA_SVG_URL) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`)
  const svgText = await res.text()

  const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml')
  if (doc.querySelector('parsererror')) throw new Error('El SVG de la carta no se pudo interpretar')

  const pageRects = Array.from(doc.querySelectorAll('[id^="Página-"], [id^="Pagina-"]'))
    .map((rect) => ({
      x: parseFloat(rect.getAttribute('x') || '0'),
      y: parseFloat(rect.getAttribute('y') || '0'),
      width: parseFloat(rect.getAttribute('width') || '0'),
      height: parseFloat(rect.getAttribute('height') || '0'),
    }))
    .filter((p) => p.width > 0 && p.height > 0)
    // orden de lectura: fila por fila (y), y dentro de cada fila de izquierda a derecha (x)
    .sort((a, b) => (Math.abs(a.y - b.y) > 10 ? a.y - b.y : a.x - b.x))

  if (!pageRects.length) throw new Error('No se encontraron paginas (rects guia) en el SVG')

  return pageRects.map(({ x, y, width, height }) =>
    svgText.replace(/(<svg[^>]*\sviewBox=")[^"]*(")/, `$1${x} ${y} ${width} ${height}$2`)
  )
}
