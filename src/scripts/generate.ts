import { readFile } from 'fs/promises';
import { join } from 'path';
import { Type, DEFAULT_SCHEMA, load } from 'js-yaml';
import { Theme, ThemeVariant, ThemeTransform } from '../model/theme';
import variantDescriptors from '../variants';
import tinycolor from 'tinycolor2';
import { FontStyle } from '../model/style';

const themeFile = join(__dirname, '..', '..', 'src', 'coral-reef.yml');

const transformVariant = (variant: ThemeVariant): ThemeTransform =>
  function (theme: Theme): Theme {
    const transformed: Theme = JSON.parse(JSON.stringify(theme)); // clone base theme

    // Map original colors to transformed colors
    const transformColors = Object.keys(variant.colors || {}).reduce((acc, key: keyof Theme['coralReef']) => {
      for (const color of transformed.coralReef[key]) {
        const tinyColor = tinycolor(color);
        const transformed = variant.colors[key](tinyColor);
        if (transformed.isValid()) acc.set(color, transformed.toHexString());
      }

      return acc;
    }, new Map<string, string>());

    // Apply for ui
    for (const [key, color] of Object.entries(transformed.colors)) {
      const replace = transformColors.get(color);
      if (replace) transformed.colors[key] = replace;
    }

    // Apply for tokens
    transformed.tokenColors = transformed.tokenColors.map((value) => {
      const replace = transformColors.get(value.settings.foreground);
      if (replace) value.settings.foreground = replace;
      if (variant.fontStyles) {
        const transformedStyle = variant.fontStyles(value.settings.fontStyle);
        if (transformedStyle) value.settings.fontStyle = variant.fontStyles(value.settings.fontStyle);
        else delete value.settings.fontStyle;
      }
      return value;
    });

    // Apply for semantic tokens
    for (const [key, color] of Object.entries(transformed.semanticTokenColors)) {
      const replace = transformColors.get(color.foreground);
      if (replace) transformed.semanticTokenColors[key].foreground = replace;
      if (variant.fontStyles) {
        const original = [color.bold && 'bold', color.italic && 'italic', color.underline && 'underline']
          .filter((e) => !!e)
          .join(' ') as FontStyle;
        const transformedStyle = variant.fontStyles(original);

        for (const style of ['bold', 'italic', 'underline']) {
          if (transformedStyle && transformedStyle.includes(style)) transformed.semanticTokenColors[key][style] = true;
          else if (color[style]) transformed.semanticTokenColors[key][style] = false;
          else delete transformed.semanticTokenColors[key][style];
        }
      }
    }

    return transformed;
  };

const withAlphaType = new Type('!alpha', {
  kind: 'sequence',
  construct: ([hexRGB, alpha]) => hexRGB + alpha,
  represent: ([hexRGB, alpha]) => hexRGB + alpha,
});

const schema = DEFAULT_SCHEMA.extend([withAlphaType]);
const variants = variantDescriptors.map(({ name, variations }) => ({
  name,
  transform: transformVariant(variations),
}));

export default async function generate() {
  const yamlFile = await readFile(themeFile, 'utf-8');

  const base: Theme = load(yamlFile, { schema });

  // Remove nulls and other falsy values from colors
  for (const key of Object.keys(base.colors)) {
    if (!base.colors[key]) {
      delete base.colors[key];
    }
  }

  return variants.map(({ name, transform }) => ({
    name,
    theme: transform(base),
  }));
}

class Test {
  constructor(public name: string, public theme: Theme) {}

  async generate() {
    const { name, theme } = this;
    const { tokenColors, colors } = theme;
  }
}
