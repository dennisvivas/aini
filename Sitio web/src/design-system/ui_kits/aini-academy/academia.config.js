// Fuente única de verdad de AINI Academy — cohorte 01.
//
// Cambiar una fecha de cierre de ola, el horario de la cohorte, un enlace de
// Luma o sumar un mentor se hace SOLO aquí. Ningún componente escribe a mano
// una fecha, una hora o una URL.
//
// La lógica que interpreta estas fechas (qué ola está vigente, qué clase ya
// pasó, cuánto falta para el cierre) vive en `olas.js`, no aquí: este archivo
// son datos, no comportamiento.

import cindyJpg from "./retratos/cindy-rojas.jpg";
import cindyWebp from "./retratos/cindy-rojas.webp";
import jemilJpg from "./retratos/jemil-castro.jpg";
import jemilWebp from "./retratos/jemil-castro.webp";
import dennisJpg from "./retratos/dennis-vivas.jpg";
import dennisWebp from "./retratos/dennis-vivas.webp";

const INICIO_COHORTE = "2026-10-06T20:00:00-05:00"; // martes 6 de octubre, 8 p.m. Perú

export const COHORTE = {
  inicio: INICIO_COHORTE,
  // Se deriva del instante de inicio, no se escribe aparte: dos campos con la
  // misma fecha se desincronizan en cuanto alguien mueve uno solo.
  inicioFecha: INICIO_COHORTE.slice(0, 10),
  fin: "2026-11-26",
  semanas: 8,
  sesiones: 16,
  diasTexto: "Mar y jue",
  horaTexto: "8–9 p.m., hora de Perú (GMT-5)",
  horaInicioTexto: "8 p.m. hora de Perú (GMT-5)",
  zonaHoraria: "America/Lima",
};

// Tres olas de postulación. El contador apunta al cierre de la vigente y
// pasa solo a la siguiente; cuando la última cierra, se ocultan los CTA.
export const OLAS = [
  {
    id: 1,
    nombre: "Ola 1",
    desde: "2026-08-03",
    hasta: "2026-08-31",
    equipos: 4,
    bono: "una sesión privada de diagnóstico de tu proceso antes de que arranque la cohorte",
  },
  { id: 2, nombre: "Ola 2", desde: "2026-09-01", hasta: "2026-09-20", equipos: 4, bono: null },
  { id: 3, nombre: "Ola 3", desde: "2026-09-21", hasta: "2026-09-29", equipos: 2, bono: null },
];

/** 10 equipos en total: se suma de las olas, no se escribe a mano. */
export const EQUIPOS_TOTALES = OLAS.reduce((total, ola) => total + ola.equipos, 0);

// Duración de la entrevista de admisión. Se anuncia en el hero, en la página
// de postulación, en el FAQ y en los términos: si vuelve a escribirse a mano
// en alguno de esos sitios, tarde o temprano dejan de coincidir.
export const ENTREVISTA_MINUTOS = 45;

export const POSTULACION = {
  hubspotPortalId: "51544061",
  hubspotFormId: "5052ae29-96cd-4ba4-8d4a-661b3de9b197",
  hubspotRegion: "na1",
  rutaPagina: "/academia/postular",
};

/** URL del script de embebido, derivada del portal: nunca escrita a mano. */
export const HUBSPOT_SCRIPT_URL = `https://js.hsforms.net/forms/embed/${POSTULACION.hubspotPortalId}.js`;

// Identificación que usan las páginas legales.
export const IDENTIFICACION_LEGAL = {
  nombre: "AINI — Instituto de Inteligencia Artificial para América Latina y el Caribe",
  sitio: "ainilac.com",
  correo: "x@dennisvivas.com",
};

// AINI presta el servicio formativo; la facturación y la recaudación de los
// ingresos por su venta están delegadas en eCash. Es quien emite los
// comprobantes y quien procesa cobros y devoluciones — por eso aparece con
// nombre y RUC en los términos, y como destinatario de los datos de
// facturación en la política de privacidad.
export const RECAUDACION = {
  nombre: "eCash",
  ruc: "20601795311",
  domicilio: "Los Geraneos 166, distrito de Lince, provincia y departamento de Lima, Perú",
  correo: "x@dennisvivas.com",
};

// Las clases gratis no se listan aquí: el calendario vive en Luma
// (`CLASES_GRATIS_URL` en SiteHeader.jsx) y esa es la única fuente. Duplicar
// las fechas en el sitio garantizaba que un día dejaran de coincidir.

// Quienes dictan el programa. PENDIENTE (Q9): las fotos de fondo neutro de
// Cindy y Jemil siguen sin llegar, y la de DVZ no existe — su tarjeta usa un
// placeholder de iniciales que se sustituye por el par jpg/webp en cuanto haya
// foto real.
export const FACILITADORES = [
  {
    nombre: "Cindy Rojas",
    rol: "AINI Academy Co-Founder",
    linkedin: "https://www.linkedin.com/in/cindy-rojas-alvarado/",
    jpg: cindyJpg,
    webp: cindyWebp,
    encuadre: "retratoCindy",
  },
  {
    nombre: "Jemil Castro",
    rol: "AINI Academy Co-Founder",
    linkedin: "https://www.linkedin.com/in/jemil-castro-72146843/",
    jpg: jemilJpg,
    webp: jemilWebp,
    encuadre: "retratoJemil",
  },
  {
    nombre: "Dennis Vivas",
    rol: "AINI Co-Founder",
    linkedin: "https://www.linkedin.com/in/dennisvivas/",
    jpg: dennisJpg,
    webp: dennisWebp,
    encuadre: "retratoDennis",
  },
];

// Lista abierta: hoy son tres, va a crecer. El componente que los pinta
// recorre este arreglo — sumar un cuarto no requiere tocar nada más.
export const MENTORES = [
  {
    nombre: "Daniel Olivares",
    cargo: "Profesor",
    empresa: "Universidad de Chile",
    linkedin: "https://www.linkedin.com/in/dolivares/",
  },
  {
    nombre: "Oswaldo Meini",
    cargo: "Profesor",
    empresa: "Universidad de Lima",
    linkedin: "https://www.linkedin.com/in/oswaldo-meini/",
  },
  {
    nombre: "Javier Benavides",
    cargo: "Profesor",
    empresa: "Pontificia Universidad Católica del Perú",
    linkedin: "https://www.linkedin.com/in/benavidesjavier/",
  },
];
