import React from "react";
import styles from "./Input.module.css";

export function Input(props) {
  const { label, placeholder, value, onChange, type = "text", error, disabled } = props;
  return (
    <label className={styles.label}>
      {label && <span className={styles.labelText}>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
}
