// Dieciséis paisajes de Venezuela, dibujados en SVG.
// Cada escena recibe una paleta (`p`) y un identificador único (`uid`)
// para que los degradados de una tarjeta no colisionen con los de otra.
import { linear, radial, disc, birds, stars, haze, palm, rng, shift, mix, cloud } from './paint.js';

export const W = 400;
export const H = 340;

const sky = (uid, p) => `
  ${linear(`${uid}-sky`, [[0, p.sky[0]], [0.52, p.sky[1]], [1, p.sky[2]]])}
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#${uid}-sky)"/>`;

const cloudBand = (seed, y, w, color, op) => {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < 4; i++) {
    const cx = r() * 440 - 20, cy = y + (r() - 0.5) * 16;
    out += cloud(cx, cy, w * (0.42 + r() * 0.5), color, op * (0.55 + r() * 0.4), seed * 7 + i);
  }
  return out;
};

/** Niebla a ras de suelo: bandas planas y difusas, no nubes. */
const mistBand = (seed, y, w, color, op) => {
  const r = rng(seed);
  const id = `mist${seed}`;
  let out = `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="1"/><stop offset="0.55" stop-color="${color}" stop-opacity="0.55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
  for (let i = 0; i < 5; i++) {
    const cx = r() * 420 - 10, cy = y + (r() - 0.5) * 14, rx = w * (0.5 + r());
    out += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx * 0.115).toFixed(1)}" fill="url(#${id})" opacity="${(op * (0.4 + r() * 0.4)).toFixed(2)}"/>`;
  }
  return out;
};

const scenes = {};

/* 1 · El Ávila sobre Caracas ------------------------------------------------ */
scenes.avila = {
  palette: { sky: ['#7fb4de', '#cddfe8', '#f7d9a4'], sun: '#ffd88f', glow: '#ffc873',
             haze: '#f0e6d4', far: '#6d8a90', mid: '#3f6560', near: '#2b4844', ground: '#233a38' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 300, 118, 21)}
    ${cloudBand(11, 96, 44, '#ffffff', 0.4)}
    ${cloudBand(12, 132, 60, shift(p.sky[2], 0, 4, 6), 0.45)}
    <path d="M0 214 L34 190 L62 199 L96 166 L128 181 L156 158 L196 176 L232 150 L268 172 L300 156 L338 178 L370 164 L400 184 L400 340 L0 340 Z" fill="${p.far}"/>
    ${haze(uid, p, 196, 44, 0.7)}
    <path d="M0 232 L40 214 L74 224 L110 200 L148 216 L184 196 L224 214 L262 194 L300 210 L340 198 L400 216 L400 340 L0 340 Z" fill="${p.mid}"/>
    <path d="M0 258 L48 244 L92 254 L140 238 L188 252 L236 236 L286 250 L336 240 L400 252 L400 340 L0 340 Z" fill="${p.near}"/>
    <rect x="0" y="286" width="${W}" height="54" fill="${p.ground}"/>
    ${(() => { // techos de la ciudad
      const r = rng(7); let out = '';
      for (let x = -6; x < 410; x += 9 + r() * 8) {
        const h = 12 + r() * 30, w = 7 + r() * 11;
        out += `<rect x="${x.toFixed(1)}" y="${(292 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 50).toFixed(1)}" fill="${shift(p.ground, 0, 0, r() * 5 - 2)}"/>`;
      }
      return out; })()}
    ${birds([[62, 96, 4], [88, 84, 3], [110, 104, 2.6]], '#4a4136', 0.42)}`,
};

/* 2 · Médanos de Coro ------------------------------------------------------- */
scenes.medanos = {
  palette: { sky: ['#8cc0e0', '#e2ddcd', '#f6cf94'], sun: '#ffd07c', glow: '#ffbb63',
             haze: '#f3e2c6', far: '#e0c193', mid: '#d2ab77', near: '#b98f5d', ground: '#a17a4c' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 118, 132, 24)}
    ${cloudBand(21, 74, 52, '#ffffff', 0.33)}
    ${haze(uid, p, 178, 50, 0.75)}
    <path d="M0 212 q70 -30 140 -6 q80 26 140 -8 q64 -34 120 -2 L400 340 L0 340 Z" fill="${p.far}"/>
    <path d="M0 246 q54 -34 122 -12 q66 22 130 -14 q70 -38 148 4 L400 340 L0 340 Z" fill="${p.mid}"/>
    ${linear(`${uid}-dune`, [[0, shift(p.near, 0, 0, 8)], [1, p.near]])}
    <path d="M0 288 q80 -46 168 -14 q72 26 136 -16 q52 -32 96 2 L400 340 L0 340 Z" fill="url(#${uid}-dune)"/>
    <path d="M0 316 q92 -30 186 -6 q78 20 214 -10 L400 340 L0 340 Z" fill="${p.ground}"/>
    <g opacity="0.28" stroke="${shift(p.ground, 0, 0, -14)}" fill="none" stroke-width="1.1" stroke-linecap="round">
      <path d="M20 300 q70 -22 150 -6"/><path d="M46 312 q84 -22 178 -4"/><path d="M96 328 q86 -18 190 -6"/>
    </g>
    <g fill="${shift(p.ground, -10, -6, -30)}" opacity="0.85">
      <rect x="330" y="252" width="7" height="40" rx="3.5"/>
      <rect x="322" y="266" width="6" height="26" rx="3"/>
      <rect x="339" y="262" width="6" height="30" rx="3"/>
    </g>
    ${birds([[248, 92, 3.4], [272, 82, 2.6]], '#5a4a34', 0.4)}`,
};

/* 3 · Los Llanos de Apure --------------------------------------------------- */
scenes.llanos = {
  palette: { sky: ['#7cb6e2', '#d3e2e6', '#f8dda6'], sun: '#ffdb92', glow: '#ffc571',
             haze: '#eee7d2', far: '#8aa78f', mid: '#5c8060', near: '#3f6247', ground: '#4d6b45',
             water: ['#cfd9c9', '#a9bda6'] },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 296, 150, 19)}
    ${cloudBand(31, 66, 66, '#ffffff', 0.45)}
    ${cloudBand(32, 108, 48, '#ffffff', 0.3)}
    ${haze(uid, p, 224, 40, 0.8)}
    <rect x="0" y="248" width="${W}" height="12" fill="${p.far}"/>
    <path d="M0 258 q100 -10 200 -2 q110 8 200 -4 L400 340 L0 340 Z" fill="${p.mid}"/>
    ${linear(`${uid}-w`, [[0, p.water[0]], [1, p.water[1]]])}
    <path d="M0 286 q60 -12 132 -4 q70 8 128 -2 q60 6 140 -4 L400 306 q-90 10 -180 4 q-90 -6 -220 4 Z" fill="url(#${uid}-w)" opacity="0.9"/>
    <path d="M0 306 q120 12 232 2 q90 -8 168 2 L400 340 L0 340 Z" fill="${p.ground}"/>
    ${palm(66, 258, 62, p.near, -4)}
    ${palm(88, 260, 44, p.near, 3)}
    ${palm(330, 256, 54, p.near, 5)}
    <g fill="${shift(p.near, 0, 0, -12)}" opacity="0.9">
      <ellipse cx="176" cy="268" rx="9" ry="4.4"/><rect x="169" y="268" width="2" height="6"/><rect x="181" y="268" width="2" height="6"/>
      <ellipse cx="200" cy="272" rx="7.5" ry="3.6"/><rect x="194" y="272" width="1.8" height="5"/><rect x="204" y="272" width="1.8" height="5"/>
      <ellipse cx="150" cy="264" rx="6" ry="3"/>
    </g>
    <g fill="#f7f4ec" opacity="0.92">
      <ellipse cx="256" cy="292" rx="5" ry="2.4"/><path d="M259 289 q4 -5 7 -1" stroke="#f7f4ec" stroke-width="1.4" fill="none"/>
      <ellipse cx="278" cy="298" rx="4" ry="2"/>
    </g>
    ${birds([[110, 88, 4.4], [140, 76, 3.4], [166, 96, 2.8]], '#4d4536', 0.45)}`,
};

/* 4 · Monte Roraima --------------------------------------------------------- */
scenes.roraima = {
  palette: { sky: ['#6fa9d8', '#c7dbe6', '#f2e0bd'], sun: '#ffdb9c', glow: '#ffcb80',
             haze: '#eef0ec', far: '#93a6b4', mid: '#5d7382', near: '#41545c', ground: '#638152' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 74, 84, 16, 3.4)}
    ${cloudBand(41, 92, 50, '#ffffff', 0.34)}
    <path d="M0 200 L52 190 L96 196 L140 180 L188 190 L228 176 L286 188 L340 178 L400 190 L400 244 L0 244 Z" fill="${p.far}" opacity="0.65"/>
    ${linear(`${uid}-cliff`, [[0, shift(p.mid, 0, 0, 11)], [0.3, p.mid], [1, shift(p.mid, 0, 0, -13)]])}
    <path d="M92 244 L94 150 L142 144 L206 142 L268 139 L294 137 L308 244 Z" fill="url(#${uid}-cliff)"/>
    <path d="M94 150 L142 144 L206 142 L268 139 L294 137 L295 151 L95 162 Z" fill="${shift(p.mid, 0, 0, 16)}"/>
    <path d="M268 139 L294 137 L308 244 L276 244 Z" fill="${shift(p.mid, -4, 4, 8)}" opacity="0.5"/>
    <g stroke="${shift(p.mid, 0, 0, -16)}" stroke-width="1.4" opacity="0.22">
      ${Array.from({ length: 13 }, (_, i) => `<line x1="${102 + i * 15.4}" y1="${160 + (i % 3) * 3}" x2="${100 + i * 15.6}" y2="240"/>`).join('')}
    </g>
    <g fill="${shift(p.mid, 0, 0, -18)}" opacity="0.2">
      <path d="M126 158 l9 84 l-17 1 Z"/><path d="M232 152 l8 90 l-15 1 Z"/>
    </g>
    <path d="M92 244 q-20 10 -30 18 L338 264 q-14 -10 -30 -20 Z" fill="${shift(p.mid, 0, -4, -6)}" opacity="0.85"/>
    <path d="M186 158 q3 30 -2 52 q-2 14 3 24" stroke="#f3f7f8" stroke-width="2.2" fill="none" opacity="0.72" stroke-linecap="round"/>
    <path d="M246 152 q-2 26 2 44" stroke="#f3f7f8" stroke-width="1.4" fill="none" opacity="0.48" stroke-linecap="round"/>
    ${mistBand(42, 246, 70, '#ffffff', 0.7)}
    ${mistBand(43, 256, 52, '#ffffff', 0.55)}
    <path d="M0 262 q90 -14 190 -4 q100 10 210 -6 L400 340 L0 340 Z" fill="${p.near}"/>
    <path d="M0 286 q110 -12 214 0 q90 10 186 -6 L400 340 L0 340 Z" fill="${p.ground}"/>
    <g fill="${shift(p.ground, 0, 0, -13)}" opacity="0.7">
      ${Array.from({ length: 26 }, (_, i) => { const r = rng(500 + i); const x = r() * 400, y = 298 + r() * 40; const h = 5 + r() * 5; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l-${(h * 0.5).toFixed(1)} ${h.toFixed(1)} h${h.toFixed(1)} Z"/>`; }).join('')}
    </g>
    ${birds([[336, 100, 3.6], [356, 90, 2.8]], '#4a4a44', 0.4)}`,
};

/* 5 · Cacaotales de Chuao --------------------------------------------------- */
scenes.chuao = {
  palette: { sky: ['#8fc4e2', '#d8e6e2', '#f6e3b8'], sun: '#ffdc95', glow: '#ffc97a',
             haze: '#e9ead9', far: '#6f9382', mid: '#3f6a51', near: '#2c5340', ground: '#7d6444' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 320, 96, 16, 3.4)}
    ${cloudBand(51, 84, 50, '#ffffff', 0.35)}
    <path d="M0 178 L60 152 L118 174 L180 140 L246 170 L310 146 L370 172 L400 158 L400 260 L0 260 Z" fill="${p.far}"/>
    ${haze(uid, p, 168, 40, 0.6)}
    <path d="M0 208 L56 190 L120 208 L186 184 L252 206 L318 188 L400 206 L400 300 L0 300 Z" fill="${p.mid}"/>
    <rect x="0" y="246" width="${W}" height="94" fill="${p.near}"/>
    ${(() => { // hileras de cacao
      let out = ''; const rows = [[262, 26, 0.75], [286, 32, 0.9], [314, 40, 1]];
      for (const [y, size, sc] of rows) {
        const r = rng(Math.round(y));
        for (let x = -10; x < 415; x += size * 1.15) {
          const c = mix(p.near, '#12301f', 0.25 + r() * 0.3);
          out += `<ellipse cx="${x.toFixed(1)}" cy="${y}" rx="${(size * 0.62).toFixed(1)}" ry="${(size * 0.52).toFixed(1)}" fill="${c}"/>`;
          out += `<ellipse cx="${(x - size * 0.3).toFixed(1)}" cy="${(y + size * 0.16).toFixed(1)}" rx="${(size * 0.34).toFixed(1)}" ry="${(size * 0.3).toFixed(1)}" fill="${shift(c, 0, 0, 5)}"/>`;
          if (r() > 0.45) out += `<ellipse cx="${(x + size * 0.34).toFixed(1)}" cy="${(y + size * 0.3).toFixed(1)}" rx="${(2.6 * sc).toFixed(1)}" ry="${(4.4 * sc).toFixed(1)}" fill="#c9682c" transform="rotate(14 ${(x + size * 0.34).toFixed(1)} ${(y + size * 0.3).toFixed(1)})"/>`;
          if (r() > 0.7) out += `<ellipse cx="${(x - size * 0.36).toFixed(1)}" cy="${(y + size * 0.34).toFixed(1)}" rx="${(2.2 * sc).toFixed(1)}" ry="${(3.8 * sc).toFixed(1)}" fill="#e0a13a" transform="rotate(-12 ${(x - size * 0.36).toFixed(1)} ${(y + size * 0.34).toFixed(1)})"/>`;
        }
      }
      return out; })()}
    <path d="M150 340 q22 -46 40 -94 q10 -26 6 -44" fill="none" stroke="${p.ground}" stroke-width="9" opacity="0.5" stroke-linecap="round"/>
    ${birds([[104, 80, 3.2], [128, 70, 2.6]], '#4a4a3c', 0.35)}`,
};

/* 6 · Choroní --------------------------------------------------------------- */
scenes.choroni = {
  palette: { sky: ['#79b8de', '#cfe2e6', '#f8dfae'], sun: '#ffd98d', glow: '#ffc36e',
             haze: '#eae7d8', far: '#5f8574', mid: '#3d6552', near: '#8e6b4d', ground: '#a68a6a' },
  paint: (uid, p) => {
    const casas = ['#e0a03c', '#cf5f46', '#e8d3a1', '#6f9a86', '#d98a55', '#c9c0a4', '#e6b95c'];
    let row = '';
    let x = -14;
    const r = rng(61);
    for (let i = 0; x < 412; i++) {
      const w = 42 + r() * 26, h = 52 + r() * 22, y = 288 - h;
      const c = casas[i % casas.length];
      row += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${c}"/>`;
      row += `<path d="M${(x - 4).toFixed(1)} ${y.toFixed(1)} L${(x + w + 4).toFixed(1)} ${y.toFixed(1)} L${(x + w).toFixed(1)} ${(y - 8).toFixed(1)} L${(x + 4).toFixed(1)} ${(y - 8).toFixed(1)} Z" fill="#a8503a"/>`;
      row += `<rect x="${(x + w * 0.18).toFixed(1)}" y="${(y + h * 0.3).toFixed(1)}" width="${(w * 0.2).toFixed(1)}" height="${(h * 0.28).toFixed(1)}" fill="${shift(c, 0, -8, -26)}" opacity="0.75"/>`;
      row += `<rect x="${(x + w * 0.58).toFixed(1)}" y="${(y + h * 0.42).toFixed(1)}" width="${(w * 0.22).toFixed(1)}" height="${(h * 0.58).toFixed(1)}" fill="${shift(c, 0, -8, -30)}" opacity="0.8"/>`;
      x += w + 3;
    }
    return `
    ${sky(uid, p)}
    ${disc(uid, p, 66, 104, 18, 3.6)}
    ${cloudBand(62, 78, 48, '#ffffff', 0.35)}
    <path d="M0 190 L48 158 L104 184 L164 142 L226 178 L284 150 L346 182 L400 160 L400 292 L0 292 Z" fill="${p.far}"/>
    ${haze(uid, p, 186, 34, 0.55)}
    <path d="M0 222 L58 202 L124 226 L190 198 L256 224 L322 200 L400 224 L400 300 L0 300 Z" fill="${p.mid}"/>
    <g>
      <rect x="176" y="196" width="26" height="62" fill="#efe6d2"/>
      <path d="M172 196 L206 196 L189 176 Z" fill="#a8503a"/>
      <path d="M189 168 v9 M185 172 h8" stroke="#7d6a4c" stroke-width="2"/>
      <rect x="185" y="212" width="9" height="13" rx="4.5" fill="#8a7a5c"/>
    </g>
    ${row}
    <rect x="0" y="288" width="${W}" height="52" fill="${p.ground}"/>
    <g opacity="0.3" stroke="${shift(p.ground, 0, 0, -18)}" stroke-width="1.1">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${296 + i * 5}" x2="400" y2="${294 + i * 5.4}"/>`).join('')}
    </g>
    ${palm(28, 292, 74, '#2d5140', -6)}
    ${palm(372, 294, 62, '#2d5140', 5)}`;
  },
};

/* 7 · Peñeros de Juan Griego ------------------------------------------------ */
scenes.penero = {
  palette: { sky: ['#7fb9dd', '#e6dfd0', '#f8cf95'], sun: '#ffcd78', glow: '#ffb75c',
             haze: '#f2e3c8', far: '#6d8a92', mid: '#3f6b76', near: '#2d5763',
             water: ['#79a8b4', '#3f6f7e'], ground: '#d8c39a' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 214, 158, 26)}
    ${cloudBand(71, 80, 56, '#ffffff', 0.3)}
    ${haze(uid, p, 176, 40, 0.7)}
    <path d="M0 196 L44 184 L92 192 L140 178 L400 190 L400 214 L0 214 Z" fill="${p.far}" opacity="0.8"/>
    ${linear(`${uid}-sea`, [[0, p.water[0]], [1, p.water[1]]])}
    <rect x="0" y="208" width="${W}" height="132" fill="url(#${uid}-sea)"/>
    <g opacity="0.5">
      ${Array.from({ length: 13 }, (_, i) => { const y = 216 + i * 8.4, w = 12 + i * 5; return `<line x1="${214 - w}" y1="${y.toFixed(1)}" x2="${214 + w}" y2="${y.toFixed(1)}" stroke="${shift(p.sun, 0, 0, 4)}" stroke-width="${(1.2 + i * 0.16).toFixed(1)}" stroke-linecap="round" opacity="${(0.75 - i * 0.045).toFixed(2)}"/>`; }).join('')}
    </g>
    ${(() => { // peñeros
      const boat = (x, y, s, hull, stripe) => `
        <g transform="translate(${x} ${y}) scale(${s})">
          <path d="M-30 0 q6 13 30 13 q24 0 30 -13 Z" fill="${hull}"/>
          <path d="M-27 0 q6 5 27 5 q21 0 27 -5 Z" fill="${stripe}"/>
          <rect x="-1.4" y="-26" width="2.8" height="26" fill="${shift(hull, 0, 0, -14)}"/>
          <path d="M1.6 -25 q13 9 2 20 Z" fill="#f2ece0" opacity="0.9"/>
        </g>`;
      return boat(96, 268, 1.15, '#e2e0d4', '#c2543f') + boat(300, 250, 0.85, '#e6dfcf', '#3c6c85') + boat(196, 300, 1.35, '#efe9dc', '#dda23f');
    })()}
    ${birds([[76, 84, 4], [104, 74, 3], [312, 96, 3.2]], '#4e4a40', 0.42)}`,
};

/* 8 · Páramo de frailejones ------------------------------------------------- */
scenes.paramo = {
  palette: { sky: ['#93bcd8', '#d9e2e0', '#f1e8d2'], sun: '#fbe3b0', glow: '#ffd79a',
             haze: '#eef1ee', far: '#8a9ba0', mid: '#667d74', near: '#57705d', ground: '#7c8a5c' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 306, 92, 17, 3.4)}
    ${cloudBand(81, 76, 46, '#ffffff', 0.38)}
    <path d="M0 178 L60 152 L118 174 L180 142 L244 170 L306 146 L366 172 L400 160 L400 236 L0 236 Z" fill="${p.far}" opacity="0.8"/>
    ${mistBand(82, 202, 78, '#ffffff', 0.62)}
    <path d="M0 216 q88 -20 180 -6 q94 14 220 -8 L400 340 L0 340 Z" fill="${p.mid}"/>
    ${mistBand(84, 236, 58, '#ffffff', 0.42)}
    <path d="M0 252 q100 -16 200 -2 q88 12 200 -8 L400 340 L0 340 Z" fill="${p.near}"/>
    <path d="M0 288 q104 -14 206 -2 q92 10 194 -8 L400 340 L0 340 Z" fill="${p.ground}"/>
    ${(() => { // frailejones: tallo leñoso, roseta de hojas plateadas y flor amarilla
      const fr = (x, y, s) => {
        const stem = 30 * s;
        const leaf = mix('#a7b489', p.ground, 0.2);
        let g = `<path d="M${x} ${y} l0 ${-stem}" stroke="#6f6046" stroke-width="${(5 * s).toFixed(1)}" stroke-linecap="round"/>`;
        g += `<g opacity="0.55">${Array.from({ length: 5 }, (_, i) =>
          `<ellipse cx="${x}" cy="${(y - stem * (0.2 + i * 0.16)).toFixed(1)}" rx="${(4.6 * s).toFixed(1)}" ry="${(1.7 * s).toFixed(1)}" fill="#7d6c4e"/>`).join('')}</g>`;
        const top = y - stem;
        for (let i = 0; i < 13; i++) {
          const a = -Math.PI - 0.22 + (Math.PI + 0.44) / 12 * i;
          const len = (11 + (i % 3) * 2.4) * s;
          const x2 = x + Math.cos(a) * len, y2 = top + Math.sin(a) * len * 0.62 + 1;
          const wdt = 3.4 * s;
          const nx = -Math.sin(a) * wdt, ny = Math.cos(a) * wdt * 0.62;
          g += `<path d="M${x.toFixed(1)} ${(top + 1.5 * s).toFixed(1)} L${(x2 + nx).toFixed(1)} ${(y2 + ny).toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${(x2 - nx).toFixed(1)} ${(y2 - ny).toFixed(1)} Z" fill="${i % 2 ? leaf : shift(leaf, 0, -4, 7)}"/>`;
        }
        g += `<circle cx="${x}" cy="${(top + 0.5 * s).toFixed(1)}" r="${(2.6 * s).toFixed(1)}" fill="${shift(leaf, 0, -6, 12)}"/>`;
        g += `<circle cx="${(x + 5 * s).toFixed(1)}" cy="${(top - 7 * s).toFixed(1)}" r="${(1.9 * s).toFixed(1)}" fill="#dcbb4e"/>`;
        g += `<path d="M${(x + 5 * s).toFixed(1)} ${(top - 5 * s).toFixed(1)} l0 ${(4 * s).toFixed(1)}" stroke="#6b5b42" stroke-width="${(1.1 * s).toFixed(1)}"/>`;
        return g;
      };
      const spots = [[30, 328, 1.5], [96, 314, 1.12], [158, 332, 1.62], [222, 310, 1.0],
                     [276, 328, 1.45], [338, 314, 1.08], [388, 332, 1.55], [-4, 310, 0.95],
                     [128, 304, 0.8], [196, 298, 0.68], [300, 300, 0.72], [58, 300, 0.7], [364, 298, 0.66]];
      return spots.map(([x, y, s]) => fr(x, y, s)).join('');
    })()}
    <g fill="${shift(p.near, 0, 0, -10)}" opacity="0.5">
      <ellipse cx="338" cy="272" rx="13" ry="5"/><ellipse cx="66" cy="276" rx="10" ry="4"/><ellipse cx="200" cy="266" rx="8" ry="3.4"/>
    </g>`,
};

/* 9 · Los Roques ------------------------------------------------------------ */
scenes.losroques = {
  palette: { sky: ['#6fb3dd', '#cfe6ec', '#f4e6c4'], sun: '#ffe0a2', glow: '#ffd085',
             haze: '#eaf1ef', far: '#a8c8c4', mid: '#4fa3ab', near: '#2b7f92',
             water: ['#7fd3d0', '#2f8fa4'], ground: '#f0e2c0' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 322, 92, 16, 3.4)}
    ${cloudBand(91, 74, 54, '#ffffff', 0.4)}
    ${cloudBand(92, 116, 40, '#ffffff', 0.28)}
    <rect x="0" y="188" width="${W}" height="10" fill="${p.far}" opacity="0.6"/>
    ${linear(`${uid}-sea`, [[0, p.mid], [0.42, p.water[0]], [1, p.water[1]]])}
    <rect x="0" y="194" width="${W}" height="146" fill="url(#${uid}-sea)"/>
    <path d="M-10 224 q80 -16 168 -6 q92 10 250 -6 L400 236 q-140 14 -244 4 q-90 -8 -166 4 Z" fill="${shift(p.water[0], 0, 6, 12)}" opacity="0.75"/>
    <path d="M0 262 q104 -20 214 -6 q92 12 186 -8 L400 292 q-118 16 -212 6 q-96 -10 -188 8 Z" fill="${p.ground}"/>
    <path d="M0 276 q108 -14 214 -2 q92 10 186 -6 L400 292 q-118 14 -212 4 q-96 -10 -188 8 Z" fill="${shift(p.ground, 0, 0, 5)}"/>
    <path d="M0 300 q120 14 236 4 q84 -8 164 4 L400 340 L0 340 Z" fill="${shift(p.water[1], 0, 4, 10)}"/>
    ${palm(94, 272, 56, '#2a5a4a', -5)}
    ${palm(118, 274, 40, '#2a5a4a', 4)}
    <g transform="translate(292 246)">
      <path d="M-16 0 q4 8 16 8 q12 0 16 -8 Z" fill="#f4efe2"/>
      <path d="M0 -30 L13 -3 L0 -3 Z" fill="#fbf8f0"/>
      <path d="M-2 -26 L-12 -3 L-2 -3 Z" fill="#e6dfd0"/>
    </g>
    <g fill="#f6f2e8" opacity="0.9">
      <ellipse cx="180" cy="272" rx="4.2" ry="2"/><ellipse cx="196" cy="276" rx="3.2" ry="1.6"/>
    </g>
    ${birds([[132, 88, 4], [158, 78, 3], [64, 100, 2.6]], '#4c4c42', 0.4)}`,
};

/* 10 · Patio de casa venezolana --------------------------------------------- */
scenes.patio = {
  palette: { sky: ['#8ec6e6', '#d8e8e6', '#f6e6c2'], sun: '#ffe1a4', glow: '#ffcf83',
             haze: '#efe9d8', far: '#7fa189', mid: '#3f6b4e', near: '#2f5740', ground: '#c3a179' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 74, 78, 15, 3.2)}
    ${cloudBand(101, 92, 46, '#ffffff', 0.3)}
    <path d="M0 172 L70 148 L146 174 L220 146 L296 172 L370 150 L400 164 L400 240 L0 240 Z" fill="${p.far}" opacity="0.8"/>
    <rect x="0" y="228" width="${W}" height="16" fill="${p.mid}" opacity="0.55"/>
    <!-- pared del patio -->
    <rect x="0" y="236" width="${W}" height="52" fill="#e6d2ae"/>
    <rect x="0" y="236" width="${W}" height="7" fill="#b8703f"/>
    <g fill="#c4783f" opacity="0.9">
      ${Array.from({ length: 27 }, (_, i) => `<path d="M${i * 15} 236 q7.5 -6 15 0 Z"/>`).join('')}
    </g>
    <rect x="286" y="250" width="42" height="38" rx="3" fill="#8a6a48"/>
    <g stroke="#e6d2ae" stroke-width="1.6" opacity="0.6">
      <line x1="307" y1="250" x2="307" y2="288"/><line x1="286" y1="269" x2="328" y2="269"/>
    </g>
    <!-- árbol de mango -->
    <path d="M132 300 q-4 -46 2 -74" stroke="#7a5a3c" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M134 250 q-16 -12 -28 -22 M134 244 q18 -14 30 -22" stroke="#7a5a3c" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${(() => {
      const blobs = [[134, 200, 46, 30], [98, 214, 34, 22], [172, 212, 36, 23], [116, 184, 28, 19], [156, 186, 30, 20], [134, 172, 24, 16]];
      return blobs.map(([x, y, rx, ry], i) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${i % 2 ? p.mid : p.near}" opacity="0.95"/>`).join('')
        + [[110, 206], [152, 200], [128, 218], [166, 218], [96, 222]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="6" fill="#e0a53c" transform="rotate(18 ${x} ${y})"/>`).join('');
    })()}
    <!-- chinchorro -->
    <path d="M60 246 q54 42 122 -4" fill="none" stroke="#d9694e" stroke-width="4"/>
    <path d="M60 246 q54 50 122 -4" fill="none" stroke="#e9a24a" stroke-width="3.2" opacity="0.85"/>
    <g stroke="#d9694e" stroke-width="1.1" opacity="0.75">
      ${Array.from({ length: 11 }, (_, i) => { const t = i / 10, x = 60 + 122 * t; const y = 246 + (42 * 2 * t * (1 - t)) * 1.9 - 4 * t; return `<line x1="${x.toFixed(1)}" y1="${(y - 3).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y + 4).toFixed(1)}"/>`; }).join('')}
    </g>
    <rect x="0" y="288" width="${W}" height="52" fill="${p.ground}"/>
    <g opacity="0.35" stroke="${shift(p.ground, 0, 0, -22)}" stroke-width="1">
      ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${294 + i * 7}" x2="400" y2="${294 + i * 7}"/>`).join('')}
      ${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 34}" y1="288" x2="${i * 34 - 8}" y2="340"/>`).join('')}
    </g>
    <g>
      <path d="M228 300 h26 l-3 22 h-20 Z" fill="#c2543f"/>
      <path d="M241 300 q-12 -18 -3 -28 q10 8 3 28" fill="${p.near}"/>
      <path d="M241 300 q12 -16 22 -18 q-4 14 -22 18" fill="${p.mid}"/>
      <path d="M336 302 h22 l-3 20 h-16 Z" fill="#d9954a"/>
      <path d="M347 302 q-10 -14 -2 -24 q9 8 2 24" fill="${p.near}"/>
    </g>`,
};

/* 11 · Palafitos y relámpago del Catatumbo ---------------------------------- */
scenes.palafitos = {
  palette: { sky: ['#2d3f6b', '#4d6489', '#9d8fa0'], sun: '#f2e2b8', glow: '#c9d6ea',
             haze: '#8a97ad', far: '#3c4d6a', mid: '#2a3a55', near: '#1e2b40',
             water: ['#4a5f80', '#22304a'], ground: '#8a6f4c' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${stars(111, 60, 6, 130)}
    ${cloudBand(112, 96, 70, '#5d6f8f', 0.55)}
    ${cloudBand(113, 130, 54, '#6d7d99', 0.45)}
    ${radial(`${uid}-flash`, [[0, '#ffffff', 0.85], [0.35, '#cfe0f5', 0.32], [1, '#cfe0f5', 0]])}
    <circle cx="288" cy="112" r="74" fill="url(#${uid}-flash)"/>
    <path d="M288 74 l-10 27 h9 l-13 32 l26 -37 h-10 l12 -22 Z" fill="#f8f5e8" opacity="0.95"/>
    <path d="M320 92 l-9 22 h9 l-12 26" fill="none" stroke="#f0ecdc" stroke-width="2" opacity="0.7" stroke-linecap="round"/>
    <rect x="0" y="186" width="${W}" height="8" fill="${p.far}" opacity="0.8"/>
    ${linear(`${uid}-w`, [[0, p.water[0]], [1, p.water[1]]])}
    <rect x="0" y="192" width="${W}" height="148" fill="url(#${uid}-w)"/>
    ${(() => { // palafitos
      const house = (x, y, w, h, wall, roof) => `
        <g>
          <rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${wall}"/>
          <path d="M${x - 5} ${y - h} L${x + w + 5} ${y - h} L${x + w * 0.5} ${y - h - 13} Z" fill="${roof}"/>
          <rect x="${x + w * 0.24}" y="${y - h * 0.66}" width="${w * 0.2}" height="${h * 0.28}" fill="#f2c66a" opacity="0.9"/>
          <rect x="${x + w * 0.6}" y="${y - h * 0.66}" width="${w * 0.18}" height="${h * 0.28}" fill="#f2c66a" opacity="0.7"/>
          ${[0.1, 0.35, 0.62, 0.88].map((t) => `<rect x="${(x + w * t).toFixed(1)}" y="${y}" width="2.6" height="26" fill="${shift(roof, 0, 0, -18)}"/>`).join('')}
          <rect x="${x - 4}" y="${y}" width="${w + 8}" height="3.4" fill="${shift(roof, 0, 0, -12)}"/>
        </g>`;
      return house(46, 226, 58, 34, '#6d5c48', '#3f3a34') + house(150, 236, 74, 40, '#7a6650', '#453d34') + house(280, 228, 62, 34, '#6a5a46', '#3d3831');
    })()}
    <g opacity="0.42">
      ${[[75, 258], [187, 268], [311, 260]].map(([x, y]) => `<rect x="${x - 26}" y="${y}" width="52" height="30" fill="#f2c66a" opacity="0.22"/>`).join('')}
      ${Array.from({ length: 15 }, (_, i) => `<line x1="${20 + i * 26}" y1="${272 + (i % 3) * 14}" x2="${64 + i * 26}" y2="${272 + (i % 3) * 14}" stroke="#a7bcd8" stroke-width="1.1" opacity="0.45"/>`).join('')}
    </g>
    <g transform="translate(120 306)">
      <path d="M-26 0 q6 10 26 10 q20 0 26 -10 Z" fill="#4a4335"/>
      <path d="M4 -2 v-16" stroke="#4a4335" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="4" cy="-20" r="3.4" fill="#4a4335"/>
    </g>`,
};

/* 12 · Pico Bolívar --------------------------------------------------------- */
scenes.picobolivar = {
  palette: { sky: ['#5b93c9', '#b9d3e4', '#eddfc4'], sun: '#ffe3ad', glow: '#ffd191',
             haze: '#f0f3f4', far: '#8fa3b4', mid: '#5b7186', near: '#3f5261', ground: '#4d6a5e' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 92, 84, 17, 3.4)}
    ${cloudBand(121, 62, 46, '#ffffff', 0.34)}
    <path d="M0 214 L58 178 L104 200 L400 196 L400 250 L0 250 Z" fill="${p.far}" opacity="0.7"/>
    ${linear(`${uid}-peak`, [[0, shift(p.mid, 0, 0, 14)], [1, shift(p.mid, 0, 0, -8)]])}
    <path d="M96 246 L172 122 L214 176 L250 138 L318 246 Z" fill="url(#${uid}-peak)"/>
    <path d="M172 122 L196 152 L184 158 L166 146 L156 158 L146 148 Z" fill="#f6fbfd"/>
    <path d="M250 138 L268 168 L256 172 L244 160 L236 168 Z" fill="#eef7fa"/>
    <path d="M172 122 L214 176 L196 182 L184 158 Z" fill="${shift(p.mid, 0, 0, -14)}" opacity="0.5"/>
    <path d="M0 240 L46 200 L96 234 L140 206 L400 236 L400 268 L0 268 Z" fill="${p.near}"/>
    <path d="M46 200 L64 220 L52 224 L40 214 Z" fill="#f2f8fb" opacity="0.9"/>
    ${mistBand(122, 258, 74, '#ffffff', 0.7)}
    ${mistBand(123, 270, 56, '#ffffff', 0.6)}
    <path d="M0 286 q92 -16 190 -2 q100 12 210 -8 L400 340 L0 340 Z" fill="${p.ground}"/>
    <g fill="${shift(p.ground, 0, 0, -14)}" opacity="0.8">
      ${Array.from({ length: 16 }, (_, i) => { const r = rng(900 + i); const x = r() * 400, y = 300 + r() * 34; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l-4 9 h8 Z"/>`; }).join('')}
    </g>
    <g opacity="0.75">
      <path d="M300 96 q14 -8 28 0 q-14 5 -14 5 q0 0 -14 -5 Z" fill="#3d3b36"/>
      <path d="M332 112 q10 -6 20 0 q-10 4 -10 4 q0 0 -10 -4 Z" fill="#3d3b36" opacity="0.7"/>
    </g>`,
};

/* 13 · Cafetales de Boconó -------------------------------------------------- */
scenes.cafetal = {
  palette: { sky: ['#8bc0dd', '#d7e6e0', '#f6e5bc'], sun: '#ffdf9d', glow: '#ffcb7f',
             haze: '#e9ebd9', far: '#7c9a86', mid: '#4c7355', near: '#37603f', ground: '#8f6d45' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 300, 84, 16, 3.2)}
    ${cloudBand(131, 108, 60, '#ffffff', 0.4)}
    <path d="M0 186 L64 150 L128 182 L196 144 L262 178 L330 148 L400 178 L400 260 L0 260 Z" fill="${p.far}"/>
    ${haze(uid, p, 176, 40, 0.6)}
    <path d="M0 218 L70 192 L142 218 L214 190 L286 216 L358 192 L400 210 L400 300 L0 300 Z" fill="${p.mid}"/>
    <path d="M0 254 q96 -22 196 -4 q98 18 204 -10 L400 340 L0 340 Z" fill="${p.near}"/>
    ${(() => { // hileras curvas de cafetos con granos rojos
      let out = '';
      const rows = [[268, 0.55], [288, 0.7], [310, 0.88], [334, 1.05]];
      for (const [y, s] of rows) {
        const r = rng(Math.round(y * 3));
        out += `<path d="M0 ${y} q100 -14 200 -2 q100 12 200 -8" fill="none" stroke="${shift(p.near, 0, 0, -8)}" stroke-width="${(1.4 * s).toFixed(1)}" opacity="0.5"/>`;
        for (let x = -6; x < 410; x += 22 * s) {
          const dy = -(Math.sin(x / 90) * 6);
          const c = mix(p.near, '#16371f', 0.2 + r() * 0.35);
          out += `<ellipse cx="${x.toFixed(1)}" cy="${(y + dy).toFixed(1)}" rx="${(9 * s).toFixed(1)}" ry="${(7.5 * s).toFixed(1)}" fill="${c}"/>`;
          if (s > 0.6) out += [[-3, -1], [3, 1], [0, 3]].map(([ox, oy]) => `<circle cx="${(x + ox * s).toFixed(1)}" cy="${(y + dy + oy * s).toFixed(1)}" r="${(1.5 * s).toFixed(1)}" fill="#c4432c"/>`).join('');
        }
      }
      return out; })()}
    <g>
      <path d="M296 250 h56 v-6 l-28 -16 l-28 16 Z" fill="#b0553c"/>
      <rect x="300" y="250" width="48" height="20" fill="#efe4cc"/>
      <rect x="318" y="256" width="11" height="14" fill="#7d6a4c"/>
    </g>
    ${birds([[86, 78, 3.4], [112, 68, 2.6]], '#4a4a3c', 0.35)}`,
};

/* 14 · Noche en la Gran Sabana ---------------------------------------------- */
scenes.nochesabana = {
  palette: { sky: ['#0d1b38', '#1f2e4d', '#414a63'], sun: '#f4eddc', glow: '#cbd6ea',
             haze: '#5b6379', far: '#28324c', mid: '#1b2336', near: '#131927', ground: '#191f2e' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${(() => {
      // La vía láctea: una franja difusa, no una banda de bordes duros.
      const band = `<g transform="rotate(-20 200 116)">
        ${linear(`${uid}-mw`, [[0, '#dfe7f7', 0], [0.22, '#dfe7f7', 0.16], [0.5, '#e8eefc', 0.3], [0.78, '#dfe7f7', 0.16], [1, '#dfe7f7', 0]], 0, 0, 0, 1)}
        ${linear(`${uid}-mwx`, [[0, '#000', 0], [0.16, '#000', 1], [0.84, '#000', 1], [1, '#000', 0]], 0, 0, 1, 0)}
        <mask id="${uid}-mwm"><rect x="-70" y="46" width="540" height="104" fill="url(#${uid}-mwx)"/></mask>
        <rect x="-70" y="46" width="540" height="104" fill="url(#${uid}-mw)" mask="url(#${uid}-mwm)"/>
      </g>`;
      return band + stars(141, 210, 2, 210) + stars(142, 46, 40, 164, '#ffe9c9') + stars(143, 26, 60, 140, '#cfe0ff');
    })()}
    ${disc(uid, p, 322, 60, 12, 2.8)}
    <path d="M0 208 L44 200 L92 206 L140 192 L400 204 L400 234 L0 234 Z" fill="${p.far}" opacity="0.85"/>
    <g>
      <path d="M86 226 L92 166 L198 162 L204 226 Z" fill="${p.mid}"/>
      <path d="M92 166 L198 162 L198 168 L92 172 Z" fill="#6f7d9b" opacity="0.5"/>
      <path d="M252 228 L258 182 L338 179 L344 228 Z" fill="${p.mid}" opacity="0.92"/>
      <path d="M258 182 L338 179 L338 184 L258 187 Z" fill="#6f7d9b" opacity="0.4"/>
    </g>
    <path d="M0 234 q98 -14 200 -4 q102 10 200 -8 L400 340 L0 340 Z" fill="${p.near}"/>
    <path d="M0 272 q110 -12 214 0 q92 10 186 -8 L400 340 L0 340 Z" fill="${p.ground}"/>
    <path d="M0 256 q104 -8 210 0 q92 8 190 -4" fill="none" stroke="#8fa3c4" stroke-width="1.1" opacity="0.3"/>
    ${radial(`${uid}-fire`, [[0, '#ffd08a', 0.8], [0.38, '#e0803a', 0.28], [1, '#e0803a', 0]])}
    <circle cx="112" cy="304" r="46" fill="url(#${uid}-fire)"/>
    <g>
      <path d="M102 312 l20 -8 M104 304 l18 10" stroke="#6a533a" stroke-width="3" stroke-linecap="round"/>
      <path d="M112 298 q7 8 0 14 q-7 -6 0 -14" fill="#f2ab42"/>
      <path d="M112 291 q11 13 0 23 q-11 -10 0 -23" fill="#e88a35" opacity="0.55"/>
    </g>
    ${palm(358, 296, 42, '#0d1320', 4)}
    ${palm(24, 300, 34, '#0d1320', -4)}`,
};

/* 15 · Río Orinoco ---------------------------------------------------------- */
scenes.orinoco = {
  palette: { sky: ['#79b3dc', '#d6e2e0', '#f9ddab'], sun: '#ffd88b', glow: '#ffc067',
             haze: '#efe6d0', far: '#6f8f86', mid: '#3f6a5c', near: '#2c5145',
             water: ['#cbd7cf', '#7d9a97'], ground: '#3b5a4c' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 200, 172, 25)}
    ${cloudBand(151, 72, 62, '#ffffff', 0.4)}
    ${cloudBand(152, 118, 46, '#ffffff', 0.28)}
    ${haze(uid, p, 186, 44, 0.8)}
    <path d="M0 210 L52 204 L110 208 L168 200 L232 208 L296 202 L356 208 L400 202 L400 224 L0 224 Z" fill="${p.far}" opacity="0.85"/>
    <rect x="0" y="216" width="${W}" height="10" fill="${p.mid}" opacity="0.65"/>
    ${linear(`${uid}-r`, [[0, p.water[0]], [1, p.water[1]]])}
    <rect x="0" y="222" width="${W}" height="118" fill="url(#${uid}-r)"/>
    <g opacity="0.55">
      ${Array.from({ length: 11 }, (_, i) => { const y = 230 + i * 10, w = 16 + i * 7; return `<line x1="${200 - w}" y1="${y}" x2="${200 + w}" y2="${y}" stroke="${shift(p.sun, 0, 0, 6)}" stroke-width="${(1.3 + i * 0.18).toFixed(1)}" stroke-linecap="round" opacity="${(0.7 - i * 0.05).toFixed(2)}"/>`; }).join('')}
    </g>
    <path d="M0 300 q70 -14 148 -6 q26 3 40 9 L0 340 Z" fill="${p.ground}"/>
    <path d="M400 288 q-58 -12 -118 -4 q-24 3 -36 8 L400 340 Z" fill="${p.ground}"/>
    ${palm(52, 302, 58, p.near, -5)}
    ${palm(78, 306, 42, p.near, 4)}
    ${palm(348, 292, 50, p.near, 5)}
    <g transform="translate(208 272)">
      <path d="M-34 0 q7 11 34 11 q27 0 34 -11 Z" fill="#6b533a"/>
      <path d="M-30 0 q7 5 30 5 q23 0 30 -5 Z" fill="#8a6c4a"/>
      <g fill="#3f4a44">
        <circle cx="-8" cy="-11" r="4"/><rect x="-11" y="-8" width="6" height="9" rx="2.6"/>
        <path d="M-4 -8 l16 -12" stroke="#5c4b34" stroke-width="2.2" stroke-linecap="round"/>
      </g>
    </g>
    <g opacity="0.3"><ellipse cx="208" cy="292" rx="40" ry="4.6" fill="#2e4a44"/></g>
    ${birds([[288, 96, 4.2], [316, 86, 3.2], [262, 108, 2.6]], '#4b4a3e', 0.4)}`,
};

/* 16 · Salto Ángel --------------------------------------------------------- */
scenes.saltoangel = {
  palette: { sky: ['#6aa8d6', '#c6dde9', '#f2e0bc'], sun: '#ffe1a6', glow: '#ffcd83',
             haze: '#eef2ef', far: '#8098a8', mid: '#4f6474', near: '#3a4b52', ground: '#2f5c3c' },
  paint: (uid, p) => `
    ${sky(uid, p)}
    ${disc(uid, p, 344, 62, 14, 3)}
    ${cloudBand(161, 52, 44, '#ffffff', 0.32)}
    <path d="M0 148 L40 126 L92 144 L148 116 L204 140 L258 114 L316 138 L368 120 L400 134 L400 220 L0 220 Z" fill="${p.far}" opacity="0.6"/>

    <!-- El tepuy: pared de arenisca con la cima recortada -->
    ${linear(`${uid}-wall`, [[0, shift(p.mid, 0, 0, 13)], [0.32, p.mid], [1, shift(p.mid, 0, 0, -15)]])}
    <path d="M62 96 L104 78 L150 86 L196 70 L238 80 L286 68 L330 84 L344 262 L54 268 Z" fill="url(#${uid}-wall)"/>
    <path d="M62 96 L104 78 L150 86 L196 70 L238 80 L286 68 L330 84 L332 100 L64 112 Z" fill="${shift(p.mid, 0, 0, 15)}"/>
    <!-- cara iluminada por el sol de la mañana -->
    <path d="M286 68 L330 84 L344 262 L286 264 Z" fill="${shift(p.mid, -4, 4, 8)}" opacity="0.55"/>
    <g stroke="${shift(p.mid, 0, 0, -18)}" stroke-width="1" opacity="0.4">
      ${Array.from({ length: 19 }, (_, i) => `<line x1="${70 + i * 14.6}" y1="${104 + (i % 3) * 4}" x2="${66 + i * 14.9}" y2="264"/>`).join('')}
    </g>
    <g fill="${shift(p.mid, 0, 0, -20)}" opacity="0.32">
      <path d="M120 112 l16 150 l-22 1 Z"/><path d="M244 106 l14 156 l-20 1 Z"/>
    </g>

    <!-- El salto: casi un kilómetro de caída, que es lo que lo hace único -->
    ${linear(`${uid}-fall`, [[0, '#ffffff', 0.97], [0.5, '#f4fafb', 0.82], [0.85, '#eef6f9', 0.4], [1, '#eef6f9', 0.08]])}
    <path d="M178 84 q-4 62 -3 104 q1 40 -6 66 l19 1 q-7 -26 -4 -66 q2 -44 6 -104 Z" fill="url(#${uid}-fall)"/>
    <path d="M182 88 q-3 74 -2 124" stroke="#ffffff" stroke-width="2" fill="none" opacity="0.9"/>
    <path d="M172 130 q-3 48 -4 78" stroke="#ffffff" stroke-width="1.1" fill="none" opacity="0.5"/>
    ${radial(`${uid}-mist`, [[0, '#ffffff', 0.9], [0.45, '#ffffff', 0.4], [1, '#ffffff', 0]])}
    <ellipse cx="180" cy="252" rx="74" ry="30" fill="url(#${uid}-mist)"/>
    ${mistBand(162, 260, 62, '#ffffff', 0.6)}

    <!-- Selva -->
    <path d="M0 268 q92 -18 192 -6 q104 12 208 -12 L400 340 L0 340 Z" fill="${p.near}"/>
    ${(() => {
      let out = `<path d="M0 292 q100 -16 202 -2 q100 12 198 -10 L400 340 L0 340 Z" fill="${p.ground}"/>`;
      const r = rng(163);
      for (let x = -8; x < 412; x += 13 + r() * 9) {
        const y = 294 + r() * 18, rr = 7 + r() * 10;
        out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="${mix(p.ground, '#16331f', r() * 0.65)}"/>`;
      }
      return out; })()}
    ${palm(50, 320, 48, '#1c3a26', -4)}
    ${palm(78, 326, 34, '#1c3a26', 4)}
    ${palm(348, 324, 42, '#1c3a26', 5)}
    ${birds([[74, 92, 4], [100, 82, 3], [312, 106, 2.8]], '#4a4a44', 0.4)}`,
};

export default scenes;

/** Devuelve el SVG completo de una escena. */
export function renderScene(name, variant, uid, duskify) {
  const s = scenes[name];
  if (!s) throw new Error('Escena desconocida: ' + name);
  const isNight = name === 'nochesabana' || name === 'palafitos';
  const p = variant === 'tarde' && !isNight ? duskify(s.palette)
    : variant === 'tarde' ? nightDeep(s.palette) : s.palette;
  return `<svg class="scene" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${s.paint(uid, p)}</svg>`;
}

/** Variante nocturna más profunda para las escenas que ya son de noche. */
function nightDeep(p) {
  const d = { ...p };
  d.sky = [shift(p.sky[0], 4, 6, -5), shift(p.sky[1], 4, 4, -6), shift(p.sky[2], 6, 2, -8)];
  for (const k of ['far', 'mid', 'near', 'ground']) if (p[k]) d[k] = shift(p[k], 3, 2, -3);
  if (p.water) d.water = [].concat(p.water).map((c) => shift(c, 3, 2, -4));
  return d;
}
