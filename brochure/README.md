# Brochure Corporativo — OK. GIALFRA LLC

Brochure institucional de 8 páginas en A4 vertical, en español, construido en HTML/CSS
y exportado a PDF de alta calidad mediante Chromium.

## Cómo se construye

```bash
npm run brochure          # assets + PDF
npm run brochure:assets   # solo fuentes, QR y mapa
npm run brochure:pdf      # solo el PDF y las vistas previas
```

| Archivo | Descripción |
| --- | --- |
| `index.html` | El brochure. Fuente única de contenido y diseño. |
| `build-assets.mjs` | Genera `assets/` (fuentes embebidas, QR, mapa mundial). |
| `build-pdf.mjs` | Renderiza el PDF A4 y un PNG por página en `preview/`. |
| `OK-GIALFRA-Brochure-Corporativo.pdf` | Entregable final, 8 páginas A4. |

`assets/` se versiona para que `index.html` se vea igual sin conexión:

- **`fonts.css`** — Barlow Condensed + Inter en woff2 base64 (subconjuntos latin y latin-ext).
- **`qr.svg`** — QR real. **Verificado por decodificación**: apunta a `https://www.okgialfra.com/`.
- **`world.svg`** — mapa mundial vectorial en matriz de puntos, generado desde Natural Earth
  110m (`world-atlas`). Los polígonos se rellenan uno por uno y las geometrías que cruzan el
  antimeridiano se "desenrollan", para evitar bandas espurias que atraviesan el plano.

`preview/` no se versiona: se regenera con `npm run brochure:pdf`.

## Origen de la información

Todo el contenido proviene de dos fuentes, sin datos inventados.

**Registro estatal (SUNBIZ)** — página 2 y contraportada:
OK. GIALFRA LLC · Florida Limited Liability Company · Documento **L23000444881** ·
Estatus **ACTIVE** · Constitución **26 de septiembre de 2023** ·
2257 SE 30TH ST, HOMESTEAD, FL 33035, USA.

**Sitio web oficial** — este repositorio es el código fuente de `okgialfra.com`
(ver `public/CNAME`), por lo que `src/data/content.ts` es la fuente autorizada del
contenido comercial: industrias, familias de producto, proceso de procura, servicios
y el correo `sales@okgialfra.com`.

Fotografías: `public/images/` (Unsplash, uso comercial libre). Se usan 17 imágenes
distintas, sin repeticiones y sin marcas de agua. El logotipo es el archivo original
`public/images/ok-gialfra-logo.png`, encuadrado con la misma técnica `--lw` del sitio y
**sin recolorear, redibujar ni alterar sus proporciones**.

## Exclusiones deliberadas

El brochure está pensado para acompañar procesos de calificación de proveedores, por lo
que **no** afirma nada que no pueda sustentarse documentalmente. No se incluyen
certificaciones (ISO, API u otras), clientes, proyectos, contratos, marcas representadas,
distribuciones autorizadas, alianzas, años de experiencia ni cifras de facturación.

Decisiones tomadas con el cliente:

- **Teléfono omitido.** No figura en SUNBIZ ni en el sitio web. La contraportada muestra
  únicamente web, correo de ventas y dirección.
- **"Actuadores" y "Equipos de Control de Flujo" omitidos** de la página 4: son las dos
  únicas categorías del pedido original sin respaldo en el sitio web.
- **Sin cifras.** Se descartaron los indicadores publicados en el sitio (`24/7`, `12+`,
  `100%`) para no incluir números que un cliente Oil & Gas pudiera pedir sustentar.
- **Página 6.** El mapa comunica capacidad de sourcing internacional, no presencia física.
  Una nota al pie lo declara de forma explícita: los nodos son orígenes potenciales de
  suministro y la compañía opera desde una única sede en Homestead, Florida.

## Estructura

| Pág. | Sección | Fondo |
| --- | --- | --- |
| 1 | Portada — Soluciones Globales de Procura | Navy / fotografía |
| 2 | Quiénes Somos + franja de datos registrales | Blanco |
| 3 | Industrias que Atendemos | Blanco |
| 4 | Capacidad de Suministro | Blanco |
| 5 | Procura Estratégica (flujo de 8 etapas) | Navy |
| 6 | Global Supply Network | Navy |
| 7 | Nuestro Compromiso | Blanco |
| 8 | Contacto / Contraportada con QR | Navy |

## Notas de edición

- Para cambiar textos o imágenes se edita `index.html` y se vuelve a ejecutar
  `npm run brochure:pdf`.
- El script aborta si una imagen o fuente no carga, y avisa si el contenido de alguna
  página desborda el alto A4. El desborde horizontal se ignora a propósito: varias
  páginas sangran arte más allá del corte y se recortan con `overflow:hidden`.
- Paleta y tipografías replican `tailwind.config.js` del sitio, de modo que el brochure y
  `okgialfra.com` comparten identidad.
