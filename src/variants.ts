import { FontStyle } from './model/style';
import { ThemeVariant, Color } from './model/theme';
import fs from 'fs';

const variants: { name: string; variations: ThemeVariant }[] = [
  {
    name: '',
    variations: {},
  },
  {
    name: 'flat',
    variations: {
      fontStyles: (fontStyle: FontStyle | null) => null,
    },
  },
  {
    name: 'muted',
    variations: {
      colors: {
        colors: (color: Color) => color.desaturate(24),
        ansi: (color: Color) => color.desaturate(24),
      },
    },
  },
  {
    name: 'muted-flat',
    variations: {
      colors: {
        colors: (color: Color) => color.desaturate(24),
        ansi: (color: Color) => color.desaturate(24),
      },
      fontStyles: (fontStyle: FontStyle | null) => null,
    },
  },
];

export default variants;
