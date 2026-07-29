# AINI Academy — landing de la cohorte 01

Landing de una sola conversión (`/academia/`). El CTA abre una reunión 1:1 en
HubSpot Meetings: no hay formulario, backend ni datos personales.

| Archivo | Qué es |
|---|---|
| `AiniAcademy.jsx` | las 8 bandas, el nav y el footer |
| `AiniAcademy.module.css` | maquetación, estados y capa de movimiento |
| `MetodoDiagrama.jsx` | diagrama del Método, inline (desktop animado + móvil estático) |
| `cohorte.js` | fecha, cupos y enlace del calendario |

Entrada de la página: `academia/index.html` + `src/academia.jsx`. Los tokens
(incluido `tokens/motion.css`) viven en el design system, no aquí.

## Qué se cambia y dónde

- **Fecha de inicio, cupos, enlace del calendario:** `cohorte.js`. El contador y
  todos los textos que muestran la fecha consumen esas constantes.
- **Currículum, FAQ, instructores, perfiles:** constantes al principio de
  `AiniAcademy.jsx`.
- **Movimiento:** duraciones y easings en `../../tokens/motion.css`.

## Decisiones que conviene no revertir sin avisar

- El diagrama va **inline**, no como `<img>`: la secuencia de revelado necesita
  alcanzar `#m-entrada`, `#m-nodo1…4`, `#m-arco12…41`, `#m-hub` y `#m-salida`.
- El FAQ permite **varios paneles abiertos a la vez**.
- El **dorado** `#D9A441` solo aparece como cuadrado de 8px en las semanas 4 y 8.
  No es color de texto: 1.9:1 sobre hueso.
- El **precio de la membresía** (USD 299/año) solo puede aparecer dentro del FAQ:
  coincide con el precio del bootcamp y fuera de ahí se confunde con él.
- Las tarjetas **no tienen hover**. Solo el CTA y los enlaces de texto.
- El contador **no anima dígitos** y va con `aria-live="off"`.

## Pendientes heredados del handoff

1. **Cupos restantes** — `CUPOS_RESTANTES` es un valor fijo en el frontend y el
   estado «cupos agotados» del CTA no se activa nunca. Mientras siga así, el
   mensaje de escasez deja de ser cierto con la primera aplicación.
2. **Imagen OG (1200×630) y favicon propio** — no existen; `academia/index.html`
   no declara `og:image`.
3. **Región** — hoy `og:locale` es `es_PE`. Pasa a `es_419` si la campaña se abre
   a toda la región.
4. **Datos estructurados** `schema.org/Course` — sin implementar, a la espera de
   que el cliente confirme que quiere aparecer en resultados de cursos.
5. **«Justina» vs `juztina.ai`** — el nombre va con *s* y el dominio con *z*, tal
   como llegó. Falta confirmar cuál es el correcto.
6. **«Para quién es»** — el párrafo describe el resultado, no la audiencia.
7. **Lista de espera** — el secundario «Unirme a la lista de espera» está
   especificado pero no existe: falta el destino concreto en HubSpot.
8. **Diagrama móvil** — `metodo-aini-movil.svg` llegó sin los identificadores de
   la secuencia, así que se muestra completo, sin revelado por pasos.
9. **Isotipo** — se usa la construcción geométrica del design system, no el
   vectorial oficial de la agencia.
