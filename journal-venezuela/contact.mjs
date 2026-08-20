// Hoja de contacto: todas las caras del mazo en una sola imagen, para revisar el arte.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
import { deck, document_ } from './src/render.js';

const cards = deck();
const side = process.argv[2] === 'back' ? 'back' : 'front';
const doc = document_('2up', 'Letter');
const css = doc.slice(doc.indexOf('<style>') + 7, doc.indexOf('</style>'));
const html = `<!doctype html><meta charset="utf-8"><style>${css}
body{background:#eceae4;padding:18px}
.wall{display:grid;grid-template-columns:repeat(8,var(--trim-w));gap:14px}
.wall .card{box-shadow:0 1px 4px rgba(0,0,0,.18)}
</style><div class="wall">${cards.map((c) => c[side]).join('')}</div>`;
writeFileSync('src/.contact.html', html);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 3200, height: 2400 } });
await p.goto('file://' + process.cwd() + '/src/.contact.html', { waitUntil: 'networkidle' });
await p.locator('.wall').screenshot({ path: `impresion/contacto-${side}.png` });
await b.close();
console.log('✓ impresion/contacto-' + side + '.png');
