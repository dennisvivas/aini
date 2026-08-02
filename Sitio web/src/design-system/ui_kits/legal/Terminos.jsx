import React from "react";
import { PaginaLegal } from "./PaginaLegal.jsx";
import { PRIVACIDAD_URL } from "../../components/layout/SiteHeader.jsx";
import {
  COHORTE,
  ENTREVISTA_MINUTOS,
  EQUIPOS_TOTALES,
  IDENTIFICACION_LEGAL,
  RECAUDACION,
} from "../aini-academy/academia.config.js";
import { fechaConDia } from "../aini-academy/olas.js";
import styles from "./PaginaLegal.module.css";

// ⚠️ Redacción de buena fe siguiendo la Ley N.° 29571 (Código de Protección y
// Defensa del Consumidor) y la Ley N.° 29733. Requiere revisión de un abogado
// antes de considerarse definitiva. El aviso equivalente va visible en la
// página, no solo en este comentario.
const SECCIONES = [
  {
    titulo: "Quiénes somos",
    parrafos: [
      `${IDENTIFICACION_LEGAL.nombre} («AINI») es el proveedor del programa formativo AINI Academy, que se ofrece a través del sitio ${IDENTIFICACION_LEGAL.sitio}.`,
      `AINI ha delegado en ${RECAUDACION.nombre}, con RUC ${RECAUDACION.ruc} y domicilio fiscal en ${RECAUDACION.domicilio}, la facturación y la recaudación de los ingresos por la venta de este servicio. En consecuencia, ${RECAUDACION.nombre} es quien emite los comprobantes de pago y quien procesa los cobros y las devoluciones, mientras que AINI mantiene la responsabilidad sobre el contenido y la ejecución del programa.`,
      `Para cualquier consulta, reclamo o comunicación relacionada con estos términos puedes escribirnos a ${IDENTIFICACION_LEGAL.correo}.`,
    ],
  },
  {
    titulo: "Qué es AINI Academy",
    parrafos: [
      `AINI Academy es un programa formativo en línea de ${COHORTE.semanas} semanas, con ${COHORTE.sesiones} sesiones en vivo de una hora, los martes y jueves de ${COHORTE.horaTexto}. La primera cohorte empieza el ${fechaConDia(COHORTE.inicioFecha)}.`,
      "El programa se cursa en equipos de tres personas, sobre un proyecto propio de cada equipo. Antes de la primera sesión se entrega una Semana 0 de fundamentos, asíncrona.",
      "Las sesiones en vivo quedan grabadas y se ponen a disposición de las personas admitidas durante el desarrollo de la cohorte.",
    ],
  },
  {
    titulo: "Admisión",
    parrafos: [
      `La participación no es de acceso libre: requiere postular y ser admitido. AINI selecciona ${EQUIPOS_TOTALES} equipos para la primera cohorte, distribuidos en olas de postulación con fechas de cierre publicadas en el sitio.`,
      `Tras recibir una postulación, AINI la revisa y, si corresponde, contacta a la persona postulante para una entrevista por videollamada de aproximadamente ${ENTREVISTA_MINUTOS} minutos. En esa entrevista se comunican los detalles de la inversión y de las modalidades de pago.`,
      "AINI se reserva el derecho de admisión. La postulación no genera por sí sola derecho a matrícula ni obligación de contratar para ninguna de las partes.",
    ],
  },
  {
    titulo: "Modalidades e inversión",
    parrafos: [
      "El programa se ofrece en tres modalidades: individual, en equipo de tres, y con facturación a la empresa u organización de la persona participante.",
      "El monto de la inversión, los medios de pago habilitados y las condiciones aplicables a cada modalidad se comunican de forma individual durante el proceso de admisión, antes de cualquier pago. No se exige ningún pago para postular ni para asistir a las clases abiertas gratuitas.",
      `Los comprobantes de pago los emite ${RECAUDACION.nombre} (RUC ${RECAUDACION.ruc}), a quien AINI ha delegado la facturación y la recaudación.`,
      "En la modalidad con facturación a empresa, el comprobante se emite a nombre de la organización que asume el pago, con los datos que esta proporcione.",
    ],
  },
  {
    titulo: "Garantía de devolución",
    parrafos: [
      "Si después de la primera semana del programa consideras que no es para ti, puedes solicitar la devolución íntegra de lo pagado escribiendo a " +
        `${IDENTIFICACION_LEGAL.correo}. La devolución es del 100 % del monto abonado y no requiere justificación.`,
      `La solicitud debe presentarse dentro de los siete (7) días calendario siguientes a la primera sesión en vivo de la cohorte. La devolución la procesa ${RECAUDACION.nombre} por el mismo medio de pago utilizado, salvo acuerdo distinto entre las partes.`,
      "Esta garantía es adicional y no sustituye al derecho de retracto ni a los demás derechos que el Código de Protección y Defensa del Consumidor reconoce a las personas consumidoras.",
    ],
  },
  {
    titulo: "Compromisos de la persona participante",
    parrafos: [
      "Al ser admitida, la persona participante se compromete a proporcionar información veraz durante la postulación, a usar sus credenciales de acceso de forma personal e intransferible, y a no compartir, reproducir ni redistribuir los materiales del programa fuera de su equipo de trabajo.",
      "Las grabaciones, materiales y espacios de comunicación del programa son de uso exclusivo de las personas admitidas en la cohorte.",
    ],
  },
  {
    titulo: "Propiedad intelectual",
    parrafos: [
      "Los contenidos del programa —materiales, grabaciones, presentaciones, plantillas, código de ejemplo y documentación— son de titularidad de AINI o de quienes le han licenciado su uso, y están protegidos por la legislación peruana sobre derechos de autor.",
      "La admisión otorga una licencia de uso personal, no exclusiva e intransferible sobre esos contenidos, limitada a fines de aprendizaje. No se transfiere la titularidad de ningún derecho de propiedad intelectual.",
      "El proyecto que cada equipo construye durante el programa, así como el código y los materiales que produzca, son de titularidad exclusiva de ese equipo. AINI no reclama derecho alguno sobre ellos.",
    ],
  },
  {
    titulo: "Certificados",
    parrafos: [
      "Quien participa en las sesiones recibe un certificado de participación de AINI. Quien además entrega y aprueba los dos entregables del programa recibe un certificado de aprobación de AINI.",
      "Los certificados acreditan la participación o la aprobación del programa de AINI y no constituyen un grado ni un título académico reconocido por el sistema educativo peruano.",
    ],
  },
  {
    titulo: "Cambios en el programa",
    parrafos: [
      "AINI puede ajustar el calendario, el contenido específico de una sesión o la persona que la facilita, siempre que se preserven la duración total, los objetivos y el alcance comprometidos. Cualquier cambio relevante se comunica a las personas admitidas con la mayor anticipación posible.",
      "Si AINI cancelara la cohorte antes de su inicio, devuelve el 100 % de lo pagado a todas las personas matriculadas.",
    ],
  },
  {
    titulo: "Limitación de responsabilidad",
    parrafos: [
      "AINI se compromete a dictar el programa con diligencia profesional y en los términos ofrecidos. No garantiza resultados económicos, comerciales ni laborales derivados de la participación, que dependen de factores ajenos a su control.",
      "AINI no se responsabiliza por interrupciones causadas por fallos de conectividad, de los servicios de terceros utilizados durante el programa, o por causas de fuerza mayor. En esos casos, las sesiones afectadas se reprograman o se ponen a disposición en grabación.",
      "Nada en esta cláusula limita la responsabilidad de AINI en los supuestos en que la legislación peruana no admite limitación.",
    ],
  },
  {
    titulo: "Datos personales",
    parrafos: [
      <>
        El tratamiento de los datos personales recogidos en la postulación y durante el programa se
        rige por nuestra{" "}
        <a href={PRIVACIDAD_URL} className={styles.enlace}>
          Política de privacidad
        </a>
        , elaborada conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, y su
        reglamento.
      </>,
    ],
  },
  {
    titulo: "Ley aplicable y solución de controversias",
    parrafos: [
      "Estos términos se rigen por las leyes de la República del Perú.",
      "Cualquier controversia se somete a los jueces y tribunales del distrito judicial de Lima, sin perjuicio del derecho de la persona consumidora a acudir al Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual (INDECOPI) conforme al Código de Protección y Defensa del Consumidor.",
    ],
  },
  // El punto clave es la irretroactividad: el Código de Protección y Defensa
  // del Consumidor no admite modificar unilateralmente, en perjuicio de quien
  // ya contrató, las condiciones bajo las que contrató.
  {
    titulo: "Cambios en esta política",
    parrafos: [
      "AINI puede actualizar estos términos para reflejar cambios legales, tributarios o en la forma en que presta el servicio. La versión vigente es siempre la publicada en esta página, identificada por su fecha de última actualización.",
      "Los cambios no se aplican de forma retroactiva. Quien ya fue admitido y pagó conserva las condiciones vigentes al momento de contratar —incluidos el precio, la modalidad, el alcance del programa y la garantía de devolución—, aunque estos términos cambien después. Modificar unilateralmente en perjuicio de la persona consumidora las condiciones bajo las que contrató no está permitido por el Código de Protección y Defensa del Consumidor.",
      "Cuando el cambio sea sustancial y afecte a personas ya matriculadas, se comunica por correo electrónico con una anticipación razonable antes de que entre en vigor. Si no aceptas el cambio, puedes resolver el contrato sin penalidad y solicitar la devolución de la parte proporcional no ejecutada del servicio.",
      `Para cualquier consulta sobre una modificación puedes escribirnos a ${IDENTIFICACION_LEGAL.correo}.`,
    ],
  },
];

export function Terminos() {
  return (
    <PaginaLegal
      titulo="Términos y condiciones"
      actualizado="1 de agosto de 2026"
      intro="Estos términos regulan la postulación y la participación en AINI Academy. Al postular, declaras haberlos leído y aceptarlos."
      secciones={SECCIONES}
    />
  );
}
