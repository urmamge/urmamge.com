import { Anchor, Box, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import Footer from './Footer';
import appClasses from './App.module.css';
import classes from './Subpage.module.css';

interface SubpageProps {
  /** Where the back link at the top goes. */
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
export default function Subpage({ back, eyebrow, title, intro, action, children }: SubpageProps) {
  return (
    <Box className={appClasses.page}>
      <Container size="md" py={{ base: 32, sm: 64 }}>
        <Anchor href={back.href} c="dark.2" size="sm" className={classes.back}>
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
