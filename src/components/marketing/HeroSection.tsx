import { ReactNode } from 'react';
import { Button } from '@/components/common/Button';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  buttonVariant?: 'high' | 'medium' | 'low' | 'outline';
  backgroundImage?: string; // expects a public path, e.g. '/whatWeDo.jpg'
  children?: ReactNode;
}

export function HeroSection({
  title,
  description,
  buttonText,
  buttonAction,
  buttonVariant = 'high',
  backgroundImage,
  children,
}: HeroSectionProps) {
  return (
    <section
      className={`relative py-20 pt-36 md:py-48 md:pb-40 overflow-hidden ${
        backgroundImage ? '' : 'bg-gradient-to-br from-background to-secondary/30'
      }`}
    >
      {backgroundImage && (
        <>
          <img 
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={(e) => {
              console.error('Failed to load background image:', backgroundImage);
              console.error('Error event:', e);
            }}
            onLoad={() => {
              console.log('Background image loaded successfully:', backgroundImage);
            }}
          />
          <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
        </>
      )}
      <div className="container mx-auto px-4 relative z-[10]">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8">
            {description}
          </p>
          <Button
            variant={buttonVariant}
            size="lg"
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
          {children}
        </div>
      </div>

    </section>
  );
} 