import React from "react";

const TONES = {
  info: { background: "var(--ini-bone)", border: "var(--ini-sand)" },
  notice: { background: "#FBEFE3", border: "var(--ini-gold)" },
};

export function Callout(props) {
  const { title, children, tone = "info" } = props;
  const t = TONES[tone] || TONES.info;
  return (
    <div style={{
      background: t.background, border: `1px solid ${t.border}`, borderRadius: "var(--radius-md)",
      padding: "18px 20px", fontFamily: "var(--font-sans)", color: "var(--text-primary)",
    }}>
      {title && <div style={{ fontWeight: "var(--fw-semibold)", marginBottom: "6px", fontSize: "var(--fs-body)" }}>{title}</div>}
      <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>{children}</div>
    </div>
  );
}
