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

export function ProcessSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              At the heart of our process is empathetic design, communication, and collaboration. 
              We partner closely with you to ensure we deliver exactly what you envision, while 
              following a proven methodology that ensures every project meets your business objectives.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 md:before:ml-0 before:w-0.5 before:h-full before:bg-border">
          {[
            {
              title: 'Discovery',
              description: 'We start by understanding your business, goals, and target audience. Great products come from great research.'
            },
            {
              title: 'Strategy',
              description: 'Develop a plan tailored to your specific needs, with key milestones and deliverables to ensure alignment throughout the process.'
            },
            {
              title: 'Creation',
              description: 'Using empathetic design and cutting-edge development practices, we work collaboratively with you to bring your vision to life.'
            },
            {
              title: 'Launch',
              description: 'Deploy your project with thorough testing, ongoing communication, and the option for continued support to ensure long-term success.'
            }
          ].map((step, index) => (
            <AnimatedSection 
              key={index} 
              delay={index * 200}
              className={cn(
                'relative flex items-start mb-4 last:mb-0 group',
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              <div className={cn(
                'absolute left-4 md:left-1/2 w-5 h-5 bg-primary-dark group-hover:bg-primary transition-all duration-300 rounded-full border-2 border-primary transform -translate-x-1/2 z-10'
              )}></div>
              <div className={cn(
                'ml-12 md:ml-0 md:w-[45%]',
                index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
              )}>
                <div className="bg-card border rounded-lg p-4 hover:border-primary-dark transition-all duration-300">
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
} 