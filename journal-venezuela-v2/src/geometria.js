// Ruido y suavizado de trazos. De aquí sale que las montañas no parezcan
// triángulos: los perfiles se generan con ruido y se cierran con curvas.
import { rng } from './color.js';

/** Ruido de valor en una dimensión, interpolado con una curva suave. */
export function ruido1D(seed, escala = 1) {
  const r = rng(seed);
  const tabla = Array.from({ length: 256 }, () => r());
  const suave = (t) => t * t * (3 - 2 * t);
  return (x) => {
    const p = x * escala;
    const i = Math.floor(p), f = p - i;
    const a = tabla[((i % 256) + 256) % 256];
    const b = tabla[(((i + 1) % 256) + 256) % 256];
    return a + (b - a) * suave(f);
  };
}

/** Suma de octavas: detalle grande y detalle pequeño a la vez. */
export function ruidoFractal(seed, octavas = 4, escala = 1) {
  const capas = Array.from({ length: octavas }, (_, i) => ruido1D(seed + i * 977, escala * 2 ** i));
  return (x) => {
    let v = 0, amp = 1, tot = 0;
    for (const capa of capas) { v += capa(x) * amp; tot += amp; amp *= 0.5; }
    return v / tot;
  };
}

/** Convierte una lista de puntos en un trazo curvo (Catmull-Rom a Bézier). */
export function suavizar(pts, tension = 0.5) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || pts[i + 1];
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/**
 * Perfil de montaña o loma: ruido fractal muestreado a lo ancho y suavizado.
 * `dientes` añade picos puntuales sin romper la curva general.
 */
export function perfil({ seed, x0 = -40, x1 = 1040, muestras = 26, base, amplitud, sesgo = 0, dientes = 0 }) {
  const n = ruidoFractal(seed, 4, 0.9);
  const pts = [];
  for (let i = 0; i <= muestras; i++) {
    const t = i / muestras;
    const x = x0 + (x1 - x0) * t;
    let y = base - amplitud * (n(t * 3.2 + seed * 0.013) - 0.5 + sesgo);
    if (dientes && i % 3 === 1) y -= amplitud * dientes * (0.3 + n(t * 9 + 5) * 0.7);
    pts.push([x, y]);
  }
  return pts;
}

/** Cierra un perfil contra el borde inferior para poder rellenarlo. */
export const rellenar = (pts, fondo, x0 = -40, x1 = 1040) =>
  `${suavizar(pts)} L${x1} ${fondo} L${x0} ${fondo} Z`;
