import type { BasicTextProps } from '@/shared/types/textTypes';
import classNameMerge from '@/shared/utils/classNameMerge';

export default function BasicText({
  children,
  as: Component = 'p',
  variant = 'body',
  size = 'md',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className,
}: BasicTextProps) {
  const variants = {
    body: 'leading-relaxed',
    caption: 'leading-tight',
    heading: 'leading-tight font-semibold',
    subheading: 'leading-snug font-medium',
  }[variant];

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }[size];

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }[weight];

  const colors = {
    primary: 'text-white',
    secondary: 'text-white/90',
    muted: 'text-white/70',
    accent: 'text-accent-400',
    error: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
  }[color];

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  }[align];

  return (
    <Component
      className={classNameMerge([
        variants,
        sizes,
        weights,
        colors,
        alignments,
        className,
      ])}
    >
      {children}
    </Component>
  );
}
