import type { Icon } from '@tabler/icons-react';
import {
  IconBrandSpotify,
  IconDeviceGamepad2,
  IconSalad,
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

export const destinations: Destination[] = [
  {
    title: 'Overwatch Bot',
    description: 'A Discord bot for Overwatch.',
    icon: IconDeviceGamepad2,
    href: 'https://github.com/urmamge/overwatchbot',
    host: 'github.com/urmamge/overwatchbot',
  },
  {
    title: 'Calorie Tracker',
    description: 'Log meals and keep an eye on daily nutrition.',
    icon: IconSalad,
    href: 'https://urmamge.github.io/calorieTracker/',
    host: 'urmamge.github.io/calorieTracker',
  },
  {
    title: 'Spotify Now Playing',
    description: 'OBS plugin showing the current Spotify track. Going public soon.',
    icon: IconBrandSpotify,
    // TODO: add href once the repo is public
  },
  {
    title: 'Portfolio',
    description: 'About me and the things I build.',
    icon: IconUserCircle,
    // TODO: set href: '#top' once the portfolio section is written
  },
];
