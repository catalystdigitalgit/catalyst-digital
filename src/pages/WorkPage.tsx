import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { Slider } from '@/components/common/Slider';

export default function WorkPage() {
  const projects = [
    {
      title: "E-commerce Platform Redesign",
      client: "Fashion Retailer",
      images: [
        "https://images.pexels.com/photos/18069362/pexels-photo-18069362.jpeg",
        "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg",
        "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg",
        "https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg"
      ],
      category: "Web Design",
      description: "Complete redesign of an e-commerce platform, resulting in a 40% increase in conversion rate.",
      technologies: ["React", "Node.js", "Stripe", "AWS"]
    },
    {
      title: "Mobile Banking App",
      client: "Financial Institution",
      images: [
        "https://images.pexels.com/photos/14936128/pexels-photo-14936128.jpeg",
        "https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg",
        "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg",
        "https://images.pexels.com/photos/5849574/pexels-photo-5849574.jpeg"
      ],
      category: "Mobile Development",
      description: "Secure and user-friendly mobile banking application with biometric authentication.",
      technologies: ["React Native", "Firebase", "TypeScript"]
    },
    {
      title: "Corporate Website Overhaul",
      client: "Tech Startup",
      images: [
        "https://images.pexels.com/photos/18440615/pexels-photo-18440615.jpeg",
        "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg",
        "https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg",
        "https://images.pexels.com/photos/5849574/pexels-photo-5849574.jpeg"
      ],
      category: "Web Development",
      description: "Modern, responsive website with integrated CMS and analytics dashboard.",
      technologies: ["Next.js", "Tailwind CSS", "Supabase"]
    },
    {
      title: "Digital Marketing Campaign",
      client: "Lifestyle Brand",
      images: [
        "https://images.pexels.com/photos/18023772/pexels-photo-18023772.jpeg",
        "https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg",
        "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg",
        "https://images.pexels.com/photos/5849574/pexels-photo-5849574.jpeg"
      ],
      category: "Digital Marketing",
      description: "Comprehensive digital marketing strategy that increased social media engagement by 150%.",
      technologies: ["Social Media", "SEO", "Content Marketing"]
    }
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
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Contact us to discuss your project needs.
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
            onClick={() => window.location.href = '/contact'}
          >
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}