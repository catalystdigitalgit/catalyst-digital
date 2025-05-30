import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { SplitText } from '@/components/animation/SplitText';

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
      <section className="min-h-screen bg-background flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="mb-6">
              <div className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2">
                Your home for
              </div>
              <div className="flex items-center gap-2 text-4xl md:text-5xl lg:text-6xl font-medium">
                <span className="digital-text">digital</span>
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
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {[
                { title: 'BRANDING & IDENTITY', service: 'branding' },
                { title: 'WEB DEVELOPMENT', service: 'development' },
                { title: 'E-COMMERCE SOLUTIONS', service: 'ecommerce' },
                { title: 'CONTENT CREATION', service: 'content' }
              ].map((item) => (
                <div
                  key={item.service}
                  onClick={() => handleServiceClick(item.service)}
                  className="group cursor-pointer"
                >
                  <h2 className="text-2xl font-medium relative inline-block">
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-[80%] h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </h2>
                </div>
              ))}
            </div>
            <div>
              <Button 
                variant="high"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                BOOK A CALL
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}