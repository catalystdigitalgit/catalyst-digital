import { Slider } from '@/components/common/Slider';
import { CTASection } from '@/components/common/CTASection';

export default function WorkPage() {
  const projects = [
    {
      title: "Dazy Chain",
      url: "https://dazychain.uk/",
      images: [
        "/DazyChainWeb.png",
        "/DazyChainSocials.png",
        "/DazyChainRing.jpg",
      ],
      category: "Branding & E-commerce",
      description: "Elevated their digital presence with premium product photography, strategic paid advertising campaigns, and comprehensive social media management. Our custom Shopify solution streamlined their e-commerce operations while maintaining a cohesive brand identity across all touchpoints.",
      technologies: ["Branding & Identity", "Web Design", "Content Creation"]
    },
    {
      title: "The Party Booth Co.",
      url: "https://partyboothco.co.uk/",
      images: [
        "/PartyBoothCoDesigns.png",
        "/PartyBoothCoWebsite.png",
        "/PartyBoothCoPhotography.webp",
      ],
      category: "Web Design & Development",
      description: "Transforming photo booths into an unforgettable brand presence. We crafted a bespoke logo, business cards, and captivating website that effortlessly handles client deposits and payments to eye-catching pamphlets.",
      technologies: ["Branding & Identity", "Web Design & Development", "E-commerce Solutions", "Content Creation"]
    },
  ];

  return (
    <div className="flex flex-col">
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

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="bg-card border rounded-card overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Slider 
                    showArrows 
                    showDots 
                    className="h-full"
                    options={{ loop: true }}
                  >
                    {project.images.map((image, imageIndex) => (
                      <div 
                        key={imageIndex}
                        className="relative h-full w-full flex-[0_0_100%]"
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - Image ${imageIndex + 1}`}
                          className="w-full h-full object-cover"
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
                  </div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="relative group text-foreground"
                    >
                      {project.title}
                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-[110%]"></span>
                    </a>
                  </h3>
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