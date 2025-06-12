import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
  className?: string;
}

export function SuccessNotification({
  isVisible,
  onClose,
  title,
  message,
  autoClose = true,
  autoCloseDelay = 5000,
  className
}: SuccessNotificationProps) {
  useEffect(() => {
    if (isVisible && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoClose, autoCloseDelay, onClose]);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed top-4 right-4 left-4 md:left-auto z-50 max-w-md w-full bg-background border border-border rounded-lg shadow-lg p-4 animate-slide-in-right",
      className
    )}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground mb-1">
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 