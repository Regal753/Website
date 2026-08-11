import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve('dist');
const indexHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
const stylesheetLinks = [...indexHtml.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*>/g)].map(
  (match) => match[0],
);
const bundledFontStylesheet = stylesheetLinks.find((link) => /href="[^"]*\/assets\/[^"]+\.css"/.test(link));

if (!bundledFontStylesheet) {
  throw new Error('Could not find the Vite stylesheet containing the self-hosted font faces.');
}

const stylesheetHref = bundledFontStylesheet.match(/\bhref="([^"]+)"/)?.[1];
if (!stylesheetHref) {
  throw new Error('Could not resolve the Vite stylesheet URL.');
}

const stylesheetAssetName = path.basename(new URL(stylesheetHref, 'https://regalocom.net').pathname);
const bundledStyles = await readFile(path.join(distDir, 'assets', stylesheetAssetName), 'utf8');
const homeFontHref = bundledStyles.match(
  /url\((?:['"]?)([^)'"\s]*noto-sans-jp-regalo-home[^)'"\s]*\.woff2)(?:['"]?)\)/,
)?.[1];
if (!homeFontHref) {
  throw new Error('Could not resolve the emitted homepage font URL.');
}

const homeFontPreload = `<link rel="preload" href="${homeFontHref}" as="font" type="font/woff2" crossorigin />`;
const indexWithPreload = indexHtml.includes(homeFontPreload)
  ? indexHtml
  : indexHtml.replace(bundledFontStylesheet, `${homeFontPreload}\n    ${bundledFontStylesheet}`);

await writeFile(path.join(distDir, 'index.html'), indexWithPreload, 'utf8');

const targetFiles = [
  'privacy.html',
  'terms.html',
  path.join('apps', 'machowalker', 'privacy', 'index.html'),
];

for (const relativePath of targetFiles) {
  const absolutePath = path.join(distDir, relativePath);
  const html = await readFile(absolutePath, 'utf8');
  if (!html.includes('Regalo Corporate Sans')) {
    throw new Error(`${relativePath} does not declare the corporate font family.`);
  }
  const nextHtml = html.includes(bundledFontStylesheet)
    ? html
    : html.replace(
        '    <style>',
        `    ${homeFontPreload}\n    ${bundledFontStylesheet}\n    <style>`,
      );
  await writeFile(absolutePath, nextHtml, 'utf8');
}

console.info(
  `[build:legal-fonts] preloaded the homepage subset and injected ${targetFiles.length} static pages`,
);
