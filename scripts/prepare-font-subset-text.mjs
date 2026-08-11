import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const homeFiles = [
  'App.tsx',
  'site.config.ts',
  'services.catalog.ts',
  'index.html',
  'metadata.json',
  'components/BusinessFAQ.tsx',
  'components/BusinessTrust.tsx',
  'components/Footer.tsx',
  'components/Header.tsx',
  'components/Hero.tsx',
  'components/MusicRightsReview.tsx',
  'components/News.tsx',
  'components/Process.tsx',
  'components/Services.tsx',
  'pages/HomePage.tsx',
];

const extraFiles = [
  'components/CompanyInfo.tsx',
  'components/Contact.tsx',
  'pages/CompanyPage.tsx',
  'pages/ContactPage.tsx',
  'pages/NotFoundPage.tsx',
  'pages/PrivacyPage.tsx',
  'pages/ServiceDetailPage.tsx',
  'pages/TermsPage.tsx',
  'public/404.html',
  'public/privacy.html',
  'public/terms.html',
  'public/apps/machowalker/privacy/index.html',
];

const collectCharacters = async (files) => {
  const source = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n');
  return new Set([...source].filter((character) => character.codePointAt(0) >= 0x20));
};

const sortCharacters = (characters) =>
  [...characters].sort((a, b) => a.codePointAt(0) - b.codePointAt(0));

const toUnicodeRanges = (characters) => {
  const codePoints = sortCharacters(characters).map((character) => character.codePointAt(0));
  const ranges = [];
  let start = codePoints[0];
  let end = codePoints[0];

  for (const codePoint of codePoints.slice(1)) {
    if (codePoint === end + 1) {
      end = codePoint;
      continue;
    }
    ranges.push(start === end ? `U+${start.toString(16).toUpperCase()}` : `U+${start.toString(16).toUpperCase()}-${end.toString(16).toUpperCase()}`);
    start = codePoint;
    end = codePoint;
  }
  ranges.push(start === end ? `U+${start.toString(16).toUpperCase()}` : `U+${start.toString(16).toUpperCase()}-${end.toString(16).toUpperCase()}`);
  return ranges.join(', ');
};

const main = async () => {
  const outputDirectory = path.resolve(process.argv[2] || 'output/font-subset-build');
  const homeCharacters = await collectCharacters(homeFiles);
  const allExtraCharacters = await collectCharacters(extraFiles);
  const extraCharacters = new Set([...allExtraCharacters].filter((character) => !homeCharacters.has(character)));

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'home-chars.txt'), sortCharacters(homeCharacters).join(''), 'utf8');
  await writeFile(path.join(outputDirectory, 'extra-chars.txt'), sortCharacters(extraCharacters).join(''), 'utf8');

  const cssPath = 'styles/corporate-font.css';
  const css = await readFile(cssPath, 'utf8');
  const replacementRanges = [toUnicodeRanges(homeCharacters), toUnicodeRanges(extraCharacters)];
  let rangeIndex = 0;
  const updatedCss = css.replace(/unicode-range:\s*[^;]+;/g, () => `unicode-range: ${replacementRanges[rangeIndex++]};`);
  if (rangeIndex !== 2) throw new Error(`expected 2 unicode-range declarations, found ${rangeIndex}`);
  await writeFile(cssPath, updatedCss, 'utf8');

  console.info(`[font-subset-text] home=${homeCharacters.size} extra=${extraCharacters.size} output=${outputDirectory}`);
};

main().catch((error) => {
  console.error('[font-subset-text] failed');
  console.error(error);
  process.exit(1);
});
