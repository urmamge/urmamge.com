import { List } from '@mantine/core';
import { mount } from './render';
import LegalPage, { LegalLink, LegalList, LegalSection, LegalText } from './LegalPage';
import { contactEmail } from './links';

/** matthewhearst.com/bots/overwatchbot/terms-of-service (kept in step with TERMS.md in the overwatchbot repo) */
mount(
  <LegalPage
    back={{ href: '/bots/overwatchbot/', label: 'Back to Overwatch Bot' }}
    eyebrow="overwatch bot"
    title="Terms of Service"
    updated="18 October 2026"
  >
    <LegalText>
      These terms cover your use of Overwatch Bot (“the bot”), which is run by Matthew Hearst. By adding or using the bot, you agree to them. If you
      don’t agree, please don’t use the bot.
    </LegalText>

    <LegalSection heading="Discord’s rules still apply">
      <LegalText>
        You must also follow Discord’s <LegalLink href="https://discord.com/terms">Terms of Service</LegalLink> and{' '}
        <LegalLink href="https://discord.com/guidelines">Community Guidelines</LegalLink> when using the bot.
      </LegalText>
    </LegalSection>

    <LegalSection heading="Using the bot">
      <LegalText>The bot is free. Please don’t:</LegalText>
      <LegalList>
        <List.Item>use it to spam, harass or break Discord’s rules,</List.Item>
        <List.Item>try to break, overload or find a way around how it works, or</List.Item>
        <List.Item>pretend to be the bot or its developer.</List.Item>
      </LegalList>
      <LegalText>If you set up /autopost, you’re responsible for the channel it posts in and the role it pings.</LegalText>
    </LegalSection>

    <LegalSection heading="No guarantees">
      <LegalText>The bot is provided “as is”. It may go offline, change, or stop running at any time, with or without notice.</LegalText>
      <LegalText>
        Patch notes are copied from Blizzard’s website automatically, so they may be incomplete, out of date or formatted wrongly. Check Blizzard’s patch
        notes page if something looks off.
      </LegalText>
    </LegalSection>

    <LegalSection heading="Liability">
      <LegalText>
        As far as the law allows, Matthew Hearst isn’t liable for any loss or damage that comes from using, or not being able to use, the bot.
      </LegalText>
    </LegalSection>

    <LegalSection heading="Not affiliated with Blizzard">
      <LegalText>
        The bot is fan-made and isn’t affiliated with or endorsed by Blizzard Entertainment. Overwatch is a trademark of Blizzard Entertainment, Inc.
        Patch notes, hero names and images belong to Blizzard.
      </LegalText>
    </LegalSection>

    <LegalSection heading="Losing access">
      <LegalText>The bot may be removed from a server, or a user blocked from using it, if these terms are broken.</LegalText>
    </LegalSection>

    <LegalSection heading="Your data">
      <LegalText>
        How the bot handles information is explained in the <LegalLink href="/bots/overwatchbot/privacy-policy/">privacy policy</LegalLink>.
      </LegalText>
    </LegalSection>

    <LegalSection heading="Changes to these terms">
      <LegalText>
        If these terms change, the new version will be posted on this page with a new “Last updated” date. Using the bot after that means you accept the
        new terms.
      </LegalText>
    </LegalSection>

    <LegalSection heading="Contact">
      <LegalText>
        Questions? Email <LegalLink href={`mailto:${contactEmail}`} />.
      </LegalText>
    </LegalSection>
  </LegalPage>,
);
