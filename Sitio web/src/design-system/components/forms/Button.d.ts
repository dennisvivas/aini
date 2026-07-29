export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  /** Cualquier otra prop se pasa tal cual al <button> (aria-*, data-*, …). */
  [prop: string]: unknown;
}
export function Button(props: ButtonProps): JSX.Element;
