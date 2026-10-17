import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconArrowUpRight, IconClock, IconFileCv, IconMail } from '@tabler/icons-react';
import type { About } from './about';
import { contactEmail, type Destination, type Social } from './links';
import { useLiveStatus } from './live';
import classes from './App.module.css';

interface AppProps {
  name: string;
  /** Line under the name. */
  tagline: string;
  /** Optional "about me" section shown between the header and the rest of the page. */
  about?: About;
  destinations: Destination[];
  socials: Social[];
  /** Use the Minecraft-style pixel font for small labels. */
  pixelFont?: boolean;
  /** Show the socials section above "places to go" instead of below it. */
  socialsFirst?: boolean;
}

function SkinFace() {
  return (
    <div className={classes.face} role="img" aria-label="Minecraft skin face">
      <div className={classes.faceBase} />
      <div className={classes.faceHat} />
    </div>
  );
}

function DestinationCard({
  title,
  description,
  icon: Icon,
  href,
  host,
  labelClass,
}: Destination & { labelClass: string }) {
  const tba = !href;
  const external = href?.startsWith('http');

  return (
    <Card
      component={tba ? 'div' : 'a'}
      {...(tba
        ? { 'aria-disabled': true }
        : { href, ...(external && { target: '_blank', rel: 'noopener noreferrer' }) })}
      className={classes.card}
      data-tba={tba || undefined}
      padding="lg"
      radius="lg"
    >
      <Group justify="space-between" align="flex-start" mb="md">
        <ThemeIcon size={48} radius="md" className={classes.icon}>
          <Icon size={26} stroke={1.6} />
        </ThemeIcon>
        {tba ? (
          <Badge variant="outline" color="gray" leftSection={<IconClock size={12} />} className={labelClass}>
            TBA
          </Badge>
        ) : (
          <IconArrowUpRight className={classes.arrow} size={22} />
        )}
      </Group>

      <Title order={3} fz="h4" mb={4}>
        {title}
      </Title>
      <Text c="dark.2" size="sm" mb="md">
        {description}
      </Text>
      <Text size="xs" c={tba ? 'dark.3' : 'tie.2'} className={labelClass} mt="auto">
        {host ?? 'coming soon'}
      </Text>
    </Card>
  );
}

function SocialCard({ name, handle, icon: Icon, href, live, labelClass }: Social & { labelClass: string }) {
  const isLive = useLiveStatus(live);

  return (
    <Card
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.socialCard}
      data-live={isLive || undefined}
      padding="md"
      radius="lg"
    >
      <Group gap="md" wrap="nowrap">
        <ThemeIcon size={40} radius="md" className={classes.socialIcon}>
          <Icon size={22} stroke={1.6} />
        </ThemeIcon>
        <div style={{ minWidth: 0 }}>
          <Group gap={8} wrap="nowrap">
            <Text fw={600}>{name}</Text>
            {isLive && (
              <Badge size="sm" radius="sm" className={`${classes.liveBadge} ${labelClass}`}>
                <span className={classes.liveDot} />
                live
              </Badge>
            )}
          </Group>
          <Text size="xs" c="tie.2" className={labelClass} truncate>
            {handle}
          </Text>
        </div>
        <IconArrowUpRight className={classes.arrow} size={20} style={{ marginLeft: 'auto', flexShrink: 0 }} />
      </Group>
    </Card>
  );
}

function AboutSection({ about, labelClass }: { about: About; labelClass: string }) {
  return (
    <Box className={classes.about}>
      <Text className={labelClass} c="blush.2" size="xs" mb="sm">
        about me
      </Text>
      <Stack gap="sm" mb="lg">
        {about.paragraphs.map((paragraph) => (
          <Text key={paragraph} c="dark.1">
            {paragraph}
          </Text>
        ))}
      </Stack>

      <SimpleGrid cols={{ base: 1, xs: about.facts.length }} spacing="md" mb="lg">
        {about.facts.map(({ label, value }) => (
          <div key={label}>
            <Text className={labelClass} c="dark.3" size="xs">
              {label}
            </Text>
            <Text fw={500}>{value}</Text>
          </div>
        ))}
      </SimpleGrid>

      <Group justify="space-between" align="flex-end" gap="md">
        <div>
          <Text className={labelClass} c="dark.3" size="xs" mb={6}>
            {about.skillsLabel}
          </Text>
          <Group gap="xs">
            {about.skills.map((skill) => (
              <Badge key={skill} size="lg" radius="sm" className={classes.skill}>
                {skill}
              </Badge>
            ))}
          </Group>
        </div>
        {about.cvHref ? (
          <Button component="a" href={about.cvHref} download leftSection={<IconFileCv size={18} />} color="blush">
            Download CV
          </Button>
        ) : (
          <Button disabled variant="default" leftSection={<IconFileCv size={18} />}>
            CV coming soon
          </Button>
        )}
      </Group>
    </Box>
  );
}

export default function App({
  name,
  tagline,
  about,
  destinations,
  socials,
  pixelFont = false,
  socialsFirst = false,
}: AppProps) {
  const labelClass = pixelFont ? classes.pixel : classes.label;

  const placesSection = (
    <div>
      <Text className={labelClass} c="dark.3" size="xs" mb="sm">
        places to go
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {destinations.map((d) => (
          <DestinationCard key={d.title} {...d} labelClass={labelClass} />
        ))}
      </SimpleGrid>
    </div>
  );

  const socialsSection = (
    <Box className={classes.socials}>
      <Text className={labelClass} c="tie.2" size="xs" mb="sm">
        socials
      </Text>
      <SimpleGrid cols={{ base: 1, xs: socials.length % 3 === 0 ? 3 : 2 }} spacing="md">
        {socials.map((social) => (
          <SocialCard key={social.name} {...social} labelClass={labelClass} />
        ))}
      </SimpleGrid>
    </Box>
  );

  return (
    <Box id="top" className={classes.page}>
      <Container size="md" py={{ base: 48, sm: 96 }}>
        <Stack align="center" gap="lg" mb={64} ta="center">
          <SkinFace />
          <Text className={labelClass} c="blush.4" size="sm">
            hi, i'm
          </Text>
          <Title className={classes.name}>{name}</Title>
          <Text c="dark.2" maw={520}>
            {tagline}
          </Text>
        </Stack>

        <Stack gap={56}>
          {about && <AboutSection about={about} labelClass={labelClass} />}
          {socialsFirst ? socialsSection : placesSection}
          {socialsFirst ? placesSection : socialsSection}
        </Stack>

        <Stack align="center" gap="xs" mt={80}>
          <Anchor href={`mailto:${contactEmail}`} c="dark.3" size="sm" className={classes.footerLink}>
            <Group gap={6}>
              <IconMail size={16} />
              <span className={labelClass}>contact</span>
              {contactEmail}
            </Group>
          </Anchor>
        </Stack>
      </Container>
    </Box>
  );
}
