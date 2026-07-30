import React, { useEffect, useState } from "react";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";
import styles from "./SiteHeader.module.css";

export const ACADEMY_URL = "/academia/";
export const WHATSAPP_URL = "https://chat.whatsapp.com/EHKnMXdPdBO7dHNvIYj5Fc";

const NAV_DISABLED = ["Investigación", "Política", "Compromisos"];

const CONSULTA_MOVIL = "(max-width: 879px)";

function DisabledText({ children }) {
  return <span className={styles.disabledText}>{children}</span>;
}

function Chevron({ className = "" }) {
  return (
    <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Cabecera común del sitio. La usan la home y la landing de AINI Academy:
 * si cambia el menú, cambia en las dos.
 *
 * `onGoHome` y `onGoEvents` existen porque en la home esos destinos son
 * pantallas de estado, sin URL propia. Desde cualquier otra página se
 * omiten y el componente cae a enlaces normales.
 */
export function SiteHeader({ cta, onGoHome, onGoEvents, aprenderActivo = false }) {
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
            {NAV_DISABLED.map((item) => (
              <DisabledText key={item}>{item}</DisabledText>
            ))}

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

            <DisabledText>Noticias</DisabledText>

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
          {NAV_DISABLED.map((item) => (
            <span key={item} className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>
              {item}
            </span>
          ))}

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

          <span className={`${styles.mobileMenuRow} ${styles.mobileMenuDisabled}`}>Noticias</span>

          <div className={styles.mobileCtaWrap}>{cta}</div>
        </div>
      )}
    </header>
  );
}
