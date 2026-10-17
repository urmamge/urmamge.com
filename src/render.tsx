import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { theme } from './theme';

/** Mounts any page inside the site's Mantine theme. */
export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MantineProvider theme={theme} forceColorScheme="dark">
        {page}
      </MantineProvider>
    </StrictMode>,
  );
}

export function render(props: Parameters<typeof App>[0]) {
  mount(<App {...props} />);
}
