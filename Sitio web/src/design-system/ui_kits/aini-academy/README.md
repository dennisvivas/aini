# AINI Academy — landing de la cohorte 01

Landing de una sola conversión (`/academia`). El CTA lleva a `/academia/postular`,
donde va embebido el formulario de HubSpot. Hay datos personales de por medio:
cualquier cambio en esa página o en el CSP pide `security-review`.

| Archivo | Qué es |
|---|---|
| `AiniAcademy.jsx` | las 8 bandas de la landing, el nav y el footer |
| `AiniAcademy.module.css` | maquetación, estados y capa de movimiento |
| `MetodoDiagrama.jsx` | diagrama del Método, inline (desktop animado + móvil estático) |
| `Mentores.jsx` + `.module.css` | página de mentores, lista abierta desde la config |
| `PreguntasFrecuentes.jsx` + `.module.css` | página del FAQ, con el acordeón y sus preguntas |
| `CtaPostular.jsx` | el CTA «Aplica ahora», compartido por la landing y las páginas sueltas |
| `Revelar.jsx` | entrada por scroll de las secciones de la landing |
| `Postular.jsx` + `HubspotForm.jsx` | página de postulación y embebido de HubSpot |
| `academia.config.js` | **fuente única de verdad**: cohorte, olas, personas, IDs de HubSpot, datos legales |
| `olas.js` | fechas: ola vigente, cierre y contador |

Páginas y entradas:

| Ruta | HTML | Entrada |
|---|---|---|
| `/academia` | `academia/index.html` | `src/academia.jsx` |
| `/academia/mentores` | `academia/mentores/index.html` | `src/mentores.jsx` |
| `/academia/preguntas-frecuentes` | `academia/preguntas-frecuentes/index.html` | `src/preguntas-frecuentes.jsx` |
| `/academia/postular` | `academia/postular/index.html` | `src/postular.jsx` |
| `/academia/terminos` | `academia/terminos/index.html` | `src/terminos.jsx` |
| `/academia/privacidad` | `academia/privacidad/index.html` | `src/privacidad.jsx` |

Cada ruta nueva se registra además en `rollupOptions.input` de `vite.config.js`:
el sitio es un MPA de Vite, no hay router. Los tokens (incluido
`tokens/motion.css`) viven en el design system, no aquí.

## Qué se cambia y dónde

- **Fechas, olas, horario, facilitadores, mentores, IDs de HubSpot:**
  `academia.config.js`, y solo ahí. Ningún componente escribe una fecha, una
  hora o una URL a mano.
- **Clases gratis:** no se listan en el sitio. El calendario vive en Luma y el
  nav enlaza directo (`CLASES_GRATIS_URL` en `SiteHeader.jsx`).
- **Currículum y perfiles de «Para quién es»:** constantes al principio de
  `AiniAcademy.jsx`.
- **Preguntas frecuentes:** `PreguntasFrecuentes.jsx`, que es su propia página.
  Salieron de la landing y se enlazan desde el pie.
- **Movimiento:** duraciones y easings en `../../tokens/motion.css`.

## Decisiones que conviene no revertir sin avisar

- **Ningún importe aparece en la landing.** La inversión se comunica en la
  entrevista. Si vuelve a aparecer un precio en `/academia`, es un error.
- **No hay contador de cupos restantes.** No existe fuente de verdad para ese
  número, y en cuanto llega la primera postulación deja de ser cierto. La
  escasez se comunica con los equipos totales y el cierre de la ola.
- **`olas.js` no lee el reloj.** Todas sus funciones reciben `ahora` como
  parámetro: es lo que permite probar cualquier fecha sin tocar el sistema.
- **El CSP de `/academia/postular` es una excepción acotada**, no la política
  general. Las tres aperturas (`script-src`, `frame-src`, `style-src-attr` vía
  `style-src`) se comprobaron contra el embebido real: sin ellas el formulario
  no carga o mide 0px. No moverlas a la regla global.
- **El éxito del embebido se mide por altura, no por hijos.** HubSpot inserta
  su iframe al instante con `height: 0`; mirar los hijos da por bueno un
  recuadro vacío.

- El diagrama va **inline**, no como `<img>`: la secuencia de revelado necesita
  alcanzar `#m-entrada`, `#m-nodo1…4`, `#m-arco12…41`, `#m-hub` y `#m-salida`.
- El FAQ permite **varios paneles abiertos a la vez**.
- El **dorado** `#D9A441` solo aparece como cuadrado de 8px en las semanas 4 y 8.
  No es color de texto: 1.9:1 sobre hueso.
- Las tarjetas **no tienen hover**. Solo el CTA y los enlaces de texto.
- El contador **no anima dígitos** y va con `aria-live="off"`.

## Pendientes

1. **Identificación legal** — completa en `RECAUDACION` (eCash: razón social,
   RUC, domicilio fiscal y correo). Verificar la grafía de la calle antes de
   la revisión del abogado: la dirección llegó como «Los Geraneos» y en Lince
   la vía suele escribirse «Los Geranios».
2. **Revisión legal** — `/academia/terminos` y `/academia/privacidad` son una
   redacción de buena fe sin revisar por un abogado. El aviso está visible en
   ambas páginas; quitarlo solo después de la revisión.
3. **Fotos** — faltan las de fondo neutro de Cindy y Jemil. La de Dennis Vivas
   ya está (`retratos/dennis-vivas.jpg` + `.webp`, recortada a 288×288 sobre
   la cara desde el original de 4000×6000).
4. **Imagen OG (1200×630) y favicon propio** — no existen; `academia/index.html`
   no declara `og:image`.
5. **Región** — hoy `og:locale` es `es_PE`. Pasa a `es_419` si la campaña se abre
   a toda la región.
6. **Datos estructurados** `schema.org/Course` — sin implementar, a la espera de
   que el cliente confirme que quiere aparecer en resultados de cursos.
7. **Diagrama móvil** — `metodo-aini-movil.svg` llegó sin los identificadores de
   la secuencia, así que se muestra completo, sin revelado por pasos.
8. **Isotipo** — se usa la construcción geométrica del design system, no el
   vectorial oficial de la agencia.
