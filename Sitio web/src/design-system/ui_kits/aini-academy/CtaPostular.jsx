import React from "react";
import { Button } from "../../index.js";
import { POSTULACION } from "./academia.config.js";
import styles from "./AiniAcademy.module.css";

const ROTULO_CTA = "Aplica ahora";

/**
 * CTA primario de toda la academia. Es un enlace real a la página de
 * postulación, no un botón que simula navegar: con las postulaciones cerradas
 * simplemente no se pinta.
 *
 * Vive en su propio archivo porque lo usan la landing y las páginas sueltas
 * que cuelgan del mismo menú.
 */
export function CtaPostular({ estado, size = "lg", ancho = false }) {
  if (estado.fase === "cerrada") return null;

  return (
    <Button
      as="a"
      href={POSTULACION.rutaPagina}
      variant="primary"
      size={size}
      className={`${styles.cta} ${ancho ? styles.ctaAncho : ""}`}
    >
      {ROTULO_CTA}
    </Button>
  );
}
