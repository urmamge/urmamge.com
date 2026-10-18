import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/overwatchbot';
const invite = 'https://discord.com/oauth2/authorize?client_id=1419678705357160600';

const features = [
  'Type /patchnotes and pick Tank, Damage or Support to see that role’s hero changes from the latest Overwatch patch notes',
  'Add it to a server, or to your own Discord account so you can use it in DMs and group chats too',
  'Long patch notes are split across several messages so nothing gets cut off',
  'Reads the patch notes straight from Blizzard’s website, at most once every 15 minutes',
];

/** matthewhearst.com/bots/overwatchbot */
mount(
  <Subpage
    back={{ href: '/portfolio/', label: 'Back to portfolio' }}
    action={<KofiButton />}
    eyebrow="discord bot"
    title="Overwatch Bot"
    intro="A Discord bot that posts the hero changes for Tank, Damage or Support from the latest Overwatch patch notes."
  >
    <Stack gap={48}>
      <div className={classes.chatPreview} aria-label="Preview of the bot replying to /patchnotes" role="img">
        <div className={classes.chatCommand}>
          <span className={classes.chatCommandName}>/patchnotes</span> role: Support
        </div>
        <div className={classes.chatMessage}>
          <div className={classes.chatAvatar} />
          <div style={{ minWidth: 0 }}>
            <div className={classes.chatAuthor}>
              Overwatch Bot <span className={classes.chatTag}>APP</span>
            </div>
            <div className={classes.chatBody}>
              <b>Overwatch 2 Retail Patch Notes</b>
              <br />
              Support
              <br />
              Hero name
              <br />
              Ability changes…
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
    </Stack>
  </Subpage>,
);
