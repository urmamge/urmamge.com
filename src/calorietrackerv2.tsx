import { Anchor, Badge, Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/daily-nutrition-tracker-v2';

const features = [
  'Search foods from Open Food Facts by name and brand, or save your own custom foods',
  'Log a portion by weight and see its calories, protein, carbs and fat straight away',
  'Each day shows your totals and how much of your energy came from each macro',
  'History & averages shows your daily calories as a chart and your averages over any period',
  'Export everything to a CSV, and switch between light and dark mode',
];

const howItWorks = [
  'The interface is React, TypeScript and Mantine, the same as this website',
  'A small Node server runs on your PC and keeps every entry in a local SQLite database, so your log works offline',
  'Double-clicking the launcher starts the server and opens the app in its own window. Closing the window shuts the server down',
  <>
    It can sync to Supabase, which powers the history website at{' '}
    <Anchor href="/calorietracker/" c="tie.2">
      matthewhearst.com/calorietracker
    </Anchor>
  </>,
];

/** matthewhearst.com/apps/calorietrackerv2 */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="windows app"
    title="Calorie Tracker v2"
    intro="A desktop app for logging what I eat and keeping track of calories, protein, carbs and fat. It's my original calorie tracker remade in TypeScript with a nicer interface."
  >
    <Stack gap={48}>
      <img
        src="/screenshots/calorietrackerv2-log.png"
        alt="The food log: a day's calories and macros, food search, and the list of foods logged"
        className={classes.screenshot}
      />

      <Group gap="sm">
        <Button component="a" href={repo} target="_blank" rel="noopener noreferrer" color="blush" autoContrast size="md" leftSection={<IconBrandGithub size={18} />}>
          View on GitHub
        </Button>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Windows only
        </Badge>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <div className={classes.panel}>
          <Title order={2} fz="h4" mb="md">
            What it does
          </Title>
          <Stack gap="sm">
            {features.map((feature) => (
              <Text key={feature} c="dark.1" size="sm">
                {feature}
              </Text>
            ))}
          </Stack>
        </div>

        <div className={classes.panel}>
          <Title order={2} fz="h4" mb="md">
            How it works
          </Title>
          <Stack gap="sm">
            {howItWorks.map((line, i) => (
              <Text key={i} c="dark.1" size="sm">
                {line}
              </Text>
            ))}
          </Stack>
        </div>
      </SimpleGrid>

      <img
        src="/screenshots/calorietrackerv2-history.png"
        alt="History & averages: average calories and macros per day, a chart of daily calories and a table of daily totals"
        className={classes.screenshot}
      />
    </Stack>
  </Subpage>,
);
