import React from "react";
import isotipoWhite from "../../assets/isotipo-sol-de-nodos-white.svg";

export function InstitutionalFlyer(props) {
  const {
    eventName = "Foro Regional de Gobernanza de IA",
    date = "12 de noviembre, 2026",
    time = "9:00 – 13:00",
    modality = "Presencial · Bogotá, Colombia",
    link = "aini.org/foro-gobernanza",
  } = props;
  return (
    <div style={{
      width: 480, background: "var(--ini-bone)", fontFamily: "var(--font-sans)",
      border: "1px solid var(--ini-sand)", display: "flex", flexDirection: "column",
    }}>
      <div style={{ background: "var(--ini-black)", padding: "28px 32px", display: "flex", alignItems: "center", gap: "14px" }}>
        <img src={isotipoWhite} style={{ width: 40, height: 40 }} />
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, color: "var(--ini-white)", lineHeight: 1 }}>AINI</div>
          <div style={{ fontSize: 11, color: "var(--ini-bone)", marginTop: 4 }}>Instituto de Inteligencia Artificial para América Latina y el Caribe</div>
        </div>
      </div>
      <div style={{ padding: "40px 32px", flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
        <span style={{ display: "inline-block", alignSelf: "flex-start", whiteSpace: "nowrap", background: "var(--ini-terracotta)", color: "var(--ini-white)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 2 }}>Convocatoria abierta</span>
        <h1 style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: 30, lineHeight: 1.2, color: "var(--ini-black)" }}>{eventName}</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15, color: "var(--ini-black)" }}>
          <div><strong>Fecha:</strong> {date}</div>
          <div><strong>Hora:</strong> {time}</div>
          <div><strong>Modalidad:</strong> {modality}</div>
        </div>
      </div>
      <div style={{ background: "var(--ini-white)", borderTop: "1px solid var(--ini-sand)", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--ini-black)" }}>{link}</span>
        <span style={{ background: "var(--ini-black)", color: "var(--ini-white)", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: 2 }}>Inscríbete</span>
      </div>
    </div>
  );
}
