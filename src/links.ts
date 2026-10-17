import type { Icon } from '@tabler/icons-react';
import {
  IconBrandSpotify,
  IconDeviceGamepad2,
  IconHeadphones,
  IconSalad,
  IconSchool,
  IconUserCircle,
} from '@tabler/icons-react';

export interface Destination {
  title: string;
  description: string;
  icon: Icon;
  /** Leave undefined to show the card as "TBA". */
  href?: string;
  /** Label shown on the link, e.g. the domain it goes to. */
  host?: string;
}

const overwatchBot: Destination = {
  title: 'Overwatch Bot',
  description: 'A Discord bot for Overwatch.',
  icon: IconDeviceGamepad2,
  href: 'https://github.com/urmamge/overwatchbot',
  host: 'github.com/urmamge/overwatchbot',
};

const calorieTracker = {
  title: 'Calorie Tracker',
  description: 'Log meals and keep an eye on daily nutrition.',
  icon: IconSalad,
};

const spotify: Destination = {
  title: 'Spotify Now Playing',
  description: 'OBS plugin showing the current Spotify track. Going public soon.',
  icon: IconBrandSpotify,
  // TODO: add href once the repo is public
};

const docToAudio: Destination = {
  title: 'Doc to Audio',
  description: 'Right-click a PDF, Word, text or Markdown file in Windows to turn it into an MP3.',
  icon: IconHeadphones,
  href: 'https://github.com/urmamge/doc-to-audio',
  host: 'github.com/urmamge/doc-to-audio',
};

const dissertation: Destination = {
  title: 'Final Dissertation',
  description: 'My final-year university dissertation.',
  icon: IconSchool,
  // TODO: add href to the GitHub repo once it's ready
};

const portfolio = {
  title: 'Portfolio',
  description: 'About me and the things I build.',
  icon: IconUserCircle,
};

/** Main page: matthewhearst.com */
export const homeDestinations: Destination[] = [
  overwatchBot,
  {
    ...calorieTracker,
    // calorietracker/index.html forwards to the GitHub Pages site.
    href: '/calorietracker/',
    host: 'matthewhearst.com/calorietracker',
  },
  docToAudio,
  spotify,
  dissertation,
  { ...portfolio, href: '/portfolio/', host: 'matthewhearst.com/portfolio' },
];

/** Portfolio page: matthewhearst.com/portfolio (the original version of the main page) */
export const portfolioDestinations: Destination[] = [
  overwatchBot,
  {
    ...calorieTracker,
    href: 'https://urmamge.github.io/calorieTracker/',
    host: 'urmamge.github.io/calorieTracker',
  },
  spotify,
  // On the portfolio page, the Portfolio card takes you back to the main page.
  { ...portfolio, href: '/', host: 'matthewhearst.com' },
];
