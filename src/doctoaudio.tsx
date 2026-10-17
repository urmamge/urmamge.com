import { Badge, Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconChevronRight, IconDownload } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/doc-to-audio';
/** It's a set of scripts with no build step, so the download is the repo itself. */
const download = `${repo}/archive/refs/heads/main.zip`;

const speeds = ['Normal speed', '1.25x speed', '1.5x speed', '2x speed'];

const features = [
  'Adds a "Convert to audio (Ava)" option to the right-click menu for PDF, Word (.docx), text and Markdown files',
  'Pick a speed (normal, 1.25x, 1.5x or 2x) and an MP3 appears next to the original, with a notification when it’s done',
  'Reads with Microsoft’s natural-sounding Ava voice',
  'Cleans the text first: drops repeated PDF headers and footers, page numbers and URLs, rejoins broken lines and strips Markdown symbols',
  'Select several files at once and they’re all converted in one go',
];

const install = [
  <>
    Install <b>Python 3</b> from python.org and tick <b>Add python.exe to PATH</b> during setup.
  </>,
  <>
    Download the zip from the button above and extract it somewhere it can stay, like Documents. The right-click
    menu runs from this folder, so don’t delete it.
  </>,
  <>
    Right-click inside the extracted folder, choose <b>Open in Terminal</b> and run:
    <code className={classes.command}>powershell -ExecutionPolicy Bypass -File install.ps1</code>
  </>,
  <>
    Right-click a document, choose <b>Show more options</b> → <b>Convert to audio (Ava)</b> and pick a speed.
  </>,
];

const uninstall = [
  <>
    Right-click inside the doc-to-audio folder, choose <b>Open in Terminal</b> and run:
    <code className={classes.command}>powershell -ExecutionPolicy Bypass -File uninstall.ps1</code>
  </>,
  <>This removes the right-click menu and the Python environment it set up.</>,
  <>Delete the doc-to-audio folder to remove the rest.</>,
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

/** matthewhearst.com/apps/doctoaudio */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="windows app"
    title="Doc to Audio"
    intro="Right-click a PDF, Word, text or Markdown file in Windows to turn it into an MP3 you can listen to."
  >
    <Stack gap={48}>
      <div className={classes.menuPreview} aria-label="Preview of the right-click menu" role="img">
        <div className={classes.menu}>
          <div className={classes.menuItem}>Open</div>
          <div className={classes.menuItem}>Copy as path</div>
          <div className={classes.menuItem} data-active>
            Convert to audio (Ava)
            <IconChevronRight size={14} />
          </div>
          <div className={classes.menuItem}>Properties</div>
        </div>
        <div className={classes.menu}>
          {speeds.map((speed) => (
            <div key={speed} className={classes.menuItem}>
              {speed}
            </div>
          ))}
        </div>
      </div>

      <Group gap="sm">
        <Button component="a" href={download} color="blush" autoContrast size="md" leftSection={<IconDownload size={18} />}>
          Download Doc to Audio
        </Button>
        <Button component="a" href={repo} target="_blank" rel="noopener noreferrer" color="tie.5" size="md" leftSection={<IconBrandGithub size={18} />}>
          View on GitHub
        </Button>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Windows only
        </Badge>
        <Badge variant="outline" color="gray" size="lg" className={appClasses.label}>
          Needs internet
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
          Uninstall
        </Title>
        <Steps steps={uninstall} />
      </div>

      <Text c="dark.3" size="sm">
        Scanned PDFs that are only images have no text to read, so they’re reported as an error.
      </Text>
    </Stack>
  </Subpage>,
);
