import React from "react";
import styles from "./Button.module.css";

const SIZE_CLASS = { sm: styles.sm, md: styles.md, lg: styles.lg };
const VARIANT_CLASS = { primary: styles.primary, secondary: styles.secondary, outline: styles.outline, ghost: styles.ghost };

export function Button(props) {
  const {
    variant = "primary",
    size = "md",
    disabled = false,
    children,
    onClick,
    type = "button",
  } = props;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${SIZE_CLASS[size] || styles.md} ${VARIANT_CLASS[variant] || styles.primary}`}
    >
      {children}
    </button>
  );
}
