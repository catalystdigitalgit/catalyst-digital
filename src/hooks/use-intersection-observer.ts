import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver<T extends Element = Element>({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, root, rootMargin]);

  return { elementRef, isVisible };
}