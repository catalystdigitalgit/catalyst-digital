import { ReactNode } from 'react';
import { Button } from '@/components/common/Button';
import { Image } from '@unpic/react';

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
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={backgroundImage}
              alt="Background"
              layout="fullWidth"
              priority={true}
              background="auto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/55 z-[1] pointer-events-none" />
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