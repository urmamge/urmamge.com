import { Button, SimpleGrid } from '@mantine/core';
import { IconClock, IconHeadphones } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

/** matthewhearst.com/apps */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="apps"
    title="Apps"
    intro="Apps I've made"
  >
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
      <Button
        component="a"
        href="/apps/doctoaudio/"
        color="blush"
        autoContrast
        className={classes.pluginButton}
        leftSection={<IconHeadphones size={24} />}
      >
        Doc to Audio
      </Button>
      <Button disabled className={classes.pluginButton} leftSection={<IconClock size={24} />}>
        TBA
      </Button>
    </SimpleGrid>
  </Subpage>,
);
