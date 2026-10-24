import { Button, SimpleGrid } from '@mantine/core';
import { IconBrandSpotify, IconClock, IconMetronome } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

/** matthewhearst.com/plugins */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="plugins"
    title="Plugins"
    intro="Plugins I've made"
  >
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
      <Button
        component="a"
        href="/plugins/spotifyoverlay/"
        color="blush"
        autoContrast
        className={classes.pluginButton}
        leftSection={<IconBrandSpotify size={24} />}
      >
        Spotify Overlay
      </Button>
      <Button
        component="a"
        href="/plugins/beatmarker/"
        color="blush"
        autoContrast
        className={classes.pluginButton}
        leftSection={<IconMetronome size={24} />}
      >
        DaVinci Beat Marker
      </Button>
      <Button disabled className={classes.pluginButton} leftSection={<IconClock size={24} />}>
        TBA
      </Button>
    </SimpleGrid>
  </Subpage>,
);
