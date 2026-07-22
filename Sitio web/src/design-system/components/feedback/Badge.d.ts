export interface BadgeProps {
  children: React.ReactNode;
  tone?: "neutral" | "dark" | "cta" | "gold";
}
export function Badge(props: BadgeProps): JSX.Element;
