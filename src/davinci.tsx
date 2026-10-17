import { Text } from '@mantine/core';
import { mount } from './render';
import Subpage from './Subpage';
import classes from './Subpage.module.css';

/** matthewhearst.com/plugins/davinci-placeholder */
mount(
  <Subpage back={{ href: '/portfolio/', label: 'Back to portfolio' }} eyebrow="plugins" title="DaVinci Resolve Plugin">
    <div className={classes.panel}>
      <Text c="dark.1">Coming soon.</Text>
    </div>
  </Subpage>,
);
