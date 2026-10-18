import { List } from '@mantine/core';
import { mount } from './render';
import LegalPage, { LegalLink, LegalList, LegalSection, LegalText } from './LegalPage';
import { contactEmail } from './links';

const email = <LegalLink href={`mailto:${contactEmail}`} />;

/** matthewhearst.com/bots/overwatchbot/privacy-policy (kept in step with PRIVACY.md in the overwatchbot repo) */
mount(
  <LegalPage
    back={{ href: '/bots/overwatchbot/', label: 'Back to Overwatch Bot' }}
    eyebrow="overwatch bot"
    title="Privacy Policy"
    updated="18 October 2026"
  >
    <LegalText>
      This policy explains what information Overwatch Bot (“the bot”) uses and what happens to it. The bot is run by urmamge Productions (Matthew Hearst). If you have a
      question, email {email}.
    </LegalText>

    <LegalSection heading="What the bot collects">
      <LegalText>
        <b>When you use a command or press a button.</b> Discord sends the bot your Discord user ID, the ID of the server and channel you used it in,
        and the options you picked. The bot uses this only to send you a reply.
      </LegalText>
      <LegalText>
        <b>Multi-page replies.</b> When a reply has page buttons, the bot keeps your user ID and the reply’s ID in memory for 15 minutes, so only you
        can turn the pages. After 15 minutes, or when the bot restarts, they’re gone. They’re never written to disk.
      </LegalText>
      <LegalText>
        <b>/autopost.</b> When someone with the Manage Server permission turns on /autopost, the bot saves the server’s ID, the channel’s ID, and the ID
        of the role to ping (if one was picked). It needs these to post new patch notes in the right place. They’re kept until:
      </LegalText>
      <LegalList>
        <List.Item>
          someone runs <code>/autopost off</code>,
        </List.Item>
        <List.Item>the bot is removed from the server, or</List.Item>
        <List.Item>the channel is deleted or the bot can no longer see it.</List.Item>
      </LegalList>
      <LegalText>
        <b>Error logs.</b> If something goes wrong, details of the error are written to the bot’s log so it can be fixed. These can include a channel ID.
        They’re only used for fixing problems.
      </LegalText>
    </LegalSection>

    <LegalSection heading="What the bot doesn’t collect">
      <LegalList>
        <List.Item>It can’t read your messages. It only asks Discord for what it needs to see slash commands, not message content.</List.Item>
        <List.Item>It doesn’t save your username, profile, messages, IP address or anything else about you.</List.Item>
        <List.Item>It doesn’t use analytics, tracking or ads.</List.Item>
      </LegalList>
    </LegalSection>

    <LegalSection heading="Who it’s shared with">
      <LegalText>Nobody. The information above is never sold, rented or shared.</LegalText>
      <LegalText>
        The bot runs on Discord, so everything you do with it also goes through Discord. Discord’s own{' '}
        <LegalLink href="https://discord.com/privacy">privacy policy</LegalLink> covers that.
      </LegalText>
      <LegalText>The bot downloads patch notes from Blizzard’s website. It doesn’t send Blizzard anything about you.</LegalText>
    </LegalSection>

    <LegalSection heading="Your choices">
      <LegalList>
        <List.Item>
          Run <code>/autopost off</code> to delete your server’s /autopost settings.
        </List.Item>
        <List.Item>
          Remove the bot from your server, or from your account under User Settings › Authorized Apps, to stop it getting any information about you.
        </List.Item>
        <List.Item>Email {email} to ask what the bot has stored about you or your server, or to ask for it to be deleted.</List.Item>
      </LegalList>
    </LegalSection>

    <LegalSection heading="Age">
      <LegalText>You need to be old enough to use Discord to use the bot. That’s at least 13, or older in some countries.</LegalText>
    </LegalSection>

    <LegalSection heading="Changes to this policy">
      <LegalText>If this policy changes, the new version will be posted on this page with a new “Last updated” date.</LegalText>
    </LegalSection>
  </LegalPage>,
);
