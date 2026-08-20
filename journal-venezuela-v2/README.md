# Volver a empezar en Venezuela · Tarjetas de diario · **Versión 2**

Colección de 30 tarjetas de diario, una por día, para acompañar a quien está
empezando otra vez. Esta es la versión premium: mismo concepto que la versión 1
—frente ilustrado, reverso para escribir—, con la ilustración, la tipografía y
el formato llevados a calidad de producto de librería.

> La versión 1 sigue intacta en [`../journal-venezuela`](../journal-venezuela).
> Esta carpeta es una evolución en paralelo, no un reemplazo.

**Estado: prueba del DÍA 01 para aprobación.** Los otros 29 días no se producen
hasta que se apruebe la dirección de arte.

---

## Ficha técnica de impresión

| | |
| --- | --- |
| **Tamaño final (corte)** | 5 × 7 in · 127 × 178 mm · vertical |
| **Sangrado** | 0,125 in · 3,175 mm por lado → página de 5,25 × 7,25 in |
| **Área de seguridad** | 0,25 in · 6,35 mm desde la línea de corte |
| **Resolución** | No aplica: **todo el arte es vectorial**, sin un solo elemento rasterizado. Se imprime nítido a cualquier tamaño y supera cualquier requisito de 300 DPI |
| **Color** | Máster en RGB vectorial + versión CMYK (`DeviceCMYK`) para imprentas que la exijan |
| **Fuentes** | Incrustadas y subconjuntadas en el PDF |
| **Marcas de corte** | Solo en la versión de imprenta, dentro del sangrado |
| **Caras** | Frente ilustrado y reverso para escribir, alineados para impresión dúplex |

### Sobre el color

El PDF que sale de la compilación es **vectorial puro**: cero imágenes
rasterizadas, degradados y transparencias nativos del PDF.

La conversión a CMYK con Ghostscript aplana algunas zonas de transparencia —la
neblina del salto y el halo del sol— en teselas rasterizadas pequeñas. Por eso
se entregan las dos versiones:

- **RGB vectorial** — el máster. Es lo que conviene mandar a una imprenta
  digital moderna o a un servicio de impresión bajo demanda: convierten con su
  propio perfil ICC y el resultado es mejor que una conversión a ciegas.
- **CMYK** — para el taller que solo acepta CMYK. Conserva el texto y las
  siluetas en vector; solo los degradados suaves quedan aplanados.

Si la imprenta pide un perfil concreto (FOGRA39, GRACoL, SWOP), se genera con
ese perfil ICC en lugar de la conversión genérica.

---

## Qué hay en `impresion/`

| Archivo | Qué es |
| --- | --- |
| `dia01-prueba-sangrado.pdf` | Máster vectorial RGB, 2 páginas (frente y reverso), 5,25 × 7,25 in con marcas de corte |
| `dia01-prueba-CMYK.pdf` | La misma prueba convertida a CMYK |
| `dia01-frente.png` · `dia01-reverso.png` | Las dos caras ya recortadas, para revisar en pantalla |
| `dia01-mockup.png` | Presentación de ambas caras |
| `comparacion-v1-v2.png` | La misma tarjeta en la versión 1 y en la 2 |

Y en `docs/`: la [tabla de control bíblico](docs/tabla-versiculos.md), con la
norma editorial y la auditoría de las citas de la versión 1.

---

## Dirección de arte

**Serigrafía editorial.** Paleta corta, capas planas que se superponen como
tintas impresas, siluetas dibujadas con ruido y curvas —nunca triángulos ni
óvalos— y grano fino encima de todo.

Las texturas están hechas con miles de figuras diminutas, no con filtros SVG:
un filtro se rasteriza al exportar y en imprenta se vería como ruido grueso.

Cada escena se compone por capas, de fondo a frente:

```
cielo · degradado largo + disco solar + cirros
lejanía · siluetas veladas por la bruma
motivo · el elemento con carácter propio de ese lugar
media distancia · arbolado, agua, arquitectura
primer plano · masas oscuras y hojas que enmarcan
aire · aves, neblina, grano
```

## Sistema tipográfico

- **EB Garamond** — el lugar, el versículo, la reflexión y la pregunta.
- **Karla** — rótulos en versalitas con mucho interletraje: la palabra
  emocional, la ubicación, el número de día, la fecha.

Dos familias, papeles bien separados: la serif habla, la sans rotula.

## Estructura de las 30 tarjetas

Los treinta días son un recorrido, no una lista suelta:

| Días | Etapa | De qué va |
| --- | --- | --- |
| 1–6 | Aterrizar | Aceptar el momento, respirar, ordenar la cabeza |
| 7–12 | Ordenar | Documentos, dinero, techo, salud |
| 13–18 | Reconstruir | Trabajo, habilidades, familia, red |
| 19–24 | Avanzar | Oportunidades, meses siguientes, confianza |
| 25–29 | Construir | Algo propio, disciplina, propósito |
| 30 | Nuevo comienzo | No es el final del reto: es el comienzo de la etapa |

Cada tarjeta se sostiene sola. No hay «capítulo» ni «parte» ni «guía práctica»
a la vista: el mazo se entiende sin haber leído el libro. El título aparece una
sola vez por cara, discreto, al pie.

---

## Compilar

```bash
npm install       # Playwright (usa Chromium)
npm run prueba    # PDF, PNG y mockup del día 01
npm run cmyk      # versión CMYK con Ghostscript
npm run comparacion
```

```
src/
  tokens.js      geometría, paleta y las seis etapas
  color.js       utilidades de color
  geometria.js   ruido, suavizado de trazos y perfiles de terreno
  atmosfera.js   cielo, luz, cirros, neblina
  naturaleza.js  roca, agua, vegetación
  textura.js     grano, trama y moteado, todo vectorial
  contenido.js   versículos, reflexiones y preguntas
  tarjeta.js     maquetación de ambas caras y hoja de estilo
  escenas/       una ilustración por día
fuentes/         EB Garamond y Karla (SIL Open Font License)
```
