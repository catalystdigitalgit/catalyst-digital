import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  text,
  className,
  delay = 0,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: -40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const timelineRef = useRef<gsap.Timeline | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = () => {
    if (!elementRef.current || !splitRef.current || isAnimating) return;

    const elements = splitRef.current[splitType];
    
    // Kill existing timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsAnimating(true);

    // Reset elements to initial state
    gsap.set(elements, from);

    // Create new timeline
    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setHasAnimated(true);
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      },
    });

    // Animate each element with a slight delay
    elements.forEach((element: HTMLElement, i: number) => {
      timelineRef.current?.to(
        element,
        {
          ...to,
          duration,
          ease,
          delay: i * delay,
        },
        i * delay // Stagger the animations
      );
    });
  };

  useEffect(() => {
    if (!elementRef.current) return;

    splitRef.current = new SplitType(elementRef.current, {
      types: [splitType],
      tagName: 'span',
    });

    animate();

    return () => {
      splitRef.current?.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [text, splitType, delay, duration, ease]);

  const handleMouseEnter = () => {
    // Only trigger animation if not currently animating and has completed initial animation
    if (!isAnimating && hasAnimated) {
      animate();
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(className, 'cursor-pointer')}
      style={{ textAlign }}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </div>
  );
}