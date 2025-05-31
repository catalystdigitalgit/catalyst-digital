import { ReactNode } from 'react';
import { SplitText } from '@/components/animation/SplitText';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  title: string;
  highlightedText?: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  buttonVariant?: 'high' | 'medium' | 'low' | 'outline';
  buttonSize?: 'sm' | 'md' | 'lg';
  className?: string;
  backgroundColor?: 'primary' | 'secondary';
  rightIcon?: ReactNode;
}

export function CTASection({
  title,
  highlightedText,
  description,
  buttonText,
  buttonAction,
  buttonVariant = 'outline',
  buttonSize = 'lg',
  className,
  backgroundColor = 'secondary',
  rightIcon
}: CTASectionProps) {
  // Split the title by the highlighted text if provided
  const titleParts = highlightedText ? title.split(highlightedText) : [title];
  
  return (
    <section 
      className={cn(
        "py-20", 
        backgroundColor === 'primary' 
          ? "bg-primary text-primary-foreground" 
          : "bg-secondary text-primary-foreground",
        className
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white inline-flex flex-wrap justify-center">
          {titleParts[0]}
          {highlightedText && (
            <SplitText 
              text={highlightedText}
              className="text-primary mx-2"
              delay={0.1}
              duration={0.8}
              ease="power4.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
          )}
          {titleParts.length > 1 && titleParts[1]}
        </h2>
        <p className={cn(
          "text-lg mb-8 max-w-2xl mx-auto",
          backgroundColor === 'primary' ? "text-primary-foreground/90" : "text-white/90"
        )}>
          {description}
        </p>
        <Button 
          variant={buttonVariant}
          size={buttonSize}
          onClick={buttonAction}
          rightIcon={rightIcon}
          className={cn(
            backgroundColor === 'primary' && buttonVariant === 'outline' && 
            "bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
          )}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
} 