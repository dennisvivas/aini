import React from "react";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { AccesoAlumni } from "../aini-academy/AccesoAlumni.jsx";
import styles from "./PaginaLegal.module.css";

/**
 * Armazón de las páginas legales. Solo maquetación: el texto lo trae cada
 * página en `secciones`, para que revisar el contenido no obligue a leer JSX.
 *
 * ⚠️ El contenido se redactó siguiendo la Ley 29733 y el Código de Protección
 * y Defensa del Consumidor, pero NO ha pasado por revisión de un abogado. El
 * aviso que lo decía en la propia página se retiró por decisión del cliente,
 * así que este comentario es lo único que queda registrándolo.
 */
export function PaginaLegal({ titulo, actualizado, intro, secciones }) {
  return (
    <div className={styles.pagina}>
      <SiteHeader variante="academia" cta={<AccesoAlumni />} />
      <main className={styles.contenido}>
        <h1 className={styles.h1}>{titulo}</h1>
        <p className={styles.actualizado}>Última actualización: {actualizado}</p>

        {intro && <p className={styles.intro}>{intro}</p>}

        {secciones.map((seccion, i) => (
          <section key={seccion.titulo} className={styles.seccion}>
            <h2 className={styles.h2}>
              {i + 1}. {seccion.titulo}
            </h2>
            {/* Los párrafos aceptan JSX, no solo texto: las referencias
                cruzadas entre términos y privacidad tienen que ser enlaces
                de verdad, no rutas escritas en medio de una frase. */}
            {(seccion.parrafos || []).map((parrafo, j) => (
              <p key={j} className={styles.parrafo}>
                {parrafo}
              </p>
            ))}
            {seccion.lista && (
              <ul className={styles.lista}>
                {seccion.lista.map((punto) => (
                  <li key={punto} className={styles.listaItem}>
                    {punto}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
      <SiteFooter variante="academia" />
    </div>
  );
}
