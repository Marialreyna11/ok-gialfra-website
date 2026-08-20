// DÍA 01 · Salto Ángel — Parque Nacional Canaima, Bolívar.
//
// Dirección de arte: serigrafía editorial. Paleta corta, capas planas con
// transparencia que se superponen como tintas impresas, siluetas dibujadas a
// mano y grano fino encima. Es el lenguaje del cartel de parque nacional: se
// imprime perfecto en vector y no cae en el vector plano de librería de íconos.
//
// El Salto Ángel cae 979 metros y se deshace en neblina antes de tocar el
// fondo. Nunca llega entero, y aun así es el salto más alto del mundo. Es la
// imagen del primer día.
import { rng, shift, mixRGB } from '../color.js';
import { lin, rad, cirros, aves, velo } from '../atmosfera.js';
import { suavizar, perfil, rellenar, ruidoFractal } from '../geometria.js';
import { grano, granoGradiente, moteado, trama } from '../textura.js';

export const W = 1000;
export const H = 931;

export const meta = {
  lugar: 'Salto Ángel',
  ubicacion: 'Parque Nacional Canaima · Bolívar',
  palabra: 'Respira',
};

/* Cinco tintas y sus derivados. Nada saturado. */
const T = {
  cieloAlto: '#2F5364',
  cieloMedio: '#6D8A8A',
  cieloBajo: '#D8AE86',
  horizonte: '#F0DBB6',
  sol: '#F7E9CA',
  lejano: '#7C919A',
  roca: '#25393F',
  rocaLuz: '#6A7A70',
  rocaCalida: '#9C8663',
  selvaLejos: '#365740',
  selvaMedia: '#23402F',
  selvaCerca: '#16271D',
  frente: '#0E1C14',
  agua: '#F9F4E8',
  brasa: '#A8503A',
};

/** Borde “desgarrado”: la línea entre dos tintas nunca es recta. */
function borde(seed, y, amplitud, muestras = 30, x0 = -40, x1 = 1040) {
  return perfil({ seed, base: y, amplitud, muestras, x0, x1 });
}

/** Silueta de fronda de palma, para recortar el canto de las capas de selva. */
function fronda(x, y, largo, ang, color, seed) {
  const r = rng(seed);
  const ex = x + Math.cos(ang) * largo;
  const ey = y + Math.sin(ang) * largo * 0.52 + largo * 0.44;
  const cx = x + Math.cos(ang) * largo * 0.55;
  const cy = y + Math.sin(ang) * largo * 0.62 - largo * 0.1;
  const izq = [], der = [];
  for (let k = 0; k <= 8; k++) {
    const u = k / 8;
    const px = (1 - u) ** 2 * x + 2 * (1 - u) * u * cx + u ** 2 * ex;
    const py = (1 - u) ** 2 * y + 2 * (1 - u) * u * cy + u ** 2 * ey;
    const w = Math.sin(Math.PI * u) ** 0.6 * largo * 0.085 * (0.8 + r() * 0.4);
    izq.push([px, py - w]); der.push([px, py + w]);
  }
  const dientes = der.reverse().map(([px, py], i) => [px, py + (i % 2 ? 1.6 : -1.2)]);
  return `<path d="${suavizar(izq)} L${dientes[0][0].toFixed(1)} ${dientes[0][1].toFixed(1)} ${suavizar(dientes).replace(/^M[^C]*/, '')} Z" fill="${color}"/>`;
}

/** Palma de moriche: estípite que se afina y una corona de frondas vencidas. */
function palma(x, y, alto, color, seed, inclinacion = 0) {
  const r = rng(seed);
  const tx = x + inclinacion, ty = y - alto;
  const wBase = alto * 0.026, wTop = alto * 0.014;
  let out = `<path d="M${(x - wBase).toFixed(1)} ${y} q${(inclinacion * 0.4).toFixed(1)} ${(-alto * 0.55).toFixed(1)} ${(inclinacion - wTop + wBase).toFixed(1)} ${-alto} l${(wTop * 2).toFixed(1)} 0 q${(-inclinacion * 0.62).toFixed(1)} ${(alto * 0.45).toFixed(1)} ${(-inclinacion + wBase - wTop).toFixed(1)} ${alto} Z" fill="${color}"/>`;
  // anillos del estípite
  for (let k = 1; k < 6; k++) {
    const t = k / 6;
    const px = x + inclinacion * (1 - (1 - t) ** 2), py = y - alto * t;
    out += `<path d="M${(px - wBase * (1 - t * 0.4)).toFixed(1)} ${py.toFixed(1)} h${(wBase * 2 * (1 - t * 0.4)).toFixed(1)}" stroke="${mixRGB(color, '#FFFFFF', 0.18)}" stroke-width="${(alto * 0.008).toFixed(1)}" opacity="0.45"/>`;
  }
  const n = 9;
  for (let i = 0; i < n; i++) {
    const ang = -Math.PI * 0.98 + (Math.PI * 0.96 * i) / (n - 1) + (r() - 0.5) * 0.12;
    out += fronda(tx, ty, alto * (0.56 + r() * 0.22), ang, i % 4 === 1 ? mixRGB(color, '#FFFFFF', 0.1) : color, seed * 13 + i);
  }
  // cogollo
  out += `<ellipse cx="${tx.toFixed(1)}" cy="${(ty + alto * 0.01).toFixed(1)}" rx="${(alto * 0.03).toFixed(1)}" ry="${(alto * 0.025).toFixed(1)}" fill="${color}"/>`;
  return out;
}

/** Hoja de selva de primer plano, con los cortes característicos. */
function hojaGrande(x, y, largo, ancho, rot, color, seed) {
  const r = rng(seed);
  const izq = [], der = [];
  for (let k = 0; k <= 9; k++) {
    const u = k / 9;
    const w = Math.sin(Math.PI * u) ** 0.7 * ancho * (0.85 + r() * 0.3);
    izq.push([-w, -largo * u]); der.push([w, -largo * u]);
  }
  const contorno = `${suavizar(izq.slice().reverse())} L0 0 ${suavizar(der).replace(/^M[^C]*/, 'L0 0 ')} Z`;
  let cortes = '';
  for (let i = 1; i <= 5; i++) {
    const t = i / 6, yy = -largo * t;
    const w = Math.sin(Math.PI * t) ** 0.7 * ancho;
    cortes += `<path d="M${(-w * 1.05).toFixed(1)} ${yy.toFixed(1)} L${(-w * 0.18).toFixed(1)} ${(yy - largo * 0.045).toFixed(1)} L${(-w * 1.05).toFixed(1)} ${(yy - largo * 0.075).toFixed(1)} Z" fill="${T.frente}" opacity="0"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="${contorno}" fill="${color}"/>
    <path d="M0 0 L0 ${-largo}" stroke="${mixRGB(color, '#FFFFFF', 0.22)}" stroke-width="1.8" opacity="0.55"/>
    ${Array.from({ length: 6 }, (_, i) => {
      const t = (i + 1) / 7, yy = -largo * t;
      const w = Math.sin(Math.PI * t) ** 0.7 * ancho;
      return `<path d="M0 ${yy.toFixed(1)} L${(w * 0.9).toFixed(1)} ${(yy - largo * 0.07).toFixed(1)}" stroke="${mixRGB(color, '#FFFFFF', 0.18)}" stroke-width="1.1" opacity="0.4"/>
              <path d="M0 ${yy.toFixed(1)} L${(-w * 0.9).toFixed(1)} ${(yy - largo * 0.07).toFixed(1)}" stroke="${mixRGB(color, '#FFFFFF', 0.18)}" stroke-width="1.1" opacity="0.4"/>`;
    }).join('')}${cortes}</g>`;
}


/**
 * Línea de arbolado: perfil ondulado con picos de copas de distinta altura.
 * Vista de lejos, la selva es un canto dentado y blando — no una hilera de
 * burbujas, que es en lo que caen los arcos encadenados.
 */
function lineaArboles(seed, yBase, onda, pico, x0 = -40, x1 = 1040, paso = 22) {
  const r = rng(seed);
  const pts = [];
  for (let x = x0; x <= x1; x += paso * (0.7 + r() * 0.8)) {
    const base = yBase + Math.sin(x / 230 + seed) * onda + Math.sin(x / 88 + seed * 1.7) * onda * 0.45;
    const bulto = -(pico * (0.15 + r() * 0.85));   // grupos de copas, anchos y bajos
    pts.push([x, base + bulto]);
  }
  pts.push([x1, yBase]);
  return `${suavizar(pts, 0.62)} L${x1} ${(yBase + 320).toFixed(1)} L${x0} ${(yBase + 320).toFixed(1)} Z`;
}

/** Silueta de palma recortada contra el cielo, sobre la línea del dosel. */
function palmaSilueta(x, y, alto, color, seed) {
  return palma(x, y, alto, color, seed, (rng(seed)() - 0.5) * 18);
}

export function pintar(uid) {
  const r = rng(101);
  let s = '';

  /* ---------- 1 · Cielo ---------- */
  s += `<defs>${lin(`${uid}-cielo`, [
    [0, T.cieloAlto], [0.2, mixRGB(T.cieloAlto, T.cieloMedio, 0.55)],
    [0.4, T.cieloMedio], [0.56, mixRGB(T.cieloMedio, T.cieloBajo, 0.6)],
    [0.72, T.cieloBajo], [0.86, T.horizonte], [1, mixRGB(T.horizonte, T.sol, 0.6)],
  ])}</defs><rect width="${W}" height="${H}" fill="url(#${uid}-cielo)"/>`;

  // Sol bajo: un disco pálido, grande y sin brillos. Es el ancla gráfica.
  s += `<defs>${rad(`${uid}-halo`, [[0, T.sol, 0.5], [0.42, T.sol, 0.22], [1, T.sol, 0]])}</defs>
    <circle cx="742" cy="424" r="280" fill="url(#${uid}-halo)"/>
    <circle cx="742" cy="424" r="88" fill="${T.sol}" opacity="0.92"/>`;

  s += cirros(uid, 21, 96, 300, 9, T.horizonte, 0.3);
  s += cirros(uid, 22, 210, 360, 5, T.sol, 0.26);

  /* ---------- 2 · Tepuyes lejanos ---------- */
  const lejos1 = [[-40, 486], [110, 470], [230, 462], [268, 500], [400, 492], [520, 486], [640, 494], [800, 480], [940, 486], [1040, 478]];
  s += `<path d="${suavizar(lejos1)} L1040 700 L-40 700 Z" fill="${T.lejano}" opacity="0.34"/>`;
  const lejos2 = [[560, 452], [640, 436], [706, 430], [742, 462], [860, 452], [960, 444], [1040, 448]];
  s += `<path d="${suavizar(lejos2)} L1040 700 L560 700 Z" fill="${T.lejano}" opacity="0.44"/>`;
  // Siluetas de tepuyes menores a la derecha, para que el horizonte no quede vacío.
  const lejos3 = [[740, 520], [790, 508], [846, 506], [858, 528], [920, 520], [986, 514], [1040, 518]];
  s += `<path d="${suavizar(lejos3)} L1040 700 L740 700 Z" fill="${mixRGB(T.lejano, T.roca, 0.35)}" opacity="0.4"/>`;
  s += velo(uid + 'v', T.horizonte, 470, 130, 0.34);

  /* ---------- 3 · El Auyán-tepui ---------- */
  // Cima en diagonal, con la muesca por donde se descuelga el salto, y un
  // canto a la derecha que gira hacia el fondo.
  // Mesa casi horizontal con una leve caída hacia la derecha, muescas secas y
  // un canto que baja a plomo. Un tepuy no tiene lomo: tiene borde.
  const cima = [
    [-60, 322], [90, 316], [176, 312], [230, 300], [286, 302], [318, 288],
    [352, 292], [398, 276], [446, 284], [512, 292], [578, 300], [634, 306], [688, 312], [716, 318],
  ];
  const macizo = `${suavizar(cima)} L724 470 L736 596 L742 690 L-60 700 Z`;
  s += `<defs>${lin(`${uid}-roca`, [[0, mixRGB(T.roca, T.rocaLuz, 0.36)], [0.24, T.roca], [0.78, shift(T.roca, 0, 2, -5)], [1, shift(T.roca, 0, 4, -10)]])}
    <clipPath id="${uid}-cl"><path d="${macizo}"/></clipPath></defs>
    <path d="${macizo}" fill="url(#${uid}-roca)"/>
    <g clip-path="url(#${uid}-cl)">`;

  // Cara encendida por el sol naciente, del lado del disco.
  s += `${lin(`${uid}-luz`, [[0, T.rocaCalida, 0], [0.55, T.rocaCalida, 0.1], [1, T.rocaCalida, 0.5]], 0, 0, 1, 0)}
    <rect x="-60" y="250" width="810" height="470" fill="url(#${uid}-luz)"/>`;

  // Estratos: bandas largas y rectas, como la arenisca del Auyán.
  const n = ruidoFractal(7, 3, 1.5);
  s += trama(Array.from({ length: 11 }, (_, i) => {
    const y = 344 + i * 34 + n(i * 0.8) * 10;
    return `M-60 ${y.toFixed(1)} q380 ${(6 + n(i) * 10).toFixed(1)} 810 ${((n(i + 3) - 0.5) * 12).toFixed(1)}`;
  }), shift(T.roca, 0, 0, -14), 1.5, 0.22);

  // Grietas verticales largas, del borde de la mesa hacia abajo.
  for (let i = 0; i < 22; i++) {
    const x = -40 + r() * 760;
    const y1 = 296 + r() * 60;
    const largo = 180 + r() * 360;
    const w = 2 + r() * 7;
    s += `<path d="M${x.toFixed(1)} ${y1.toFixed(1)} q${((r() - 0.5) * 10).toFixed(1)} ${(largo * 0.5).toFixed(1)} ${((r() - 0.5) * 16).toFixed(1)} ${largo.toFixed(1)} l${w.toFixed(1)} 0 q${((r() - 0.5) * 10).toFixed(1)} ${(-largo * 0.5).toFixed(1)} ${((r() - 0.5) * 10).toFixed(1)} ${(-largo).toFixed(1)} Z" fill="${shift(T.roca, 0, 0, -18)}" opacity="${(0.13 + r() * 0.2).toFixed(2)}"/>`;
  }
  // Repisas con su filo de luz.
  for (let i = 0; i < 8; i++) {
    const x = -20 + r() * 680, y = 360 + r() * 290, w = 100 + r() * 200;
    s += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q${(w * 0.5).toFixed(0)} ${(-5 - r() * 8).toFixed(1)} ${w.toFixed(0)} 2" stroke="${mixRGB(T.rocaLuz, T.rocaCalida, 0.5)}" stroke-width="2.4" fill="none" opacity="${(0.15 + r() * 0.14).toFixed(2)}"/>`;
  }
  s += moteado(31, 420, -60, 280, 800, 420, [shift(T.roca, 0, 0, -12), T.rocaLuz], 0.04, 0.12, 1.6, 5.5);
  s += `</g>`;
  s += `<path d="${suavizar(cima)}" fill="none" stroke="${mixRGB(T.rocaCalida, T.sol, 0.45)}" stroke-width="2.4" opacity="0.5"/>`;

  // Fleco de vegetación del borde: denso, bajo, sin árboles sueltos.
  let fleco = '';
  for (let x = -60; x < 724; x += 2.6 + r() * 5) {
    const cyC = cima.reduce((best, q) => (Math.abs(q[0] - x) < Math.abs(best[0] - x) ? q : best))[1];
    const h = 3.5 + r() * 9;
    fleco += `<path d="M${x.toFixed(1)} ${(cyC + 5).toFixed(1)} q${(-1.4 - r() * 2).toFixed(1)} ${(-h * 0.85).toFixed(1)} ${(0.8 + r() * 2).toFixed(1)} ${(-h).toFixed(1)} q${(2 + r() * 2.6).toFixed(1)} ${(h * 0.22).toFixed(1)} ${(1.4 + r() * 2).toFixed(1)} ${h.toFixed(1)} Z" fill="${r() > 0.55 ? T.selvaLejos : T.selvaMedia}" opacity="${(0.72 + r() * 0.28).toFixed(2)}"/>`;
  }
  s += fleco;

  /* ---------- 4 · El salto ---------- */
  const cinta = (x, yTop, yFin, wTop, wFin, op) => {
    const izq = [], der = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const w = wTop + (wFin - wTop) * t ** 1.6;
      const deriva = Math.sin(t * 2.2) * 6 + t * 8;
      izq.push([x - w / 2 + deriva, yTop + (yFin - yTop) * t]);
      der.push([x + w / 2 + deriva, yTop + (yFin - yTop) * t]);
    }
    const dd = `${suavizar(izq)} L${der[12][0].toFixed(1)} ${der[12][1].toFixed(1)} ${suavizar(der.reverse()).replace(/^M[^C]*/, '')} Z`;
    return `<path d="${dd}" fill="url(#${uid}-cinta)" opacity="${op}"/>`;
  };
  s += `<defs>${lin(`${uid}-cinta`, [[0, T.agua, 0.98], [0.34, T.agua, 0.92], [0.68, T.agua, 0.6], [0.9, T.agua, 0.2], [1, T.agua, 0]])}</defs>`;
  s += cinta(432, 244, 662, 14, 62, 1);
  s += cinta(430, 250, 600, 5, 20, 0.55);
  s += cinta(214, 292, 470, 4, 11, 0.6);
  s += cinta(596, 268, 430, 3, 9, 0.5);

  // Neblina del fondo del salto: discos suaves, cálidos, no un manchón gris.
  s += `<defs>${rad(`${uid}-nb`, [[0, '#FFFFFF', 0.85], [0.4, T.agua, 0.4], [0.75, T.agua, 0.12], [1, T.agua, 0]])}</defs>`;
  for (const [cx, cy, rx, ry, op] of [[438, 646, 150, 78, 0.9], [400, 672, 210, 62, 0.7], [486, 664, 170, 54, 0.6], [438, 700, 300, 50, 0.5]]) {
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${uid}-nb)" opacity="${op}"/>`;
  }

  /* ---------- 5 · Selva en capas ---------- */
  s += `<path d="${lineaArboles(51, 682, 7, 16)}" fill="${mixRGB(T.selvaLejos, T.horizonte, 0.42)}" opacity="0.94"/>`;
  s += `<ellipse cx="430" cy="686" rx="330" ry="52" fill="url(#${uid}-nb)" opacity="0.48"/>`;

  s += `<path d="${lineaArboles(53, 730, 9, 22)}" fill="${T.selvaLejos}"/>`;
  s += palma(246, 744, 132, T.selvaLejos, 5, -12);
  s += palma(822, 740, 116, T.selvaLejos, 7, 10);

  const cantoMedio = lineaArboles(57, 782, 11, 26);
  s += `<path d="${cantoMedio}" fill="${T.selvaMedia}"/>`;
  s += `<defs>${lin(`${uid}-rim`, [[0, T.sol, 0], [0.5, T.sol, 0.1], [1, T.sol, 0.34]], 0, 0, 1, 0)}
    <clipPath id="${uid}-clm"><path d="${cantoMedio}"/></clipPath></defs>
    <g clip-path="url(#${uid}-clm)"><rect x="-40" y="740" width="1080" height="46" fill="url(#${uid}-rim)"/></g>`;
  s += palma(112, 800, 182, T.selvaMedia, 8, -16);
  s += palma(908, 794, 158, T.selvaMedia, 10, 14);
  s += moteado(59, 320, -20, 770, 1040, 96, [shift(T.selvaMedia, 0, 0, -7), T.selvaLejos], 0.16, 0.42, 2.6, 9);

  /* ---------- 6 · Espejo de agua ---------- */
  s += `<path d="${rellenar(borde(61, 828, 8), 931)}" fill="${mixRGB(T.agua, T.selvaMedia, 0.4)}" opacity="0.95"/>`;
  s += `<defs>${rad(`${uid}-refl`, [[0, T.sol, 0.68], [0.5, T.sol, 0.26], [1, T.sol, 0]])}</defs>
    <ellipse cx="436" cy="848" rx="200" ry="28" fill="url(#${uid}-refl)"/>`;
  for (let i = 0; i < 12; i++) {
    const yy = 834 + r() * 38, x = r() * 900 - 20, w = 40 + r() * 190;
    s += `<path d="M${x.toFixed(0)} ${yy.toFixed(1)} q${(w * 0.5).toFixed(0)} ${(r() > 0.5 ? 1.8 : -1.8).toFixed(1)} ${w.toFixed(0)} 0" stroke="${T.agua}" stroke-width="${(0.9 + r() * 1.5).toFixed(1)}" fill="none" opacity="${(0.16 + r() * 0.28).toFixed(2)}" stroke-linecap="round"/>`;
  }

  /* ---------- 7 · Primer plano ---------- */
  s += `<path d="${lineaArboles(67, 878, 8, 20)}" fill="${T.selvaCerca}"/>`;
  s += palma(64, 892, 186, T.frente, 3, -20);
  s += palma(962, 886, 162, T.frente, 12, 18);
  s += `<path d="${lineaArboles(71, 918, 12, 26)}" fill="${T.frente}"/>`;
  const hojaTono = shift(T.frente, 0, 2, 8);
  s += hojaGrande(0, 1008, 272, 110, 12, T.frente, 21);
  s += hojaGrande(122, 1034, 218, 92, -8, hojaTono, 23);
  s += hojaGrande(1012, 1014, 256, 104, -14, T.frente, 25);
  s += hojaGrande(872, 1040, 200, 86, 9, hojaTono, 27);

  /* ---------- 8 · Aire, aves y grano ---------- */
  s += aves([[172, 226, 9], [232, 196, 7], [286, 252, 5.5], [866, 300, 6]], '#3E4038', 0.3);
  s += granoGradiente(201, 3000, 0, 0, W, H, '#2E2418', 0.08);
  s += grano(202, 1100, 0, 0, W, 560, '#FFF6E4', 0.055, 0.8);

  return s;
}

export const escena = { W, H, meta, pintar };
export default escena;
