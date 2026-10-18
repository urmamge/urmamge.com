import { Button, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { mount } from './render';
import KofiButton from './KofiButton';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

const repo = 'https://github.com/urmamge/overwatchbot';
/** It has no build step, so the download is the repo itself. */
const download = `${repo}/archive/refs/heads/main.zip`;
const invite = 'https://discord.com/oauth2/authorize?client_id=1419678705357160600';
const developerPortal = 'https://discord.com/developers/applications';

const features = [
  'Type /patchnotes and pick Tank, Damage or Support to see that role’s hero changes from the latest Overwatch patch notes',
  'Add it to a server, or to your own Discord account so you can use it in DMs and group chats too',
  'Long patch notes are split across several messages so nothing gets cut off',
  'Reads the patch notes straight from Blizzard’s website, at most once every 15 minutes',
];

const install = [
  <>
    Install <b>Node.js</b> (version 18 or newer) from nodejs.org.
  </>,
  <>
    In the{' '}
    <a href={developerPortal} target="_blank" rel="noopener noreferrer">
      Discord Developer Portal
    </a>
    , click <b>New Application</b> and give it a name. On the <b>Bot</b> tab, click <b>Reset Token</b> and copy
    the token.
  </>,
  <>
    Download the <a href={download}>zip</a> and extract it somewhere it can stay, like Documents.
  </>,
  <>
    In the extracted folder, create a file called <span className={classes.path}>.env</span> containing:
    <code className={classes.command}>DISCORD_TOKEN=your-bot-token</code>
  </>,
  <>
    Right-click inside the folder, choose <b>Open in Terminal</b> and run:
    <code className={classes.command}>npm install</code>
    <code className={classes.command}>npm start</code>
    Leave the window open: the bot is only online while it’s running. The first time it starts,{' '}
    <span className={classes.path}>/patchnotes</span> can take a few minutes to show up in Discord.
  </>,
  <>
    Back in the Developer Portal, open the <b>Installation</b> tab, copy the <b>Install Link</b> and open it to add
    the bot to a server or to your account.
  </>,
];

const usage = [
  <>
    Click <b>Add to Discord</b> and choose a server, or add it to your own account to use it in DMs and group chats.
  </>,
  <>
    In any channel or DM the bot can see, type <span className={classes.path}>/patchnotes</span> and pick a role.
  </>,
  <>The bot replies with that role’s hero changes, headed by the patch they came from.</>,
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
            Host it yourself
          </Title>
          <Text c="dark.2" size="sm" mb="md">
            Only needed if you want to run your own copy instead of using Add to Discord.
          </Text>
          <Steps steps={install} />
        </div>
      </SimpleGrid>

      <div className={classes.panel}>
        <Title order={2} fz="h4" mb="md">
          Use it
        </Title>
        <Steps steps={usage} />
      </div>
    </Stack>
  </Subpage>,
);
