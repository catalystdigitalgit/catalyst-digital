import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

export default function ServicesPage() {
  const services = [
    {
      icon: 'paintBrush',
      title: 'Branding & Identity',
      description: 'Creating compelling brand identities through tailored visuals. Each element is crafted to resonate with your brand\'s narrative.',
      features: [
        'Logos',
        'Print & Digital Products',
        'Visual Assets',
        'Typography & Colour'
      ]
    },
    {
      icon: 'code',
      title: 'Web Development',
      description: 'High-performance websites that combine simple & intuitive user design with extended functionality to bring your ideal website to life.',
      features: [
        'Custom Website Design',
        'Mobile Optimisation',
        'Hosting & Domain Connection',
        'SEO'
      ]
    },
    {
      icon: 'shoppingCart',
      title: 'E-commerce Solutions',
      description: 'Scalable e-commerce solutions designed to drive growth, increase customer conversion rates, and provide seamless user experiences.',
      features: [
        'Secure Payments',
        'Product Management',
        'Email Automations',
        'Booking Systems'
      ]
    },
    {
      icon: 'camera',
      title: 'Content Creation',
      description: 'Working with you to curate a unique digital narrative that captures new audiences and builds customer loyalty.',
      features: [
        'Photography & Videography',
        'Account Management',
        'Engagement Strategies',
        'Curation'
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
              From branding to e-commerce, we've got you covered.
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
                className="bg-card border rounded-card p-8 hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-card flex items-center justify-center mb-6">
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
      <section className="py-20 bg-accent-blue text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your business grow with our digital solutions.
          </p>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/contact'}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}