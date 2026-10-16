# urmamge.github.io

Landing page linking to my projects. It will also host my portfolio.

Built with Vite, React, TypeScript and [Mantine](https://mantine.dev). Colours come from my Minecraft skin (`public/skin.png`).

## Develop

```sh
npm install
npm run dev
```

## Adding or updating links

Edit `src/links.ts`. A destination without an `href` shows as **TBA**.

## Deploying

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`. The repo needs to be public, and Pages must be set to "GitHub Actions" under Settings → Pages.
