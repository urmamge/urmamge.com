import { portfolioAbout } from './about';
import { portfolioDestinations, portfolioSocials } from './links';
import { render } from './render';

render({
  name: 'Matthew Hearst',
  tagline:
    "Software Engineering student at Queen's University Belfast. I build practical tools, from Discord bots to OBS plugins and web apps.",
  about: portfolioAbout,
  destinations: portfolioDestinations,
  socials: portfolioSocials,
});
