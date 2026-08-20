// Prueba del DÍA 01: PDF con sangrado, PNG de ambas caras, mockup y
// comparación contra la versión 1.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dias } from './src/contenido.js';
import { frente, reverso, estilos } from './src/tarjeta.js';
import escena from './src/escenas/dia01-salto-angel.js';
import { GEO } from './src/tokens.js';

const d = dias[0];
mkdirSync('impresion', { recursive: true });

const marcas = `<div class="crop tl"></div><div class="crop tr"></div><div class="crop bl"></div><div class="crop br"></div>`;
const cropCSS = `
.hoja{position:relative;width:calc(var(--trimW) + 2*var(--bleed));height:calc(var(--trimH) + 2*var(--bleed));
  page-break-after:always;break-after:page;overflow:hidden}
.hoja:last-child{page-break-after:auto;break-after:auto}
.crop{position:absolute;z-index:9;pointer-events:none}
.crop::before,.crop::after{content:'';position:absolute;background:#8d8578}
.crop::before{width:.08in;height:.35pt}
.crop::after{width:.35pt;height:.08in}
.crop.tl{top:0;left:0}.crop.tl::before{top:var(--bleed);left:0}.crop.tl::after{left:var(--bleed);top:0}
.crop.tr{top:0;right:0}.crop.tr::before{top:var(--bleed);right:0}.crop.tr::after{right:var(--bleed);top:0}
.crop.bl{bottom:0;left:0}.crop.bl::before{bottom:var(--bleed);left:0}.crop.bl::after{left:var(--bleed);bottom:0}
.crop.br{bottom:0;right:0}.crop.br::before{bottom:var(--bleed);right:0}.crop.br::after{right:var(--bleed);bottom:0}
@page{size:${GEO.trimW + 2 * GEO.bleed}in ${GEO.trimH + 2 * GEO.bleed}in;margin:0}
`;

const doc = (modo, cuerpo, extra = '') =>
  `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Día 01</title>
   <style>${estilos(modo)}${extra}</style></head><body>${cuerpo}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 }, deviceScaleFactor: 2 });

/* 1 · PDF con sangrado y marcas de corte */
const pdfHTML = doc('sangrado',
  `<section class="hoja">${marcas}${frente(d, escena, 'f1')}</section>
   <section class="hoja">${marcas}${reverso(d)}</section>`, cropCSS);
writeFileSync('src/.prueba-pdf.html', pdfHTML);
await page.goto('file://' + process.cwd() + '/src/.prueba-pdf.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: 'impresion/dia01-prueba-sangrado.pdf',
  width: `${GEO.trimW + 2 * GEO.bleed}in`, height: `${GEO.trimH + 2 * GEO.bleed}in`,
  printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
console.log('✓ impresion/dia01-prueba-sangrado.pdf');

/* 2 · PNG de cada cara, ya recortadas */
const cutHTML = doc('corte',
  `<div class="fila">${frente(d, escena, 'f2')}${reverso(d)}</div>`,
  `body{background:#EDEAE3;padding:40px}.fila{display:flex;gap:40px}`);
writeFileSync('src/.prueba-corte.html', cutHTML);
await page.goto('file://' + process.cwd() + '/src/.prueba-corte.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.locator('.card.front').screenshot({ path: 'impresion/dia01-frente.png' });
await page.locator('.card.back').screenshot({ path: 'impresion/dia01-reverso.png' });
console.log('✓ PNG de ambas caras');

/* 3 · Mockup de presentación */
const mock = doc('corte',
  `<div class="mesa">
     <div class="pieza p1">${frente(d, escena, 'f3')}</div>
     <div class="pieza p2">${reverso(d)}</div>
   </div>`,
  `body{background:linear-gradient(160deg,#E9E4D9 0%,#DED7C8 55%,#D5CDBC 100%);padding:0}
   .mesa{width:1500px;height:1120px;display:flex;align-items:center;justify-content:center;gap:78px}
   .pieza{filter:drop-shadow(0 26px 38px rgba(60,48,32,.28)) drop-shadow(0 4px 8px rgba(60,48,32,.16))}
   .p1{transform:rotate(-2.1deg)}.p2{transform:rotate(1.7deg)}`);
writeFileSync('src/.prueba-mock.html', mock);
await page.setViewportSize({ width: 1500, height: 1120 });
await page.goto('file://' + process.cwd() + '/src/.prueba-mock.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.locator('.mesa').screenshot({ path: 'impresion/dia01-mockup.png' });
console.log('✓ impresion/dia01-mockup.png');

await browser.close();
