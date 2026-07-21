import React from "react";

const SIZES = {
  sm: { padding: "8px 16px", fontSize: "var(--fs-small)" },
  md: { padding: "12px 22px", fontSize: "var(--fs-body)" },
  lg: { padding: "16px 28px", fontSize: "var(--fs-body-lg)" },
};

const VARIANTS = {
  primary: {
    background: "var(--accent-cta)",
    color: "var(--ini-white)",
    border: "1px solid var(--accent-cta)",
  },
  secondary: {
    background: "var(--ini-black)",
    color: "var(--ini-white)",
    border: "1px solid var(--ini-black)",
  },
  outline: {
    background: "transparent",
    color: "var(--ini-black)",
    border: "1.5px solid var(--ini-black)",
  },
  ghost: {
    background: "transparent",
    color: "var(--ini-black)",
    border: "1px solid transparent",
  },
};

const HOVER = {
  primary: "var(--accent-cta-hover)",
  secondary: "#2c2c2c",
  outline: "var(--ini-bone)",
  ghost: "var(--ini-bone)",
};

export function Button(props) {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    children,
    onClick,
    type = "button",
  } = props;
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "0.01em",
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background-color 120ms ease, border-color 120ms ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        ...s,
        ...v,
        background: !disabled && hover ? HOVER[variant] : v.background,
        borderColor: !disabled && hover && variant === "outline" ? "var(--ini-black)" : v.border,
      }}
    >
      {children}
    </button>
  );
}
