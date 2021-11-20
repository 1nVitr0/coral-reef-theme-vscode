import { Instance } from 'tinycolor2';
import { FontStyle, SemanticTokenColor, TokenColor } from './style';

export type Color = Instance;

export interface Theme {
  coralReef: {
    base: string[];
    colors: string[];
    theme: string[];
    ansi: string[];
    other: string[];
  };
  colors: Record<string, string | null | undefined>;
  tokenColors: TokenColor[];
  semanticTokenColors: Record<string, SemanticTokenColor>;
}

export type ThemeTransform = (theme: Theme) => Theme;

export interface ThemeVariant {
  colors?: Partial<Record<keyof Theme['coralReef'], (color: Color) => Color>>;
  fontStyles?: (fontStyle: FontStyle | null) => FontStyle | null;
}
