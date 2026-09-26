import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        carta: resolve(__dirname, 'carta.html'),
        eventos: resolve(__dirname, 'eventos.html'),
      },
    },
  },
})
