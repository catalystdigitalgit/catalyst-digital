import { Check } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <section className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core features.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-card rounded-lg border shadow-sm p-8 flex flex-col">
              <h3 className="text-xl font-medium mb-2">Starter</h3>
              <p className="text-muted-foreground mb-6">Perfect for small businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['All UI components', 'Basic support', '1 team member', 'Community access'].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-card rounded-lg border border-primary shadow-md p-8 flex flex-col relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-medium mb-2">Professional</h3>
              <p className="text-muted-foreground mb-6">For growing teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  'All Starter features',
                  'Priority support',
                  '5 team members',
                  'Custom themes',
                  'Advanced analytics'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="high" className="w-full">Get Started</Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-card rounded-lg border shadow-sm p-8 flex flex-col">
              <h3 className="text-xl font-medium mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$199</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  'All Professional features',
                  '24/7 dedicated support',
                  'Unlimited team members',
                  'Custom integrations',
                  'Dedicated account manager',
                  'Advanced security'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">Contact Sales</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}