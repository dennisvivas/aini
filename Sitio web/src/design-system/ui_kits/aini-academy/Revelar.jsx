import React, { useEffect, useRef, useState } from "react";
import styles from "./AiniAcademy.module.css";

const STAGGER = [styles.s0, styles.s1, styles.s2, styles.s3, styles.s4, styles.s5, styles.s6, styles.s7, styles.s8];

export function prefiereMenosMovimiento() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Entrada de sección: opacity 0→1 + translateY 12px→0, al 20% de viewport,
 * una sola vez. Vive en su propio archivo porque lo usan tanto la landing
 * como las secciones que se sacaron de ella.
 */
export function Revelar({ children, indice = 0, className = "", as: Etiqueta = "div" }) {
  const ref = useRef(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefiereMenosMovimiento()) {
      setDentro(true);
      return;
    }
    const io = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          setDentro(true);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Etiqueta
      ref={ref}
      className={`${styles.revelar} ${STAGGER[Math.min(indice, 8)]} ${dentro ? styles.dentro : ""} ${className}`}
    >
      {children}
    </Etiqueta>
  );
}
