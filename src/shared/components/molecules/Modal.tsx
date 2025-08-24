import { useEffect } from 'react';
import { BasicButton, BasicText, Icon } from '@/shared/components/atoms';
import classNameMerge from '@/shared/utils/classNameMerge';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className={classNameMerge([
          'relative w-full mx-4 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20',
          sizes[size],
        ])}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <BasicText as="h2" variant="heading" size="lg" className="text-white">
            {title}
          </BasicText>
          <BasicButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <Icon name="close" size="sm" />
          </BasicButton>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/20">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
