# Brochure Corporativo — OK. GIALFRA LLC

Brochure institucional de 8 páginas en A4 vertical, en español, construido en HTML/CSS
y exportado a PDF de alta calidad mediante Chromium.

## Dirección de color

El documento es **claro primero**. El balance aproximado es:

| Proporción | Rol | Dónde |
| --- | --- | --- |
| 55–65 % | Blanco / off-white / gris industrial muy claro | Fondo de todas las páginas |
| 15–20 % | Azul acero (`--slate`) y gris claro (`--mist`) | Panel del proceso, mapa, líneas, subtítulos |
| 10–15 % | Navy corporativo (`--navy-block`) | Títulos y cuatro bloques estratégicos |
| 5–10 % | Naranja industrial (`--copper-500`) | Líneas, números, iconos, nodos del mapa |

El navy aparece **sólo** en cuatro bloques: la banda inferior de la portada, la franja de
datos registrales de la página 2, el bloque de enunciado de la página 5 y la banda legal de
la contraportada. Ninguna página tiene fondo navy completo.

Las fotografías no se oscurecen en el archivo: van a brillo pleno y el texto se sostiene
con un degradado (`--scrim`) que sólo cubre la franja del pie de foto.

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
| `build-pdf.mjs` | Renderiza las dos ediciones y un PNG por página en `preview/`. |
| `OK-GIALFRA-Brochure-Corporativo.pdf` | Edición de impresión — imágenes a ~230 dpi, 3,6 MB. |
| `OK-GIALFRA-Brochure-Web.pdf` | Edición ligera — imágenes a ~110 dpi, 1,5 MB, para correo y RFQ. |

## Dos ediciones, una sola fuente

Ambas salen del mismo `index.html` y son idénticas en maquetación y texto: sólo cambia
la resolución de las fotografías. El script carga la página una vez, exporta la edición de
impresión y luego repunta cada `<img>` a su gemela de menor resolución, de modo que las dos
no pueden divergir.

El peso se controla en el origen. Las fotos del repositorio miden 1500–2000 px, que en una
tarjeta de producto de 56 mm equivale a unos 900 dpi: resolución que el PDF paga y que
ninguna imprenta aprovecha. `build-assets.mjs` las remuestrea al tamaño real de colocación.

El **grading de color también se hornea en el archivo**, no se aplica como `filter` de CSS.
Una imagen filtrada no puede entregarse al PDF como su JPEG original: Chromium tiene que
rasterizar el resultado y embeberlo sin comprimir, lo que multiplicaba el archivo por nueve.
Con el grading horneado, la edición de impresión bajó de 18 MB a 3,6 MB **sin perder calidad**.

`assets/` se versiona para que `index.html` se vea igual sin conexión:

- **`fonts.css`** — Barlow Condensed + Inter en woff2 base64 (subconjuntos latin y latin-ext).
- **`qr.svg`** — QR real. **Verificado por decodificación**: apunta a `https://www.okgialfra.com/`.
- **`world.svg`** — mapa mundial vectorial en matriz de puntos, generado desde Natural Earth
  110m (`world-atlas`). Los polígonos se rellenan uno por uno y las geometrías que cruzan el
  antimeridiano se "desenrollan", para evitar bandas espurias que atraviesan el plano.
- **`img/print/` y `img/web/`** — la fotografía remuestreada y con el color ya aplicado.

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

Fotografías: `public/images/` (Unsplash, uso comercial libre). Se usan **21 imágenes
distintas**, sin repeticiones y sin marcas de agua. El logotipo es el archivo original
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
| 1 | Portada — Soluciones Globales de Procura | Blanco + banda fotográfica + pie navy |
| 2 | Quiénes Somos + franja de datos registrales | Blanco |
| 3 | Industrias que Atendemos | Blanco |
| 4 | Capacidad de Suministro | Blanco |
| 5 | Procura Estratégica (flujo de 8 etapas) | Blanco + panel gris claro |
| 6 | Global Supply Network | Gris azulado muy claro |
| 7 | Nuestro Compromiso | Blanco |
| 8 | Contacto / Contraportada con QR | Off-white + banda navy |

### Fotografías de portada y cierre

La portada usa una vista aérea diurna de una terminal de almacenamiento. Sustituyó a una
toma nocturna de equipo de perforación, que ni siquiera aclarada dejaba de leerse como
escena nocturna. Por el mismo motivo la banda de cierre de la página 6 pasó a un puerto
diurno, y la página 3 tomó la fotografía de servicios industriales para Infraestructura.

## Notas de edición

- Para cambiar textos o imágenes se edita `index.html` y se vuelve a ejecutar
  `npm run brochure:pdf`.
- El script aborta si una imagen o fuente no carga, y avisa si el contenido de alguna
  página desborda el alto A4. El desborde horizontal se ignora a propósito: varias
  páginas sangran arte más allá del corte y se recortan con `overflow:hidden`.
- Tipografías y naranja de acento replican `tailwind.config.js` del sitio, de modo que el
  brochure y `okgialfra.com` comparten identidad. El reparto de color es propio del
  brochure: impreso, los fondos navy completos se empastan y restan luz al documento.
- Para reencuadrar o cambiar el color de una fotografía se edita el manifiesto `IMAGES` de
  `build-assets.mjs` (ancho de colocación y `filter`), no el CSS.
