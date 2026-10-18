import { Anchor, List, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

interface LegalPageProps {
  back: { href: string; label: string };
  eyebrow: string;
  title: string;
  /** e.g. "18 October 2026" */
  updated: string;
  /** A <LegalText> intro followed by <LegalSection>s. */
  children: ReactNode;
}

/** A link inside legal text, opening outside links in a new tab. */
export function LegalLink({ href, children }: { href: string; children?: ReactNode }) {
  return (
    <Anchor href={href} c="blush.4" inherit {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children ?? href.replace(/^(https?:\/\/|mailto:)/, '')}
    </Anchor>
  );
}

/** A paragraph of legal text. */
export function LegalText({ children }: { children: ReactNode }) {
  return (
    <Text c="dark.1" size="sm">
      {children}
    </Text>
  );
}

/** A bulleted list; pass <List.Item>s as children. */
export function LegalList({ children }: { children: ReactNode }) {
  return (
    <List c="dark.1" size="sm" spacing={6}>
      {children}
    </List>
  );
}

/** One headed box of a policy. */
export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className={classes.panel}>
      <Title order={2} fz="h4" mb="md">
        {heading}
      </Title>
      <Stack gap="sm">{children}</Stack>
    </div>
  );
}

/** Layout for privacy policies and terms of service, e.g. matthewhearst.com/bots/overwatchbot/privacy-policy. */
export default function LegalPage({ back, eyebrow, title, updated, children }: LegalPageProps) {
  return (
    <Subpage back={back} eyebrow={eyebrow} title={title} intro={`Last updated ${updated}`}>
      <Stack gap="lg">{children}</Stack>
    </Subpage>
  );
}
