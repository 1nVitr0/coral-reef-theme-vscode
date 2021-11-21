import { FontStyle } from './model/style';
import { ThemeVariant, Color } from './model/theme';

const muteColors = (color: Color) => color.desaturate(24);
const defaultColors = (color: Color) => color.desaturate(12);
const stripFontStyles = (fontStyle: FontStyle | null) => null;

const variants: Record<string, ThemeVariant> = {
  '': { colors: { colors: defaultColors, ansi: defaultColors } },
  flat: {
    colors: { colors: defaultColors, ansi: defaultColors },
    fontStyles: stripFontStyles,
  },
  bright: {},
  'bright-flat': {
    fontStyles: stripFontStyles,
  },
  muted: {
    colors: { colors: muteColors, ansi: muteColors },
  },
  'muted-flat': {
    colors: { colors: muteColors, ansi: muteColors },
    fontStyles: stripFontStyles,
  },
};

export default variants;
