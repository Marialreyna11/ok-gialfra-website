// Comparación lado a lado: la tarjeta del día 01 en la versión 1 y en la 2.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { deck } from '../journal-venezuela/src/render.js';
import { document_ } from '../journal-venezuela/src/render.js';
import { dias } from './src/contenido.js';
import { frente, estilos } from './src/tarjeta.js';
import escena from './src/escenas/dia01-salto-angel.js';

const v1 = deck()[1];                      // día 01 de la versión anterior
const docV1 = document_('2up', 'Letter');
// La hoja de la versión 1 apunta a ../fonts; aquí las fuentes viven en ../fuentes.
const cssV1 = docV1.slice(docV1.indexOf('<style>') + 7, docV1.indexOf('</style>'))
  .replaceAll('../fonts/', '../fuentes/');

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>${cssV1}</style><style>${estilos('corte')}</style>
<style>
  body{background:#EFECE5;font-family:'Karla',sans-serif;padding:56px}
  .cmp{display:flex;gap:70px;align-items:flex-start;justify-content:center}
  .col{display:flex;flex-direction:column;align-items:center;gap:18px}
  .rot{font-size:11px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:#8A7F6E}
  .rot b{color:#A8503A}
  .marco{filter:drop-shadow(0 18px 26px rgba(60,48,32,.22))}
  /* La hoja de la v2 se carga después y pisaría el tamaño de la tarjeta v1. */
  .v1 .card{width:3.75in;height:5.5in;zoom:1.164}
  .v2 .card{zoom:0.914}
  .nota{margin-top:14px;font-size:11px;letter-spacing:.02em;color:#6A5F51;max-width:3.4in;text-align:center;line-height:1.5}
</style></head><body>
<div class="cmp">
  <div class="col v1"><p class="rot">Versión 1</p><div class="marco">${v1.front}</div>
    <p class="nota">3,75 × 5,5 in · vector plano, dos paletas por escena</p></div>
  <div class="col v2"><p class="rot"><b>Versión 2</b></p><div class="marco">${frente(dias[0], escena, 'cmp')}</div>
    <p class="nota">5 × 7 in · serigrafía editorial, grano, luz de amanecer</p></div>
</div></body></html>`;
writeFileSync('src/.comparacion.html', html);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1500, height: 1150 }, deviceScaleFactor: 2 });
await p.goto('file://' + process.cwd() + '/src/.comparacion.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.locator('.cmp').screenshot({ path: 'impresion/comparacion-v1-v2.png' });
await b.close();
console.log('✓ impresion/comparacion-v1-v2.png');
