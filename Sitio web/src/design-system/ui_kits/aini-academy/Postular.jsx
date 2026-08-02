import React from "react";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { AccesoAlumni } from "./AccesoAlumni.jsx";
import { HubspotForm } from "./HubspotForm.jsx";
import { COHORTE, ENTREVISTA_MINUTOS, EQUIPOS_TOTALES } from "./academia.config.js";
import { fechaConDia, fechaLarga } from "./olas.js";
import { useEstadoPostulacion } from "./usePostulacion.js";
import styles from "./Postular.module.css";

/**
 * Página de postulación. Hereda nav y footer del sitio; el nav va sin CTA
 * porque el CTA de todo el sitio apunta justamente aquí.
 */
export function Postular() {
  // Mismo reloj que la landing: si la última ola cierra con esta pestaña
  // abierta, el formulario desaparece aquí igual que los CTA allá.
  const estado = useEstadoPostulacion();
  const abierta = estado.fase === "abierta";

  return (
    <div className={styles.pagina}>
      <SiteHeader variante="academia" cta={<AccesoAlumni />} />
      <main className={styles.contenido}>
        <h1 className={styles.h1}>Postula a la primera cohorte</h1>

        {abierta ? (
          <>
            <p className={styles.destacado}>
              {EQUIPOS_TOTALES} equipos. {estado.ola.nombre} abierta hasta el{" "}
              {fechaLarga(estado.ola.hasta)}.
            </p>
            <p className={styles.bajada}>
              Revisamos cada postulación a mano. Si encaja, te contactamos para agendar una
              entrevista de {ENTREVISTA_MINUTOS} minutos.
            </p>
            <HubspotForm />
          </>
        ) : (
          <>
            <p className={styles.destacado}>Las postulaciones están cerradas.</p>
            <p className={styles.bajada}>
              La cohorte empieza el {fechaConDia(COHORTE.inicioFecha)}, {COHORTE.horaInicioTexto}.
            </p>
          </>
        )}
      </main>
      <SiteFooter variante="academia" />
    </div>
  );
}
