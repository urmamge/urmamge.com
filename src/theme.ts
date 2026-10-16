import { createTheme, type MantineColorsTuple } from '@mantine/core';

// Palette pulled from the "haimiy" Minecraft skin:
// navy jacket, silver hair, blush cheeks, blue eyes and tie.

const navy: MantineColorsTuple = [
  '#ebeff2', // shirt highlight
  '#d2d2d2', // hair
  '#c6c8ca', // hair shadow
  '#8b8d9c',
  '#4c5053',
  '#3b3d4c', // jacket highlight
  '#353747',
  '#2a2a3c', // jacket
  '#242336', // jacket shadow
  '#1a1927',
];

const blush: MantineColorsTuple = [
  '#fff4ee',
  '#feeade', // skin
  '#f8dbd2',
  '#f1ccc7',
  '#ebbcbb', // cheeks
  '#e4adaf',
  '#d48f92',
  '#b8737a',
  '#8f5860',
  '#634c44',
];

const tie: MantineColorsTuple = [
  '#eaf3fb',
  '#b4d2ea', // eye shine
  '#88c6f5', // eyes
  '#6fa3e3',
  '#5d86d6',
  '#587abc', // tie
  '#536c9b',
  '#455a82',
  '#384969',
  '#2a3850',
];

export const theme = createTheme({
  primaryColor: 'blush',
  primaryShade: 4,
  colors: {
    dark: navy,
    blush,
    tie,
  },
  fontFamily: 'Outfit, system-ui, sans-serif',
  headings: { fontFamily: 'Outfit, system-ui, sans-serif', fontWeight: '700' },
  defaultRadius: 'md',
});
