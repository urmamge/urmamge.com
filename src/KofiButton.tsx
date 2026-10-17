import { Button } from '@mantine/core';
import { IconCoffee } from '@tabler/icons-react';
import { kofiUrl } from './links';

/** Small "support me" link to Ko-fi, for the top of plugin pages. */
export default function KofiButton() {
  return (
    <Button
      component="a"
      href={kofiUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
      color="blush"
      size="xs"
      radius="xl"
      leftSection={<IconCoffee size={14} />}
    >
      Support me on Ko-fi
    </Button>
  );
}
