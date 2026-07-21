import React from "react";

export function Input(props) {
  const { label, placeholder, value, onChange, type = "text", error, disabled } = props;
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-sans)", width: "100%" }}>
      {label && (
        <span style={{ fontSize: "var(--fs-small)", fontWeight: "var(--fw-medium)", color: "var(--text-primary)" }}>{label}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-body)",
          padding: "11px 14px",
          borderRadius: "var(--radius-sm)",
          border: `1.5px solid ${error ? "var(--ini-terracotta)" : focus ? "var(--ini-black)" : "var(--border-subtle)"}`,
          outline: "none",
          background: disabled ? "var(--ini-bone)" : "var(--ini-white)",
          color: "var(--text-primary)",
          transition: "border-color 120ms ease",
        }}
      />
      {error && <span style={{ fontSize: "var(--fs-caption)", color: "var(--ini-terracotta)" }}>{error}</span>}
    </label>
  );
}
