import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

interface SliderProps {
  options?: EmblaOptionsType;
  className?: string;
  children: React.ReactNode;
  showArrows?: boolean;
  showDots?: boolean;
}

export function Slider({
  options = { align: 'start', containScroll: 'trimSnaps' },
  className,
  children,
  showArrows = true,
  showDots = true,
}: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn('relative group', className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children}
        </div>
      </div>
      
      {showArrows && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2',
              'bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground',
              'rounded-full p-2 shadow-md',
              'opacity-0 group-hover:opacity-100 transition-all duration-200',
              prevBtnDisabled && 'hidden'
            )}
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2',
              'bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground',
              'rounded-full p-2 shadow-md',
              'opacity-0 group-hover:opacity-100 transition-all duration-200',
              nextBtnDisabled && 'hidden'
            )}
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {showDots && scrollSnaps.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 px-2 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                index === selectedIndex 
                  ? 'bg-primary scale-110' 
                  : 'bg-foreground/20 hover:bg-foreground/40'
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}