import React from "react";

export function Select(props) {
  const { label, options = [], value, onChange, disabled } = props;
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-sans)", width: "100%" }}>
      {label && (
        <span style={{ fontSize: "var(--fs-small)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{label}</span>
      )}
      <select
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          padding: "11px 14px",
          borderRadius: "var(--radius-sm)",
          border: "1.5px solid var(--border-subtle)",
          background: disabled ? "var(--ini-bone)" : "var(--ini-white)",
          color: "var(--text-primary)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
