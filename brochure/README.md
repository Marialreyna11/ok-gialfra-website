# Brochure Corporativo — OK. GIALFRA LLC

Brochure institucional de 8 páginas en A4 vertical, en español, construido en HTML/CSS
y exportado a PDF de alta calidad mediante Chromium.

## Dirección de color

El documento es **claro primero**, con retícula editorial y el navy reservado al contraste:

| Proporción | Rol | Dónde |
| --- | --- | --- |
| 70–80 % | Blanco / off-white / gris industrial muy claro | Fondo de todas las páginas |
| 10–15 % | Navy corporativo (`--navy`) | Titulares, etiquetas de sector, franja registral y pie |
| 5–10 % | Naranja industrial (`--copper-500`) | Filetes, numeración, iconos y nodos del mapa |
| resto | Azul acero (`--slate`) y gris claro (`--mist`) | Subtítulos, panel del proceso, plancha del mapa |

Ninguna página tiene fondo navy completo. La luminosidad media medida sobre las ocho
páginas renderizadas va de 163 a 249 sobre 255.

Portada y contraportada comparten un **corte diagonal** con filete naranja: la fotografía
ocupa la mitad superior, una cuña blanca aloja el logotipo y el bloque de texto descansa
sobre off-white. Las dos páginas se cierran como pareja.

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
Estatus **ACTIVE** · Constitución **26 de septiembre de 2023**.

> **Privacidad.** La dirección de calle y el ZIP registrados **no aparecen** en el
> brochure ni en este documento, por decisión del cliente. Donde hace falta indicar
> ubicación se usa únicamente `Homestead, Florida — USA`. El nombre legal y el Florida
> Document Number sí se conservan. Nota: el ZIP sigue publicado en el sitio web
> (`src/data/content.ts`); si también debe retirarse de ahí, es un cambio aparte.

**Sitio web oficial** — este repositorio es el código fuente de `okgialfra.com`
(ver `public/CNAME`), por lo que `src/data/content.ts` es la fuente autorizada del
contenido comercial: industrias, familias de producto, proceso de procura, servicios
y el correo `sales@okgialfra.com`.

Fotografías: `public/images/` (Unsplash, uso comercial libre). Se usan **20 imágenes
distintas**, sin repeticiones y sin marcas de agua. El logotipo es el archivo original
`public/images/ok-gialfra-logo.png`, encuadrado con la misma técnica `--lw` del sitio y
**sin recolorear, redibujar ni alterar sus proporciones**.

En portada y contraportada la firma corporativa descansa **directamente sobre la
fotografía**: sin placa, tarjeta ni marco. Ocupa 46 mm —el 26 % del ancho útil— y la
acompaña un filete naranja corto, idéntico en ambas páginas. La separación del fondo se
construye en dos capas, ninguna con borde:

1. Un **halo blanco horneado en el archivo** (`ok-gialfra-logo-halo.png`), calculado por
   Canvas a partir del propio alfa del logotipo, de modo que sigue la silueta.
2. Una **elipse de luminosidad** en `radial-gradient` que se apaga hasta alfa cero, para
   levantar el cielo alrededor de la firma. El último tramo se declara como blanco con
   alfa 0 y no como `transparent` —que es negro transparente— para que no aparezca una
   orla gris al interpolar. Se hornea por la misma razón que el grading: un elemento con `filter` de CSS deja
de entregarse al PDF como su PNG original y el logotipo perdería nitidez en impresión.

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
- **Bloque "International Sourcing" retirado** de la página 6 a petición del cliente. La
  leyenda quedó en dos bloques —USA y North America— repartidos a todo el ancho.
- **Dirección física retirada** del documento completo (ver arriba).

## Estructura

| Pág. | Sección | Composición |
| --- | --- | --- |
| 1 | Portada — Soluciones Globales de Procura | Fotografía + logotipo sobre la imagen + corte diagonal + bloque blanco |
| 2 | Quiénes Somos | Texto a la izquierda, fotografía y cuatro bloques a la derecha, franja registral navy |
| 3 | Sectores Industriales | Cinco filas: etiqueta navy con icono + fotografía |
| 4 | Capacidad de Suministro | Dos bandas destacadas + retícula de 12 categorías con iconos |
| 5 | Procura Estratégica | Título e intro + seis capacidades; flujo de 8 etapas en panel claro |
| 6 | Capacidad de Procura Global | Mapa de puntos en plancha clara + dos bloques + nota |
| 7 | Nuestro Compromiso | Cuatro pilares con iconos + fotografía + barra de soporte |
| 8 | Contraportada | Fotografía + corte diagonal + QR integrado + franja navy delgada |

### Iconografía

Los iconos son los del propio sitio (`src/components/icons.tsx`), extraídos e insertados
como SVG en línea. No se dibujó un set nuevo: el brochure y `okgialfra.com` comparten
exactamente el mismo trazo.

La página 4 presenta las doce familias **con iconos, no con fotografías**. Además de
alinearse con la referencia visual, resuelve el problema de fondo: las tomas de producto
disponibles mostraban equipo desgastado u oxidado.

### Fotografía

Se usan **9 fotografías**, todas distintas, en color y de día. Tres las aportó el cliente
y ocupan las posiciones de mayor peso:

| Archivo | Página | Recorte | Resolución efectiva |
| --- | --- | --- | --- |
| `refinery-hero.jpg` | 1 · Portada | 6,7 % | 1902 px para 210 mm |
| `process-valves.jpg` | 2 · Quiénes Somos | 1,1 % | 743 px para 82 mm |
| `technical-inspection.jpg` | 7 · Nuestro Compromiso | 12,4 % | 1594 px para 176 mm |

Las tres van **sin grading**: se pidieron colores naturales y luminosos, y los archivos ya
los tienen. Cada caja se dimensionó a la proporción 3:2 real de los originales, de modo que
nada se estira y el recorte se mantiene por debajo del 15 %. En la página 7 el encuadre se
bajó a propósito para que el recorte salga de los bordes y el técnico entre completo.

Una primera versión de `refinery-hero.jpg` llegó con marcas de agua «Unsplash+» repetidas
—una previsualización de la versión de pago— y se mantuvo fuera del build hasta que el
cliente subió el archivo limpio.

Las seis restantes salen de `public/images/`. El resto del banco quedó fuera: este entorno
bloquea por política de egreso el acceso a bancos de imágenes, así que sólo pudieron
reasignarse y regradarse las existentes, y las tomas nocturnas, en blanco y negro o con
equipo oxidado se descartaron.

## Control de calidad

`npm run brochure:pdf` aborta si falta una imagen o una fuente y avisa si alguna página
desborda el alto A4. Además, cada revisión se comprueba contra: textos cortados o fuera de
página, imágenes deformadas (relación de aspecto contra `object-fit`), resolución efectiva
por debajo de ~170 dpi en su tamaño de colocación, luminosidad media por página,
fotografías repetidas, ausencia de dirección física, y decodificación real del QR.

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
