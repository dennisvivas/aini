export interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  tone?: "info" | "notice";
}
export function Callout(props: CalloutProps): JSX.Element;
