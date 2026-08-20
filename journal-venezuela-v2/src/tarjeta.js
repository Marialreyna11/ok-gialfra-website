// Maquetación de la tarjeta: cara ilustrada y cara para escribir.
import { GEO, C, etapaDe } from './tokens.js';
import { marca } from './contenido.js';
import { grano } from './textura.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const dosDig = (n) => String(n).padStart(2, '0');

/** Grano de papel: la misma textura del arte, muy tenue, sobre el fondo crema. */
const papel = (seed, w = 400, h = 300) =>
  `<svg class="papel" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
     ${grano(seed, 2200, 0, 0, w, h, '#6B5A44', 0.055, 0.5)}</svg>`;

const filete = (color) => `
  <div class="filete"><i style="background:${color}"></i><b style="background:${color}"></b><i style="background:${color}"></i></div>`;

/** Cara ilustrada. */
export function frente(d, escena, uid) {
  const et = etapaDe(d.dia);
  return `
  <article class="card front" style="--etapa:${et.color}">
    <div class="art">
      <svg class="scene" viewBox="0 0 ${escena.W} ${escena.H}" preserveAspectRatio="xMidYMid slice"
           xmlns="http://www.w3.org/2000/svg">${escena.pintar(uid)}</svg>
      <div class="scrim"></div>
      <div class="lugar">
        <h2>${esc(escena.meta.lugar)}</h2>
        <p>${esc(escena.meta.ubicacion)}</p>
      </div>
    </div>
    <div class="plate">
      ${papel(311)}
      <div class="plate-in">
        ${d.palabra ? `<p class="palabra">${esc(d.palabra)}</p>` : ''}
        ${filete(C.rule)}
        <blockquote class="versiculo">${esc(d.versiculo)}</blockquote>
        <p class="cita">${esc(d.referencia)} · ${esc(d.traduccion)}</p>
      </div>
      <div class="pie">
        <span class="dia">Día ${dosDig(d.dia)}</span>
        <span class="marca">${esc(marca)}</span>
      </div>
    </div>
  </article>`;
}

/** Cara para escribir. */
export function reverso(d, renglones = 7) {
  const et = etapaDe(d.dia);
  return `
  <article class="card back" style="--etapa:${et.color}">
    ${papel(733, 400, 560)}
    <div class="pad">
      <header class="cab">
        <span class="cab-dia">Día ${dosDig(d.dia)} <i>·</i> ${esc(et.nombre)}</span>
        <span class="cab-fecha">Fecha <u></u></span>
      </header>
      <p class="reflexion">${esc(d.reflexion)}</p>
      <div class="rotulo"><span>Para hoy</span><i></i></div>
      <p class="pregunta">${esc(d.pregunta)}</p>
      <div class="renglones">${'<span></span>'.repeat(renglones)}</div>
      <div class="paso">
        <span class="paso-rotulo">Mi paso de hoy</span>
        <div class="paso-linea"><i class="casilla"></i><u></u></div>
      </div>
      <footer class="pie-back">${esc(marca)}</footer>
    </div>
  </article>`;
}

/** Hoja de estilo. `modo`: 'sangrado' (imprenta) o 'corte' (revisión digital). */
export function estilos(modo = 'sangrado') {
  const bleed = modo === 'sangrado' ? GEO.bleed : 0;
  return `
@font-face { font-family:'EBG'; src:url('../fuentes/EBGaramond-Regular.ttf') format('truetype'); font-weight:400; }
@font-face { font-family:'EBG'; src:url('../fuentes/EBGaramond-Medium.ttf') format('truetype'); font-weight:500; }
@font-face { font-family:'EBG'; src:url('../fuentes/EBGaramond-SemiBold.ttf') format('truetype'); font-weight:600; }
@font-face { font-family:'EBG'; src:url('../fuentes/EBGaramond-Italic.ttf') format('truetype'); font-weight:400; font-style:italic; }
@font-face { font-family:'EBG'; src:url('../fuentes/EBGaramond-MediumItalic.ttf') format('truetype'); font-weight:500; font-style:italic; }
@font-face { font-family:'Karla'; src:url('../fuentes/Karla-Regular.ttf') format('truetype'); font-weight:400; }
@font-face { font-family:'Karla'; src:url('../fuentes/Karla-Medium.ttf') format('truetype'); font-weight:500; }
@font-face { font-family:'Karla'; src:url('../fuentes/Karla-Bold.ttf') format('truetype'); font-weight:700; }

:root{
  --trimW:${GEO.trimW}in; --trimH:${GEO.trimH}in;
  --bleed:${bleed}in; --safe:${GEO.safe}in;
  --paper:${C.paper}; --paperWarm:${C.paperWarm};
  --ink:${C.ink}; --inkSoft:${C.inkSoft}; --inkFaint:${C.inkFaint};
  --rule:${C.rule}; --terracota:${C.terracota};
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:'Karla',sans-serif}

.card{
  position:relative;overflow:hidden;background:var(--paper);
  width:calc(var(--trimW) + 2*var(--bleed));
  height:calc(var(--trimH) + 2*var(--bleed));
  display:flex;flex-direction:column;
}
.papel{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.7}

/* ---- Cara ilustrada ---- */
.art{position:relative;height:calc(${GEO.artRatio} * var(--trimH) + var(--bleed));overflow:hidden}
.art .scene{position:absolute;inset:0;width:100%;height:100%;display:block}
.scrim{position:absolute;left:0;right:0;bottom:0;height:1.5in;
  background:linear-gradient(to bottom,rgba(18,20,18,0) 0%,rgba(18,20,18,.14) 42%,rgba(18,20,18,.44) 78%,rgba(18,20,18,.58) 100%)}
.lugar{position:absolute;left:calc(var(--safe) + var(--bleed));right:calc(var(--safe) + var(--bleed));bottom:calc(.2in + var(--bleed))}
.lugar h2{font-family:'EBG',serif;font-weight:500;font-size:19pt;line-height:1.1;color:#FCF8F0;letter-spacing:.004em}
.lugar p{margin-top:.055in;font-size:6.6pt;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(252,248,240,.82)}

.plate{flex:1;position:relative;background:var(--paper);display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;
  padding:.2in calc(.46in + var(--bleed)) calc(.58in + var(--bleed))}
.plate-in{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center}
.palabra{font-size:7.4pt;font-weight:700;letter-spacing:.42em;text-transform:uppercase;color:var(--terracota);
  text-indent:.42em}
.filete{display:flex;align-items:center;gap:.055in;margin:.11in 0 .15in}
.filete i{display:block;width:.42in;height:.4pt;opacity:.85}
.filete b{display:block;width:3.2px;height:3.2px;transform:rotate(45deg);opacity:.9}
.versiculo{font-family:'EBG',serif;font-style:italic;font-weight:400;font-size:17.5pt;line-height:1.46;
  color:var(--ink);max-width:3.3in;letter-spacing:.002em}
.cita{margin-top:.14in;font-size:6.5pt;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--inkFaint)}
.pie{position:absolute;z-index:1;left:calc(.46in + var(--bleed));right:calc(.46in + var(--bleed));
  bottom:calc(.3in + var(--bleed));display:flex;justify-content:space-between;align-items:baseline;
  padding-top:.09in;border-top:.4pt solid var(--rule)}
.dia{font-size:7pt;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--etapa)}
.marca{font-size:5.8pt;font-weight:400;letter-spacing:.17em;text-transform:uppercase;color:var(--inkFaint)}

/* ---- Cara para escribir ---- */
.card.back{background:var(--paperWarm)}
.pad{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;
  padding:calc(.46in + var(--bleed)) calc(.46in + var(--bleed)) calc(.36in + var(--bleed))}
.cab{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:.09in;
  border-bottom:.8pt solid color-mix(in srgb, var(--etapa) 55%, transparent)}
.cab-dia{font-size:7.4pt;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--etapa)}
.cab-dia i{font-style:normal;opacity:.5;padding:0 .02in}
.cab-fecha{font-size:6.4pt;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--inkSoft);
  display:flex;align-items:baseline;gap:.06in}
.cab-fecha u{display:block;width:1.05in;border-bottom:.5pt solid var(--rule);text-decoration:none}
.reflexion{font-family:'EBG',serif;font-size:11.6pt;line-height:1.62;color:var(--inkSoft);margin-top:.2in;
  max-width:3.7in;text-wrap:pretty}
.rotulo{display:flex;align-items:center;gap:.09in;margin-top:.26in}
.rotulo span{font-size:6.6pt;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:var(--terracota)}
.rotulo i{flex:1;height:.4pt;background:var(--rule)}
.pregunta{font-family:'EBG',serif;font-weight:500;font-size:15pt;line-height:1.34;color:var(--ink);margin-top:.11in}
.renglones{flex:1;display:flex;flex-direction:column;justify-content:space-between;margin-top:.2in;padding-bottom:.3in}
.renglones span{display:block;border-bottom:.5pt solid var(--rule)}
.paso{padding-top:.15in;border-top:.8pt solid color-mix(in srgb, var(--etapa) 45%, transparent)}
.paso-rotulo{font-size:6.6pt;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:var(--terracota)}
.paso-linea{display:flex;align-items:center;gap:.1in;margin-top:.16in}
.casilla{flex:none;width:.14in;height:.14in;border:.8pt solid var(--etapa);border-radius:1px}
.paso-linea u{flex:1;border-bottom:.5pt solid var(--rule);text-decoration:none}
.pie-back{margin-top:.2in;text-align:center;font-size:5.8pt;font-weight:400;letter-spacing:.18em;
  text-transform:uppercase;color:var(--inkFaint)}
`;
}
