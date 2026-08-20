# Tarjetas de diario · Volver a empezar en Venezuela

Un mazo de **32 tarjetas para imprimir**: portada, treinta días de diario y una
tarjeta de cierre. El contenido sale de la guía *Volver a empezar en Venezuela*
— los quince capítulos aportan su versículo y sus dos preguntas de reflexión, y
cada pregunta es un día.

Cada tarjeta tiene dos caras:

- **Cara ilustrada.** Un paisaje de Venezuela, el versículo del capítulo y el
  número del día.
- **Cara para escribir.** La pregunta del día, espacio con renglones, una
  casilla para *el paso pequeño de hoy* y un lugar para la fecha.

Los quince paisajes se dibujan dos veces, al amanecer y al atardecer, así que
las dos tarjetas de un mismo capítulo se distinguen de un vistazo. La franja de
color del canto agrupa las tarjetas por parte del libro: rojo tierra el regreso,
verde lo práctico, ámbar la familia, azul reconstruir.

## Archivos listos para imprimir

En [`impresion/`](impresion):

| Archivo | Para qué sirve |
| --- | --- |
| `tarjetas-diario-carta-2up.pdf` | Carta 8,5 × 11 in. Dos tarjetas por hoja, 32 páginas. |
| `tarjetas-diario-a4-2up.pdf` | A4 210 × 297 mm. Igual que el anterior, para el tamaño de papel de Venezuela. |
| `tarjetas-diario-individuales-sangrado.pdf` | Una tarjeta por página con 3 mm de sangrado. Para imprenta. |

También hay hojas de contacto (`contacto-front.png`, `contacto-back.png`) para
ver el mazo completo de un vistazo.

**Tarjeta terminada:** 3,75 × 5,5 in (95 × 140 mm).

### Cómo imprimirlas en casa

1. Usa los archivos `-2up`, en cartulina de 200–300 g si puedes.
2. Imprime **a doble cara, volteando por el borde largo**. Los reversos ya van
   en espejo para que cada tarjeta coincida con su cara ilustrada.
3. En el diálogo de impresión elige **Tamaño real / 100 %**, no «ajustar a la
   página»: si el PDF se escala, las marcas de corte dejan de servir.
4. Corta por las marcas de las esquinas. Un cúter y una regla dan mejor borde
   que la tijera.

Si las mandas a imprimir fuera, entrega el archivo con sangrado: la imprenta lo
espera así.

## Cómo se genera

Todo el arte es vectorial y original — no hay fotografías ni recursos de
terceros —, así que imprime nítido a cualquier tamaño.

```bash
npm install          # instala Playwright (necesita Chromium)
npm run build        # genera los tres PDF en impresion/
npm run preview      # además, PNG de muestra de las primeras hojas
npm run contacto     # hoja de contacto con las 32 caras
```

```
src/
  content.js   Los quince capítulos, sus versículos y las treinta preguntas
  scenes.js    Los dieciséis paisajes, en SVG
  paint.js     Color, degradados y piezas sueltas (palmas, nubes, estrellas)
  render.js    Maquetación de la tarjeta y de los pliegos de impresión
build.mjs      Imprime las páginas a PDF con Chromium
contact.mjs    Hoja de contacto para revisar el mazo
fonts/         Lora y Karla (SIL Open Font License)
```

## Los paisajes

El Ávila · Médanos de Coro · Los Llanos de Apure · Monte Roraima · cacaotales de
Chuao · Choroní · peñeros de Juan Griego · páramo de frailejones · Los Roques ·
un patio con mango · palafitos del Lago de Maracaibo · Pico Bolívar · cafetales
de Boconó · noche en la Gran Sabana · Río Orinoco · Salto Ángel.

## Cambiar el contenido

Las preguntas, los versículos y los lugares están en `src/content.js`. Cambia
ahí el texto y vuelve a correr `npm run build`: el mazo se regenera completo,
con la numeración de los días al día.
