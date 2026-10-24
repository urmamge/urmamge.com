import { existsSync } from 'node:fs'
import { relative, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { ogImageName, ogPageFor, pageUrl, siteUrl } from './scripts/og-pages.ts'

/** Undoes the HTML escaping in text read from a page, since Vite escapes tag attributes itself. */
const unescape = (text: string) =>
  text.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

/**
 * Adds link preview (Open Graph) tags to every page, using the page's own <title> and description
 * and its image from public/og. Fails the build if a page has no entry in scripts/og-pages.ts or no image.
 */
function linkPreviews(): Plugin {
  return {
    name: 'link-previews',
    transformIndexHtml(html, ctx) {
      const file = relative(import.meta.dirname, ctx.filename).replaceAll('\\', '/')
      const page = ogPageFor(file)
      if (!page) throw new Error(`${file} has no link preview. Add it to scripts/og-pages.ts and run npm run og.`)
      const image = `og/${ogImageName(page)}.png`
      if (!existsSync(resolve(import.meta.dirname, 'public', image))) {
        throw new Error(`public/${image} is missing. Run npm run og.`)
      }

      const title = unescape(/<title>([^<]*)<\/title>/.exec(html)?.[1] ?? page.title)
      const description = unescape(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? page.text)
      const property = (name: string, content: string) => ({ tag: 'meta', attrs: { property: name, content } })
      const tags = [
        property('og:type', 'website'),
        property('og:site_name', 'Matthew Hearst'),
        property('og:title', title),
        property('og:description', description),
        property('og:image', `${siteUrl}/${image}`),
        property('og:image:width', '1200'),
        property('og:image:height', '630'),
        property('og:image:alt', `${page.title}: ${page.text}`),
        // The 404 page is served at whatever URL was mistyped, so it has no URL of its own.
        ...(file === '404.html' ? [] : [property('og:url', pageUrl(file))]),
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      ]
      return tags.map((tag) => ({ ...tag, injectTo: 'head' as const }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), linkPreviews()],
  // Fixed port so the VS Code "Run website" launch config always finds it.
  server: { port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
        portfolio: resolve(import.meta.dirname, 'portfolio/index.html'),
        urmamge: resolve(import.meta.dirname, 'urmamge/index.html'),
        plugins: resolve(import.meta.dirname, 'plugins/index.html'),
        spotifyoverlay: resolve(import.meta.dirname, 'plugins/spotifyoverlay/index.html'),
        beatmarker: resolve(import.meta.dirname, 'plugins/beatmarker/index.html'),
        apps: resolve(import.meta.dirname, 'apps/index.html'),
        doctoaudio: resolve(import.meta.dirname, 'apps/doctoaudio/index.html'),
        calorietrackerv2: resolve(import.meta.dirname, 'apps/calorietrackerv2/index.html'),
        dragtrainer: resolve(import.meta.dirname, 'apps/dragtrainer/index.html'),
        handtracking: resolve(import.meta.dirname, 'apps/dragtrainer/handtracking/index.html'),
        bots: resolve(import.meta.dirname, 'bots/index.html'),
        overwatchbot: resolve(import.meta.dirname, 'bots/overwatchbot/index.html'),
        overwatchbotPrivacy: resolve(import.meta.dirname, 'bots/overwatchbot/privacy-policy/index.html'),
        overwatchbotTerms: resolve(import.meta.dirname, 'bots/overwatchbot/terms-of-service/index.html'),
        repos: resolve(import.meta.dirname, 'repos/index.html'),
        youdiedmc: resolve(import.meta.dirname, 'youdiedmc/index.html'),
      },
    },
  },
})
