import { Box, Card, Container, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import Footer from './Footer';
import { everyPage } from './links';
import { mount } from './render';
import appClasses from './App.module.css';
import classes from './NotFound.module.css';

/** matthewhearst.com/404.html, served by GitHub Pages for any page that doesn't exist. */
mount(
  <Box className={appClasses.page}>
    <Container size="sm" py={{ base: 48, sm: 96 }}>
      <Stack align="center" gap="lg" ta="center">
        <div className={`${appClasses.face} ${classes.lostFace}`} role="img" aria-label="Minecraft skin face">
          <div className={appClasses.faceBase} />
          <div className={appClasses.faceHat} />
        </div>
        <Text className={appClasses.pixel} c="blush.4" size="sm">
          hi, i'm
        </Text>
        <Title className={appClasses.name}>lost</Title>
        <Text className={`${appClasses.pixel} ${classes.bigCode}`}>404</Text>
        <Text c="dark.2" maw={440}>
          This place doesn't exist. Pick somewhere else to go instead.
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md" w="100%" mt="lg">
          {everyPage.map(({ name, icon: Icon, href }) => (
            <Card key={href} component="a" href={href} className={appClasses.card} padding="md" radius="lg">
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon size={36} radius="md" className={appClasses.icon}>
                  <Icon size={20} stroke={1.6} />
                </ThemeIcon>
                <Text fw={600}>{name}</Text>
                <IconArrowUpRight className={appClasses.arrow} size={18} style={{ marginLeft: 'auto', flexShrink: 0 }} />
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
      <Footer labelClass={appClasses.label} />
    </Container>
  </Box>,
);
