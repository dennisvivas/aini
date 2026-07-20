import React from "react";

export function Checkbox(props) {
  const { label, checked, onChange, disabled } = props;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <span
        style={{
          width: 18, height: 18, borderRadius: "var(--radius-sm)",
          border: `1.5px solid ${checked ? "var(--ini-black)" : "var(--border-subtle)"}`,
          background: checked ? "var(--ini-black)" : "var(--ini-white)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="var(--ini-white)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ display: "none" }} />
      <span style={{ fontSize: "var(--fs-body)", color: "var(--text-primary)" }}>{label}</span>
    </label>
  );
}
