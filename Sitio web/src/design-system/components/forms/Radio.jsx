import React from "react";
import styles from "./Radio.module.css";

export function Radio(props) {
  const { label, checked, onChange, name, disabled } = props;
  return (
    <label className={`${styles.label} ${disabled ? styles.disabled : ""}`}>
      <span className={`${styles.outer} ${checked ? styles.checked : ""}`}>
        {checked && <span className={styles.dot} />}
      </span>
      <input type="radio" name={name} checked={checked} onChange={onChange} disabled={disabled} className={styles.input} />
      <span className={styles.text}>{label}</span>
    </label>
  );
}
