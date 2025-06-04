import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const FORM_ENDPOINT = import.meta.env.VITE_FORM_EMAIL;
      
      // Create a hidden iframe to handle the form submission
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden-form-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create and submit a hidden form targeting the iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `https://formsubmit.co/${FORM_ENDPOINT}`;
      form.target = 'hidden-form-iframe'; // Target the iframe instead of _blank
      form.style.display = 'none';
      
      // Add form fields
      const emailField = document.createElement('input');
      emailField.name = 'email';
      emailField.value = email;
      form.appendChild(emailField);
      
      const nameField = document.createElement('input');
      nameField.name = 'name';
      nameField.value = 'Newsletter Subscriber';
      form.appendChild(nameField);
      
      const messageField = document.createElement('input');
      messageField.name = 'message';
      messageField.value = `A user has subscribed to the newsletter with email: ${email}`;
      form.appendChild(messageField);
      
      // Add form options
      const subjectField = document.createElement('input');
      subjectField.type = 'hidden';
      subjectField.name = '_subject';
      subjectField.value = 'New Newsletter Subscription';
      form.appendChild(subjectField);
      
      const captchaField = document.createElement('input');
      captchaField.type = 'hidden';
      captchaField.name = '_captcha';
      captchaField.value = 'false';
      form.appendChild(captchaField);
      
      // Add autoresponse option if you want to send a thank you email
      const autoResponseField = document.createElement('input');
      autoResponseField.type = 'hidden';
      autoResponseField.name = '_autoresponse';
      autoResponseField.value = 'Thank you for subscribing to our newsletter!';
      form.appendChild(autoResponseField);
      
      // Use a captcha bypass value with FormSubmit
      const bypassField = document.createElement('input');
      bypassField.type = 'hidden';
      bypassField.name = '_captcha';
      bypassField.value = 'false';
      form.appendChild(bypassField);
      
      // Add form to body, submit it, then remove it
      document.body.appendChild(form);
      form.submit();
      
      // Clean up after a short delay to ensure submission
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        
        // Update states and show success message after form is submitted
        toast.success('Subscription successful!');
        setEmail('');
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting subscription:', error);
      toast.error('Failed to subscribe. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
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
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                name="email"
                placeholder="Email address" 
                className="bg-background px-3 py-2 border rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
              <Button 
                variant="high" 
                size="sm" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4 mr-1" />
                )}
                {isSubmitting ? 'Sending...' : 'Subscribe'}
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
  );
}