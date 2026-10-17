import { Anchor, Group } from '@mantine/core';
import { IconBrandGithub, IconCoffee, IconMail } from '@tabler/icons-react';
import { contactEmail, github, kofiUrl } from './links';
import classes from './App.module.css';

const links = [
  { label: 'contact', text: contactEmail, href: `mailto:${contactEmail}`, icon: IconMail },
  { label: 'ko-fi', text: 'urmamge', href: kofiUrl, icon: IconCoffee },
  { label: 'github', text: github.handle, href: github.href, icon: IconBrandGithub },
];

/** Footer shared by every page. */
export default function Footer({ labelClass }: { labelClass: string }) {
  return (
    <Group justify="center" gap="xl" mt={80}>
      {links.map(({ label, text, href, icon: Icon }) => (
        <Anchor
          key={label}
          href={href}
          {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
          c="dark.3"
          size="sm"
          className={classes.footerLink}
        >
          <Group gap={6}>
            <Icon size={16} />
            <span className={labelClass}>{label}</span>
            {text}
          </Group>
        </Anchor>
      ))}
    </Group>
  );
}
