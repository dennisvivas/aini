import React from "react";
import { Callout } from "../../index.js";
import { SiteHeader } from "../../components/layout/SiteHeader.jsx";
import { SiteFooter } from "../../components/layout/SiteFooter.jsx";
import { AccesoAlumni } from "../aini-academy/AccesoAlumni.jsx";
import styles from "./PaginaLegal.module.css";

/**
 * Armazón de las páginas legales. Solo maquetación: el texto lo trae cada
 * página en `secciones`, para que revisar el contenido no obligue a leer JSX.
 *
 * ⚠️ El contenido de estas páginas es una redacción de buena fe siguiendo la
 * Ley 29733 y el Código de Protección y Defensa del Consumidor. NO ha pasado
 * por revisión de un abogado. El aviso también va visible en la página: si se
 * quita de aquí, quitarlo también de la nota, no antes.
 */
export function PaginaLegal({ titulo, actualizado, intro, secciones }) {
  return (
    <div className={styles.pagina}>
      <SiteHeader variante="academia" cta={<AccesoAlumni />} />
      <main className={styles.contenido}>
        <h1 className={styles.h1}>{titulo}</h1>
        <p className={styles.actualizado}>Última actualización: {actualizado}</p>

        <div className={styles.aviso}>
          <Callout title="Documento pendiente de revisión legal" tone="notice">
            Este texto fue redactado siguiendo la Ley N.° 29733 de Protección de Datos Personales y
            el Código de Protección y Defensa del Consumidor (Ley N.° 29571) como referencia.
            Requiere revisión de un abogado antes de considerarse definitivo.
          </Callout>
        </div>

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
