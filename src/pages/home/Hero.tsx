import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { SplitText } from '@/components/animation/SplitText';

interface HeroProps {
  backgroundVideo?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function Hero({ 
  backgroundVideo,
  overlayOpacity = 0.6,
  children,
  title,
  subtitle
}: HeroProps = {}) {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] md:min-h-screen bg-background flex items-end md:items-center relative overflow-hidden pb-10">
      {backgroundVideo && (
        <>
          <video 
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 z-10 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}
      <div className="container mx-auto px-4 relative z-20">
        {children ? children : (
          <div className="max-w-4xl">
            {title ? (
              <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    {subtitle}
                  </p>
                )}
              </div>
            ) : (
              <>
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
                <p className="text-muted-foreground text-lg max-w-xl mb-8">
                  We're a digital agency specialising in transforming ideas into powerful digital experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="high" 
                    size="lg"
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
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}