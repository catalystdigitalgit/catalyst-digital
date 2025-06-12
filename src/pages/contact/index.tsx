import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
        <div className="container mx-auto px-4 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl">
            Have a question, or want to work together? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

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
            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}