import React from "react";

const TONES = {
  neutral: { background: "var(--ini-bone)", color: "var(--ini-black)", border: "var(--border-subtle)" },
  dark: { background: "var(--ini-black)", color: "var(--ini-white)", border: "var(--ini-black)" },
  cta: { background: "var(--ini-terracotta)", color: "var(--ini-white)", border: "var(--ini-terracotta)" },
  gold: { background: "var(--ini-gold)", color: "var(--ini-black)", border: "var(--ini-gold)" },
};

export function Badge(props) {
  const { children, tone = "neutral" } = props;
  const t = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)",
      textTransform: "uppercase", padding: "4px 10px", borderRadius: "var(--radius-sm)",
      background: t.background, color: t.color, border: `1px solid ${t.border}`,
    }}>
      {children}
    </span>
  );
}
