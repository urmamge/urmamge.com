import { Button, Group, Stack, Table, Text, Title } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/overwatchbot';
const invite = 'https://discord.com/oauth2/authorize?client_id=1419678705357160600';

const features = [
  'Type /patchnotes to see the latest hero changes, for one role or one hero, with hero names suggested as you type',
  'See Stadium changes, hotfixes, bug fixes, general changes or map changes instead, and filter Stadium changes by role too',
  'Replies look like the patch notes page: hero portraits, ability names, developer comments and a color for each role',
  'Long patch notes get page buttons instead of a wall of messages, plus a button to open them on Blizzard’s site',
  'Turn on /autopost to post new patch notes in a channel as soon as they’re out, with an optional role ping',
  'If the newest patch doesn’t have what you asked for, it looks back through up to 6 months of patch notes',
  'Add it to a server, or to your own Discord account so you can use /patchnotes in DMs and group chats too',
  'Reads the patch notes straight from Blizzard’s website, at most once every 15 minutes',
];

const commands = [
  ['/patchnotes heroes', 'The latest hero changes. Add role:Tank, role:Damage or role:Support for one role'],
  ['/patchnotes hero name:Juno', 'Juno’s latest changes'],
  ['/patchnotes stadium', 'The latest Stadium changes. Add a role to see that role’s heroes'],
  ['/patchnotes hotfix', 'The newest hotfix'],
  ['/patchnotes bugfixes', 'The latest bug fixes'],
  ['/patchnotes general', 'Events, modes and other changes that aren’t about one hero'],
  ['/patchnotes maps', 'Map updates, with before and after screenshots'],
  ['/autopost on channel:#patch-notes', 'Posts new patch notes in that channel. Add ping:@role to ping a role. Needs Manage Server'],
  ['/autopost off', 'Stops posting new patch notes'],
];

/** matthewhearst.com/bots/overwatchbot */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="discord bot"
    title="Overwatch Bot"
    intro="A Discord bot that shows the latest Overwatch patch notes, for one role, one hero, Stadium, hotfixes, bug fixes or maps, and can post new patch notes in your server as they come out."
  >
    <Stack gap={48}>
      <div className={classes.chatPreview} aria-label="Preview of the bot replying to /patchnotes" role="img">
        <div className={classes.chatCommand}>
          <span className={classes.chatCommandName}>/patchnotes stadium</span> role: Tank
        </div>
        <div className={classes.chatMessage}>
          <div className={classes.chatAvatar} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className={classes.chatAuthor}>
              Overwatch Bot <span className={classes.chatTag}>APP</span>
            </div>
            <div className={classes.chatEmbed}>
              <div style={{ minWidth: 0 }}>
                <div className={classes.chatEmbedAuthor}>Stadium · Tank</div>
                <div className={classes.chatEmbedTitle}>D.Va</div>
                <div className={classes.chatBody}>
                  <b>MEKA Ejector - Power</b>
                  <br />• Ultimate Charge cost reduction increased to 60% (Up from 50%).
                </div>
                <div className={classes.chatEmbedFooter}>Overwatch Retail Patch Notes – September 8, 2026</div>
              </div>
              <div className={classes.chatEmbedThumb} />
            </div>
            <div className={classes.chatButtons}>
              <span className={classes.chatButton}>◀ Previous</span>
              <span className={classes.chatButton}>Page 1/2</span>
              <span className={classes.chatButton}>Next ▶</span>
              <span className={classes.chatButton}>Open patch notes ↗</span>
            </div>
          </div>
        </div>
      </div>

      <Group gap="sm">
        <Button component="a" href={invite} target="_blank" rel="noopener noreferrer" color="blush" autoContrast size="md" leftSection={<IconBrandDiscord size={18} />}>
          Add to Discord
        </Button>
        <Button component="a" href={repo} target="_blank" rel="noopener noreferrer" color="tie.5" size="md" leftSection={<IconBrandGithub size={18} />}>
          View on GitHub
        </Button>
      </Group>

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
          Commands
        </Title>
        <Table.ScrollContainer minWidth={480}>
          <Table verticalSpacing="xs" c="dark.1" fz="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Command</Table.Th>
                <Table.Th>What it does</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {commands.map(([command, description]) => (
                <Table.Tr key={command}>
                  <Table.Td>
                    <span className={classes.slashCommand}>{command}</span>
                  </Table.Td>
                  <Table.Td>{description}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </div>
    </Stack>
  </Subpage>,
);
