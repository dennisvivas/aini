import React from "react";

export function Switch(props) {
  const { label, checked, onChange, disabled } = props;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <span
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
        style={{
          width: 38, height: 22, borderRadius: "var(--radius-pill)",
          background: checked ? "var(--ini-black)" : "var(--border-subtle)",
          position: "relative", transition: "background 150ms ease", flexShrink: 0,
        }}
      >
        <span style={{
          position: "absolute", top: 2, left: checked ? 18 : 2, width: 18, height: 18, borderRadius: "50%",
          background: "var(--ini-white)", transition: "left 150ms ease", boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }} />
      </span>
      {label && <span style={{ fontSize: "var(--fs-body)", color: "var(--text-primary)" }}>{label}</span>}
    </label>
  );
}
