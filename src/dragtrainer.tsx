import { Badge, Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconDownload } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/drag-trainer';
/** The repo's newest release, where Drag-Trainer.exe is attached. */
const download = `${repo}/releases/latest`;

const features = [
  'Timed CPS tests from 0.5 to 60 seconds, left or right click, with history and a best score for each length',
  'Drag practice mode with no timer: it counts the clicks in each drag and draws a bar for each one, so you can see how consistent you are',
  'A coach that reacts to every drag and writes a session report: inconsistent drags, drags that stall partway, fading as you tire, and whether slow resets are holding your CPS back',
  'Guided 10-minute practice sessions of 10 seconds dragging, 10 seconds resting, with a Windows notification when your next session is due and when to stop',
  'A built-in guide to drag clicking: which mice can do it, finger position, pressure, consistency, resets and grip tape',
];

const install = [
  <>
    Download <b>Drag-Trainer.exe</b> from the button above.
  </>,
  <>Double-click it. There’s nothing to install; the exe is the app, so keep it anywhere, like your Desktop.</>,
  <>
    If Windows shows <b>Windows protected your PC</b>, click <b>More info</b>, then <b>Run anyway</b>. You only need
    to do this once. It’s because the app isn’t code-signed, not because it’s a virus.
  </>,
  <>It takes a few seconds to open, because it unpacks itself each time it starts.</>,
];

const safety = [
  'No admin rights, no system settings changed and no network requests of its own: no telemetry, accounts or ads',
  'Your scores and practice history stay on your PC, in %APPDATA%\\Drag Trainer',
  'It only counts clicks on its own grey pad, not anywhere else',
  'Every release is built by GitHub Actions from the tagged source, with a SHA256 checksum and a build attestation you can verify',
  'Closing the window quits it completely. To uninstall, delete Drag-Trainer.exe',
];

function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <Stack gap="md">
      {steps.map((step, i) => (
        <div key={i} className={classes.step}>
          <span className={classes.stepNumber}>{i + 1}</span>
          <Text c="dark.1" size="sm" pt={4} style={{ minWidth: 0 }}>
            {step}
          </Text>
        </div>
      ))}
    </Stack>
  );
}

/** matthewhearst.com/apps/dragtrainer */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="windows app"
    title="Drag Trainer"
    intro="An app for learning to drag click. It counts every click in every drag, has a coach that tells you what went wrong, and reminds you when to practise (and when to stop)."
  >
    <Stack gap={48}>
      <img
        src="/screenshots/dragtrainer-drag-practice.png"
        alt="Drag practice mode: a bar for each drag's clicks, with the coach's feedback underneath"
        className={classes.screenshot}
      />

      <Group gap="sm">
        <Button component="a" href={download} target="_blank" rel="noopener noreferrer" color="blush" autoContrast size="md" leftSection={<IconDownload size={18} />}>
          Download Drag Trainer
        </Button>
        <Button component="a" href={repo} target="_blank" rel="noopener noreferrer" color="tie.5" size="md" leftSection={<IconBrandGithub size={18} />}>
          View on GitHub
        </Button>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Windows 10 & 11
        </Badge>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Free & open source
        </Badge>
      </Group>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Why I made it
        </Title>
        <Text c="dark.1" size="sm">
          I couldn’t drag click. I’d watched people do it, bought grip tape and tried for ages, and still only got two
          clicks a drag. Every guide said “just drag your finger across it”, and none of them helped me work out what I
          was doing wrong. So I built the tool I wished I’d had: one that counts the clicks in every drag, shows whether
          I’m getting better, and gives me an idea of what to change. I’m still learning with it myself.
        </Text>
      </div>

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
            Install
          </Title>
          <Steps steps={install} />
        </div>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <img src="/screenshots/dragtrainer-timed.png" alt="A timed CPS test result" className={classes.screenshot} />
        <img src="/screenshots/dragtrainer-guide.png" alt="The built-in guide to drag clicking" className={classes.screenshot} />
      </SimpleGrid>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Is it safe?
        </Title>
        <Stack gap="sm">
          {safety.map((line) => (
            <Text key={line} c="dark.1" size="sm">
              {line}
            </Text>
          ))}
        </Stack>
      </div>

      <Text c="dark.3" size="sm">
        Coming soon: hand tracking that watches your drags through a camera and tells you what to fix. Some game
        servers limit or flag very high CPS, so check the rules where you play.
      </Text>
    </Stack>
  </Subpage>,
);
