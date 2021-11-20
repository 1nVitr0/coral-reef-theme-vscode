import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Theme } from '../model/theme';
import generate from './generate';

const THEME_DIR = join(__dirname, '..', '..', 'theme');

if (!existsSync(THEME_DIR)) mkdirSync(THEME_DIR);

function writeTheme(name: string, data: Theme) {
  const path = join(THEME_DIR, `coral-reef${name && '-'}${name}.json`);
  const content = JSON.stringify(data, null, 4);
  return writeFile(path, content);
}

export default async function build() {
  const variations = await generate();
  const builders = variations.map(({ name, theme }) =>
    writeTheme(name, theme).then(() => console.log(`Wrote theme coral-reef${name && '-'}${name}`))
  );

  return Promise.all(builders);
}

// Run if called directly
if (require.main === module) build();

const x: any = '';
