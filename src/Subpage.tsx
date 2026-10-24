import { Anchor, Box, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import Footer from './Footer';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

/** Pages the back link can return to, by path. */
const pageNames: Record<string, string> = {
  '/portfolio/': 'portfolio',
  '/urmamge/': 'urmamge',
  '/plugins/': 'plugins',
  '/bots/': 'bots',
  '/apps/': 'apps',
  '/repos/': 'repos',
  '/bots/overwatchbot/': 'Overwatch Bot',
};

/** The page the visitor came from, if it's one of the pages above; otherwise the fallback. */
function backLink(fallback: SubpageProps['back']): SubpageProps['back'] {
  try {
    const from = new URL(document.referrer);
    const path = from.pathname.endsWith('/') ? from.pathname : `${from.pathname}/`;
    if (from.origin !== location.origin || path === location.pathname) return fallback;
    const name = pageNames[path];
    return name ? { href: path, label: `Back to ${name}` } : fallback;
  } catch {
    // No referrer, e.g. the page was opened directly.
    return fallback;
  }
}

interface SubpageProps {
  /** Where the back link at the top goes when the visitor didn't come from another page on the site. */
  back: { href: string; label: string };
  /** Small label above the title. */
  eyebrow: string;
  title: string;
  /** Optional line under the title. */
  intro?: string;
  /** Small element shown beside the title, e.g. <KofiButton />. */
  action?: ReactNode;
  children?: ReactNode;
}

/** Layout for pages below the main ones, e.g. matthewhearst.com/plugins. */
export default function Subpage({ back: fallback, eyebrow, title, intro, action, children }: SubpageProps) {
  const back = backLink(fallback);

  return (
    <Box className={appClasses.page}>
      <Container size="md" py={{ base: 32, sm: 64 }}>
        <Anchor
          href={back.href}
          onClick={(event) => {
            // Step back through history instead of opening the page again. Opening it would make the
            // previous page's back link point here, so Bots ⇄ Overwatch Bot would loop forever.
            if (back === fallback || event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return;
            event.preventDefault();
            history.back();
          }}
          c="dark.2"
          size="sm"
          className={classes.back}
        >
          <Group gap={6}>
            <IconArrowLeft size={16} />
            {back.label}
          </Group>
        </Anchor>

        <Stack gap="sm" mt={48} mb={48}>
          <Text className={appClasses.label} c="blush.4" size="sm">
            {eyebrow}
          </Text>
          <Group justify="space-between" align="center" gap="md">
            <Title className={classes.title}>{title}</Title>
            {action}
          </Group>
          {intro && (
            <Text c="dark.2" maw={560}>
              {intro}
            </Text>
          )}
        </Stack>

        {children}

        <Footer labelClass={appClasses.label} />
      </Container>
    </Box>
  );
}
