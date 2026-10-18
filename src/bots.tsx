import { Button, SimpleGrid } from '@mantine/core';
import { IconClock, IconDeviceGamepad2 } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

/** matthewhearst.com/bots */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="bots"
    title="Bots"
    intro="Bots I've made"
  >
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
      <Button
        component="a"
        href="/bots/overwatchbot/"
        color="blush"
        autoContrast
        className={classes.pluginButton}
        leftSection={<IconDeviceGamepad2 size={24} />}
      >
        Overwatch Bot
      </Button>
      <Button disabled className={classes.pluginButton} leftSection={<IconClock size={24} />}>
        TBA
      </Button>
    </SimpleGrid>
  </Subpage>,
);
