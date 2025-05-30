import { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Button } from '@/components/common/Button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AnimatedContentProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

function AnimatedContent({ children, direction = 'left', delay = 0 }: AnimatedContentProps) {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={elementRef}
      className={cn(
        'opacity-0 transition-all duration-1000',
        isVisible && 'opacity-100',
        direction === 'left' ? 'translate-x-[-100px]' : 'translate-x-[100px]',
        isVisible && 'translate-x-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ConnectingLine({ showLine = true, variant = 'solid' }: { showLine?: boolean; variant?: 'solid' | 'dashed' | 'dotted' }) {
  const { elementRef, isVisible } = useIntersectionObserver();

  const lineStyles = {
    solid: 'border-2',
    dashed: 'border-2 border-dashed',
    dotted: 'border-2 border-dotted',
  };

  return showLine ? (
    <div
      ref={elementRef}
      className={cn(
        'absolute left-0 w-full h-full transition-all duration-1000',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <svg
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
        style={{ transform: 'translateZ(0)' }}
      >
        <path
          d={`M 50% 0 
              Q 75% 16.67%, 100% 33.33%
              Q 25% 50%, 0% 66.67%
              Q 75% 83.33%, 50% 100%`}
          fill="none"
          className={cn(
            'stroke-primary/50',
            variant === 'solid' ? 'stroke-[2px]' : '',
            variant === 'dashed' ? 'stroke-[2px] stroke-dasharray-4' : '',
            variant === 'dotted' ? 'stroke-[2px] stroke-dasharray-2' : '',
            isVisible ? 'path-draw' : ''
          )}
          pathLength="1"
        />
      </svg>
    </div>
  ) : null;
}

export default function DemoPage() {
  const [showLine, setShowLine] = useState(true);
  const [lineVariant, setLineVariant] = useState<'solid' | 'dashed' | 'dotted'>('solid');

  return (
    <div className="min-h-screen bg-background">
      {/* Content Sections */}
      <section className="py-20 relative">
        <ConnectingLine showLine={showLine} variant={lineVariant} />
        
        <div className="container mx-auto px-4 space-y-32">
          <AnimatedContent direction="left">
            <div className="bg-card p-8 rounded-lg shadow-lg max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Section One</h2>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent direction="right">
            <div className="bg-card p-8 rounded-lg shadow-lg max-w-2xl ml-auto">
              <h2 className="text-3xl font-bold mb-4">Section Two</h2>
              <p className="text-muted-foreground">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </AnimatedContent>

          <AnimatedContent direction="left">
            <div className="bg-card p-8 rounded-lg shadow-lg max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Section Three</h2>
              <p className="text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </div>
  );
}