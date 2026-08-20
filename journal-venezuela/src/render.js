// Maquetación de las tarjetas y de los pliegos de impresión.
import { chapters, days, cover, closing } from './content.js';
import { renderScene } from './scenes.js';
import { duskify } from './paint.js';

/* Color de acento por parte del libro: permite separar el mazo de un vistazo. */
const ACCENTS = {
  'Primera parte · El regreso': '#A8422C',
  'Segunda parte · Lo práctico': '#2C6650',
  'Tercera parte · La familia': '#B0741F',
  'Cuarta parte · Reconstruir': '#28647F',
};
const accentOf = (ch) => ACCENTS[ch.part] || '#2C6650';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const roman = (n) => ['', 'I', 'II', 'III', 'IV'][n] || '';
const partN = (ch) => Object.keys(ACCENTS).indexOf(ch.part) + 1;

/* ---------- Tarjetas: cara ilustrada ---------- */

function frontArt(scene, variant, uid, place, region) {
  return `
  <div class="art">
    ${renderScene(scene, variant, uid, duskify)}
    <div class="scrim"></div>
    <div class="place">
      <span class="place-name">${esc(place)}</span>
      <span class="place-region">${esc(region)}</span>
    </div>
  </div>`;
}

function dayFront(d, i) {
  const ch = d.chapter, accent = accentOf(ch);
  return `
  <div class="card front" style="--accent:${accent}">
    ${frontArt(ch.scene, d.variant, `d${i}`, ch.place, ch.region)}
    <div class="plate">
      <div class="rule-dot"><i></i><b></b><i></i></div>
      <p class="verse">${esc(ch.verse)}</p>
      <p class="ref">${esc(ch.ref)}</p>
      <div class="plate-foot">
        <span class="day">Día ${String(d.day).padStart(2, '0')}</span>
        <span class="chap">Cap. ${ch.n} · ${esc(ch.title)}</span>
      </div>
    </div>
  </div>`;
}

function coverFront() {
  return `
  <div class="card front cover-card" style="--accent:#A8422C">
    ${frontArt(cover.scene, cover.variant, 'cov', cover.place, cover.region)}
    <div class="plate">
      <p class="kicker">${esc(cover.kicker)}</p>
      <h1 class="title">${esc(cover.title)}<br><em>${esc(cover.title2)}</em></h1>
      <div class="rule-dot"><i></i><b></b><i></i></div>
      <p class="verse small">${esc(cover.verse)}</p>
      <p class="ref">${esc(cover.ref)}</p>
    </div>
  </div>`;
}

function closingFront() {
  return `
  <div class="card front cover-card" style="--accent:#28647F">
    ${frontArt(closing.scene, closing.variant, 'clo', closing.place, closing.region)}
    <div class="plate">
      <p class="kicker">${esc(closing.kicker)}</p>
      <h1 class="title">${esc(closing.title)}</h1>
      <div class="rule-dot"><i></i><b></b><i></i></div>
      <p class="verse small">${esc(closing.verse)}</p>
      <p class="ref">${esc(closing.ref)}</p>
    </div>
  </div>`;
}

/* ---------- Tarjetas: cara para escribir ---------- */

const lines = (n) => `<div class="lines">${'<span></span>'.repeat(n)}</div>`;

function dayBack(d) {
  const ch = d.chapter, accent = accentOf(ch);
  return `
  <div class="card back" style="--accent:${accent}">
    <div class="edge"></div>
    <div class="pad">
      <header class="bk-head">
        <span class="bk-day">Día ${String(d.day).padStart(2, '0')}</span>
        <span class="bk-date">Fecha <i></i></span>
      </header>
      <p class="bk-chap">Parte ${roman(partN(ch))} · Capítulo ${ch.n} · ${esc(ch.title)}</p>
      <p class="bk-q">${esc(d.question)}</p>
      ${lines(13)}
      <div class="bk-step">
        <span class="box"></span>
        <div class="step-body">
          <span class="step-label">El paso pequeño de hoy</span>
          <span class="step-line"></span>
        </div>
      </div>
      <footer class="bk-foot">Volver a empezar en Venezuela · Guía práctica</footer>
    </div>
  </div>`;
}

function coverBack() {
  return `
  <div class="card back" style="--accent:#A8422C">
    <div class="edge"></div>
    <div class="pad">
      <header class="bk-head">
        <span class="bk-day">Cómo usar estas tarjetas</span>
      </header>
      <ol class="howto">
        ${cover.howto.map((t) => `<li>${esc(t)}</li>`).join('')}
      </ol>
      <p class="bk-chap" style="margin-top:auto">Estas tarjetas son de</p>
      <div class="lines"><span></span></div>
      <p class="bk-chap" style="margin-top:0.12in">Empecé el día</p>
      <div class="lines"><span></span></div>
      <footer class="bk-foot">Treinta tarjetas · Treinta días · Un paso cada día</footer>
    </div>
  </div>`;
}

function closingBack() {
  return `
  <div class="card back" style="--accent:#28647F">
    <div class="edge"></div>
    <div class="pad">
      <header class="bk-head">
        <span class="bk-day">Mi lista de avance</span>
        <span class="bk-date">Fecha <i></i></span>
      </header>
      <p class="bk-chap">Marca cada logro. Todos cuentan.</p>
      <ul class="check">
        ${closing.checklist.map((t) => `<li><span class="box"></span>${esc(t)}</li>`).join('')}
      </ul>
      <p class="bk-chap" style="margin-top:0.06in">Lo que quiero recordar de estos treinta días</p>
      ${lines(3)}
      <footer class="bk-foot">Volver a empezar en Venezuela · Guía práctica</footer>
    </div>
  </div>`;
}

/* ---------- El mazo completo ---------- */

export function deck() {
  const out = [{ front: coverFront(), back: coverBack() }];
  days.forEach((d, i) => out.push({ front: dayFront(d, i), back: dayBack(d) }));
  out.push({ front: closingFront(), back: closingBack() });
  return out;
}

/* ---------- Hojas de impresión ---------- */

const cropMarks = () => `
  <div class="crop tl"></div><div class="crop tr"></div>
  <div class="crop bl"></div><div class="crop br"></div>`;

/** Dos tarjetas por hoja, listo para imprimir a doble cara (voltear por el borde largo). */
function sheets2up(cards) {
  const pages = [];
  for (let i = 0; i < cards.length; i += 2) {
    const a = cards[i], b = cards[i + 1];
    const slot = (c, side) => c
      ? `<div class="slot">${cropMarks()}${c[side]}</div>`
      : `<div class="slot empty">${cropMarks()}</div>`;
    pages.push(`<section class="sheet"><div class="grid">${slot(a, 'front')}${slot(b, 'front')}</div>
      <p class="sheet-note">Volver a empezar en Venezuela · tarjetas ${i + 1}–${Math.min(i + 2, cards.length)} · cara ilustrada</p></section>`);
    // El reverso se imprime en espejo para que coincida al voltear la hoja.
    pages.push(`<section class="sheet"><div class="grid">${slot(b, 'back')}${slot(a, 'back')}</div>
      <p class="sheet-note">Volver a empezar en Venezuela · tarjetas ${i + 1}–${Math.min(i + 2, cards.length)} · cara para escribir</p></section>`);
  }
  return pages.join('');
}

/** Una tarjeta por página, con sangrado de 3 mm y marcas de corte. */
function sheetsBleed(cards) {
  return cards.map((c, i) => [
    `<section class="sheet bleed">${cropMarks()}${c.front}</section>`,
    `<section class="sheet bleed">${cropMarks()}${c.back}</section>`,
  ].join('')).join('');
}

/* ---------- Documento ---------- */

const CSS = (mode, page) => `
@font-face { font-family: 'Lora'; src: url('../fonts/Lora-Regular.ttf') format('truetype'); font-weight: 400; }
@font-face { font-family: 'Lora'; src: url('../fonts/Lora-Medium.ttf') format('truetype'); font-weight: 500; }
@font-face { font-family: 'Lora'; src: url('../fonts/Lora-SemiBold.ttf') format('truetype'); font-weight: 600; }
@font-face { font-family: 'Lora'; src: url('../fonts/Lora-Italic.ttf') format('truetype'); font-weight: 400; font-style: italic; }
@font-face { font-family: 'Karla'; src: url('../fonts/Karla-Regular.ttf') format('truetype'); font-weight: 400; }
@font-face { font-family: 'Karla'; src: url('../fonts/Karla-Medium.ttf') format('truetype'); font-weight: 500; }
@font-face { font-family: 'Karla'; src: url('../fonts/Karla-Bold.ttf') format('truetype'); font-weight: 700; }

:root {
  --trim-w: 3.75in;
  --trim-h: 5.5in;
  --bleed: ${mode === 'bleed' ? '0.125in' : '0in'};
  --paper: #FBF6EC;
  --paper-deep: #F4ECDC;
  --ink: #2A2620;
  --ink-soft: #6B6154;
  --hair: #C9BCA4;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: #fff; color: var(--ink); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Karla', sans-serif; }

@page { size: ${page}; margin: 0; }

.sheet {
  position: relative;
  width: ${page === 'Letter' ? '8.5in' : page === 'A4' ? '210mm' : 'calc(var(--trim-w) + 2 * var(--bleed))'};
  height: ${page === 'Letter' ? '11in' : page === 'A4' ? '297mm' : 'calc(var(--trim-h) + 2 * var(--bleed))'};
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  page-break-after: always; break-after: page; overflow: hidden;
}
.sheet:last-child { page-break-after: auto; break-after: auto; }
.sheet.bleed { padding: 0; }

.grid { display: flex; gap: 0.25in; }
.slot { position: relative; }
.slot.empty { width: var(--trim-w); height: var(--trim-h); }
.sheet-note {
  position: absolute; bottom: 0.28in; left: 0; right: 0; text-align: center;
  font-size: 6pt; letter-spacing: 0.09em; text-transform: uppercase; color: #B9AE9A;
}

/* Marcas de corte */
.crop { position: absolute; width: 0.14in; height: 0.14in; pointer-events: none; }
.crop::before, .crop::after { content: ''; position: absolute; background: #9a9182; }
.crop::before { width: 0.14in; height: 0.4pt; }
.crop::after { width: 0.4pt; height: 0.14in; }
.crop.tl { top: -0.19in; left: -0.19in; }
.crop.tl::before { bottom: 0; left: 0; } .crop.tl::after { right: 0; top: 0; }
.crop.tr { top: -0.19in; right: -0.19in; }
.crop.tr::before { bottom: 0; right: 0; } .crop.tr::after { left: 0; top: 0; }
.crop.bl { bottom: -0.19in; left: -0.19in; }
.crop.bl::before { top: 0; left: 0; } .crop.bl::after { right: 0; bottom: 0; }
.crop.br { bottom: -0.19in; right: -0.19in; }
.crop.br::before { top: 0; right: 0; } .crop.br::after { left: 0; bottom: 0; }
${mode === 'bleed' ? `
/* En la versión con sangrado las marcas viven dentro del sangrado y apuntan
   a la línea de corte, sin invadir la zona que queda en la tarjeta. */
.sheet.bleed .crop { width: auto; height: auto; z-index: 5; }
.sheet.bleed .crop::before { width: 0.075in; height: 0.35pt; }
.sheet.bleed .crop::after { width: 0.35pt; height: 0.075in; }
.sheet.bleed .crop.tl { top: 0; left: 0; right: auto; bottom: auto; }
.sheet.bleed .crop.tl::before { top: 0.125in; left: 0; }
.sheet.bleed .crop.tl::after { left: 0.125in; top: 0; }
.sheet.bleed .crop.tr { top: 0; right: 0; left: auto; bottom: auto; }
.sheet.bleed .crop.tr::before { top: 0.125in; right: 0; }
.sheet.bleed .crop.tr::after { right: 0.125in; top: 0; }
.sheet.bleed .crop.bl { bottom: 0; left: 0; right: auto; top: auto; }
.sheet.bleed .crop.bl::before { bottom: 0.125in; left: 0; }
.sheet.bleed .crop.bl::after { left: 0.125in; bottom: 0; }
.sheet.bleed .crop.br { bottom: 0; right: 0; left: auto; top: auto; }
.sheet.bleed .crop.br::before { bottom: 0.125in; right: 0; }
.sheet.bleed .crop.br::after { right: 0.125in; bottom: 0; }` : ''}

/* ---- Tarjeta ---- */
.card {
  width: calc(var(--trim-w) + 2 * var(--bleed));
  height: calc(var(--trim-h) + 2 * var(--bleed));
  position: relative; overflow: hidden; background: var(--paper);
  display: flex; flex-direction: column;
}
.pad-x { padding-left: calc(0.3in + var(--bleed)); padding-right: calc(0.3in + var(--bleed)); }

/* Cara ilustrada */
.art { position: relative; height: calc(3.42in + var(--bleed)); overflow: hidden; }
.art .scene { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.scrim {
  position: absolute; left: 0; right: 0; bottom: 0; height: 1.05in;
  background: linear-gradient(to bottom, rgba(28,24,18,0) 0%, rgba(28,24,18,0.42) 72%, rgba(28,24,18,0.6) 100%);
}
.place {
  position: absolute; left: calc(0.3in + var(--bleed)); right: calc(0.3in + var(--bleed));
  bottom: 0.2in; display: flex; flex-direction: column; gap: 0.03in;
}
.place-name { font-family: 'Lora', serif; font-weight: 500; font-size: 12.5pt; color: #FFFDF7; letter-spacing: 0.005em; }
.place-region { font-size: 6.4pt; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,253,247,0.82); }

.plate {
  flex: 1; background: var(--paper);
  padding: 0.16in calc(0.34in + var(--bleed)) calc(0.52in + var(--bleed));
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; position: relative;
}
.rule-dot { display: flex; align-items: center; gap: 0.05in; margin: 0.02in 0 0.11in; }
.rule-dot i { width: 0.34in; height: 0.4pt; background: var(--hair); display: block; }
.rule-dot b { width: 3px; height: 3px; border-radius: 50%; background: var(--accent); display: block; }
.verse { font-family: 'Lora', serif; font-style: italic; font-size: 11.4pt; line-height: 1.42; color: var(--ink); max-width: 2.9in; }
.verse.small { font-size: 9.6pt; }
.ref { margin-top: 0.09in; font-size: 6.2pt; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); }
.plate-foot {
  position: absolute; left: calc(0.34in + var(--bleed)); right: calc(0.34in + var(--bleed));
  bottom: calc(0.19in + var(--bleed)); display: flex; justify-content: space-between; align-items: baseline;
  padding-top: 0.07in; border-top: 0.4pt solid var(--hair);
}
.day { font-size: 6.6pt; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); }
.chap { font-size: 6.2pt; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }

.cover-card .plate { justify-content: center; padding-top: 0.22in; }
.kicker { font-size: 6.6pt; font-weight: 700; letter-spacing: 0.26em; text-transform: uppercase; color: var(--accent); }
.title { font-family: 'Lora', serif; font-weight: 600; font-size: 20pt; line-height: 1.16; margin-top: 0.07in; }
.title em { font-style: italic; font-weight: 400; }

/* Cara para escribir */
.card.back { background: var(--paper); }
.card.back .edge { position: absolute; top: 0; bottom: 0; left: 0; width: calc(0.075in + var(--bleed)); background: var(--accent); opacity: 0.9; }
.pad {
  position: absolute; inset: 0;
  padding: calc(0.3in + var(--bleed)) calc(0.3in + var(--bleed)) calc(0.24in + var(--bleed)) calc(0.34in + var(--bleed));
  display: flex; flex-direction: column;
}
.bk-head { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 0.07in; border-bottom: 0.6pt solid var(--hair); }
.bk-day { font-size: 7.6pt; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); }
.bk-date { font-size: 6.4pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); display: flex; align-items: baseline; gap: 0.05in; }
.bk-date i { display: block; width: 0.78in; border-bottom: 0.5pt solid var(--hair); }
.bk-chap { margin-top: 0.1in; font-size: 6.2pt; letter-spacing: 0.13em; text-transform: uppercase; color: var(--ink-soft); }
.bk-q { font-family: 'Lora', serif; font-size: 11.6pt; line-height: 1.34; margin-top: 0.07in; color: var(--ink); }
.lines { margin-top: 0.16in; display: flex; flex-direction: column; gap: 0.183in; }
.pad > .lines:first-of-type { flex: 1; justify-content: space-between; gap: 0; padding-bottom: 0.06in; }
.lines span { display: block; border-bottom: 0.5pt solid var(--hair); }
.bk-step { margin-top: auto; display: flex; gap: 0.08in; align-items: flex-start; padding-top: 0.14in; border-top: 0.6pt solid var(--hair); }
.box { flex: none; width: 0.115in; height: 0.115in; border: 0.7pt solid var(--accent); border-radius: 1px; margin-top: 0.015in; }
.step-body { flex: 1; display: flex; flex-direction: column; gap: 0.11in; }
.step-label { font-size: 6.4pt; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); }
.step-line { display: block; border-bottom: 0.5pt solid var(--hair); }
.bk-foot { margin-top: 0.12in; text-align: center; font-size: 5.6pt; letter-spacing: 0.14em; text-transform: uppercase; color: #B3A791; }

.howto { margin-top: 0.14in; padding-left: 0.02in; list-style: none; counter-reset: h; }
.howto li {
  counter-increment: h; position: relative; padding-left: 0.26in; margin-bottom: 0.13in;
  font-family: 'Lora', serif; font-size: 9pt; line-height: 1.38;
}
.howto li::before {
  content: counter(h); position: absolute; left: 0; top: 0.005in;
  font-family: 'Karla', sans-serif; font-size: 6.6pt; font-weight: 700; color: var(--accent);
  width: 0.15in; height: 0.15in; border: 0.6pt solid var(--accent); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; line-height: 1;
}
.check { list-style: none; margin-top: 0.11in; }
.check li {
  display: flex; align-items: center; gap: 0.09in; padding: 0.055in 0;
  border-bottom: 0.4pt dotted var(--hair); font-family: 'Lora', serif; font-size: 9pt;
}
`;

export function document_(mode, page) {
  const cards = deck();
  const body = mode === 'bleed' ? sheetsBleed(cards) : sheets2up(cards);
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Tarjetas de diario · Volver a empezar en Venezuela</title>
<style>${CSS(mode, page)}</style></head><body>${body}</body></html>`;
}
