import React, { useEffect, useRef, useState } from "react";
import styles from "./MetodoDiagrama.module.css";

/**
 * Diagrama del Método AINI.
 *
 * Va inline y no como <img>: la secuencia de revelado necesita alcanzar cada
 * parte del dibujo (#m-entrada, #m-nodo1…4, #m-arco12…41, #m-hub, #m-salida).
 * El trazo es idéntico al de `diagramas/metodo-aini.svg` del handoff.
 */
export function MetodoDiagrama() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    // Umbral 40%, una sola vez: el observer se desconecta al dispararse.
    const io = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          setVisible(true);
          obs.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 460"
      role="img"
      aria-labelledby="d1t d1d"
      className={`${styles.diagrama} ${styles.desktop} ${visible ? styles.isIn : ""}`}
    >
      <title id="d1t">Método AINI: un ciclo de cuatro movimientos que se repite ocho semanas</title>
      <desc id="d1d">
        Entrada: declara tu proyecto. Ciclo de cuatro movimientos alrededor de un hub central que
        marca ocho semanas: aprende en dosis cortas, aplica en vivo, itera con tu tutor, publica y
        corrige. Salida: certifícate y enseña.
      </desc>

      <defs>
        <marker id="d1an" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0.5 L10 5 L0 9.5 Z" fill="#171717" />
        </marker>
      </defs>

      <g id="m-entrada" data-paso="" className={styles.d0}>
        <text className={styles.eb} x="4" y="170">ENTRADA</text>
        <rect x="4" y="180" width="112" height="104" rx="4" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
        <text className={styles.n} x="16" y="206">0</text>
        <text className={styles.t} x="16" y="226">Declara tu<tspan x="16" dy="16">proyecto,</tspan></text>
        <text className={styles.s} x="16" y="262">no un ejercicio</text>
        <line x1="116" y1="232" x2="154" y2="232" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1an)" />
      </g>

      <g id="m-flechas">
        <path id="m-arco12" data-arco="" className={styles.d700} d="M413.6 36.4 A200 200 0 0 1 567.6 190.4" fill="none" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1an)" />
        <path id="m-arco23" data-arco="" className={styles.d800} d="M567.6 273.6 A200 200 0 0 1 413.6 427.6" fill="none" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1an)" />
        <path id="m-arco34" data-arco="" className={styles.d900} d="M330.4 427.6 A200 200 0 0 1 176.4 273.6" fill="none" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1an)" />
        <path id="m-arco41" data-arco="" className={styles.d1000} d="M176.4 190.4 A200 200 0 0 1 330.4 36.4" fill="none" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1an)" />
      </g>

      <g id="m-hub" data-paso="" className={styles.d1160}>
        <g stroke="#C9B79C" strokeWidth="1">
          <line x1="372" y1="218" x2="372" y2="145" />
          <line x1="372" y1="246" x2="372" y2="319" />
          <line x1="403.1" y1="200.9" x2="417.3" y2="186.7" />
          <line x1="340.9" y1="200.9" x2="326.7" y2="186.7" />
          <line x1="340.9" y1="263.1" x2="326.7" y2="277.3" />
          <line x1="403.1" y1="263.1" x2="417.3" y2="277.3" />
        </g>
        <g fill="#C9B79C">
          <rect x="419.4" y="180.6" width="4" height="4" />
          <rect x="320.6" y="180.6" width="4" height="4" />
          <rect x="320.6" y="279.4" width="4" height="4" />
          <rect x="419.4" y="279.4" width="4" height="4" />
          <rect x="333" y="230" width="4" height="4" />
          <rect x="407" y="230" width="4" height="4" />
        </g>
        <rect x="338" y="218" width="68" height="28" rx="2" fill="#FFFFFF" stroke="#171717" strokeWidth="1.5" />
        <text x="372" y="236" textAnchor="middle" fontSize="12" fontWeight="600">×8 semanas</text>
      </g>

      <g id="m-nodo1" data-paso="" className={styles.d240}>
        <rect x="286" y="71" width="172" height="70" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="1" />
        <text className={styles.n} x="300" y="97">1</text>
        <text className={styles.t} x="300" y="117">Aprende en dosis cortas</text>
        <text className={styles.s} x="300" y="133">25 min al día</text>
      </g>

      <g id="m-nodo2" data-paso="" className={styles.d340}>
        <rect x="412" y="197" width="172" height="70" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="1" />
        <text className={styles.n} x="426" y="223">2</text>
        <text className={styles.t} x="426" y="243">Aplica en vivo</text>
        <text className={styles.s} x="426" y="259">martes y jueves</text>
      </g>

      <g id="m-nodo3" data-paso="" className={styles.d480}>
        <rect x="286" y="323" width="172" height="70" rx="4" fill="#FFFFFF" stroke="#C1440E" strokeWidth="1.5" />
        <text className={styles.n} x="300" y="349" fill="#C1440E">3</text>
        <text className={styles.t} x="300" y="369" fill="#C1440E">Itera con tu tutor</text>
        <text className={styles.s} x="300" y="385">todos los días</text>
      </g>

      <g id="m-nodo4" data-paso="" className={styles.d580}>
        <rect x="160" y="197" width="172" height="70" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="1" />
        <text className={styles.n} x="174" y="223">4</text>
        <text className={styles.t} x="174" y="243">Publica y corrige</text>
        <text className={styles.s} x="174" y="259">cada semana</text>
      </g>

      <g id="m-salida" data-paso="" className={styles.d1240}>
        <line x1="584" y1="232" x2="600" y2="232" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1an)" />
        <text className={styles.eb} x="604" y="170">SALIDA</text>
        <rect x="604" y="196" width="112" height="72" rx="4" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
        <text className={styles.t} x="616" y="226">Certifícate y<tspan x="616" dy="16">enseña</tspan></text>
      </g>
    </svg>
  );
}

/**
 * Versión vertical para móvil: mismo contenido, con la vía de retorno que
 * cierra el bucle. El SVG entregado no trae los identificadores de la
 * secuencia, así que se muestra completo, sin revelado por pasos.
 */
export function MetodoDiagramaMovil() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 580"
      role="img"
      aria-labelledby="d1mt d1md"
      className={`${styles.diagrama} ${styles.movil}`}
    >
      <title id="d1mt">Método AINI en móvil: el mismo ciclo cerrado, en vertical</title>
      <desc id="d1md">
        Los cuatro movimientos se leen de arriba abajo y una vía de retorno los cierra en bucle,
        ocho veces.
      </desc>

      <defs>
        <marker id="d1man" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0.5 L10 5 L0 9.5 Z" fill="#171717" />
        </marker>
      </defs>

      <text className={styles.eb} x="44" y="20">ENTRADA</text>
      <rect x="44" y="28" width="296" height="56" rx="4" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
      <text className={styles.n} x="58" y="52">0</text>
      <text className={styles.t} x="78" y="52">Declara tu proyecto,</text>
      <text className={styles.s} x="58" y="72">no un ejercicio</text>
      <line x1="192" y1="84" x2="192" y2="108" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1man)" />

      <path d="M100 408 V470 H20 V100 H100 V110" fill="none" stroke="#C9B79C" strokeWidth="1.5" markerEnd="url(#d1man)" />
      <rect x="20" y="90" width="80" height="20" rx="2" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
      <text className={styles.t} x="60" y="104" textAnchor="middle" fontSize="12">×8 semanas</text>

      <rect x="44" y="112" width="296" height="62" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="1" />
      <text className={styles.n} x="58" y="138">1</text>
      <text className={styles.t} x="78" y="138">Aprende en dosis cortas</text>
      <text className={styles.s} x="58" y="160">25 min al día</text>
      <line x1="192" y1="174" x2="192" y2="188" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1man)" />

      <rect x="44" y="190" width="296" height="62" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="1" />
      <text className={styles.n} x="58" y="216">2</text>
      <text className={styles.t} x="78" y="216">Aplica en vivo</text>
      <text className={styles.s} x="58" y="238">martes y jueves</text>
      <line x1="192" y1="252" x2="192" y2="266" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1man)" />

      <rect x="44" y="268" width="296" height="62" rx="4" fill="#FFFFFF" stroke="#C1440E" strokeWidth="1.5" />
      <text className={styles.n} x="58" y="294" fill="#C1440E">3</text>
      <text className={styles.t} x="78" y="294" fill="#C1440E">Itera con tu tutor</text>
      <text className={styles.s} x="58" y="316">todos los días</text>
      <line x1="192" y1="330" x2="192" y2="344" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1man)" />

      <rect x="44" y="346" width="296" height="62" rx="4" fill="#FFFFFF" stroke="#171717" strokeWidth="1" />
      <text className={styles.n} x="58" y="372">4</text>
      <text className={styles.t} x="78" y="372">Publica y corrige</text>
      <text className={styles.s} x="58" y="394">cada semana</text>

      <line x1="300" y1="408" x2="300" y2="494" stroke="#171717" strokeWidth="1.2" markerEnd="url(#d1man)" />
      <text className={styles.eb} x="44" y="490">SALIDA</text>
      <rect x="44" y="498" width="296" height="56" rx="4" fill="#FFFFFF" stroke="#C9B79C" strokeWidth="1" />
      <text className={styles.t} x="58" y="532">Certifícate y enseña</text>
    </svg>
  );
}
