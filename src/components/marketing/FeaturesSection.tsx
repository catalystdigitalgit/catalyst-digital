import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

interface FeaturesSectionProps {
  image: string;
  heading: string;
  subHeading?: string;
  bodyText: string;
  buttonProps?: {
    text: string;
    href: string;
    variant?: 'high' | 'medium' | 'low' | 'outline';
  };
  imagePosition?: 'left' | 'right';
  maxWidth?: boolean;
  className?: string;
}

export function FeaturesSection({
  image,
  heading,
  subHeading,
  bodyText,
  buttonProps,
  imagePosition = 'left',
  maxWidth = true,
  className,
}: FeaturesSectionProps) {
  const containerClasses = cn(
    'py-20 bg-background',
    className
  );

  const contentClasses = cn(
    'container mx-auto px-4',
    maxWidth && 'max-w-7xl'
  );

  const gridClasses = cn(
    'grid gap-12 items-center',
    'grid-cols-1 lg:grid-cols-2',
    imagePosition === 'right' && 'lg:grid-flow-col lg:auto-cols-fr'
  );

  return (
    <section className={containerClasses}>
      <div className={contentClasses}>
        <div className={gridClasses}>
          <div className={cn(
            'relative aspect-[4/3] rounded-2xl overflow-hidden',
            imagePosition === 'right' && 'lg:order-2'
          )}>
            <img
              src={image}
              alt={heading}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            {subHeading && (
              <p className="text-primary font-medium">{subHeading}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {heading}
            </h2>
            <p className="text-muted-foreground text-lg">
              {bodyText}
            </p>
            {buttonProps && (
              <Button
                variant={buttonProps.variant || 'high'}
                size="lg"
                className="mt-8"
                onClick={() => window.location.href = buttonProps.href}
              >
                {buttonProps.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}