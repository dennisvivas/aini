export interface CardProps {
  eyebrow?: string;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
