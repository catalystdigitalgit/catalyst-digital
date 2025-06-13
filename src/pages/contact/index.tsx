import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';
import { HeroSection } from '@/components/marketing/HeroSection';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title="Get in Touch"
        description="Have a question, or want to work together? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        buttonText="Send Message"
        buttonAction={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        buttonVariant="high"
        backgroundImage="/contact.png"
      />

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">contact@catalystdigital.uk</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium mb-1">London, UK</h3>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div id="contact-form" className="bg-card p-8 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}