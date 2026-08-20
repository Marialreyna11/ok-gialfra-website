// Compila las tarjetas a PDF listo para imprimir usando Chromium (Playwright).
//   node build.mjs            → los tres PDF
//   node build.mjs --preview  → además, PNG de muestra de las primeras hojas
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { document_ } from './src/render.js';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, 'impresion');
const work = join(here, 'src');
mkdirSync(dist, { recursive: true });

const DOCS = [
  { mode: '2up', page: 'Letter', file: 'tarjetas-diario-carta-2up.pdf',
    label: 'Carta 8.5×11 · 2 tarjetas por hoja · doble cara' },
  { mode: '2up', page: 'A4', file: 'tarjetas-diario-a4-2up.pdf',
    label: 'A4 210×297 mm · 2 tarjetas por hoja · doble cara' },
  { mode: 'bleed', page: 'card', file: 'tarjetas-diario-individuales-sangrado.pdf',
    label: '1 tarjeta por página · 4×5.75 in con sangrado de 3 mm' },
];

const SIZE = { Letter: { width: '8.5in', height: '11in' }, A4: { width: '210mm', height: '297mm' },
               card: { width: '4in', height: '5.75in' } };

const browser = await chromium.launch();
const page = await browser.newPage();
const preview = process.argv.includes('--preview');

for (const doc of DOCS) {
  const html = document_(doc.mode, doc.page);
  const tmp = join(work, `.build-${doc.mode}-${doc.page}.html`);
  writeFileSync(tmp, html);
  await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = join(dist, doc.file);
  await page.pdf({ path: out, ...SIZE[doc.page], printBackground: true,
                   margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
  console.log('✓', doc.file, '—', doc.label);

  if (preview && doc.mode === '2up' && doc.page === 'Letter') {
    await page.setViewportSize({ width: 1224, height: 1584 });
    for (const [i, name] of [[0, 'muestra-frente'], [1, 'muestra-reverso'], [4, 'muestra-frente-dia3']]) {
      const el = await page.locator('.sheet').nth(i);
      await el.screenshot({ path: join(dist, `${name}.png`), scale: 'device' });
    }
    console.log('✓ muestras PNG');
  }
}

await browser.close();
