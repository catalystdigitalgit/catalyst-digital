interface Testimonial {
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
    initials: string;
  };
  rating?: number;
}

interface TestimonialSectionProps {
  title: string;
  description?: string;
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialSection({ title, description, testimonials, className }: TestimonialSectionProps) {
  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border">
              {testimonial.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex text-warning">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-card-foreground mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium mr-3">
                  {testimonial.author.initials}
                </div>
                <div>
                  <p className="font-medium">{testimonial.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.author.title}, {testimonial.author.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}