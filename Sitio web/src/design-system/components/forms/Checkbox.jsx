import React from "react";
import styles from "./Checkbox.module.css";

export function Checkbox(props) {
  const { label, checked, onChange, disabled } = props;
  return (
    <label className={`${styles.label} ${disabled ? styles.disabled : ""}`}>
      <span className={`${styles.box} ${checked ? styles.checked : ""}`}>
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="var(--ini-white)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className={styles.input} />
      <span className={styles.text}>{label}</span>
    </label>
  );
}
