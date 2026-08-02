import React, { useEffect, useState } from "react";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";
import styles from "./SiteHeader.module.css";

export const ACADEMY_URL = "/academia/";
export const WHATSAPP_URL = "https://chat.whatsapp.com/EHKnMXdPdBO7dHNvIYj5Fc";

// Las clases gratis no se listan en el sitio: el calendario vive en Luma y es
// la única fuente. El menú lleva directo ahí, en pestaña nueva.
export const CLASES_GRATIS_URL = "https://luma.com/ainilac";

export const MENTORES_URL = "/academia/mentores";

// Las páginas legales las enlaza el pie de TODO el sitio, así que sus rutas
// viven aquí, junto al resto de destinos compartidos, y no dentro del kit de
// la academia: si se mueven, se mueven en un solo sitio.
export const TERMINOS_URL = "/academia/terminos";
export const PRIVACIDAD_URL = "/academia/privacidad";
export const PREGUNTAS_URL = "/academia/preguntas-frecuentes";

// Ítems del instituto que todavía no tienen destino. Se pintan inertes, como
// señal de hacia dónde va el sitio, y solo aparecen en el menú del instituto:
// la academia no los hereda.
const NAV_INSTITUTO_INERTES = ["Investigación", "Política", "Compromisos"];

// Frentes de la academia que todavía no tienen página. Se pintan inertes, con
// el mismo gris que los del instituto, hasta que existan.
const NAV_ACADEMIA_INERTES = ["Partners", "Nosotros"];

const CONSULTA_MOVIL = "(max-width: 879px)";

function Chevron({ className = "" }) {
  return (
    <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Cabecera del sitio, con dos menús distintos según dónde estés.
 *
 * - `variante="instituto"` (por defecto) — ainilac.com: los frentes del think
 *   tank, con los que aún no tienen destino en gris, y el desplegable
 *   «Aprender» desde el que se llega a la academia.
 * - `variante="academia"` — /academia y sus páginas: el menú del programa, sin
 *   «Aprender» (ya estás dentro) y con Partners y Nosotros todavía en gris.
 *   `aprenderActivo` no aplica aquí: no hay desplegable que marcar.
 *
 * Son productos distintos con navegaciones distintas, no una que evolucionó y
 * dejó atrás a la otra: por eso conviven en el mismo componente en vez de que
 * un cambio en una arrastre a la otra. Lo compartido —la marca, el
 * desplegable «Aprender», el hueco del CTA y el menú móvil— sigue siendo uno
 * solo, que es lo que evita que se desalineen.
 *
 * `onGoHome` y `onGoEvents` existen porque en la home esos destinos son
 * pantallas de estado, sin URL propia. Desde cualquier otra página se
 * omiten y el componente cae a enlaces normales.
 */
export function SiteHeader({ cta, onGoHome, onGoEvents, aprenderActivo = false, variante = "instituto" }) {
  const esAcademia = variante === "academia";
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [aprenderAbierto, setAprenderAbierto] = useState(false);
  const [esMovil, setEsMovil] = useState(
    typeof window !== "undefined" ? window.matchMedia(CONSULTA_MOVIL).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(CONSULTA_MOVIL);
    const alCambiar = () => setEsMovil(mql.matches);
    alCambiar();
    mql.addEventListener("change", alCambiar);
    return () => mql.removeEventListener("change", alCambiar);
  }, []);

  const cerrarTodo = () => {
    setMenuAbierto(false);
    setAprenderAbierto(false);
  };

  const irA = (fn) => () => {
    cerrarTodo();
    fn();
  };

  const marca = (
    <>
      <img src={isotipoWhite} alt="" className={styles.brandLogo} />
      <span className={styles.brandName}>AINI</span>
    </>
  );

  const eventos = onGoEvents ? (
    <button type="button" onClick={irA(onGoEvents)} className={styles.dropdownButton}>
      Eventos
    </button>
  ) : (
    <a href="/#eventos" className={styles.dropdownButton}>
      Eventos
    </a>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {onGoHome ? (
          <button type="button" onClick={irA(onGoHome)} className={styles.brand} aria-label="AINI, inicio">
            {marca}
          </button>
        ) : (
          <a href="/" className={styles.brand} aria-label="AINI, inicio">
            {marca}
          </a>
        )}

        {!esMovil && (
          <nav className={styles.nav} aria-label="Principal">
            {!esAcademia &&
              NAV_INSTITUTO_INERTES.map((item) => (
                <span key={item} className={styles.disabledText}>
                  {item}
                </span>
              ))}

            {!esAcademia && (
              <div className={styles.learnWrap}>
                <button
                  type="button"
                  onClick={() => setAprenderAbierto((v) => !v)}
                  aria-expanded={aprenderAbierto}
                  className={`${styles.learnButton} ${aprenderActivo ? styles.learnButtonActive : ""}`}
                >
                  Aprender
                  <Chevron />
                </button>
                {aprenderAbierto && (
                  <div className={styles.learnDropdown}>
                    <span className={styles.dropdownLabel}>Aprender</span>
                    <a href={ACADEMY_URL} className={styles.dropdownButton}>
                      AINI Academy
                    </a>
                    <div className={styles.dropdownDivider} />
                    <span className={styles.dropdownLabel}>Institución</span>
                    <span className={styles.dropdownItemDisabled}>Sobre nosotros</span>
                    {eventos}
                  </div>
                )}
              </div>
            )}

            {esAcademia ? (
              <>
                <a
                  href={CLASES_GRATIS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  Clases gratis
                </a>
                <a href={MENTORES_URL} className={styles.navLink}>
                  Mentores
                </a>
                {NAV_ACADEMIA_INERTES.map((item) => (
                  <span key={item} className={styles.disabledText}>
                    {item}
                  </span>
                ))}
              </>
            ) : (
              <span className={styles.disabledText}>Noticias</span>
            )}

            {cta}
          </nav>
        )}

        {esMovil && (
          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label="Menú"
            className={styles.mobileMenuButton}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLineShort} />
          </button>
        )}
      </div>

      {esMovil && menuAbierto && (
        <div id="menu-movil" className={styles.mobileMenu}>
          {!esAcademia &&
            NAV_INSTITUTO_INERTES.map((item) => (
              <span key={item} className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>
                {item}
              </span>
            ))}

          {!esAcademia && (
            <>
              <button
                type="button"
                onClick={() => setAprenderAbierto((v) => !v)}
                aria-expanded={aprenderAbierto}
                className={`${styles.mobileMenuRow} ${styles.mobileAccordionTrigger}`}
              >
                Aprender
                <Chevron className={`${styles.mobileChevron} ${aprenderAbierto ? styles.mobileChevronOpen : ""}`} />
              </button>

              {aprenderAbierto && (
                <div className={styles.mobileAccordionPanel}>
                  <a href={ACADEMY_URL} className={styles.mobileAccordionButton}>
                    AINI Academy
                  </a>
                  <span className={styles.mobileMenuDisabled}>Sobre nosotros</span>
                  {onGoEvents ? (
                    <button type="button" onClick={irA(onGoEvents)} className={styles.mobileAccordionButton}>
                      Eventos
                    </button>
                  ) : (
                    <a href="/#eventos" className={styles.mobileAccordionButton}>
                      Eventos
                    </a>
                  )}
                </div>
              )}
            </>
          )}

          {esAcademia ? (
            <>
              <a
                href={CLASES_GRATIS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={cerrarTodo}
                className={`${styles.mobileMenuRow} ${styles.mobileMenuLink}`}
              >
                Clases gratis
              </a>
              <a
                href={MENTORES_URL}
                onClick={cerrarTodo}
                className={`${styles.mobileMenuRow} ${styles.mobileMenuLink}`}
              >
                Mentores
              </a>
              {NAV_ACADEMIA_INERTES.map((item) => (
                <span key={item} className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>
                  {item}
                </span>
              ))}
            </>
          ) : (
            <span className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>Noticias</span>
          )}

          <div className={styles.mobileCtaWrap}>{cta}</div>
        </div>
      )}
    </header>
  );
}
