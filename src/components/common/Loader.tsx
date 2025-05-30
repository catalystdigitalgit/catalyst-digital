import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center min-h-[100px] w-full">
      <div
        className={cn(
          'animate-spin-slow rounded-full border-solid border-primary border-t-transparent',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}