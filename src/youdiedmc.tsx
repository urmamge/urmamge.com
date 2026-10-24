import { Box, Container, SimpleGrid, Stack, Text } from '@mantine/core';
import Footer from './Footer';
import { everyPage } from './links';
import { mount } from './render';
import appClasses from './App.module.css';
import classes from './YouDied.module.css';

/** matthewhearst.com/youdiedmc: the Minecraft death screen, with the pages as respawn buttons. */
mount(
  <Box className={classes.page}>
    <Container size="sm" py={{ base: 48, sm: 96 }}>
      <Stack align="center" gap="lg" ta="center" className={classes.died}>
        <Text className={classes.title}>You died!</Text>
        <Text className={classes.cause}>You followed a link that fell out of the world</Text>
        <Text className={classes.score}>
          Score: <span>404</span>
        </Text>
        <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="sm" mt="lg" w="100%" maw={520}>
          {everyPage.map(({ name, href }) => (
            <a key={href} href={href} className={classes.button}>
              Respawn at {name}
            </a>
          ))}
        </SimpleGrid>
      </Stack>
      <Footer labelClass={appClasses.pixel} />
    </Container>
  </Box>,
);
