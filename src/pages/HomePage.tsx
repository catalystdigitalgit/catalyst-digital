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

  const services = [
    {
      icon: 'paintBrush',
      title: 'Branding & Identity',
      description: 'Creating compelling brand identities through tailored visuals. Each element is crafted to resonate with your brand\'s narrative.',
      service: 'branding'
    },
    {
      icon: 'computerDesktop',
      title: 'Web Development',
      description: 'High-performance websites that combine simple & intuitive user design with extended functionality to bring your ideal website to life.',
      service: 'development'
    },
    {
      icon: 'shoppingCart',
      title: 'E-commerce Solutions',
      description: 'Scalable e-commerce solutions designed to drive growth, increase customer conversion rates, and provide seamless user experiences.',
      service: 'ecommerce'
    },
    {
      icon: 'camera',
      title: 'Content Creation',
      description: 'Working with you to curate a unique digital narrative that captures new audiences and builds customer loyalty.',
      service: 'content'
    }
  ];

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
        <div className="container mx-auto">
          <div className="px-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              We offer comprehensive digital solutions to help your business thrive in the digital age.
              From branding to e-commerce, we've got you covered.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-4 overflow-x-auto md:overflow-x-visible pl-4 md:px-4 space-x-4 md:space-x-0 md:gap-4 snap-x pb-8 md:pb-0 -mr-[100vw] md:mr-0 pr-[100vw] md:pr-0">
            {services.map((item) => (
              <div
                key={item.service}
                onClick={() => handleServiceClick(item.service)}
                className="bg-background border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group flex-none w-[280px] md:w-auto snap-center"
              >
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon name={item.icon} />
                </div>
                <h2 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm mr-2">Learn more</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 mt-12">
            <Button 
              variant="high"
              size="lg"
              onClick={() => navigate('/contact')}
              rightIcon={<ArrowUpRight className="h-5 w-5" />}
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We follow a proven process to ensure every project is delivered successfully
                and meets your business objectives.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto relative before:absolute before:inset-0 before:ml-4 md:before:mx-auto before:w-0.5 before:h-full before:bg-border">
            {[
              {
                icon: 'search',
                title: 'Discovery',
                description: 'We start by understanding your business, goals, and target audience through in-depth consultations and research.'
              },
              {
                icon: 'lightbulb',
                title: 'Strategy',
                description: 'Develop a comprehensive plan tailored to your specific needs, outlining key milestones and deliverables.'
              },
              {
                icon: 'code',
                title: 'Creation',
                description: 'Execute the strategy with our expert team of designers and developers, ensuring quality at every step.'
              },
              {
                icon: 'rocket',
                title: 'Launch',
                description: 'Deploy your project with thorough testing and provide ongoing support and optimization for continued success.'
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
                  'absolute left-0 md:left-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 z-10',
                  'flex items-center justify-center text-background'
                )}>
                  <Icon name={step.icon} size="sm" />
                </div>
                <div className={cn(
                  'ml-12 md:ml-0 md:w-[45%]',
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                )}>
                  <div className="bg-card border rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
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
                View Projects
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Project?"
        description="Let's create something amazing together. Contact us to discuss your project needs."
        buttonText="Get in Touch"
        buttonAction={() => window.location.href = '/contact'}
        buttonVariant="outline"
        backgroundColor="secondary"
      />
    </div>
  );
}