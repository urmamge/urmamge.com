import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Fixed port so the VS Code "Run website" launch config always finds it.
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        portfolio: resolve(import.meta.dirname, 'portfolio/index.html'),
        urmamge: resolve(import.meta.dirname, 'urmamge/index.html'),
        plugins: resolve(import.meta.dirname, 'plugins/index.html'),
        spotifyoverlay: resolve(import.meta.dirname, 'plugins/spotifyoverlay/index.html'),
        beatmarker: resolve(import.meta.dirname, 'plugins/beatmarker/index.html'),
        apps: resolve(import.meta.dirname, 'apps/index.html'),
        doctoaudio: resolve(import.meta.dirname, 'apps/doctoaudio/index.html'),
        bots: resolve(import.meta.dirname, 'bots/index.html'),
        overwatchbot: resolve(import.meta.dirname, 'bots/overwatchbot/index.html'),
        overwatchbotPrivacy: resolve(import.meta.dirname, 'bots/overwatchbot/privacy-policy/index.html'),
        overwatchbotTerms: resolve(import.meta.dirname, 'bots/overwatchbot/terms-of-service/index.html'),
        repos: resolve(import.meta.dirname, 'repos/index.html'),
      },
    },
  },
})
