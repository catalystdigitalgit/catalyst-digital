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
}

export function Slider({
  options = { align: 'start', containScroll: 'trimSnaps' },
  className,
  children,
  showArrows = true,
}: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn('relative', className)}>
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
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2',
              'bg-background/80 backdrop-blur-sm hover:bg-background/90',
              'rounded-full p-2 shadow-md',
              'transition-opacity duration-200',
              prevBtnDisabled ? 'opacity-0' : 'opacity-100'
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
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
              'bg-background/80 backdrop-blur-sm hover:bg-background/90',
              'rounded-full p-2 shadow-md',
              'transition-opacity duration-200',
              nextBtnDisabled ? 'opacity-0' : 'opacity-100'
            )}
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}