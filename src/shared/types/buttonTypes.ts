export type BasicButtonProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
};
