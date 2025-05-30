import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  learnMoreLink?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  learnMoreLink,
  className
}: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "bg-card p-6 rounded-lg border shadow-sm",
        "transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      {learnMoreLink && (
        <a 
          href={learnMoreLink} 
          className="text-primary inline-flex items-center transition-colors hover:text-primary/80"
        >
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      )}
    </div>
  );
}