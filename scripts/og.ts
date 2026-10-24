/**
 * Renders a 1200×630 link preview image for every page in og-pages.ts into public/og/,
 * by screenshotting an HTML card in headless Chrome. Run `npm run og` after changing a page's card.
 * Set CHROME to Chrome's path if it isn't in the usual place.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ogImageName, ogPages, pageUrl, type OgPage } from './og-pages.ts';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'public', 'og');

const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((path) => path && existsSync(path));
if (!chrome) throw new Error('Chrome not found. Set CHROME to its path.');

const skin = `data:image/png;base64,${readFileSync(join(root, 'public', 'skin.png')).toString('base64')}`;

function icon(name: string): string {
  return readFileSync(join(root, 'node_modules', '@tabler', 'icons', 'icons', 'outline', `${name}.svg`), 'utf8');
}

function escape(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** The skin face at the given size; the head front is at (8,8) and the hat overlay at (40,8) on the 64×64 skin. */
function face(size: number, extraClass = ''): string {
  const layer = (x: number) =>
    `<div style="position:absolute;inset:0;background:url(${skin}) ${-size * x}px ${-size}px / 800% 800%;image-rendering:pixelated"></div>`;
  return `<div class="face ${extraClass}" style="width:${size}px;height:${size}px">${layer(1)}${layer(5)}</div>`;
}

const styles = `
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    font-family: Outfit, system-ui, sans-serif;
    color: #ebeff2;
    background:
      radial-gradient(ellipse 60% 50% at 30% 0%, rgba(228, 173, 175, 0.18), transparent 70%),
      radial-gradient(ellipse 50% 50% at 95% 100%, rgba(88, 122, 188, 0.22), transparent 70%),
      #242336;
  }
  .card { display: flex; align-items: center; gap: 64px; height: 100%; padding: 72px 88px; }
  .copy { flex: 1; min-width: 0; display: flex; flex-direction: column; height: 100%; }
  .eyebrow { color: #ebbcbb; font-size: 26px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
  .title { font-size: 92px; font-weight: 700; line-height: 1; margin-top: 18px; letter-spacing: -0.01em; }
  .title.long { font-size: 76px; }
  .text { color: #c6c8ca; font-size: 32px; line-height: 1.35; margin-top: 28px; max-width: 700px; }
  .url { margin-top: auto; display: flex; align-items: center; gap: 16px; color: #88c6f5; font-size: 26px; font-weight: 500; }
  .url .face { border-radius: 6px; box-shadow: none; }
  .tile {
    flex: none; width: 260px; height: 260px; border-radius: 48px; display: grid; place-items: center;
    background: rgba(228, 173, 175, 0.14); border: 2px solid rgba(228, 173, 175, 0.3); color: #f1ccc7;
  }
  .tile svg { width: 150px; height: 150px; stroke-width: 1.6; }
  .face {
    position: relative; flex: none; overflow: hidden; border-radius: 14px;
    box-shadow: 0 0 0 8px #2a2a3c, 0 0 0 12px #ebbcbb, 0 20px 60px rgba(228, 173, 175, 0.3);
  }
  .tilted { transform: rotate(-12deg); }
  .pixel { font-family: Silkscreen, monospace; letter-spacing: 0.04em; text-transform: lowercase; }
  .code { font-family: Silkscreen, monospace; font-size: 120px; line-height: 1; color: #ebbcbb; text-shadow: 8px 8px 0 #1a1927; margin-top: 8px; }
  .died {
    height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
    font-family: Silkscreen, monospace; text-align: center; text-shadow: 3px 3px 0 #3f3f3f;
    background: linear-gradient(rgba(80, 0, 0, 0.85), rgba(160, 20, 20, 0.75)), #1a1927;
  }
  .died .title { font-family: inherit; font-size: 120px; text-shadow: 6px 6px 0 #3f3f3f; margin: 0; }
  .died .text { color: #fff; margin: 0; max-width: none; }
  .died .score { font-size: 32px; }
  .died .score span { color: #ffff55; }
  .died .url { margin-top: 24px; color: #e0e0e0; }
`;

function card(page: OgPage): string {
  const url = pageUrl(page.html).replace(/^https:\/\//, '').replace(/(\.html)?\/?$/, '');
  const pixel = page.theme === 'online' || page.theme === 'lost' ? ' pixel' : '';

  if (page.theme === 'died') {
    return `<div class="died">
      <div class="title">${escape(page.title)}</div>
      <div class="text">${escape(page.text)}</div>
      <div class="score">Score: <span>404</span></div>
      <div class="url">${face(40)}${escape(url)}</div>
    </div>`;
  }

  const side =
    page.theme === 'lost'
      ? `<div style="display:flex;flex-direction:column;align-items:center;gap:36px">${face(220, 'tilted')}<div class="code">404</div></div>`
      : page.icon === 'face'
        ? face(260)
        : `<div class="tile">${icon(page.icon)}</div>`;

  return `<div class="card">
    <div class="copy">
      <div class="eyebrow${pixel}">${escape(page.eyebrow)}</div>
      <div class="title${page.title.length > 14 ? ' long' : ''}">${escape(page.title)}</div>
      <div class="text">${escape(page.text)}</div>
      <div class="url${pixel}">${face(40)}${escape(url)}</div>
    </div>
    ${side}
  </div>`;
}

mkdirSync(outDir, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'og-'));
const only = process.argv[2];

try {
  for (const page of ogPages) {
    const name = ogImageName(page);
    if (only && name !== only) continue;
    const htmlFile = join(work, `${name}.html`);
    writeFileSync(
      htmlFile,
      `<!doctype html><html><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Silkscreen&display=swap" rel="stylesheet">
      <style>${styles}</style></head><body>${card(page)}</body></html>`,
    );
    const out = join(outDir, `${name}.png`);
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,630',
        '--virtual-time-budget=5000',
        `--user-data-dir=${join(work, 'profile')}`,
        `--screenshot=${out}`,
        pathToFileURL(htmlFile).href,
      ],
      { stdio: 'ignore' },
    );
    console.log(`public/og/${name}.png`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
