import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  heading: string;
  subHeading?: string;
  items: FAQItem[];
  className?: string;
  variant?: 'modern' | 'classic';
}

export function FAQ({ heading, subHeading, items, className, variant = 'modern' }: FAQProps) {
  return (
    <section className={cn("py-20 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold mb-4",
            variant === 'modern' && "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
          )}>
            {heading}
          </h2>
          {subHeading && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subHeading}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={cn(
                  variant === 'modern' && "border rounded-lg px-6 shadow-sm transition-all duration-200 data-[state=open]:shadow-md data-[state=open]:bg-card",
                  variant === 'classic' && "border-b"
                )}
              >
                <AccordionTrigger 
                  className={cn(
                    "text-left py-6 text-lg",
                    variant === 'modern' && "hover:no-underline hover:text-primary [&[data-state=open]>svg]:text-primary",
                    variant === 'classic' && "hover:text-primary"
                  )}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent 
                  className={cn(
                    "text-muted-foreground text-base leading-relaxed",
                    variant === 'modern' && "pb-6",
                    variant === 'classic' && "pb-4"
                  )}
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}