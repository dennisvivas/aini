import React from "react";
import styles from "./Tag.module.css";

export function Tag(props) {
  const { children, onRemove } = props;
  return (
    <span className={styles.tag}>
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Quitar" className={styles.remove}>×</button>
      )}
    </span>
  );
}
