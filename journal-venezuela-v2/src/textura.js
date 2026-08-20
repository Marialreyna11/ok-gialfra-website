// Texturas hechas solo con vectores: puntos, trama y velos.
// Nada de filtros SVG — un filtro se rasteriza al exportar el PDF y en imprenta
// se vería como ruido grueso. Miles de figuras diminutas, en cambio, salen
// nítidas a cualquier resolución.
import { rng } from './color.js';

/**
 * Grano fino sobre un área. Da el aire de papel impreso que separa
 * una ilustración editorial de un vector plano.
 */
export function grano(seed, n, x0, y0, w, h, color = '#3a2f22', op = 0.05, rMax = 0.55) {
  const r = rng(seed);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + r() * h;
    const rad = 0.14 + r() * rMax;
    pts.push(`M${x.toFixed(1)} ${y.toFixed(1)}m-${rad.toFixed(2)} 0a${rad.toFixed(2)} ${rad.toFixed(2)} 0 1 0 ${(rad * 2).toFixed(2)} 0a${rad.toFixed(2)} ${rad.toFixed(2)} 0 1 0 ${(-rad * 2).toFixed(2)} 0`);
  }
  return `<path d="${pts.join('')}" fill="${color}" opacity="${op}"/>`;
}

/** Grano que se concentra hacia abajo (o hacia arriba con `invert`). */
export function granoGradiente(seed, n, x0, y0, w, h, color, opMax = 0.09, invert = false) {
  const r = rng(seed);
  const grupos = 4;
  let out = '';
  for (let g = 0; g < grupos; g++) {
    const t = g / (grupos - 1);
    const yy = y0 + h * (invert ? 1 - t : t) * 0.75;
    const hh = h * 0.3;
    const op = opMax * (0.25 + t * 0.75);
    out += grano(seed * 31 + g, Math.round(n / grupos), x0, yy, w, hh, color, op);
  }
  return out;
}

/** Trama de líneas finas: da materia a la roca sin ensuciarla. */
export function trama(lineas, color, w = 0.5, op = 0.3) {
  return `<g stroke="${color}" stroke-width="${w}" opacity="${op}" fill="none" stroke-linecap="round">${
    lineas.map((d) => `<path d="${d}"/>`).join('')}</g>`;
}

/** Moteado orgánico: manchas irregulares para follaje y suelo. */
export function moteado(seed, n, x0, y0, w, h, colores, opMin = 0.25, opMax = 0.6, sMin = 1.2, sMax = 3.6) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + r() * h;
    const s = sMin + r() * (sMax - sMin);
    const c = colores[Math.floor(r() * colores.length)];
    const k = 0.55 + r() * 0.5;
    out += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} c${(s * k).toFixed(1)} ${(-s * 0.8).toFixed(1)} ${(s * 1.7).toFixed(1)} ${(-s * 0.2).toFixed(1)} ${(s * 1.9).toFixed(1)} ${(s * 0.5).toFixed(1)} c${(-s * 0.3).toFixed(1)} ${(s * 0.8).toFixed(1)} ${(-s * 1.3).toFixed(1)} ${(s * 1).toFixed(1)} ${(-s * 1.9).toFixed(1)} ${(-s * 0.5).toFixed(1)} Z" fill="${c}" opacity="${(opMin + r() * (opMax - opMin)).toFixed(2)}"/>`;
  }
  return out;
}
