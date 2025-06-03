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
              We follow a proven process to ensure every project is delivered successfully
              and meets your business objectives.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-4 md:before:mx-auto before:w-0.5 before:h-full before:bg-border">
          {[
            {
              title: 'Discovery',
              description: 'We start by understanding your business, goals, and target audience.'
            },
            {
              title: 'Strategy',
              description: 'Develop a plan tailored to your specific needs, outlining key milestones and deliverables.'
            },
            {
              title: 'Creation',
              description: 'Using cutting-edge development practices and AI-powered tools for efficient, high-quality delivery.'
            },
            {
              title: 'Launch',
              description: 'Deploy your project with thorough testing, with the option to provide ongoing support and updates.'
            }
          ].map((step, index) => (
            <AnimatedSection 
              key={index} 
              delay={index * 200}
              className={cn(
                'relative flex items-start mb-4 last:mb-0',
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              )}
            >
              <div className={cn(
                'absolute left-4 md:left-1/2 w-6 h-6 bg-primary rounded-full border-3 border-background transform -translate-x-1/2 z-10'
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