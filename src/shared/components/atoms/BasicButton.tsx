import type { BasicButtonProps } from '@/shared/types/buttonTypes';
import classNameMerge from '@/shared/utils/classNameMerge';

export default function BasicButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className,
  onClick,
  id,
  title,
  type = 'button',
}: BasicButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105';
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-5 text-lg',
  }[size];

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 focus:ring-primary-500 shadow-lg hover:shadow-xl',
    outline:
      'border border-white/30 text-white hover:bg-white/10 focus:ring-white/50 backdrop-blur-sm',
    ghost: 'text-white hover:bg-white/10 focus:ring-white/50',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      id={id}
      className={classNameMerge([
        base,
        sizes,
        variants,
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      ])}
    >
      {children}
    </button>
  );
}
