import { Check } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { FAQ } from '@/components/marketing/FAQ';
import { TeamMemberCard } from '@/components/marketing/TeamMemberCard';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Alex has over 15 years of experience in web development and has led multiple successful startups. He founded our company with the vision of making web development more accessible to everyone.",
      achievements: [
        "Led development of award-winning web framework",
        "Published author on modern web development",
        "Speaker at major tech conferences",
        "Former Tech Lead at Google"
      ],
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    },
    {
      name: "Sarah Chen",
      role: "Lead Designer",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Sarah brings 10 years of UX/UI design experience to our team. Her passion for creating intuitive and beautiful interfaces has shaped our framework's design principles.",
      achievements: [
        "Award-winning designer",
        "Created design system used by 100+ companies",
        "Design mentor at Design Lab",
        "Former Senior Designer at Airbnb"
      ],
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Engineering",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Michael leads our engineering team with expertise in scalable architecture and performance optimization. He ensures our framework stays cutting-edge while maintaining stability.",
      achievements: [
        "Developed high-performance rendering engine",
        "Created innovative build optimization tools",
        "Open source contributor",
        "Former Staff Engineer at Netflix"
      ],
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "Tanya Williams",
      role: "Marketing Director",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Tanya drives our marketing strategy with a focus on developer education and community building. She's passionate about making technical concepts accessible to everyone.",
      achievements: [
        "Grew developer community to 100k+ members",
        "Launched successful developer education program",
        "Regular tech conference speaker",
        "Former Marketing Lead at MongoDB"
      ],
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
      }
    }
  ];

  const faqItems = [
    {
      question: "What makes your framework different from others?",
      answer: "Our framework combines the best of modern web development with an intuitive design system. We focus on developer experience without compromising on performance or flexibility, offering pre-built components that are highly customizable and production-ready."
    },
    {
      question: "Do I need to be a developer to use your framework?",
      answer: "While basic web development knowledge is helpful, our framework is designed to be accessible to users of all skill levels. We provide comprehensive documentation, starter templates, and a user-friendly interface that makes it easy to create professional websites."
    },
    {
      question: "Can I customize the components to match my brand?",
      answer: "Absolutely! All components are built with customization in mind. You can easily modify colors, typography, spacing, and other design elements through our theme system. We also provide detailed guides on component customization."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer multiple levels of support, including comprehensive documentation, community forums, and dedicated support channels for premium users. Our team is committed to helping you succeed with your projects."
    },
    {
      question: "Is the framework suitable for large-scale applications?",
      answer: "Yes! Our framework is built with scalability in mind. It's being used by businesses of all sizes, from startups to enterprise organizations. The modular architecture ensures optimal performance even as your application grows."
    },
    {
      question: "Do you offer regular updates and maintenance?",
      answer: "We maintain an active development schedule with regular updates, bug fixes, and new features. Our team closely monitors security vulnerabilities and ensures the framework stays up-to-date with the latest web standards."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            About Our Company
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10">
            We're on a mission to make beautiful marketing websites accessible to everyone, 
            regardless of their design or coding skills.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2025, our company was born out of frustration with existing marketing website solutions. 
                We saw that businesses were either spending too much on custom development or settling for 
                cookie-cutter templates that didn't truly represent their brand.
              </p>
              <p className="text-muted-foreground mb-4">
                Our founders, all experienced web developers and designers, came together with a vision: 
                to create a framework that would give businesses the freedom to create beautiful, 
                conversion-focused marketing sites without the traditional constraints.
              </p>
              <p className="text-muted-foreground">
                Today, thousands of businesses trust our framework to power their online presence.
              </p>
            </div>
            <div className="bg-primary/5 rounded-lg p-8 border border-primary/10">
              <h3 className="text-xl font-medium mb-4">Our Values</h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Simplicity",
                    description: "We believe great technology should be simple to use, allowing you to focus on your business, not learning complex tools."
                  },
                  {
                    title: "Quality",
                    description: "We're obsessed with crafting high-quality components that look beautiful and perform exceptionally."
                  },
                  {
                    title: "Accessibility",
                    description: "We're committed to making our framework accessible to everyone, regardless of ability or technical expertise."
                  },
                  {
                    title: "Community",
                    description: "We believe in the power of community and actively engage with our users to improve our framework."
                  }
                ].map((value) => (
                  <li key={value.title} className="flex">
                    <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're a diverse team of designers, developers, and marketers passionate about creating 
              the best marketing website framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.name}
                {...member}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        heading="Frequently Asked Questions"
        subHeading="Find answers to common questions about our framework and how it can help your business."
        items={faqItems}
      />

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Our Journey
          </h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-border md:before:mx-auto md:before:translate-x-0 md:space-y-0 md:grid md:grid-cols-2">
            {[
              {
                year: "2025",
                title: "Company Founded",
                description: "Our journey began with a simple idea: make marketing websites accessible to everyone."
              },
              {
                year: "2025",
                title: "First Framework Release",
                description: "We launched the first version of our framework, focusing on simplicity and flexibility."
              },
              {
                year: "2026",
                title: "1,000 Customers",
                description: "We celebrated our first major milestone as our community grew to 1,000 businesses."
              },
              {
                year: "2027",
                title: "Enterprise Launch",
                description: "We expanded our offerings to serve enterprise customers with specialized needs."
              }
            ].map((event, index) => (
              <div 
                key={index} 
                className={`relative md:mt-24 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:ml-auto md:pl-12'}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`absolute ml-5 -translate-x-1/2 mt-0.5 h-3 w-3 rounded-full border-4 border-primary md:mx-auto md:translate-x-0 ${index % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'}`}></div>
                  <span className="text-primary ml-8 md:ml-0">{event.year}</span>
                </div>
                <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-10 max-w-2xl mx-auto">
            Be part of the revolution in marketing website creation. 
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="accent" 
              size="lg"
            >
              Join Our Community
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
            >
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}