import React from "react";
import { PREGUNTAS_URL, PRIVACIDAD_URL, TERMINOS_URL, WHATSAPP_URL } from "./SiteHeader.jsx";
import styles from "./SiteFooter.module.css";

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zM17.61 20.64h2.04L6.49 3.24H4.3z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ainilac", Icon: LinkedInIcon },
  { label: "X", href: "https://x.com/ainilac", Icon: XIcon },
  { label: "YouTube", href: "https://www.youtube.com/@ainilac", Icon: YouTubeIcon },
];

const COLUMNAS = [
  { title: "Productos", links: [{ label: "DVZ", href: "https://x.dennisvivas.com/" }] },
  { title: "Soluciones", links: [{ label: "Financial Services", href: "https://dennisvivas.com/" }] },
  { title: "Recursos", links: [{ label: "Comunidad", href: WHATSAPP_URL }], disabled: ["Cursos"] },
  { title: "Sobre nosotros", disabled: ["AI Institute"] },
  { title: "Modelos", disabled: ["Claude"] },
];

// La última columna es lo único que cambia entre los dos pies. El instituto
// todavía no tiene sus propios documentos publicados, así que conserva el
// bloque inerte que ya tenía; la academia sí los tiene y los enlaza.
const LEGAL_INSTITUTO = { title: "Términos y condiciones", disabled: ["Política de privacidad"] };

const LEGAL_ACADEMIA = {
  title: "Legal",
  links: [
    { label: "Términos y condiciones", href: TERMINOS_URL, interno: true },
    { label: "Política de privacidad", href: PRIVACIDAD_URL, interno: true },
    { label: "Preguntas frecuentes", href: PREGUNTAS_URL, interno: true },
  ],
};

/**
 * Pie del sitio, con la misma división que la cabecera: `variante="instituto"`
 * (por defecto) para ainilac.com y `variante="academia"` para /academia y sus
 * páginas. Las cinco primeras columnas son idénticas en los dos; solo cambia
 * la legal, porque los documentos publicados son los de la academia.
 */
export function SiteFooter({ variante = "instituto" }) {
  const columnas = [...COLUMNAS, variante === "academia" ? LEGAL_ACADEMIA : LEGAL_INSTITUTO];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {columnas.map((col) => (
          <div key={col.title} className={styles.footerCol}>
            <span className={styles.footerColTitle}>{col.title}</span>
            {/* Las páginas del propio sitio no abren pestaña nueva: el
                target="_blank" es para los destinos externos. */}
            {(col.links || []).map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.interno ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className={styles.footerLink}
              >
                {l.label}
              </a>
            ))}
            {(col.disabled || []).map((label) => (
              <span key={label} className={styles.footerDisabled}>
                {label}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.footerCopy}>
          © 2026 AINI — Instituto de Inteligencia Artificial para América Latina y el Caribe.
        </p>
        <div className={styles.socialRow}>
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`AINI en ${label}`}
              className={styles.socialLink}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
