import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { CTASection } from '@/components/common/CTASection';
import { Hero } from '@/pages/home/Hero';
import { ProcessSection } from '@/pages/home/ProcessSection';
import { WhyChooseUs } from '@/pages/home/WhyChooseUs';
import { FeaturedWork } from '@/pages/home/FeaturedWork';
import { ServicesOverview } from '@/pages/home/ServicesOverview';

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

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Hero backgroundVideo="/CatalystBannerMovie.mov" />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Process Section */}
      <ProcessSection />

      {/* Featured Work */}
      <FeaturedWork />

      <CTASection
        title="Ready to Start Your Project?"
        description="Let's create something impactful together. Get in touch and we can explore your project needs."
        buttonText="Get in Touch"
        buttonAction={() => navigate('/contact')}
        buttonVariant="outline"
        backgroundColor="secondary"
      />
    </div>
  );
} 