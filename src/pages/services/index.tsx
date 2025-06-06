import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';
import { CTASection } from '@/components/common/CTASection';

export default function ServicesPage() {
  const navigate = useNavigate();
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
      ],
      id: 'branding'
    },
    {
      icon: 'computerDesktop',
      title: 'Web Development',
      description: 'High-performance websites that combine simple & intuitive user design with extended functionality to bring your ideal website to life.',
      features: [
        'Custom Website Design',
        'Mobile Optimisation',
        'Hosting & Domain Connection',
        'SEO'
      ],
      id: 'development'
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
      ],
      id: 'ecommerce'
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
      ],
      id: 'content'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-48 md:py-48 md:pb-40 bg-gradient-to-br from-background to-secondary/30">
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
              onClick={() => navigate('/contact')}
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
                data-service={service.id}
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
      <CTASection
        title="Ready to Transform Your Digital Presence?"
        highlightedText="Transform"
        description="Let's discuss how we can help your business grow with our digital solutions."
        buttonText="Schedule a Consultation"
        buttonAction={() => navigate('/contact')}
        buttonVariant="outline"
        backgroundColor="secondary"
      />
    </div>
  );
}