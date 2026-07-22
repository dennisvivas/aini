import React from "react";
import styles from "./Callout.module.css";

const TONE_CLASS = { info: styles.info, notice: styles.notice };

export function Callout(props) {
  const { title, children, tone = "info" } = props;
  return (
    <div className={`${styles.callout} ${TONE_CLASS[tone] || styles.info}`}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
