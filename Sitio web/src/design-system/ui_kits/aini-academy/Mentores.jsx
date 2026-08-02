import React from "react";
import { Button } from "../../index.js";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { AccesoAlumni } from "./AccesoAlumni.jsx";
import { MENTORES } from "./academia.config.js";
import styles from "./Mentores.module.css";

/**
 * Página de mentores (/academia/mentores).
 *
 * Lista abierta: recorre `MENTORES` de la config, así que sumar un cuarto o un
 * quinto no toca este archivo.
 */
export function Mentores() {
  return (
    <div className={styles.pagina}>
      <SiteHeader variante="academia" cta={<AccesoAlumni />} />
      <main className={styles.contenido}>
        <h1 className={styles.h1}>Mentores</h1>
        <p className={styles.bajada}>
          Profesores de universidades de la región que acompañan a los equipos durante la cohorte.
        </p>

        <ul className={styles.rejilla}>
          {MENTORES.map((m) => (
            <li key={m.nombre} className={styles.tarjeta}>
              <p className={styles.nombre}>{m.nombre}</p>
              <p className={styles.cargo}>
                {m.cargo}, {m.empresa}
              </p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.enlace}
              >
                LinkedIn
              </a>
            </li>
          ))}
        </ul>

        <section className={styles.cierre}>
          <h2 className={styles.h2}>¿Quieres ser mentor?</h2>
          <p className={styles.cierreTexto}>
            Estamos armando la convocatoria de mentores para las siguientes cohortes.
          </p>
          {/* Bloqueado a propósito: la convocatoria todavía no existe y no hay
              destino al que mandar a nadie. Un <button disabled> real, no un
              enlace apagado — no debe ser clicable ni alcanzable por teclado. */}
          <Button variant="outline" size="lg" disabled className={styles.botonMentor}>
            Quiero ser mentor
          </Button>
        </section>
      </main>
      <SiteFooter variante="academia" />
    </div>
  );
}
