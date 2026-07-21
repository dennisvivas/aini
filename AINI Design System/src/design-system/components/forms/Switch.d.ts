export interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
  disabled?: boolean;
}
export function Switch(props: SwitchProps): JSX.Element;
