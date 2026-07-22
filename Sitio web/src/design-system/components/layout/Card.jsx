import React from "react";
import styles from "./Card.module.css";

export function Card(props) {
  const { eyebrow, title, children, footer } = props;
  return (
    <div className={styles.card}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {title && <h3 className={styles.title}>{title}</h3>}
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
