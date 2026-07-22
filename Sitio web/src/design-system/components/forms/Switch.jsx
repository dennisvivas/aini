import React from "react";
import styles from "./Switch.module.css";

export function Switch(props) {
  const { label, checked, onChange, disabled } = props;
  return (
    <label className={`${styles.label} ${disabled ? styles.disabled : ""}`}>
      <span
        onClick={() => !disabled && onChange && onChange({ target: { checked: !checked } })}
        className={`${styles.track} ${checked ? styles.checked : ""}`}
      >
        <span className={`${styles.thumb} ${checked ? styles.checked : ""}`} />
      </span>
      {label && <span className={styles.text}>{label}</span>}
    </label>
  );
}
