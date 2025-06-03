import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { SplitText } from '@/components/animation/SplitText';

export function Hero() {
  const navigate = useNavigate();

  return (
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
            We're a digital agency specialising in transforming ideas into powerful digital experiences.
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
  );
}