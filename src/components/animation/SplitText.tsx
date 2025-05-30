import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!elementRef.current) return;

    const split = new SplitType(elementRef.current, {
      types: [splitType],
      tagName: 'span',
    });

    const elements = split[splitType];
    
    // Set initial position
    gsap.set(elements, from);

    // Create timeline with no scroll trigger for initial animation
    const tl = gsap.timeline({
      onComplete: onLetterAnimationComplete,
    });

    // Animate each element with a slight delay
    elements.forEach((element: HTMLElement, i: number) => {
      tl.to(
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

    return () => {
      tl.kill();
      split.revert();
    };
  }, [text, splitType, delay, duration, ease, from, to, threshold, rootMargin, onLetterAnimationComplete]);

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{ textAlign }}
    >
      {text}
    </div>
  );
}