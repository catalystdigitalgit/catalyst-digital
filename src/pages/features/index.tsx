import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Hero } from '@/pages/home/Hero';
import { Icon } from '@/components/common/Icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/Button';

type FeatureCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: Feature[];
};

type Feature = {
  title: string;
  description: string;
  icon: string;
};

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState('design');
  
  const categories: FeatureCategory[] = [
    {
      id: 'design',
      title: 'Design Features',
      description: 'Beautiful, responsive designs that work across all devices',
      icon: 'paintBrush',
      features: [
        {
          title: 'Responsive Design',
          description: 'Every website we build looks great on any device, from desktops to smartphones.',
          icon: 'deviceMobile'
        },
        {
          title: 'Modern Aesthetics',
          description: 'Clean, contemporary designs that align with current web trends while remaining timeless.',
          icon: 'sparkles'
        },
        {
          title: 'Custom Illustrations',
          description: 'Unique visual elements created specifically for your brand to enhance your digital presence.',
          icon: 'pencil'
        },
        {
          title: 'UI/UX Optimization',
          description: 'Intuitive interfaces designed to guide users smoothly through your digital experience.',
          icon: 'cursor'
        }
      ]
    },
    {
      id: 'development',
      title: 'Development Features',
      description: 'Powerful, scalable solutions built with cutting-edge technology',
      icon: 'code',
      features: [
        {
          title: 'Performance Optimization',
          description: 'Lightning-fast load times and smooth interactions for the best user experience.',
          icon: 'bolt'
        },
        {
          title: 'SEO Best Practices',
          description: 'Built-in search engine optimization to help your site rank higher in search results.',
          icon: 'magnifyingGlass'
        },
        {
          title: 'Content Management',
          description: 'User-friendly systems that make it easy to update and manage your content.',
          icon: 'document'
        },
        {
          title: 'API Integration',
          description: 'Seamless connections with third-party services to extend your site\'s functionality.',
          icon: 'link'
        }
      ]
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Features',
      description: 'Everything you need to sell products online effectively',
      icon: 'shoppingCart',
      features: [
        {
          title: 'Secure Checkout',
          description: 'PCI-compliant payment processing to keep customer data safe and secure.',
          icon: 'lock'
        },
        {
          title: 'Inventory Management',
          description: 'Tools to track stock levels, manage products, and automate notifications.',
          icon: 'package'
        },
        {
          title: 'Customer Accounts',
          description: 'Personalized shopping experiences with wish lists, order history, and saved information.',
          icon: 'user'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Comprehensive reporting on sales, customer behavior, and other key metrics.',
          icon: 'chartBar'
        }
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing Features',
      description: 'Tools to grow your audience and convert visitors into customers',
      icon: 'megaphone',
      features: [
        {
          title: 'Email Marketing',
          description: 'Integrated newsletter signup and automated email campaign functionality.',
          icon: 'envelope'
        },
        {
          title: 'Social Media Integration',
          description: 'Automatic sharing of content and products across your social media channels.',
          icon: 'share'
        },
        {
          title: 'Conversion Optimization',
          description: 'Strategic design elements to guide visitors toward taking desired actions.',
          icon: 'arrowUp'
        },
        {
          title: 'Content Strategy',
          description: 'Planned approach to creating and distributing valuable, relevant content.',
          icon: 'documentText'
        }
      ]
    }
  ];
  
  const activeFeatures = categories.find(cat => cat.id === activeCategory)?.features || [];

  return (
    <div>
      <Hero title="Features" subtitle="Explore the capabilities of our digital solutions" />
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Category tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'p-4 rounded-lg text-left transition-all duration-200 border',
                  activeCategory === category.id
                    ? 'bg-primary/10 border-primary shadow-sm'
                    : 'bg-card hover:bg-muted/50'
                )}
              >
                <div className="flex items-start">
                  <div className={cn(
                    'mr-3 p-2 rounded-lg',
                    activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    <Icon name={category.icon} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeFeatures.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border">
                <div className="flex items-start mb-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-lg mr-4">
                    <Icon name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA section */}
          <div className="bg-secondary/30 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Contact us today to discuss how we can implement these features in your next digital project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="high" 
                size="lg" 
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.location.href = '/services'}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 