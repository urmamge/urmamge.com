import { Badge, Button, Group, SimpleGrid, Stack, Table, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconDownload } from '@tabler/icons-react';
import { mount } from './render';
import Subpage from './Subpage';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/obs-spotify-now-playing';
/** The repo's newest release, where the Windows zip is attached. */
const download = `${repo}/releases/latest`;

const features = [
  'Shows the album art, song title and artist, styled like the now-playing corner of the Spotify desktop app',
  'No Spotify login or API key: song info comes from Windows media controls, the same data as the volume flyout',
  'Scales up without blurry text, so it stays sharp on a 1440p or 4K canvas',
  'Can hide itself when the song is paused or Spotify is closed',
];

const settings = [
  ['Width', '384', 'Long titles are cut off with an ellipsis'],
  ['Scale', '1.0', 'Renders at this multiple so text stays sharp'],
  ['Title font', 'Segoe UI Semibold, 15 px, white', ''],
  ['Artist font', 'Segoe UI Semibold, 13 px, #B3B3B3', ''],
  ['Background', 'Black, opaque', 'Supports transparency and rounded corners'],
  ['Album art corner radius', '4', ''],
  ['Hide when paused', 'Off', ''],
  ["Hide when Spotify isn't running", 'On', ''],
];

const steps = [
  <>Download the plugin zip from the button above.</>,
  <>Close OBS.</>,
  <>
    Extract the zip into <span className={classes.path}>C:\ProgramData\obs-studio\plugins\</span>
  </>,
  <>
    Start OBS and add a <b>Spotify Now Playing</b> source to your scene.
  </>,
];

/** matthewhearst.com/plugins/spotifyoverlay */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    eyebrow="obs plugin"
    title="Spotify Overlay"
    intro="An OBS Studio source that shows the song currently playing in Spotify. I made it for my own streams so I could drop the cropped Spotify window capture."
  >
    <Stack gap={48}>
      <div className={classes.preview} aria-label="Preview of the overlay" role="img">
        <div className={classes.previewArt} />
        <div>
          <div className={classes.previewTitle}>Song title</div>
          <div className={classes.previewArtist}>Artist</div>
        </div>
      </div>

      <Group gap="sm">
        <Button component="a" href={download} target="_blank" rel="noopener noreferrer" color="blush" autoContrast size="md" leftSection={<IconDownload size={18} />}>
          Download OBS plugin
        </Button>
        <Button component="a" href={repo} target="_blank" rel="noopener noreferrer" color="tie.5" size="md" leftSection={<IconBrandGithub size={18} />}>
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
            Install
          </Title>
          <Stack gap="md">
            {steps.map((step, i) => (
              <div key={i} className={classes.step}>
                <span className={classes.stepNumber}>{i + 1}</span>
                <Text c="dark.1" size="sm" pt={4}>
                  {step}
                </Text>
              </div>
            ))}
          </Stack>
        </div>
      </SimpleGrid>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Settings
        </Title>
        <Table.ScrollContainer minWidth={480}>
          <Table verticalSpacing="xs" c="dark.1" fz="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Setting</Table.Th>
                <Table.Th>Default</Table.Th>
                <Table.Th>Notes</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {settings.map(([name, value, notes]) => (
                <Table.Tr key={name}>
                  <Table.Td fw={500}>{name}</Table.Td>
                  <Table.Td>{value}</Table.Td>
                  <Table.Td c="dark.2">{notes}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </Stack>
  </Subpage>,
);
