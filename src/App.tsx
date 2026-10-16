import {
  Anchor,
  Badge,
  Box,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconArrowUpRight, IconBrandGithub, IconClock } from '@tabler/icons-react';
import { destinations, type Destination } from './links';
import classes from './App.module.css';

function SkinFace() {
  return (
    <div className={classes.face} role="img" aria-label="Minecraft skin face">
      <div className={classes.faceBase} />
      <div className={classes.faceHat} />
    </div>
  );
}

function DestinationCard({ title, description, icon: Icon, href, host }: Destination) {
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
          <Badge variant="outline" color="gray" leftSection={<IconClock size={12} />} className={classes.pixel}>
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
      <Text size="xs" c={tba ? 'dark.3' : 'tie.2'} className={classes.pixel} mt="auto">
        {host ?? 'coming soon'}
      </Text>
    </Card>
  );
}

export default function App() {
  return (
    <Box id="top" className={classes.page}>
      <Container size="md" py={{ base: 48, sm: 96 }}>
        <Stack align="center" gap="lg" mb={64} ta="center">
          <SkinFace />
          <Text className={classes.pixel} c="blush.4" size="sm">
            hi, i'm
          </Text>
          <Title className={classes.name}>urmamge</Title>
          <Text c="dark.2" maw={460}>
            Things I've built and where to find them. Pick somewhere to go.
          </Text>
        </Stack>

        <Text className={classes.pixel} c="dark.3" size="xs" mb="sm">
          places to go
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {destinations.map((d) => (
            <DestinationCard key={d.title} {...d} />
          ))}
        </SimpleGrid>

        <Group justify="center" mt={80}>
          <Anchor
            href="https://github.com/urmamge"
            target="_blank"
            rel="noopener noreferrer"
            c="dark.3"
            size="sm"
            className={classes.footerLink}
          >
            <Group gap={6}>
              <IconBrandGithub size={16} />
              github.com/urmamge
            </Group>
          </Anchor>
        </Group>
      </Container>
    </Box>
  );
}
