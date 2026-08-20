// Piezas del paisaje: roca, agua, vegetación. Todas reciben la paleta de la
// escena, para que una misma pieza sirva al amanecer y al atardecer.
import { rng, shift, mixRGB } from './color.js';
import { suavizar, perfil, rellenar, ruidoFractal } from './geometria.js';
import { lin, rad, niebla } from './atmosfera.js';
import { moteado, trama } from './textura.js';

/** Cordillera de fondo, ya velada por el aire. */
export function cordillera({ uid, seed, base, amplitud, color, colorLuz, fondo, dientes = 0.35, sesgo = 0, opacidad = 1 }) {
  const pts = perfil({ seed, base, amplitud, dientes, sesgo, muestras: 22 });
  const d = rellenar(pts, fondo);
  // Ladera iluminada: el mismo perfil, desplazado y recortado contra el original.
  const luz = pts.map(([x, y]) => [x + amplitud * 0.16, y + amplitud * 0.1]);
  return `<g opacity="${opacidad}">
    <path d="${d}" fill="${color}"/>
    <clipPath id="${uid}-cl${seed}"><path d="${d}"/></clipPath>
    <g clip-path="url(#${uid}-cl${seed})">
      <path d="${rellenar(luz, fondo)}" fill="${colorLuz}" opacity="0.5"/>
    </g></g>`;
}

/**
 * Macizo de tepuy. No es un bloque: la mole entra por un lado del encuadre,
 * la cima cae en diagonal con muescas, y el canto derecho gira en escorzo
 * hacia el fondo. La base nunca se corta en recto — la esconden la neblina y
 * la selva que se dibujan encima.
 */
export function tepuy({ uid, seed, p, cima, ladoLuz = 'derecha' }) {
  const r = rng(seed);
  const n = ruidoFractal(seed + 3, 4, 1.7);

  // cima: lista de [x, y] que ya viene con su inclinación y sus muescas
  const cuerpo = `${suavizar(cima.top)} ${cima.lados} Z`;
  const claro = shift(p.roca, 0, 0, 13), oscuro = shift(p.roca, 0, 0, -17);
  const xIni = cima.top[0][0], xFin = cima.top[cima.top.length - 1][0];
  const yCima = Math.min(...cima.top.map((q) => q[1]));

  let out = `<defs>
    ${lin(`${uid}-pared`, [[0, shift(p.roca, 0, -3, 16)], [0.14, shift(p.roca, 0, -1, 5)], [0.55, p.roca], [0.84, shift(p.roca, 0, 1, -10)], [1, shift(p.roca, 0, 3, -22)]])}
    <clipPath id="${uid}-tep"><path d="${cuerpo}"/></clipPath>
  </defs>
  <path d="${cuerpo}" fill="url(#${uid}-pared)"/>
  <g clip-path="url(#${uid}-tep)">`;

  // Cara al sol: lavado cálido en el tercio que mira a la luz.
  const dir = ladoLuz === 'derecha';
  out += `${lin(`${uid}-caraluz`, [[0, p.rocaLuz, dir ? 0 : 0.6], [0.5, p.rocaLuz, dir ? 0.12 : 0.12], [1, p.rocaLuz, dir ? 0.6 : 0]], 0, 0, 1, 0)}
    <rect x="${xIni - 40}" y="${yCima - 60}" width="${xFin - xIni + 120}" height="${cima.fondo - yCima + 120}" fill="url(#${uid}-caraluz)"/>`;

  // Estratos de arenisca: bandas largas, apenas insinuadas, algo combadas.
  const estratos = [];
  for (let i = 0; i < 20; i++) {
    const y = yCima + 30 + i * ((cima.fondo - yCima) / 20) + n(i * 0.6) * 12;
    estratos.push(`M${xIni - 40} ${y.toFixed(1)} q${((xFin - xIni) * 0.5).toFixed(0)} ${(8 + n(i) * 12).toFixed(1)} ${(xFin - xIni + 90).toFixed(0)} ${((n(i + 4) - 0.5) * 14).toFixed(1)}`);
  }
  out += trama(estratos, oscuro, 1.2, 0.13);

  // Grietas verticales: anchos y profundidades distintas, con un filo claro al lado.
  for (let i = 0; i < 34; i++) {
    const x = xIni + r() * (xFin - xIni);
    const y1 = yCima + 6 + r() * 70;
    const largo = (cima.fondo - y1) * (0.35 + r() * 0.65);
    const w = 1.4 + r() * 5;
    const op = 0.08 + r() * 0.2;
    const dv = (r() - 0.5) * 14;
    out += `<path d="M${x.toFixed(1)} ${y1.toFixed(1)} q${(dv * 0.4).toFixed(1)} ${(largo * 0.5).toFixed(1)} ${dv.toFixed(1)} ${largo.toFixed(1)} l${w.toFixed(1)} 0 q${(-dv * 0.55).toFixed(1)} ${(-largo * 0.5).toFixed(1)} ${(-dv * 0.75).toFixed(1)} ${(-largo).toFixed(1)} Z" fill="${oscuro}" opacity="${op.toFixed(2)}"/>`;
    if (r() > 0.55) out += `<path d="M${(x + w + 1).toFixed(1)} ${y1.toFixed(1)} q${(dv * 0.4).toFixed(1)} ${(largo * 0.5).toFixed(1)} ${dv.toFixed(1)} ${largo.toFixed(1)}" stroke="${claro}" stroke-width="1" fill="none" opacity="${(op * 0.6).toFixed(2)}"/>`;
  }

  // Repisas: un filo de luz arriba y su sombra debajo.
  for (let i = 0; i < 14; i++) {
    const x = xIni + r() * (xFin - xIni) * 0.94;
    const y = yCima + 50 + r() * (cima.fondo - yCima - 90);
    const w = 40 + r() * 130;
    out += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${(w * 0.5).toFixed(1)} ${(-4 - r() * 6).toFixed(1)} ${w.toFixed(1)} 1" stroke="${claro}" stroke-width="1.8" fill="none" opacity="${(0.14 + r() * 0.16).toFixed(2)}"/>
      <path d="M${x.toFixed(1)} ${(y + 3.4).toFixed(1)} q${(w * 0.5).toFixed(1)} ${(-4 - r() * 6).toFixed(1)} ${w.toFixed(1)} 1" stroke="${oscuro}" stroke-width="3" fill="none" opacity="${(0.1 + r() * 0.12).toFixed(2)}"/>`;
  }

  // Manchas de humedad y liquen.
  out += moteado(seed + 11, 340, xIni, yCima, xFin - xIni, cima.fondo - yCima, [oscuro, claro], 0.04, 0.14, 1.4, 5);
  out += `</g>`;

  // Filo de la cima, encendido por el sol naciente.
  out += `<path d="${suavizar(cima.top)}" fill="none" stroke="${p.rocaBorde}" stroke-width="2.2" opacity="0.55"/>`;
  return out;
}

/** Vegetación agarrada al borde de la roca. */
export function matorral(seed, x0, x1, y, alto, cols) {
  const r = rng(seed);
  let out = '';
  for (let x = x0; x < x1; x += 5 + r() * 9) {
    const h = alto * (0.4 + r() * 0.9);
    const w = 5 + r() * 9;
    const c = cols[Math.floor(r() * cols.length)];
    out += `<path d="M${x.toFixed(1)} ${(y + 3).toFixed(1)} q${(-w * 0.2).toFixed(1)} ${(-h * 0.8).toFixed(1)} ${(w * 0.5).toFixed(1)} ${(-h).toFixed(1)} q${(w * 0.7).toFixed(1)} ${(h * 0.2).toFixed(1)} ${(w * 0.5).toFixed(1)} ${h.toFixed(1)} Z" fill="${c}" opacity="${(0.6 + r() * 0.4).toFixed(2)}"/>`;
  }
  return out;
}

/**
 * El salto: una cinta que nace en la muesca, se abre al caer y se deshace
 * en neblina antes de tocar el fondo. Es lo que hace único al Salto Ángel.
 */
export function salto({ uid, x, yTop, yFin, anchoTop, anchoFin, color = '#FFFFFF' }) {
  const largo = yFin - yTop;
  const izq = [], der = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const w = anchoTop + (anchoFin - anchoTop) * t ** 1.5;
    const deriva = Math.sin(t * 2.6) * 7 + t * 10;
    izq.push([x - w / 2 + deriva, yTop + largo * t]);
    der.push([x + w / 2 + deriva, yTop + largo * t]);
  }
  const cinta = `${suavizar(izq)} L${der[n][0].toFixed(1)} ${der[n][1].toFixed(1)} ${suavizar(der.slice().reverse()).replace(/^M[^C]*/, '')} Z`;
  return `<defs>${lin(`${uid}-salto`, [[0, color, 0.96], [0.3, color, 0.9], [0.66, color, 0.62], [0.88, color, 0.24], [1, color, 0]])}</defs>
    <path d="${cinta}" fill="url(#${uid}-salto)"/>
    <path d="${suavizar(izq.map(([px, py], i) => [px + (anchoTop + (anchoFin - anchoTop) * (i / n) ** 1.5) * 0.34, py]))}"
      stroke="${color}" stroke-width="2.6" fill="none" opacity="0.75" stroke-linecap="round"/>
    <path d="${suavizar(izq.map(([px, py], i) => [px + (anchoTop + (anchoFin - anchoTop) * (i / n) ** 1.5) * 0.68, py]))}"
      stroke="${color}" stroke-width="1.3" fill="none" opacity="0.42" stroke-linecap="round"/>`;
}

/** Copa de árbol: mancha irregular y aplastada, con el lomo iluminado. */
export function copa(seed, cx, cy, rx, ry, colSombra, colLuz, opLuz = 0.5) {
  const r = rng(seed);
  const n = 11;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = (Math.PI * 2 * i) / n;
    const k = 0.5 + r() * 0.95;                 // irregularidad fuerte
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  pts.push(pts[0], pts[1]);
  const d = suavizar(pts) + ' Z';
  // El lomo: la mitad superior del mismo contorno, subida y encogida.
  const lomo = pts.filter(([, y]) => y <= cy).map(([x, y]) => [cx + (x - cx) * 0.82, cy + (y - cy) * 0.9 - ry * 0.14]);
  return `<path d="${d}" fill="${colSombra}"/>` +
    (lomo.length > 2 ? `<path d="${suavizar(lomo)} Z" fill="${colLuz}" opacity="${opLuz}"/>` : '');
}

/** Dosel de selva: capas de copas encimadas hasta que se lee como masa. */
export function dosel({ seed, y, fondo, alto, colSombra, colLuz, paso = 26, x0 = -40, x1 = 1040, opLuz = 0.45 }) {
  const r = rng(seed);
  const pts = perfil({ seed: seed + 5, base: y, amplitud: alto * 0.55, muestras: 20, x0, x1 });
  let out = `<path d="${rellenar(pts, fondo, x0, x1)}" fill="${colSombra}"/>`;
  for (let capa = 0; capa < 2; capa++) {
    for (let x = x0; x < x1; x += paso * (0.42 + r() * 0.7)) {
      const rx = alto * (0.3 + r() * 0.55);
      const ry = rx * (0.4 + r() * 0.28);        // copas anchas y bajas
      const cy = y + (r() - 0.5) * alto * 0.7 + capa * alto * 0.24;
      out += copa(Math.round(x * 7 + seed + capa * 91), x, cy, rx, ry, colSombra, colLuz, opLuz * (capa ? 0.6 : 1));
    }
  }
  return out;
}

/**
 * Palma de moriche. Cada hoja es una forma rellena que se arquea y cae, con
 * foliolos al borde: dibujada con rayas radiales parecería una araña.
 */
export function palma({ x, y, alto, inclinacion = 0, color, colorLuz, hojas = 8, seed = 1 }) {
  const r = rng(seed);
  const tx = x + inclinacion, ty = y - alto;
  const grosor = Math.max(2.2, alto * 0.042);
  let out = `<path d="M${(x - grosor / 2).toFixed(1)} ${y} q${(inclinacion * 0.35).toFixed(1)} ${(-alto * 0.55).toFixed(1)} ${inclinacion} ${-alto} l${grosor.toFixed(1)} 0 q${(-inclinacion * 0.62).toFixed(1)} ${(alto * 0.45).toFixed(1)} ${(-inclinacion + grosor * 0.2).toFixed(1)} ${alto} Z" fill="${color}"/>`;

  for (let i = 0; i < hojas; i++) {
    const t = i / (hojas - 1);
    const ang = -Math.PI * 0.92 + Math.PI * 0.84 * t + (r() - 0.5) * 0.14;
    const L = alto * (0.46 + r() * 0.24);
    const caida = L * (0.42 + r() * 0.3);                 // cuánto se vence la hoja
    const ex = tx + Math.cos(ang) * L;
    const ey = ty + Math.sin(ang) * L * 0.5 + caida;
    const cx = tx + Math.cos(ang) * L * 0.55;
    const cy = ty + Math.sin(ang) * L * 0.62 - L * 0.06;
    const c = i % 3 === 1 ? colorLuz : color;

    // contorno relleno: ancho máximo hacia la mitad del raquis
    const pasos = 9, izq = [], der = [];
    for (let k = 0; k <= pasos; k++) {
      const u = k / pasos;
      const px = (1 - u) ** 2 * tx + 2 * (1 - u) * u * cx + u ** 2 * ex;
      const py = (1 - u) ** 2 * ty + 2 * (1 - u) * u * cy + u ** 2 * ey;
      const w = Math.sin(Math.PI * u) ** 0.7 * alto * 0.055 * (0.7 + r() * 0.5);
      izq.push([px, py - w]);
      der.push([px, py + w]);
    }
    out += `<path d="${suavizar(izq)} ${suavizar(der.reverse()).replace(/^M[^C]*/, 'L' + der[0][0].toFixed(1) + ' ' + der[0][1].toFixed(1) + ' ')} Z" fill="${c}"/>`;
    // foliolos en el borde inferior
    for (let k = 2; k < pasos; k++) {
      const [fx, fy] = der[pasos - k];
      const fl = alto * 0.035 * (0.6 + r() * 0.8);
      out += `<path d="M${fx.toFixed(1)} ${fy.toFixed(1)} l${(Math.cos(ang) * fl * 0.5).toFixed(1)} ${fl.toFixed(1)}" stroke="${c}" stroke-width="${(alto * 0.012).toFixed(1)}" stroke-linecap="round"/>`;
    }
  }
  return out;
}

/** Hoja grande de primer plano: enmarca la escena y da profundidad. */
export function hoja({ x, y, largo, ancho, rot = 0, color, colorLuz, nervio, cortes = 6 }) {
  const d = `M0 0 C${ancho * 0.55} ${-largo * 0.2} ${ancho * 0.62} ${-largo * 0.65} 0 ${-largo}
             C${-ancho * 0.62} ${-largo * 0.65} ${-ancho * 0.55} ${-largo * 0.2} 0 0 Z`;
  let venas = '';
  for (let i = 1; i <= cortes; i++) {
    const t = i / (cortes + 1);
    const yy = -largo * t;
    const xx = ancho * 0.58 * Math.sin(Math.PI * t) ** 0.85;
    venas += `<path d="M0 ${yy.toFixed(1)} L${xx.toFixed(1)} ${(yy - largo * 0.08).toFixed(1)}" stroke="${colorLuz}" stroke-width="1.1" opacity="0.35"/>
              <path d="M0 ${yy.toFixed(1)} L${(-xx).toFixed(1)} ${(yy - largo * 0.08).toFixed(1)}" stroke="${colorLuz}" stroke-width="1.1" opacity="0.28"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="${d}" fill="${color}"/>
    <path d="M0 0 L0 ${-largo}" stroke="${nervio}" stroke-width="2" opacity="0.5"/>
    ${venas}</g>`;
}

/** Agua quieta con reflejo y unas pocas ondas. */
export function agua({ uid, seed, y, fondo, colores, reflejo, xReflejo }) {
  const r = rng(seed);
  let out = `<defs>${lin(`${uid}-agua`, [[0, colores[0]], [0.45, colores[1]], [1, colores[2]]])}</defs>
    <rect x="-20" y="${y}" width="1040" height="${fondo - y + 20}" fill="url(#${uid}-agua)"/>`;
  if (reflejo) {
    out += `${lin(`${uid}-refl`, [[0, reflejo, 0.5], [1, reflejo, 0]])}
      <rect x="${xReflejo - 70}" y="${y}" width="140" height="${(fondo - y) * 0.8}" fill="url(#${uid}-refl)"/>`;
  }
  for (let i = 0; i < 16; i++) {
    const yy = y + 6 + r() * (fondo - y - 6);
    const w = 30 + r() * 190;
    const x = r() * 1000 - 40;
    out += `<path d="M${x.toFixed(0)} ${yy.toFixed(1)} q${(w * 0.5).toFixed(0)} ${(r() > 0.5 ? 1.6 : -1.6).toFixed(1)} ${w.toFixed(0)} 0"
      stroke="${mixRGB(colores[2], '#ffffff', 0.45)}" stroke-width="${(0.7 + r() * 1.2).toFixed(1)}" fill="none" opacity="${(0.12 + r() * 0.25).toFixed(2)}" stroke-linecap="round"/>`;
  }
  return out;
}
