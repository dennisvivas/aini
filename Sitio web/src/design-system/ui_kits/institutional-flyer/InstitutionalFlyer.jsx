import React from "react";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";
import styles from "./InstitutionalFlyer.module.css";

export function InstitutionalFlyer(props) {
  const {
    eventName = "Foro Regional de Gobernanza de IA",
    date = "12 de noviembre, 2026",
    time = "9:00 – 13:00",
    modality = "Presencial · Bogotá, Colombia",
    link = "aini.org/foro-gobernanza",
  } = props;
  return (
    <div className={styles.flyer}>
      <div className={styles.header}>
        <img src={isotipoWhite} className={styles.logo} />
        <div>
          <div className={styles.wordmark}>AINI</div>
          <div className={styles.subtitle}>Instituto de Inteligencia Artificial para América Latina y el Caribe</div>
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>Convocatoria abierta</span>
        <h1 className={styles.title}>{eventName}</h1>
        <div className={styles.details}>
          <div><strong>Fecha:</strong> {date}</div>
          <div><strong>Hora:</strong> {time}</div>
          <div><strong>Modalidad:</strong> {modality}</div>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.link}>{link}</span>
        <span className={styles.cta}>Inscríbete</span>
      </div>
    </div>
  );
}
