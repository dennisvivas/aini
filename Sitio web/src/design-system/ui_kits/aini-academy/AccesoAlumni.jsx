import React from "react";
import { Button } from "../../index.js";
import styles from "./AccesoAlumni.module.css";

/**
 * Acceso al área de alumni, en la cabecera de la academia.
 *
 * Va bloqueado a propósito: el área todavía no existe y no hay destino al que
 * mandar a nadie. Es un <button disabled> real, no un enlace apagado — no debe
 * ser clicable ni alcanzable por teclado.
 */
export function AccesoAlumni() {
  return (
    <Button variant="outline" size="md" disabled className={styles.alumni}>
      Acceso Alumni
    </Button>
  );
}
