import React from "react";

export function Tag(props) {
  const { children, onRemove } = props;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-sans)",
      fontSize: "var(--fs-small)", color: "var(--ini-black)", background: "var(--ini-white)",
      border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)", padding: "5px 10px",
    }}>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Quitar" style={{
          border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "14px", lineHeight: 1, padding: 0,
        }}>×</button>
      )}
    </span>
  );
}
