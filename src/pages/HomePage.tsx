import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { SplitText } from '@/components/animation/SplitText';
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
      ref={elementRef}
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

export default function HomePage() {
  const navigate = useNavigate();

  const handleServiceClick = (service: string) => {
    navigate('/services');
    setTimeout(() => {
      const element = document.querySelector(`[data-service="${service}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen bg-background flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="mb-6">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your home for
              </div>
              <div className="flex items-center gap-2 text-4xl md:text-5xl lg:text-6xl font-medium">
                <span className="digital-text text-3xl md:text-4xl lg:text-5xl">digital</span>
                <SplitText
                  text="excellence"
                  className="text-primary"
                  delay={0.1}
                  duration={0.8}
                  ease="power4.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                />
              </div>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              We are a digital agency specialising in transforming ideas into powerful digital experiences.
              From compelling brand identities to high-performance websites, we tailor every element to elevate your digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="high" 
                size="lg" 
                rightIcon={<ArrowRight className="h-5 w-5" />}
                onClick={() => navigate('/contact')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate('/work')}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {[
                { title: 'Branding & Identity', service: 'branding', icon: 'paintBrush' },
                { title: 'Web Development', service: 'development', icon: 'computerDesktop' },
                { title: 'E-Commerce Solutions', service: 'ecommerce', icon: 'shoppingCart' },
                { title: 'Content Creation', service: 'content', icon: 'camera' }
              ].map((item) => (
                <div
                  key={item.service}
                  onClick={() => handleServiceClick(item.service)}
                  className="group cursor-pointer flex items-center gap-3"
                >
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-md flex items-center justify-center">
                    <Icon name={item.icon} />
                  </div>
                  <h2 className="text-2xl font-medium relative inline-block">
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-[120%] h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </h2>
                </div>
              ))}
            </div>
            <Button 
              variant="high"
              size="lg"
              className="w-full mt-auto"
              rightIcon={<ArrowUpRight className="h-5 w-5" />}
              onClick={() => navigate('/contact')}
            >
              Book a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
            {[
              {
                icon: 'lightbulb',
                title: 'Innovative Solutions',
                description: 'We think outside the box to create unique digital experiences that set you apart from the competition.'
              },
              {
                icon: 'users',
                title: 'Client-Focused Approach',
                description: 'Your success is our priority. We work closely with you to understand and achieve your business goals.'
              },
              {
                icon: 'rocket',
                title: 'Results-Driven',
                description: 'We focus on delivering measurable results that drive growth and success for your business.'
              }
            ].map((item, index) => (
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

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We follow a proven process to ensure every project is delivered successfully
                and meets your business objectives.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Discovery',
                description: 'We start by understanding your business, goals, and target audience.'
              },
              {
                number: '02',
                title: 'Strategy',
                description: 'Develop a comprehensive plan tailored to your specific needs.'
              },
              {
                number: '03',
                title: 'Creation',
                description: 'Execute the strategy with our expert team of designers and developers.'
              },
              {
                number: '04',
                title: 'Launch',
                description: 'Deploy your project and provide ongoing support and optimization.'
              }
            ].map((step, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <div className="relative bg-card border rounded-lg p-6">
                  <span className="text-4xl font-bold text-primary/20 absolute top-4 right-4">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Take a look at some of our recent projects and see how we've helped businesses
                achieve their digital goals.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Dazy Chain",
                image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                category: "E-commerce",
                description: "A luxury jewelry brand's digital transformation"
              },
              {
                title: "The Party Booth Co.",
                image: "https://images.pexels.com/photos/7147720/pexels-photo-7147720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                category: "Web Design",
                description: "Modern booking system for event services"
              }
            ].map((project, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <div className="group relative overflow-hidden rounded-lg cursor-pointer"
                     onClick={() => navigate('/work')}>
                  <div className="aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/work')}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                View All Projects
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Digital Presence?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                Let's create something amazing together. Get in touch to discuss your project.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
                onClick={() => navigate('/contact')}
              >
                Start Your Project
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}