import { Anchor, Box, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconMail } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { contactEmail } from './links';
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
  children?: ReactNode;
}

/** Layout for pages below the main ones, e.g. matthewhearst.com/plugins. */
export default function Subpage({ back, eyebrow, title, intro, children }: SubpageProps) {
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
          <Title className={classes.title}>{title}</Title>
          {intro && (
            <Text c="dark.2" maw={560}>
              {intro}
            </Text>
          )}
        </Stack>

        {children}

        <Stack align="center" gap="xs" mt={80}>
          <Anchor href={`mailto:${contactEmail}`} c="dark.3" size="sm" className={appClasses.footerLink}>
            <Group gap={6}>
              <IconMail size={16} />
              <span className={appClasses.label}>contact</span>
              {contactEmail}
            </Group>
          </Anchor>
        </Stack>
      </Container>
    </Box>
  );
}
