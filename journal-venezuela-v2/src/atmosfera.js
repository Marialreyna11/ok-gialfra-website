// Cielo, luz y aire. La profundidad de una ilustración de paisaje se juega
// aquí: degradados largos, resplandor bajo y velos que empujan cada capa
// hacia el fondo.
import { rng } from './color.js';
import { suavizar } from './geometria.js';

export const lin = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${
    stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;

export const rad = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${
    stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;

/** Cielo de seis paradas: nunca dos bandas planas pegadas. */
export function cielo(uid, p, W, H) {
  return `${lin(`${uid}-cielo`, p.cielo)}<rect x="0" y="0" width="${W}" height="${H}" fill="url(#${uid}-cielo)"/>`;
}

/** Resplandor del sol bajo, todavía detrás del horizonte o apenas encima. */
export function resplandor(uid, p, cx, cy, r) {
  return `${rad(`${uid}-glow`, [[0, p.luz, 0.62], [0.3, p.luz, 0.3], [0.62, p.luz, 0.1], [1, p.luz, 0]])}
    <ellipse cx="${cx}" cy="${cy}" rx="${r * 1.5}" ry="${r}" fill="url(#${uid}-glow)"/>`;
}

/** Disco solar apenas insinuado, con borde difuso. */
export function sol(uid, p, cx, cy, r) {
  return `${rad(`${uid}-sol`, [[0, p.sol, 0.95], [0.62, p.sol, 0.8], [0.85, p.sol, 0.28], [1, p.sol, 0]])}
    <circle cx="${cx}" cy="${cy}" r="${r * 1.8}" fill="url(#${uid}-sol)"/>`;
}

/** Banda de luz sobre el horizonte: separa cielo y tierra sin una línea dura. */
export function bandaLuz(uid, color, y, h, op = 0.5) {
  return `${lin(`${uid}-banda`, [[0, color, 0], [0.45, color, op], [0.75, color, op * 0.7], [1, color, 0]])}
    <rect x="-20" y="${y}" width="1040" height="${h}" fill="url(#${uid}-banda)"/>`;
}

/** Velo atmosférico: cada capa de paisaje se apaga un poco contra el aire. */
export function velo(uid, color, y, h, op) {
  return `${lin(`${uid}-velo`, [[0, color, op], [1, color, 0]])}
    <rect x="-20" y="${y}" width="1040" height="${h}" fill="url(#${uid}-velo)"/>`;
}

/** Cirros: estelas finas y alargadas, con las puntas desvanecidas. */
export function cirros(uid, seed, y0, y1, n, color, opMax = 0.5) {
  const r = rng(seed);
  let defs = lin(`${uid}-cir`, [[0, color, 0], [0.28, color, 0.85], [0.62, color, 0.7], [1, color, 0]], 0, 0, 1, 0);
  let out = '';
  for (let i = 0; i < n; i++) {
    const y = y0 + (y1 - y0) * (i / n) + (r() - 0.5) * 14;
    const x = -60 + r() * 900;
    const w = 130 + r() * 340;
    const h = 2.2 + r() * 5;
    const op = opMax * (0.35 + r() * 0.65);
    const pend = (r() - 0.5) * 16;
    out += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(w * 0.35).toFixed(0)} ${(-h - pend * 0.3).toFixed(1)} ${w.toFixed(0)} ${pend.toFixed(1)} q${(-w * 0.4).toFixed(0)} ${(h * 1.5).toFixed(1)} ${(-w).toFixed(0)} ${(-pend).toFixed(1)} Z" fill="url(#${uid}-cir)" opacity="${op.toFixed(2)}"/>`;
  }
  return defs + out;
}

/**
 * Cúmulo: silueta irregular con la corona iluminada y la panza en sombra.
 * Dos trazos desfasados, no una hilera de círculos.
 */
export function cumulo(seed, cx, cy, w, colSombra, colLuz, op = 0.9) {
  const r = rng(seed);
  const h = w * (0.3 + r() * 0.16);
  const n = 7;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = cx - w / 2 + w * t;
    const lomo = Math.sin(t * Math.PI) ** 0.7;
    const y = cy - h * lomo * (0.55 + r() * 0.75);
    pts.push([x, y]);
  }
  const base = `${suavizar(pts)} L${(cx + w / 2).toFixed(1)} ${cy.toFixed(1)} L${(cx - w / 2).toFixed(1)} ${cy.toFixed(1)} Z`;
  const luz = pts.map(([x, y], i) => [x + w * 0.012, y + (i % 2 ? 1.5 : 3.2)]);
  const corona = `${suavizar(luz)} L${(cx + w / 2).toFixed(1)} ${(cy - h * 0.22).toFixed(1)} L${(cx - w / 2).toFixed(1)} ${(cy - h * 0.18).toFixed(1)} Z`;
  return `<g opacity="${op}"><path d="${base}" fill="${colSombra}"/><path d="${corona}" fill="${colLuz}"/></g>`;
}

/** Pluma de neblina: capas de degradado radial, sin desenfoque rasterizado. */
export function niebla(uid, seed, cx, cy, w, h, color, op = 0.55, capas = 4) {
  const r = rng(seed);
  let out = rad(`${uid}-nb${seed}`, [[0, color, 1], [0.42, color, 0.55], [0.72, color, 0.2], [1, color, 0]]);
  for (let i = 0; i < capas; i++) {
    const k = 0.55 + r() * 0.75;
    out += `<ellipse cx="${(cx + (r() - 0.5) * w * 0.5).toFixed(1)}" cy="${(cy + (r() - 0.5) * h * 0.7).toFixed(1)}" rx="${(w * k * 0.5).toFixed(1)}" ry="${(h * k * 0.5).toFixed(1)}" fill="url(#${uid}-nb${seed})" opacity="${(op * (0.45 + r() * 0.55)).toFixed(2)}"/>`;
  }
  return out;
}

/** Aves lejanas, apenas un trazo. */
export const aves = (lista, color = '#3b3630', op = 0.42) =>
  lista.map(([x, y, s]) => `<path d="M${x} ${y} q${s * 0.9} ${-s * 0.8} ${s * 1.9} ${-s * 0.15} q${s} ${-s * 0.65} ${s * 2} ${s * 0.1}"
      fill="none" stroke="${color}" stroke-width="${Math.max(0.8, s * 0.26)}" stroke-linecap="round" opacity="${op}"/>`).join('');
