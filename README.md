# urmamge.github.io

My personal website, live at [matthewhearst.com](https://matthewhearst.com). It has my portfolio and a page for each thing I've made, like my bots, plugins and apps.

Built with Vite, React, TypeScript and [Mantine](https://mantine.dev).

## Pages

| Page | What's on it |
| --- | --- |
| `/` | Redirects to `/portfolio/` |
| `/portfolio/` | Main page: about me, my projects and socials |
| `/urmamge/` | The original version of the main page, with my YouTube, Twitch and X |
| `/repos/` | My GitHub repos |
| `/bots/` | My Discord bots |
| `/bots/overwatchbot/` | Overwatch Bot, plus its `privacy-policy/` and `terms-of-service/` |
| `/plugins/` | My plugins, like the Spotify Now Playing overlay for OBS |
| `/apps/` | My apps, like Doc to Audio |

## Adding a page

1. Make a folder for it with an `index.html`, copying one like `bots/overwatchbot/index.html` and pointing its script at a new file in `src/`.
2. Build the page in that file using `Subpage` (or `LegalPage` for policies) so it matches the rest of the site.
3. Add the `index.html` to `build.rollupOptions.input` in `vite.config.ts`, or it won't be included in the build.
4. To show it as a card on the main pages, add it to `src/links.ts`.

## Running it

1. Run `npm install`
2. Run `npm run dev` and open http://localhost:5173, or press F5 in VS Code to start it and open Chrome

`npm run build` builds the site into `dist/` and `npm run lint` checks the code.

The "live" badge on the YouTube card needs a YouTube API key in `VITE_YOUTUBE_API_KEY`. Without one, the badge doesn't show.

## Deploying

Pushing to `main` builds the site and deploys it to GitHub Pages ([deploy.yml](.github/workflows/deploy.yml)). `public/` is copied as-is, including the `CNAME` for the domain and the Discord domain check in `.well-known/`.
