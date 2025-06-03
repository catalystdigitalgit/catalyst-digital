import { Icon } from '@/components/common/Icon';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

function AnimatedSection({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        'opacity-0 translate-y-8 transition-all duration-1000',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function WhyChooseUs() {
  const features = [
    {
      icon: 'users',
      title: 'Client-Focused Approach',
      description: 'We use empathy in our discovery and design phases to create solutions with a purpose.'
    },
    {
      icon: 'lightBulb',
      title: 'Innovative Solutions',
      description: 'We think outside the box to create unique digital experiences that set you apart.'
    },
    {
      icon: 'rocketLaunch',
      title: 'Seamless Delivery',
      description: 'We leverage cutting-edge technologies to deliver rapid, high-quality results.'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine creativity with technical expertise to deliver exceptional digital solutions
              that help your business stand out in today's competitive landscape.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div className="bg-card border rounded-lg p-6 h-full">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon name={item.icon} size="lg" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
} 