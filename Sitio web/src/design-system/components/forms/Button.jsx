import React from "react";
import styles from "./Button.module.css";

const SIZE_CLASS = { sm: styles.sm, md: styles.md, lg: styles.lg };
const VARIANT_CLASS = { primary: styles.primary, secondary: styles.secondary, outline: styles.outline, ghost: styles.ghost };

/**
 * Botón del design system.
 *
 * `as` pinta el mismo botón sobre otro elemento — en la práctica `as="a"`,
 * para un CTA que navega de verdad en vez de simularlo con un onClick.
 * `type` y `disabled` solo se emiten cuando el elemento es un <button>: en un
 * <a> no significan nada y `disabled` ni siquiera es un atributo válido.
 */
export function Button(props) {
  const {
    as: Etiqueta = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    children,
    onClick,
    type = "button",
    className = "",
    ...rest
  } = props;
  const esBoton = Etiqueta === "button";
  return (
    <Etiqueta
      {...(esBoton ? { type, disabled } : {})}
      onClick={onClick}
      className={`${styles.btn} ${SIZE_CLASS[size] || styles.md} ${VARIANT_CLASS[variant] || styles.primary} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Etiqueta>
  );
}
