import { ArrowRight } from 'lucide-react';
import { Icon } from '@/components/common/Icon';
import { Slider } from '@/components/common/Slider';

interface Feature {
  icon: string;
  iconVariant?: 'solid' | 'outline';
  title: string;
  description: string;
  learnMoreLink?: string;
}

interface FeatureSectionProps {
  title: string;
  description?: string;
  features: Feature[];
  className?: string;
}

const defaultFeatures: Feature[] = [
  {
    icon: 'devicePhoneMobile',
    title: 'Responsive Design',
    description: 'Our components automatically adapt to all screen sizes, ensuring your site looks great everywhere.',
    learnMoreLink: '#',
  },
  {
    icon: 'paintBrush',
    title: 'Customizable Themes',
    description: 'Easily create and switch between themes with our simple color key system. No CSS expertise required.',
    learnMoreLink: '#',
  },
  {
    icon: 'chartBar',
    title: 'Conversion Focused',
    description: 'Our components are designed to drive conversions with strategically placed CTAs and optimized layouts.',
    learnMoreLink: '#',
  },
  {
    icon: 'bolt',
    title: 'Lightning Fast',
    description: 'Optimized for performance to ensure your website loads quickly and efficiently.',
    learnMoreLink: '#',
  },
  {
    icon: 'shieldCheck',
    title: 'Secure by Default',
    description: 'Built with security best practices to protect your data and your users.',
    learnMoreLink: '#',
  },
  {
    icon: 'cog',
    title: 'Easy Integration',
    description: 'Simple to integrate with your existing tools and workflows.',
    learnMoreLink: '#',
  },
];

export function FeatureSection({ 
  title, 
  description, 
  features = defaultFeatures,
  className 
}: FeatureSectionProps) {
  return (
    <section className={`py-20 bg-background ${className}`}>
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

        <Slider className="px-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
            >
              <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow transition-shadow h-full">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon} variant={feature.iconVariant} size="lg" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                {feature.learnMoreLink && (
                  <a href={feature.learnMoreLink} className="text-primary inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}