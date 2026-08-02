import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../index.js";
import { HUBSPOT_SCRIPT_URL, POSTULACION } from "./academia.config.js";
import styles from "./Postular.module.css";

// Si a los 10 s el contenedor sigue vacío, damos el embebido por caído. El
// script puede cargar sin error y aun así no pintar nada — una mala
// configuración del formulario en HubSpot se ve exactamente así.
const ESPERA_MAXIMA_MS = 10000;

// El script se inyecta una sola vez por carga de página. La promesa a nivel de
// módulo sobrevive al doble montaje de StrictMode en desarrollo, que si no
// metería dos <script> idénticos y dos formularios.
let promesaScript = null;

function cargarScript() {
  if (promesaScript) return promesaScript;

  const existente = document.querySelector(`script[src="${HUBSPOT_SCRIPT_URL}"]`);
  if (existente) {
    promesaScript = Promise.resolve();
    return promesaScript;
  }

  promesaScript = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = HUBSPOT_SCRIPT_URL;
    script.onload = resolve;
    script.onerror = () => {
      promesaScript = null;
      script.remove();
      reject(new Error("no se pudo cargar el script de HubSpot"));
    };
    document.body.appendChild(script);
  });

  return promesaScript;
}

/**
 * Formulario de postulación de HubSpot.
 *
 * No se rediseña nada: es el formulario de HubSpot tal cual. Lo único que
 * añadimos alrededor es el ciclo de vida —carga única, detección de fallo y
 * reintento— porque un embebido caído aquí es una postulación perdida.
 */
export function HubspotForm() {
  const contenedorRef = useRef(null);
  const [estado, setEstado] = useState("cargando");

  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    let vigente = true;

    const fallar = () => {
      if (vigente) setEstado("error");
    };

    // La señal de éxito es que el contenedor tenga altura, no que tenga un
    // hijo: HubSpot inserta su iframe de inmediato con `height: 0` y solo lo
    // dimensiona cuando el formulario terminó de montarse dentro. Mirando los
    // hijos daríamos por bueno un recuadro vacío.
    const observador = new ResizeObserver(() => {
      if (!vigente || contenedor.getBoundingClientRect().height === 0) return;
      setEstado("listo");
      clearTimeout(temporizador);
      observador.disconnect();
    });
    observador.observe(contenedor);

    const temporizador = setTimeout(fallar, ESPERA_MAXIMA_MS);

    cargarScript().catch(fallar);

    return () => {
      vigente = false;
      clearTimeout(temporizador);
      observador.disconnect();
    };
  }, []);

  /**
   * Reintentar recarga la página en vez de re-inyectar el script.
   *
   * Un <script> que ya se ejecutó no se deshace sacándolo del DOM: su runtime
   * sigue vivo y sigue vigilando el contenedor. Volver a inyectarlo dejaría dos
   * instancias de HubSpot peleando por el mismo div. Recargar es la única forma
   * de garantizar un estado limpio, y no cuesta nada: si estamos aquí es
   * justamente porque el formulario nunca llegó a pintarse, así que no hay
   * nada escrito que perder.
   */
  const reintentar = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={styles.formularioZona}>
      {estado === "error" && (
        <div className={styles.formularioError} role="alert">
          <p className={styles.formularioErrorTexto}>
            No pudimos cargar el formulario. Intenta de nuevo en unos minutos.
          </p>
          <Button variant="outline" size="md" onClick={reintentar}>
            Reintentar
          </Button>
        </div>
      )}

      {estado === "cargando" && (
        <p className={styles.formularioCargando}>Cargando el formulario…</p>
      )}

      {/* `hs-form-frame` y los data-* son el contrato del embebido de HubSpot:
          los lee su propio script, no nuestro código. */}
      <div
        ref={contenedorRef}
        className="hs-form-frame"
        data-region={POSTULACION.hubspotRegion}
        data-form-id={POSTULACION.hubspotFormId}
        data-portal-id={POSTULACION.hubspotPortalId}
      />
    </div>
  );
}
