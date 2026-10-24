/** What goes on each page's link preview image (the card shown when the link is shared). */
export interface OgPage {
  /** The page's HTML file, relative to the project root. */
  html: string;
  /** Small label above the title. */
  eyebrow: string;
  title: string;
  /** A line or two under the title. */
  text: string;
  /** A Tabler outline icon name, or 'face' for the Minecraft skin face. */
  icon: string;
  /** 'online' uses the pixel font like /urmamge, 'lost' is the 404 page, 'died' is /youdiedmc. */
  theme?: 'online' | 'lost' | 'died';
}

export const siteUrl = 'https://matthewhearst.com';

/** Every page on the site. The build fails if a page is missing here, so add new pages to this list. */
export const ogPages: OgPage[] = [
  {
    html: 'portfolio/index.html',
    eyebrow: "hi, i'm",
    title: 'Matthew Hearst',
    text: "Software Engineering student at Queen's University Belfast. I build practical tools, from Discord bots to OBS plugins and web apps.",
    icon: 'face',
  },
  {
    html: 'urmamge/index.html',
    eyebrow: "hi, i'm",
    title: 'urmamge',
    text: 'Freelance video editor for long-form and short-form videos, editing in DaVinci Resolve.',
    icon: 'face',
    theme: 'online',
  },
  {
    html: 'plugins/index.html',
    eyebrow: 'plugins',
    title: 'Plugins',
    text: "Plugins I've made.",
    icon: 'puzzle',
  },
  {
    html: 'plugins/spotifyoverlay/index.html',
    eyebrow: 'obs plugin',
    title: 'Spotify Overlay',
    text: 'Shows the song playing in Spotify on your stream. No Spotify login or API key needed.',
    icon: 'brand-spotify',
  },
  {
    html: 'plugins/beatmarker/index.html',
    eyebrow: 'davinci resolve plugin',
    title: 'DaVinci Beat Marker',
    text: 'Puts beat and bar markers on your song clip so your cuts snap to the music.',
    icon: 'metronome',
  },
  {
    html: 'apps/index.html',
    eyebrow: 'apps',
    title: 'Apps',
    text: "Apps I've made.",
    icon: 'apps',
  },
  {
    html: 'apps/doctoaudio/index.html',
    eyebrow: 'windows app',
    title: 'Doc to Audio',
    text: 'Right-click a PDF, Word, text or Markdown file to turn it into an MP3.',
    icon: 'headphones',
  },
  {
    html: 'apps/calorietrackerv2/index.html',
    eyebrow: 'windows app',
    title: 'Calorie Tracker v2',
    text: 'Log what you eat and keep track of calories, protein, carbs and fat.',
    icon: 'salad',
  },
  {
    html: 'apps/dragtrainer/index.html',
    eyebrow: 'windows app',
    title: 'Drag Trainer',
    text: 'Learn to drag click, with a click counter for every drag, a coach and practice reminders.',
    icon: 'hand-click',
  },
  {
    html: 'apps/dragtrainer/handtracking/index.html',
    eyebrow: 'drag trainer v1.1',
    title: 'How hand tracking works',
    text: 'How Drag Trainer watches your hand through a camera and works out what your finger did on every drag.',
    icon: 'hand-finger',
  },
  {
    html: 'bots/index.html',
    eyebrow: 'bots',
    title: 'Bots',
    text: "Bots I've made.",
    icon: 'robot',
  },
  {
    html: 'bots/overwatchbot/index.html',
    eyebrow: 'discord bot',
    title: 'Overwatch Bot',
    text: 'The latest Overwatch patch notes in Discord, by role, hero, Stadium, hotfixes or maps.',
    icon: 'device-gamepad-2',
  },
  {
    html: 'bots/overwatchbot/privacy-policy/index.html',
    eyebrow: 'overwatch bot',
    title: 'Privacy Policy',
    text: 'How Overwatch Bot handles your information.',
    icon: 'shield-lock',
  },
  {
    html: 'bots/overwatchbot/terms-of-service/index.html',
    eyebrow: 'overwatch bot',
    title: 'Terms of Service',
    text: 'The terms for using Overwatch Bot.',
    icon: 'file-text',
  },
  {
    html: 'repos/index.html',
    eyebrow: 'repos',
    title: 'Repos',
    text: 'My public GitHub repos.',
    icon: 'folder-code',
  },
  {
    html: '404.html',
    eyebrow: "hi, i'm",
    title: 'lost',
    text: "This place doesn't exist. Pick somewhere else to go instead.",
    icon: 'face',
    theme: 'lost',
  },
  {
    html: 'youdiedmc/index.html',
    eyebrow: '',
    title: 'You died!',
    text: 'You followed a link that fell out of the world',
    icon: 'skull',
    theme: 'died',
  },
];

/** matthewhearst.com redirects to the portfolio, so it shares its preview. */
const aliases: Record<string, string> = { 'index.html': 'portfolio/index.html' };

export function ogPageFor(html: string): OgPage | undefined {
  const target = aliases[html] ?? html;
  return ogPages.find((page) => page.html === target);
}

/** e.g. 'plugins/spotifyoverlay/index.html' → 'plugins-spotifyoverlay' */
export function ogImageName(page: OgPage): string {
  return page.html.replace(/(\/?index)?\.html$/, '').replaceAll('/', '-');
}

/** The page's public URL, e.g. 'https://matthewhearst.com/plugins/'. */
export function pageUrl(html: string): string {
  return `${siteUrl}/${html.replace(/index\.html$/, '')}`;
}
