import React from "react";
import styles from "./Badge.module.css";

const TONE_CLASS = { neutral: styles.neutral, dark: styles.dark, cta: styles.cta, gold: styles.gold };

export function Badge(props) {
  const { children, tone = "neutral" } = props;
  return (
    <span className={`${styles.badge} ${TONE_CLASS[tone] || styles.neutral}`}>
      {children}
    </span>
  );
}
