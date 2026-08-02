// Fechas de la cohorte: olas de postulación, contador y clases gratis.
//
// Ninguna función de este módulo lee el reloj. `ahora` (ms epoch) entra
// siempre como parámetro: así el contador, el bloque de cierre y el gate de
// los CTA leen exactamente el mismo estado, y se puede probar cualquier fecha
// sin tocar el reloj del sistema.
//
// Todo se ancla a GMT-5 (hora de Perú) de forma explícita, no a la zona del
// visitante: «la Ola 1 cierra el 31 de agosto» significa el 31 de agosto en
// Lima, lo mire quien lo mire desde donde lo mire.

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

/** Primer instante de una fecha `YYYY-MM-DD`, en hora de Perú. */
export function inicioDelDia(fecha) {
  return Date.parse(`${fecha}T00:00:00-05:00`);
}

/** Último instante de una fecha `YYYY-MM-DD`, en hora de Perú. */
export function finDelDia(fecha) {
  return Date.parse(`${fecha}T23:59:59-05:00`);
}

/** `"2026-08-31"` → `"31 de agosto"`. */
export function fechaLarga(fecha) {
  const [, mes, dia] = fecha.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]}`;
}

/** `"2026-08-06"` → `"jueves 6 de agosto"`. */
export function fechaConDia(fecha) {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  // Date.UTC evita que la zona horaria del visitante corra el día de la semana.
  const nombreDia = DIAS[new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay()];
  return `${nombreDia} ${dia} de ${MESES[mes - 1]}`;
}

/**
 * Ola vigente: aquella cuya ventana [desde, hasta] contiene `ahora`.
 *
 * Si no hay ninguna, cae a la primera ola que todavía no empieza — así, tanto
 * antes de que abra la Ola 1 como en un hueco entre dos olas, la página apunta
 * a la siguiente en vez de quedarse sin referencia. Devuelve `null` solo
 * cuando ya no queda ninguna: eso es «postulaciones cerradas».
 *
 * ⚠️ OJO con esa caída: no existe un estado «todavía no abre». Una ola futura
 * se anuncia como abierta, con su contador corriendo y el CTA vivo. Hoy no
 * importa —el sitio se publica el mismo día que abre la Ola 1— pero para la
 * cohorte 02 hay que añadir una tercera fase antes de cargar la config con
 * fechas lejanas, o la página va a invitar a postular a algo que aún no abrió.
 */
export function resolverOlaActiva(ahora, olas) {
  const vigente = olas.find(
    (ola) => ahora >= inicioDelDia(ola.desde) && ahora <= finDelDia(ola.hasta)
  );
  if (vigente) return vigente;
  return olas.find((ola) => ahora < inicioDelDia(ola.desde)) || null;
}

/**
 * Estado único de la postulación. Lo consumen el contador, el bloque de
 * cierre, el eyebrow del hero y la decisión de pintar o no los CTA.
 */
export function estadoPostulacion(ahora, olas) {
  const ola = resolverOlaActiva(ahora, olas);
  if (!ola) return { fase: "cerrada", ola: null, cierraEl: null };
  return { fase: "abierta", ola, cierraEl: finDelDia(ola.hasta) };
}

/** Cuenta regresiva hacia `objetivo`, en celdas ya formateadas a dos dígitos. */
export function calcularCuenta(ahora, objetivo) {
  const restante = Math.max(0, objetivo - ahora);
  const s = Math.floor(restante / 1000);
  const p = (n) => String(n).padStart(2, "0");
  return {
    dias: p(Math.floor(s / 86400)),
    horas: p(Math.floor((s % 86400) / 3600)),
    min: p(Math.floor((s % 3600) / 60)),
    seg: p(s % 60),
  };
}
