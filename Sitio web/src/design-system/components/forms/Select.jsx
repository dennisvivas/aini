import React from "react";
import styles from "./Select.module.css";

export function Select(props) {
  const { label, options = [], value, onChange, disabled } = props;
  return (
    <label className={styles.label}>
      {label && <span className={styles.labelText}>{label}</span>}
      <select value={value} disabled={disabled} onChange={onChange} className={styles.select}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
