import { Check } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface PricingTier {
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  features: string[];
  buttonText: string;
  buttonVariant?: 'high' | 'outline';
  isPopular?: boolean;
}

interface PricingSectionProps {
  title: string;
  description?: string;
  tiers: PricingTier[];
  className?: string;
}

export function PricingSection({ title, description, tiers, className }: PricingSectionProps) {
  return (
    <section className={`py-20 bg-secondary/50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-card rounded-lg border ${
                tier.isPopular ? 'border-primary shadow-md' : 'shadow-sm'
              } p-8 flex flex-col relative`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-xl font-medium mb-2">{tier.name}</h3>
              <p className="text-muted-foreground mb-6">{tier.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {tier.price.currency}{tier.price.amount}
                </span>
                <span className="text-muted-foreground">/{tier.price.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.buttonVariant || 'outline'}
                className="w-full"
              >
                {tier.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}