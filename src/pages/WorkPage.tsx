import { Slider } from '@/components/common/Slider';
import { CTASection } from '@/components/common/CTASection';

export default function WorkPage() {
  const projects = [
    {
      title: "Dazy Chain",
      images: [
        "/images/dazy-chain-1.jpg",
        "/images/dazy-chain-2.jpg"
      ],
      category: "Branding & E-commerce",
      description: "Elevated their digital presence with premium product photography, strategic paid advertising campaigns, and comprehensive social media management. Our custom Shopify solution streamlined their e-commerce operations while maintaining a cohesive brand identity across all touchpoints.",
      technologies: ["Branding & Identity", "Web Design", "Content Creation"]
    },
    {
      title: "The Party Booth Co.",
      images: [
        "/images/party-booth-1.jpg",
        "/images/party-booth-2.jpg",
        "/images/party-booth-3.jpg"
      ],
      category: "Web Design & Development",
      description: "Transforming photo booths into an unforgettable brand presence. We crafted a bespoke logo, business cards, and captivating website that effortlessly handles client deposits and payments to eye-catching pamphlets.",
      technologies: ["Branding & Identity", "Web Design & Development", "E-commerce Solutions", "Content Creation"]
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our Work
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Explore our portfolio of successful projects and digital transformations.
              Each project represents our commitment to excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-card border rounded-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Slider showArrows showDots className="h-full">
                    {project.images.map((image, imageIndex) => (
                      <div 
                        key={imageIndex}
                        className="flex-[0_0_100%] min-w-0 h-full relative"
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - Image ${imageIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-primary font-medium">
                      {project.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {project.client}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-secondary px-3 py-1 rounded-button text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Your Project?"
        description="Let's create something amazing together. Contact us to discuss your project needs."
        buttonText="Get in Touch"
        buttonAction={() => window.location.href = '/contact'}
        buttonVariant="outline"
        backgroundColor="secondary"
      />
    </div>
  );
}