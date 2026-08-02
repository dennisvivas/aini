export interface ButtonProps {
  /** Elemento sobre el que se pinta. `"a"` para un CTA que navega de verdad. */
  as?: "button" | "a" | "span";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Solo se emite cuando `as` es `"button"`. */
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  /** Solo se emite cuando `as` es `"button"`. */
  type?: "button" | "submit";
  className?: string;
  /** Cualquier otra prop se pasa tal cual al elemento (href, aria-*, data-*, …). */
  [prop: string]: unknown;
}
export function Button(props: ButtonProps): JSX.Element;
