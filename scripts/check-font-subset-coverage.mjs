import { readFile } from 'node:fs/promises';

const sourceFiles = [
  'App.tsx',
  'site.config.ts',
  'services.catalog.ts',
  'index.html',
  'metadata.json',
  'components/BusinessFAQ.tsx',
  'components/BusinessTrust.tsx',
  'components/CompanyInfo.tsx',
  'components/Contact.tsx',
  'components/Footer.tsx',
  'components/Header.tsx',
  'components/Hero.tsx',
  'components/MusicRightsReview.tsx',
  'components/News.tsx',
  'components/Process.tsx',
  'components/Services.tsx',
  'pages/CompanyPage.tsx',
  'pages/ContactPage.tsx',
  'pages/HomePage.tsx',
  'pages/NotFoundPage.tsx',
  'pages/PrivacyPage.tsx',
  'pages/ServiceDetailPage.tsx',
  'pages/TermsPage.tsx',
  'public/404.html',
  'public/privacy.html',
  'public/terms.html',
  'public/apps/machowalker/privacy/index.html',
];

const parseRanges = (css) => {
  const ranges = [];
  for (const declaration of css.matchAll(/unicode-range:\s*([^;]+);/g)) {
    for (const token of declaration[1].split(',')) {
      const match = token.trim().match(/^U\+([0-9A-F]+)(?:-([0-9A-F]+))?$/i);
      if (!match) continue;
      ranges.push([Number.parseInt(match[1], 16), Number.parseInt(match[2] || match[1], 16)]);
    }
  }
  return ranges;
};

const isCovered = (codePoint, ranges) => ranges.some(([start, end]) => codePoint >= start && codePoint <= end);

const main = async () => {
  const css = await readFile('styles/corporate-font.css', 'utf8');
  const ranges = parseRanges(css);
  const sourceText = (await Promise.all(sourceFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  const requiredCharacters = [...new Set([...sourceText].filter((character) => character.codePointAt(0) >= 0x80))];
  const missing = requiredCharacters.filter((character) => !isCovered(character.codePointAt(0), ranges));

  if (missing.length > 0) {
    console.error(
      `[font-coverage] missing ${missing.length} characters: ${missing
        .sort((a, b) => a.codePointAt(0) - b.codePointAt(0))
        .map((character) => `${character}(U+${character.codePointAt(0).toString(16).toUpperCase()})`)
        .join(' ')}`,
    );
    process.exit(1);
  }

  console.info(`[font-coverage] ok: ${requiredCharacters.length} non-ASCII characters covered`);
};

main().catch((error) => {
  console.error('[font-coverage] failed');
  console.error(error);
  process.exit(1);
});
