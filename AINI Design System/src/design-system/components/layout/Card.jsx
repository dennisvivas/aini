import React from "react";

export function Card(props) {
  const { eyebrow, title, children, footer } = props;
  return (
    <div style={{
      background: "var(--surface-card)", border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)", padding: "24px", fontFamily: "var(--font-sans)",
      boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", gap: "10px",
    }}>
      {eyebrow && (
        <span style={{ fontSize: "var(--fs-caption)", fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-eyebrow)", textTransform: "uppercase", color: "var(--ini-terracotta)" }}>
          {eyebrow}
        </span>
      )}
      {title && <h3 style={{ margin: 0, fontFamily: "var(--font-serif)", fontSize: "var(--fs-h3)", fontWeight: "var(--fw-semibold)", color: "var(--text-primary)" }}>{title}</h3>}
      {children && <div style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>{children}</div>}
      {footer && <div style={{ marginTop: "8px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)" }}>{footer}</div>}
    </div>
  );
}
