import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

export default function ServicesPage() {
  const services = [
    {
      icon: 'paintBrush',
      title: 'Web Design',
      description: 'Beautiful, responsive websites that capture your brand's essence and engage your audience.',
      features: [
        'Custom UI/UX Design',
        'Mobile-First Approach',
        'Interactive Prototypes',
        'Brand Integration'
      ]
    },
    {
      icon: 'code',
      title: 'Web Development',
      description: 'Robust, scalable web applications built with modern technologies and best practices.',
      features: [
        'Frontend Development',
        'Backend Integration',
        'API Development',
        'Performance Optimization'
      ]
    },
    {
      icon: 'smartphone',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that provide seamless user experiences.',
      features: [
        'iOS Development',
        'Android Development',
        'React Native Apps',
        'App Store Optimization'
      ]
    },
    {
      icon: 'rocket',
      title: 'Digital Marketing',
      description: 'Strategic digital marketing solutions to grow your online presence and reach.',
      features: [
        'SEO Optimization',
        'Content Strategy',
        'Social Media Management',
        'Analytics & Reporting'
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Digital Solutions for Modern Businesses
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">
              We offer comprehensive digital services to help your business thrive in the digital age.
              From web development to digital marketing, we've got you covered.
            </p>
            <Button 
              variant="high" 
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              onClick={() => window.location.href = '/contact'}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-card border rounded-lg p-8 hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                  <Icon name={service.icon} size="lg" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Icon name="check" className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your business grow with our digital solutions.
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
            onClick={() => window.location.href = '/contact'}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}