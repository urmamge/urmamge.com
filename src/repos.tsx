import { Button, SimpleGrid } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

/** Repos under github.com/urmamge, minus website, A2-Coursework and textbasedgame. */
const repos = [
  'urmamge.github.io',
  'RSRS',
  'doc-to-audio',
  'davinci-beat-marker-plugin',
  'obs-spotify-now-playing',
  'overwatchbot',
  'leavingBot',
  'calorietracker',
  'daily-nutrition-tracker-v2',
  'therankings',
];

/** matthewhearst.com/repos */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="repos"
    title="Repos"
    intro="My GitHub repos"
  >
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
      {repos.map((repo) => (
        <Button
          key={repo}
          component="a"
          href={`https://github.com/urmamge/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          color="blush"
          autoContrast
          className={classes.pluginButton}
          leftSection={<IconBrandGithub size={24} />}
        >
          {repo}
        </Button>
      ))}
    </SimpleGrid>
  </Subpage>,
);
