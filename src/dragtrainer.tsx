import { Badge, Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconDownload, IconHandFinger } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/drag-trainer';
/** Each version's Drag-Trainer.exe, straight from its GitHub release. */
const downloadV1 = `${repo}/releases/download/v1.0.0/Drag-Trainer.exe`;
const downloadV11 = `${repo}/releases/download/v1.1.0/Drag-Trainer.exe`;

const featuresV1 = [
  'Timed CPS tests from 0.5 to 60 seconds, left or right click, with history and a best score for each length',
  'Drag practice mode with no timer: it counts the clicks in each drag and draws a bar for each one, so you can see how consistent you are',
  'A coach that reacts to every drag and writes a session report: inconsistent drags, drags that stall partway, fading as you tire, and whether slow resets are holding your CPS back',
  'Guided 10-minute practice sessions of 10 seconds dragging, 10 seconds resting, with a Windows notification when your next session is due and when to stop',
  'A built-in guide to drag clicking: which mice can do it, finger position, pressure, consistency, resets and grip tape',
];

const featuresV11 = [
  'Hand tracking: point your phone or webcam at your mouse hand, and after every drag the coach tells you your finger angle, where the drag started, how far and fast it went, and whether your fingertip lifted',
  'Learns what works for you: after 8 tracked drags it compares your best and worst drags, sums up what your best ones do differently, and marks where to start with a green circle',
  'Drag replays: turn on recording and it keeps your 3 best and 3 worst drags from each session, says what made each one good or bad, and plays them back in slow motion or frame by frame with every click marked. Each marking can be switched off to see just your hand',
  'A phone camera setup guide inside the app',
  'The video is analysed live on your PC and never sent anywhere. It’s only saved if you turn on recording, and then only as short clips on your PC'
];

const install = [
  <>
    Download <b>Drag-Trainer.exe</b> for the version you want from the buttons above.
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
  'v1.0 never uses your camera. v1.1 only uses it when you turn on hand tracking, and neither version uses your microphone',
  'Every release is built by GitHub Actions from the tagged source, with a SHA256 checksum and a build attestation you can verify',
  'Closing the window quits it completely. To uninstall, delete Drag-Trainer.exe, and delete the %APPDATA%\\Drag Trainer folder to remove your scores and replays too',
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
        <Button component="a" href={downloadV11} color="blush" autoContrast size="md" leftSection={<IconDownload size={18} />}>
          Download v1.1
        </Button>
        <Button component="a" href={downloadV1} color="blush" variant="outline" size="md" leftSection={<IconDownload size={18} />}>
          Download v1.0
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

      <Text c="dark.2" size="sm" mt={-32} maw={640}>
        <b>Not sure which?</b> Get v1.1. Hand tracking stays off until you switch it on, so until then it works just
        like v1.0. Pick v1.0 if you don’t want camera features at all or want a slightly smaller download (~110MB vs
        ~119MB). Both share the same saved scores, so you can switch any time.
      </Text>

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
            What it does in v1.0
          </Title>
          <Stack gap="sm">
            {featuresV1.map((feature) => (
              <Text key={feature} c="dark.1" size="sm">
                {feature}
              </Text>
            ))}
          </Stack>
        </div>

        <div className={classes.panel}>
          <Title order={2} fz="h4" mb={4}>
            What v1.1 adds
          </Title>
          <Text c="dark.3" size="sm" mb="md">
            Everything in v1.0, plus:
          </Text>
          <Stack gap="sm">
            {featuresV11.map((feature) => (
              <Text key={feature} c="dark.1" size="sm">
                {feature}
              </Text>
            ))}
          </Stack>
          <Text c="dark.2" size="sm" mt="md">
            <b>Work in progress:</b> hand tracking is still being improved, with better optimisation and bug fixes coming
            in future updates.
          </Text>
          <Button component="a" href="/apps/dragtrainer/handtracking/" color="tie.5" size="sm" mt="lg" leftSection={<IconHandFinger size={16} />}>
            How it works
          </Button>
        </div>
      </SimpleGrid>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Install
        </Title>
        <Steps steps={install} />
      </div>

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
        Some game servers limit or flag very high CPS, so check the rules where you play.
      </Text>
    </Stack>
  </Subpage>,
);
