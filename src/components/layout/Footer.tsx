import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { SuccessNotification } from '@/components/common/SuccessNotification';
import { useFormSuccess } from '@/hooks/use-form-success';
import { Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isNewsletterSuccess, clearSuccess } = useFormSuccess();
  
  const handleSubscribe = (e: React.FormEvent) => {
    setIsSubmitting(true);
    
    // FormSubmit will handle the actual submission
    // We just need to show loading state
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <>
      <SuccessNotification
        isVisible={isNewsletterSuccess}
        onClose={clearSuccess}
        title="Successfully Subscribed!"
        message="Thank you for subscribing! We'll be in touch soon with updates and insights."
      />
      
      <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Catalyst Digital</h3>
            <p className="text-muted-foreground max-w-xs">
              Creating innovative solutions for modern businesses since 2024.
            </p>
          </div>
          
          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/work" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Work
                </NavLink>
              </li>
            </ul>
          </div>
          
          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </NavLink>
              </li>
              <li className="text-muted-foreground">
                contact@catalystdigital.uk
              </li>
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stay Updated</h3>
            <p className="text-muted-foreground">
              Drop your email here and we'll get in touch with you.
            </p>
            
            <form 
              action="https://formsubmit.co/2a691052f277f4be38cd3142bd44895f" 
              method="POST"
              onSubmit={handleSubscribe} 
              className="flex gap-2"
            >
              {/* FormSubmit configuration fields */}
              <input type="hidden" name="_subject" value="Newsletter Subscription - Potential Client Interest" />
              <input type="hidden" name="_next" value={`${window.location.origin}/?newsletter=success`} />
              <input type="hidden" name="_template" value="table" />
              
              {/* Context message for the subscription */}
              <input type="hidden" name="source" value="Footer Newsletter Subscription" />
              <input type="hidden" name="message" value="A potential client has subscribed to the newsletter from the website footer. They would like to get in touch and stay updated with Catalyst Digital." />
              <input type="hidden" name="page_url" value={window.location.href} />
              
              {/* Honeypot field for spam protection */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              <input 
                type="email" 
                name="email"
                placeholder="Email address" 
                className="bg-background px-3 py-2 border rounded-md w-full"
                required
              />
              <Button 
                variant="high" 
                size="md" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Catalyst Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}