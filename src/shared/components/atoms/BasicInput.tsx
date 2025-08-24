import type { BasicInputProps } from '@/shared/types/inputTypes';
import classNameMerge from '@/shared/utils/classNameMerge';

export default function BasicInput({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  readOnly = false,
  required = false,
  autoComplete,
  autoFocus = false,
  className,
  onChange,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: BasicInputProps) {
  const baseStyles =
    'w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/70 transition-all duration-200 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm';
  
  const disabledStyles = 'bg-white/5 cursor-not-allowed opacity-50';
  const readOnlyStyles = 'bg-white/5 cursor-default';

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={classNameMerge([
        baseStyles,
        disabled && disabledStyles,
        readOnly && readOnlyStyles,
        className,
      ])}
    />
  );
}
