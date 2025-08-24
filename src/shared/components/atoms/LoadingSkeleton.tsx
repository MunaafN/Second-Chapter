import classNameMerge from '@/shared/utils/classNameMerge';

type LoadingSkeletonProps = {
  width?: string;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
};

export default function LoadingSkeleton({
  width = 'w-full',
  height = 'h-4',
  variant = 'rectangular',
  className,
}: LoadingSkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200';
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={classNameMerge([
        baseStyles,
        variants[variant],
        width,
        height,
        className,
      ])}
    />
  );
}
