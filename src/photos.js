// Importa automaticamente todas las fotos de cada carpeta en src/assets/photos/.
// Al agregar una foto nueva en una de esas carpetas, aparece sola aca sin tocar codigo.
// Compartido entre main.js (home) y carta.js (pagina de la carta).
export const modules = import.meta.glob('/src/assets/photos/*/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp}', {
  eager: true,
  import: 'default',
})

export const categoriesMap = {}
for (const path in modules) {
  const match = path.match(/\/photos\/([^/]+)\//)
  if (!match) continue
  const category = match[1]
  if (!categoriesMap[category]) categoriesMap[category] = []
  categoriesMap[category].push(modules[path])
}
Object.values(categoriesMap).forEach((files) => files.sort())

// Orden y titulo de cada seccion. Si una carpeta no tiene fotos todavia, se omite sola.
export const sectionOrder = [
  { key: 'lugar', title: 'EL LUGAR' },
  { key: 'pizzas', title: 'PIZZAS' },
  { key: 'schiacciatas', title: 'SCHIACCIATAS' },
  { key: 'calzones', title: 'CALZONES' },
  { key: 'picadas', title: 'PICADAS' },
  { key: 'papas-fritas', title: 'PAPAS FRITAS' },
  { key: 'postres', title: 'POSTRES' },
  { key: 'bebidas', title: 'BEBIDAS' },
]
