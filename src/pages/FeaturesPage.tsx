import { Icon } from '@/components/common/Icon';
import { Slider } from '@/components/common/Slider';
import { Button } from '@/components/common/Button';
import { FeatureSection } from '@/components/marketing/FeatureSection';

export default function FeaturesPage() {
  const technicalFeatures = [
    {
      icon: 'commandLine',
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and Tailwind CSS for a robust development experience.'
    },
    {
      icon: 'cube',
      title: 'Component Library',
      description: 'Extensive collection of pre-built components to speed up development.'
    },
    {
      icon: 'sparkles',
      title: 'Animations',
      description: 'Smooth animations and transitions for enhanced user experience.'
    },
    {
      icon: 'moon',
      title: 'Dark Mode',
      description: 'Built-in dark mode support with customizable themes.'
    },
    {
      icon: 'deviceTablet',
      title: 'Responsive Design',
      description: 'Fully responsive layouts that work on all devices.'
    },
    {
      icon: 'cog',
      iconVariant: 'outline',
      title: 'Easy Configuration',
      description: 'Simple configuration options to customize your site.'
    }
  ];

  const iconShowcase = [
    { name: 'userCircle', label: 'User' },
    { name: 'heart', label: 'Heart' },
    { name: 'star', label: 'Star' },
    { name: 'bell', label: 'Bell' },
    { name: 'envelope', label: 'Mail' },
    { name: 'camera', label: 'Camera' },
    { name: 'globe', label: 'Globe' },
    { name: 'calendar', label: 'Calendar' }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Powerful Features
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10">
            Discover all the powerful features that make our framework the perfect choice for your next project.
          </p>
          <Button variant="high" size="lg">
            Get Started
          </Button>
        </div>
      </section>

      {/* Technical Features Slider */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Technical Features</h2>
          <FeatureSection 
            title="Built for Developers"
            description="Our framework comes with everything you need to build modern web applications."
            features={technicalFeatures}
          />
        </div>
      </section>

      {/* Icon Showcase */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Icon System</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Beautiful, consistent icons with support for multiple variants and sizes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {iconShowcase.map((icon) => (
              <div key={icon.name} className="flex flex-col items-center gap-4 p-6 bg-card rounded-lg border">
                <div className="flex gap-4">
                  <Icon name={icon.name} variant="outline" size="xl" className="text-primary" />
                  <Icon name={icon.name} size="xl" className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{icon.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-xl font-medium mb-6">Available Sizes</h3>
            <div className="flex items-center justify-center gap-8">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <Icon name="star" size={size} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Interactive Components</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our components are built for interaction, with smooth animations and intuitive controls.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Slider className="px-8">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] pl-4"
                >
                  <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow transition-shadow aspect-video flex items-center justify-center">
                    <div className="text-6xl text-primary">
                      <Icon name="sparkles" size="xl" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to get started?
          </h2>
          <Button 
            variant="accent" 
            size="lg"
            className="bg-white text-primary hover:bg-white/90"
          >
            Start Building Now
          </Button>
        </div>
      </section>
    </div>
  );
}