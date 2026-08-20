// Utilidades de color y dibujo para las ilustraciones.
// Todo el arte es vectorial y original: no depende de fotografías externas,
// así que imprime nítido a cualquier tamaño y no arrastra derechos de terceros.

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function hexToHsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s * 100, l * 100];
}

export function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const seg = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][Math.floor(h / 60) % 6];
  return '#' + seg.map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
}

/** Desplaza un color en el espacio HSL. */
export function shift(hex, dh = 0, ds = 0, dl = 0) {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h + dh, s + ds, l + dl);
}

export const mix = (a, b, t) => {
  const pa = hexToHsl(a), pb = hexToHsl(b);
  let dh = pb[0] - pa[0];
  if (dh > 180) dh -= 360; if (dh < -180) dh += 360;
  return hslToHex(pa[0] + dh * t, pa[1] + (pb[1] - pa[1]) * t, pa[2] + (pb[2] - pa[2]) * t);
};


/** Mezcla en RGB. Segura para colores de matices opuestos. */
export const mixRGB = (a, b, t) => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (sh) => Math.round((((pa >> sh) & 255) * (1 - t)) + (((pb >> sh) & 255) * t));
  return '#' + [16, 8, 0].map((sh) => ch(sh).toString(16).padStart(2, '0')).join('');
};

/** Acerca el tono de un color a un tono objetivo, por el camino corto. */
export function pull(hex, targetH, amount, ds = 0, dl = 0) {
  const [h, s, l] = hexToHsl(hex);
  let dh = targetH - h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  return hslToHex(h + dh * amount, s + ds, l + dl);
}

/**
 * Convierte una paleta de amanecer en una de atardecer.
 * Mezcla contra un atardecer de referencia — índigo arriba, rosa en el medio,
 * ámbar en el horizonte — para que las dos versiones de un mismo paisaje
 * se distingan de lejos y no solo por un matiz.
 */
export function duskify(p) {
  const d = { ...p };
  d.sky = [
    shift(mix(p.sky[0], '#2C3568', 0.66), 0, 0, -6),
    mix(p.sky[1], '#CE8071', 0.62),
    mix(p.sky[2], '#F3A659', 0.66),
  ];
  d.sun = mix(p.sun, '#F07C36', 0.72);
  d.glow = mix(p.glow, '#E86F31', 0.62);
  for (const k of ['far', 'mid', 'near', 'ground'])
    if (p[k]) d[k] = shift(mixRGB(p[k], '#3A3F5E', 0.3), 0, 0, -8);
  if (p.water) d.water = [].concat(p.water).map((c) => shift(mixRGB(c, '#4A4E72', 0.24), 0, 0, -8));
  if (p.haze) d.haze = mixRGB(p.haze, '#E9A277', 0.5);
  return d;
}

/** Generador determinista: la misma tarjeta se dibuja igual en cada compilación. */
export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export const linear = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">` +
  stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('') +
  `</linearGradient>`;

export const radial = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">` +
  stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('') +
  `</radialGradient>`;

/** Sol o luna con halo. */
export const disc = (uid, p, cx, cy, r, halo = 4.2) => `
  ${radial(`${uid}-halo`, [[0, p.glow, 0.85], [0.45, p.glow, 0.28], [1, p.glow, 0]])}
  <circle cx="${cx}" cy="${cy}" r="${r * halo}" fill="url(#${uid}-halo)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${p.sun}"/>`;

/** Bandada sencilla. */
export const birds = (list, color = '#3b3630', op = 0.5) =>
  list.map(([x, y, s]) => `<path d="M${x} ${y} q${s} ${-s * 0.75} ${s * 2} 0 q${s} ${-s * 0.75} ${s * 2} 0"
      fill="none" stroke="${color}" stroke-width="${Math.max(0.9, s * 0.34)}"
      stroke-linecap="round" opacity="${op}"/>`).join('');

/** Estrellas deterministas dentro de una franja. */
export const stars = (seed, n, y0, y1, color = '#fff') => {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = r() * 400, y = y0 + r() * (y1 - y0), s = 0.35 + r() * 1.15;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${s.toFixed(2)}" fill="${color}" opacity="${(0.25 + r() * 0.65).toFixed(2)}"/>`;
  }
  return out;
};

/** Bruma horizontal suave sobre el horizonte. */
export const haze = (uid, p, y, h, op = 0.55) => `
  ${linear(`${uid}-haze`, [[0, p.haze, 0], [0.5, p.haze, op], [1, p.haze, 0]])}
  <rect x="-10" y="${y}" width="420" height="${h}" fill="url(#${uid}-haze)"/>`;

/** Palma de moriche / cocotero estilizada. */
export const palm = (x, y, h, color, lean = 0, fronds = 7) => {
  let out = `<path d="M${x} ${y} q${lean * 0.4} ${-h * 0.55} ${lean} ${-h}" fill="none" stroke="${color}" stroke-width="${Math.max(1.4, h * 0.035)}" stroke-linecap="round"/>`;
  const tx = x + lean, ty = y - h;
  for (let i = 0; i < fronds; i++) {
    const a = (Math.PI / (fronds - 1)) * i + Math.PI;
    const dx = Math.cos(a) * h * 0.46, dy = Math.sin(a) * h * 0.3;
    out += `<path d="M${tx} ${ty} q${dx * 0.55} ${dy * 0.9 - h * 0.1} ${dx} ${dy + h * 0.06}"
      fill="none" stroke="${color}" stroke-width="${Math.max(1.1, h * 0.028)}" stroke-linecap="round"/>`;
  }
  return out;
};

/** Nube esponjosa: círculos superpuestos sobre una base plana. */
export const cloud = (x, y, w, color, op = 0.5, seed = 1) => {
  const r = rng(seed);
  const h = w * 0.34;
  let circles = '';
  const n = 3 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1 || 1);
    const cx = x - w / 2 + w * t;
    const rr = h * (0.55 + r() * 0.55) * (1 - Math.abs(t - 0.45) * 0.7);
    circles += `<circle cx="${cx.toFixed(1)}" cy="${(y - rr * 0.55).toFixed(1)}" r="${Math.max(3, rr).toFixed(1)}"/>`;
  }
  return `<g fill="${color}" opacity="${op}">${circles}<rect x="${(x - w / 2).toFixed(1)}" y="${(y - h * 0.34).toFixed(1)}" width="${w.toFixed(1)}" height="${(h * 0.34).toFixed(1)}" rx="${(h * 0.17).toFixed(1)}"/></g>`;
};
