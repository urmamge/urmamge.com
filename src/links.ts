import type { Icon } from '@tabler/icons-react';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandSpotify,
  IconBrandTwitch,
  IconBrandX,
  IconBrandYoutube,
  IconDeviceGamepad2,
  IconHeadphones,
  IconSalad,
  IconSchool,
  IconUserCircle,
} from '@tabler/icons-react';
import type { LiveCheck } from './live';

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

const calorieTracker: Destination = {
  title: 'Calorie Tracker',
  description: 'Log meals and keep an eye on daily nutrition.',
  icon: IconSalad,
};

const spotify: Destination = {
  title: 'Spotify Now Playing',
  description: 'OBS plugin showing the current Spotify track. Going public soon.',
  icon: IconBrandSpotify,
  href: '/plugins/spotifyoverlay/',
  host: 'matthewhearst.com/plugins/spotifyoverlay',
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
  href: 'https://github.com/urmamge/final-dissertation',
  host: 'github.com/urmamge/final-dissertation',
};

const portfolio = {
  title: 'Portfolio',
  description: 'About me and the things I build.',
  icon: IconUserCircle,
};

type Page = 'portfolio' | 'urmamge';

/**
 * Cards shown on both pages, in display order: Portfolio first, TBA cards last,
 * Final Dissertation at the very end. Add new cards here so both pages get them.
 */
function destinationsFor(page: Page): Destination[] {
  return [
    // The Portfolio card swaps between the two pages.
    page === 'portfolio'
      ? { ...portfolio, href: '/urmamge/', host: 'matthewhearst.com/urmamge' }
      : { ...portfolio, href: '/portfolio/', host: 'matthewhearst.com/portfolio' },
    overwatchBot,
    { ...calorieTracker, href: '/calorietracker/', host: 'matthewhearst.com/calorietracker' },
    docToAudio,
    spotify,
    dissertation,
  ];
}

/** Main page: matthewhearst.com/portfolio (matthewhearst.com redirects here) */
export const portfolioDestinations = destinationsFor('portfolio');

/** matthewhearst.com/urmamge (the original version of the main page) */
export const urmamgeDestinations = destinationsFor('urmamge');

export interface Social {
  name: string;
  handle: string;
  icon: Icon;
  href: string;
  /** Show a "live" badge on the card while this channel is streaming. */
  live?: LiveCheck;
}

const github: Social = {
  name: 'GitHub',
  handle: 'urmamge',
  icon: IconBrandGithub,
  href: 'https://github.com/urmamge',
};

/** Socials on the main page: matthewhearst.com/portfolio */
export const portfolioSocials: Social[] = [
  github,
  {
    name: 'LinkedIn',
    handle: 'Matthew Hearst',
    icon: IconBrandLinkedin,
    href: 'https://www.linkedin.com/in/matthew-hearst-57890b405/',
  },
  {
    name: 'Instagram',
    handle: '@matthewhearst1',
    icon: IconBrandInstagram,
    href: 'https://www.instagram.com/matthewhearst1/',
  },
];

/** Socials on matthewhearst.com/urmamge */
export const urmamgeSocials: Social[] = [
  {
    name: 'YouTube',
    handle: '@urmamge',
    icon: IconBrandYoutube,
    href: 'https://www.youtube.com/@urmamge',
    live: { platform: 'youtube', channelId: 'UCAkA3j2Sek-WbeMOK-bEdGA' },
  },
  {
    name: 'Twitch',
    handle: 'urmamge',
    icon: IconBrandTwitch,
    href: 'https://www.twitch.tv/urmamge',
    live: { platform: 'twitch', channel: 'urmamge' },
  },
  { name: 'X', handle: '@urmamge', icon: IconBrandX, href: 'https://x.com/urmamge' },
  github,
];

export const contactEmail = 'contact@matthewhearst.com';
