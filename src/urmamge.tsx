import { urmamgeAbout } from './about';
import { urmamgeDestinations, urmamgeSocials } from './links';
import { render } from './render';

render({
  name: 'urmamge',
  about: urmamgeAbout,
  destinations: urmamgeDestinations,
  socials: urmamgeSocials,
  pixelFont: true,
  socialsFirst: true,
});
