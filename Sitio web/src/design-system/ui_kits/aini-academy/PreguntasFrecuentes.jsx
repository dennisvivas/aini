import React, { useState } from "react";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { AccesoAlumni } from "./AccesoAlumni.jsx";
import { COHORTE, ENTREVISTA_MINUTOS } from "./academia.config.js";
import { fechaLarga } from "./olas.js";
import styles from "./PreguntasFrecuentes.module.css";

// Ningún importe aparece en estas respuestas: la inversión se comunica en la
// entrevista. Si vuelve a aparecer un precio aquí, es un error.
const PREGUNTAS = [
  {
    pregunta: "¿Necesito saber programar?",
    respuesta:
      "No. La Semana 0 cubre los fundamentos desde cero y la recibes el día de tu admisión. Lo que sí pedimos es que en tu equipo de tres haya al menos una persona cómoda con herramientas técnicas — en la entrevista lo revisamos juntos.",
  },
  {
    pregunta: "¿Puedo postular sin equipo?",
    respuesta: `Sí, postula igual. Si no tienes equipo, te ayudamos a formarlo con otros postulantes antes del ${fechaLarga(COHORTE.inicioFecha)}.`,
  },
  {
    pregunta: "¿Qué diferencia hay entre postular solo, en equipo o por mi empresa?",
    respuesta:
      "Puedes postular individualmente y te ayudamos a armar tu equipo, postular ya con tu equipo de tres formado, o hacerlo a través de tu empresa, con factura a nombre de ella. Te recomendamos la modalidad que más te conviene durante la entrevista.",
  },
  {
    pregunta: "¿Cuánto cuesta?",
    respuesta:
      "Tenemos modalidad individual, en equipo de tres y con facturación a empresa. Te enviamos los detalles de la inversión cuando revisamos tu postulación.",
  },
  {
    pregunta: "¿Qué pasa después de postular?",
    respuesta: `Revisamos tu postulación y, si encaja, te contactamos para agendar una entrevista de ${ENTREVISTA_MINUTOS} minutos. Ahí resolvemos dudas, revisamos tu proyecto y te contamos la inversión.`,
  },
  {
    pregunta: "¿Puedo usar datos de mi empresa?",
    respuesta:
      "Recomendamos que tu proyecto sea personal o que uses datos de prueba. Si quieres trabajar con información de tu empresa, revisa antes su política de seguridad.",
  },
  {
    pregunta: "¿Puedo tomar el bootcamp a mi propio ritmo?",
    respuesta: `Las sesiones son en vivo, martes y jueves, ${COHORTE.horaTexto}. Todas quedan grabadas, así que puedes recuperar cualquiera. El contenido entre sesiones son 25 minutos diarios que tomas cuando quieras.`,
  },
  {
    pregunta: "¿Qué pasa si no puedo asistir a una sesión en vivo?",
    respuesta: "Todas quedan grabadas. Las entregas y el feedback semanal siguen igual.",
  },
  {
    pregunta: "¿Recibo un certificado al completar el bootcamp?",
    respuesta:
      "Sí. Con la participación en las sesiones recibes el certificado de participación de AINI. Si además entregas y apruebas los dos entregables, recibes el certificado de aprobación de AINI.",
  },
];

/**
 * Preguntas frecuentes (/academia/preguntas-frecuentes).
 *
 * Salieron de la landing y viven aquí, enlazadas desde el pie junto a los
 * documentos legales. Varios paneles pueden estar abiertos a la vez: es el
 * comportamiento aprobado en el mockup.
 */
export function PreguntasFrecuentes() {
  const [abiertos, setAbiertos] = useState({});

  return (
    <div className={styles.pagina}>
      <SiteHeader variante="academia" cta={<AccesoAlumni />} />
      <main className={styles.contenido}>
        <h1 className={styles.h1}>Preguntas frecuentes</h1>
        <p className={styles.bajada}>
          Lo que más nos preguntan sobre la primera cohorte de AINI Academy.
        </p>

        <div className={styles.lista}>
          {PREGUNTAS.map((f, i) => {
            const abierto = !!abiertos[i];
            return (
              <div key={f.pregunta} className={styles.item}>
                <button
                  type="button"
                  className={styles.boton}
                  aria-expanded={abierto}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setAbiertos((s) => ({ ...s, [i]: !s[i] }))}
                >
                  <span>{f.pregunta}</span>
                  <span className={styles.signo} aria-hidden="true">
                    +
                  </span>
                </button>
                {/* Sin `role="region"`: con nueve preguntas serían nueve puntos
                    de referencia compitiendo con main, nav y footer en el rotor
                    del lector de pantalla. El estado ya lo llevan aria-expanded
                    y aria-controls. */}
                <div
                  id={`faq-panel-${i}`}
                  className={`${styles.panel} ${abierto ? styles.panelAbierto : ""}`}
                >
                  <div>
                    <p className={styles.respuesta}>{f.respuesta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <SiteFooter variante="academia" />
    </div>
  );
}
