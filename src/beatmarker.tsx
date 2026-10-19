import { Badge, Button, Group, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconDownload } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/davinci-beat-marker-plugin';
/** The repo's newest release, where the zip is attached. */
const download = `${repo}/releases/latest`;

/** Four bars of four beats for the preview; the first beat of each bar is a downbeat. */
const previewBeats = Array.from({ length: 16 }, (_, i) => i % 4 === 0);

const features = [
  'Detects the beats and bars of a song on your timeline and puts colour-coded markers on the song clip itself, so they move with it',
  'Markers on every beat, every 2 beats, every bar, every 2 or 4 bars, or every hit',
  'Downbeats get their own colour and are labelled Bar 1, Bar 2, … while other beats are labelled like 3.2 (bar 3, beat 2)',
  'Half-time and double-time toggle, plus a frame nudge for cutting slightly ahead of the beat',
  'Only touches its own markers: re-running replaces them, and Clear Beat Markers removes them without affecting yours',
  'Works in the free version of Resolve as well as Studio',
];

const install = [
  <>
    Install <b>64-bit Python 3.13</b> for all users. In PowerShell:
    <code className={classes.command}>winget install --id Python.Python.3.13 --scope machine --architecture x64</code>
  </>,
  <>Download the zip from the button above and extract it anywhere.</>,
  <>
    Right-click inside the extracted folder, choose <b>Open in Terminal</b> and run:
    <code className={classes.command}>powershell -ExecutionPolicy Bypass -File install.ps1</code>
    It sets up a private Python environment with the audio analysis library (about 150 MB) and adds the scripts to
    Resolve’s menu.
  </>,
  <>Close DaVinci Resolve completely and open it again.</>,
];

const usage = [
  <>Put your song on an audio track in your timeline. If there are several, move the playhead over the one you want.</>,
  <>
    Go to <b>Workspace</b> → <b>Scripts</b> → <b>Beat Markers</b> → <b>Beat Markers</b>.
  </>,
  <>
    Pick your settings and click <b>Add markers</b>. The first analysis of a song takes 10–20 seconds, then it’s
    cached.
  </>,
  <>
    Press <b>N</b> to turn on snapping so cuts lock onto the markers.
  </>,
];

const settings = [
  ['Song', 'Which audio clip on the timeline to analyse'],
  ['Markers at', 'Every beat, every 2 beats, every bar, every 2 bars, every 4 bars or every hit'],
  ['Tempo feel', 'Half time or double time, if the markers come out twice as dense or sparse as the song feels'],
  ['Beat colour / Downbeat colour', 'Marker colours'],
  ['Nudge (frames)', 'Shift every marker earlier (negative) or later. Cutting 1–2 frames early often feels tighter.'],
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

/** matthewhearst.com/plugins/beatmarker */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="davinci resolve plugin"
    title="DaVinci Beat Marker"
    intro="Automatic beat markers for DaVinci Resolve. Pick a song on your timeline and it places markers on every beat and bar, so your cuts can snap to the music."
  >
    <Stack gap={48}>
      <div className={classes.timelinePreview} aria-label="Preview of beat markers on a song clip" role="img">
        <div className={classes.markers}>
          {previewBeats.map((downbeat, i) => (
            <span key={i} className={classes.marker} data-downbeat={downbeat || undefined} />
          ))}
        </div>
        <div className={classes.audioClip} />
      </div>

      <Group gap="sm">
        <Button component="a" href={download} target="_blank" rel="noopener noreferrer" color="blush" autoContrast size="md" leftSection={<IconDownload size={18} />}>
          Download Beat Marker
        </Button>
        <Button component="a" href={repo} target="_blank" rel="noopener noreferrer" color="tie.5" size="md" leftSection={<IconBrandGithub size={18} />}>
          View on GitHub
        </Button>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Windows only
        </Badge>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Resolve free or Studio
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
            Install
          </Title>
          <Steps steps={install} />
        </div>
      </SimpleGrid>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          How to use
        </Title>
        <Steps steps={usage} />
      </div>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Settings
        </Title>
        <Table.ScrollContainer minWidth={480}>
          <Table verticalSpacing="xs" c="dark.1" fz="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Setting</Table.Th>
                <Table.Th>What it does</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {settings.map(([name, notes]) => (
                <Table.Tr key={name}>
                  <Table.Td fw={500}>{name}</Table.Td>
                  <Table.Td>{notes}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>

      <Text c="dark.3" size="sm">
        To remove the markers, use <b>Workspace</b> → <b>Scripts</b> → <b>Beat Markers</b> → <b>Clear Beat Markers</b>.
        Setup help and troubleshooting are in the README on GitHub.
      </Text>
    </Stack>
  </Subpage>,
);
