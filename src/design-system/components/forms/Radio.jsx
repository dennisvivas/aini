import React from "react";

export function Radio(props) {
  const { label, checked, onChange, name, disabled } = props;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-sans)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}>
      <span
        style={{
          width: 18, height: 18, borderRadius: "50%",
          border: `1.5px solid ${checked ? "var(--ini-black)" : "var(--border-subtle)"}`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--ini-black)" }} />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} disabled={disabled} style={{ display: "none" }} />
      <span style={{ fontSize: "var(--fs-body)", color: "var(--text-primary)" }}>{label}</span>
    </label>
  );
}
