import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export function FeaturedWork() {
  const navigate = useNavigate();
  
  const projects = [
    {
      title: "Dazy Chain",
      image: "/DazyChainRing.jpg",
      category: "E-commerce",
      description: "E-commerce jewellery store."
    },
    {
      title: "The Party Booth Co.",
      image: "/PartyBoothCoWebsite.png",
      category: "Web Design",
      description: "Photobooth hire website."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take a look at some of our recent projects and see how we've helped businesses
              achieve their digital goals.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div className="group relative overflow-hidden rounded-lg cursor-pointer"
                   onClick={() => navigate('/work')}>
                <div className="aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-primary text-sm font-medium mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <button 
            className="flex items-center justify-center gap-2 text-primary ml-auto"
            onClick={() => navigate('/work')}
          >
            View Projects
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
} 