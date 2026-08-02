import React from "react";
import { PaginaLegal } from "./PaginaLegal.jsx";
import { TERMINOS_URL } from "../../components/layout/SiteHeader.jsx";
import { IDENTIFICACION_LEGAL, RECAUDACION } from "../aini-academy/academia.config.js";
import styles from "./PaginaLegal.module.css";

// ⚠️ Redacción de buena fe siguiendo la Ley N.° 29733, Ley de Protección de
// Datos Personales, y su reglamento (D.S. 003-2013-JUS). Requiere revisión de
// un abogado antes de considerarse definitiva. El aviso equivalente va visible
// en la página, no solo en este comentario.
const SECCIONES = [
  {
    titulo: "Quién trata tus datos",
    parrafos: [
      `${IDENTIFICACION_LEGAL.nombre} («AINI») es responsable del tratamiento de los datos personales que recogemos a través del sitio ${IDENTIFICACION_LEGAL.sitio} y del formulario de postulación a AINI Academy.`,
      `Puedes contactarnos en ${IDENTIFICACION_LEGAL.correo} para cualquier asunto relacionado con tus datos personales.`,
    ],
  },
  {
    titulo: "Qué datos recogemos",
    parrafos: [
      "A través del formulario de postulación recogemos los datos que tú mismo nos proporcionas, que pueden incluir:",
    ],
    lista: [
      "Nombre y apellidos.",
      "Correo electrónico y número de teléfono.",
      "Organización o empresa en la que trabajas y el cargo que ocupas.",
      "Información sobre el proyecto que quieres desarrollar y sobre tu equipo.",
      "Cualquier otro dato que decidas incluir en los campos abiertos del formulario.",
    ],
  },
  {
    titulo: "Datos de navegación",
    parrafos: [
      "Al visitar el sitio se registran datos técnicos de navegación —como la dirección IP, el tipo de navegador y las páginas visitadas— mediante las cookies y el sistema de seguimiento propios de HubSpot, la plataforma que utilizamos para gestionar las postulaciones.",
      "El consentimiento para estas cookies se gestiona a través del propio mecanismo de HubSpot. Puedes rechazarlas o retirar tu consentimiento en cualquier momento, y también bloquear o eliminar cookies desde la configuración de tu navegador. Rechazarlas no impide postular.",
    ],
  },
  {
    titulo: "Para qué usamos tus datos",
    parrafos: ["Tratamos tus datos personales con las siguientes finalidades:"],
    lista: [
      "Evaluar tu postulación a la cohorte y decidir sobre tu admisión.",
      "Contactarte para coordinar y realizar la entrevista de admisión.",
      "Comunicarte los detalles de la inversión, las modalidades de pago y el proceso de matrícula.",
      "Gestionar tu participación en el programa si eres admitido, incluyendo el acceso a las sesiones, materiales y canales de comunicación.",
      "Enviarte información sobre las clases abiertas gratuitas y sobre futuras cohortes, siempre que hayas prestado tu consentimiento para ello y hasta que lo retires.",
    ],
  },
  {
    titulo: "Base legal del tratamiento",
    parrafos: [
      "El tratamiento se sustenta en el consentimiento libre, previo, expreso, informado e inequívoco que otorgas al enviar el formulario de postulación, conforme al artículo 5 de la Ley N.° 29733, así como en la ejecución de la relación contractual que se genera si resultas admitido.",
      "Puedes retirar tu consentimiento en cualquier momento, sin efectos retroactivos, escribiéndonos a la dirección indicada más abajo.",
    ],
  },
  {
    titulo: "Dónde se almacenan y quién los procesa",
    parrafos: [
      "Tus datos se almacenan y procesan en HubSpot, plataforma de gestión de relaciones con clientes (CRM) que actúa como encargada del tratamiento por cuenta de AINI. HubSpot, Inc. tiene su sede en los Estados Unidos de América, por lo que el tratamiento implica un flujo transfronterizo de datos personales conforme a lo previsto en la Ley N.° 29733 y su reglamento.",
      "HubSpot trata los datos únicamente conforme a nuestras instrucciones y bajo los compromisos contractuales de seguridad y confidencialidad de su propio acuerdo de tratamiento de datos.",
      "No vendemos, cedemos ni transferimos tus datos personales a terceros con fines comerciales.",
    ],
  },
  {
    titulo: "Datos de facturación",
    parrafos: [
      `AINI ha delegado en ${RECAUDACION.nombre} (RUC ${RECAUDACION.ruc}, con domicilio en ${RECAUDACION.domicilio}) la facturación y la recaudación de los ingresos por la venta del programa. Si resultas admitido y decides matricularte, ${RECAUDACION.nombre} recibe los datos estrictamente necesarios para emitir el comprobante de pago y procesar el cobro: nombre o razón social, documento de identidad o RUC, y los datos de contacto y de pago que corresponda.`,
      "Este tratamiento tiene como finalidad el cumplimiento de las obligaciones tributarias y contables aplicables, y la ejecución de la relación contractual. No incluye los datos de tu postulación ni la información sobre tu proyecto.",
      "Si postulas y no te matriculas, tus datos nunca llegan a esta etapa.",
    ],
  },
  {
    titulo: "Cuánto tiempo los conservamos",
    parrafos: [
      "Conservamos los datos de las postulaciones no admitidas por un plazo máximo de dos (2) años desde su recepción, para poder informarte de futuras cohortes, salvo que solicites antes su cancelación.",
      "Los datos de las personas admitidas se conservan durante el desarrollo del programa y por el plazo adicional que exija la legislación tributaria y contable aplicable.",
    ],
  },
  {
    titulo: "Tus derechos",
    parrafos: [
      "La Ley N.° 29733 te reconoce los derechos de acceso, rectificación, cancelación y oposición (derechos ARCO) sobre tus datos personales, así como los derechos de información, tratamiento objetivo y a impedir el suministro de tus datos.",
    ],
    lista: [
      "Acceso: conocer qué datos tuyos tratamos, con qué finalidad y a quién los hemos comunicado.",
      "Rectificación: corregir tus datos cuando sean inexactos o incompletos.",
      "Cancelación: solicitar la supresión de tus datos cuando ya no sean necesarios o retires tu consentimiento.",
      "Oposición: oponerte a un tratamiento concreto por motivos legítimos.",
    ],
  },
  {
    titulo: "Cómo ejercerlos",
    parrafos: [
      `Para ejercer cualquiera de estos derechos escríbenos a ${IDENTIFICACION_LEGAL.correo} indicando el derecho que quieres ejercer y adjuntando copia de tu documento de identidad, de modo que podamos verificar que la solicitud proviene del titular de los datos.`,
      "Atendemos las solicitudes de acceso dentro de los veinte (20) días hábiles, y las de rectificación, cancelación y oposición dentro de los diez (10) días hábiles, contados desde su recepción, conforme a los plazos del reglamento de la Ley N.° 29733.",
      "Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
    ],
  },
  {
    titulo: "Seguridad",
    parrafos: [
      "Aplicamos medidas técnicas, organizativas y legales razonables para proteger tus datos personales frente a accesos no autorizados, pérdida o alteración, conforme a las exigencias de la Ley N.° 29733 y su reglamento.",
      "Ninguna medida de seguridad es infalible. Si detectáramos un incidente que afecte de forma significativa tus datos personales, te informaremos y adoptaremos las medidas correctivas correspondientes.",
    ],
  },
  {
    titulo: "Menores de edad",
    parrafos: [
      "AINI Academy está dirigida a personas mayores de 18 años. No recogemos de forma consciente datos personales de menores de edad a través del formulario de postulación.",
    ],
  },
  {
    titulo: "Cambios en esta política",
    parrafos: [
      "Podemos actualizar esta política para reflejar cambios legales o en nuestros procesos. La versión vigente es siempre la publicada en esta página, con su fecha de última actualización. Los cambios sustanciales se comunican por correo electrónico a las personas cuyos datos estemos tratando.",
      <>
        Esta política complementa nuestros{" "}
        <a href={TERMINOS_URL} className={styles.enlace}>
          Términos y condiciones
        </a>
        .
      </>,
    ],
  },
];

export function Privacidad() {
  return (
    <PaginaLegal
      titulo="Política de privacidad"
      actualizado="1 de agosto de 2026"
      intro="Esta política explica qué datos personales recogemos cuando postulas a AINI Academy, para qué los usamos, dónde se guardan y cómo puedes ejercer tus derechos sobre ellos."
      secciones={SECCIONES}
    />
  );
}
