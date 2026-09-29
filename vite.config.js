import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        platos: resolve(__dirname, 'platos.html'),
        eventos: resolve(__dirname, 'eventos.html'),
        local: resolve(__dirname, 'local.html'),
      },
    },
  },
})
