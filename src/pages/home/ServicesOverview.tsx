import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Icon } from '@/components/common/Icon';

export function ServicesOverview() {
  const navigate = useNavigate();

  const services = [
    {
      icon: 'paintBrush',
      title: 'Branding & Identity',
      description: 'Creating compelling brand identities through tailored visuals and narrative driven design.',
      service: 'branding'
    },
    {
      icon: 'computerDesktop',
      title: 'Web Development',
      description: 'High-performance websites that combine clean  design & extended functionality.',
      service: 'development'
    },
    {
      icon: 'shoppingCart',
      title: 'E-commerce Solutions',
      description: 'Scalable e-commerce solutions designed to provide seamless user experiences.',
      service: 'ecommerce'
    },
    {
      icon: 'camera',
      title: 'Content Creation',
      description: 'Curating a unique digital narrative that captures new audiences and builds customer loyalty.',
      service: 'content'
    }
  ];

  const handleServiceClick = (service: string) => {
    navigate('/services');
    setTimeout(() => {
      const element = document.querySelector(`[data-service="${service}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto">
        <div className="px-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
        </div>

        <div className="pl-4 pr-0 md:px-4 overflow-x-auto md:overflow-x-visible">
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-4 pb-8 md:pb-0 snap-x">
            {services.map((item) => (
              <div
                key={item.service}
                onClick={() => handleServiceClick(item.service)}
                className="bg-background border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group flex-none w-[280px] md:w-auto snap-center hover:border-primary-dark"
              >
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon name={item.icon} />
                </div>
                <h2 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center text-primary">
                  <span className="text-sm mr-2">Learn more</span>
                  <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
            <div className="flex-none w-4 md:hidden"></div>
          </div>
        </div>

        <div className="px-4 mt-12">
          <Button 
            variant="high"
            size="lg"
            onClick={() => navigate('/contact')}
            rightIcon={<ArrowUpRight className="h-5 w-5" />}
          >
            Let's Talk Projects
          </Button>
        </div>
      </div>
    </section>
  );
} 