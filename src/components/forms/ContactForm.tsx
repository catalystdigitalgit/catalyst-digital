import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/common/Button';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    // Check if running on localhost
    const host = window.location.hostname;
    setIsLocalhost(host === 'localhost' || host === '127.0.0.1');
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const onSubmit = async (data: FormValues) => {
    // Only require CAPTCHA in production
    if (!isLocalhost && !captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // FormSubmit.co endpoint
      const FORM_ENDPOINT = import.meta.env.VITE_FORM_EMAIL || 'contact@catalystdigital.uk';
      
      // Create a hidden iframe to handle the form submission
      const iframe = document.createElement('iframe');
      iframe.name = 'contact-form-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create and submit a hidden form targeting the iframe
      const formEl = document.createElement('form');
      formEl.method = 'POST';
      formEl.action = `https://formsubmit.co/${FORM_ENDPOINT}`;
      formEl.target = 'contact-form-iframe';
      formEl.style.display = 'none';
      
      // Add form fields
      const nameField = document.createElement('input');
      nameField.name = 'name';
      nameField.value = data.name;
      formEl.appendChild(nameField);
      
      const emailField = document.createElement('input');
      emailField.name = 'email';
      emailField.value = data.email;
      formEl.appendChild(emailField);
      
      const messageField = document.createElement('input');
      messageField.name = 'message';
      messageField.value = data.message;
      formEl.appendChild(messageField);
      
      // Add subject field
      const subjectField = document.createElement('input');
      subjectField.type = 'hidden';
      subjectField.name = '_subject';
      subjectField.value = 'New Contact Form Submission';
      formEl.appendChild(subjectField);
      
      // Add captcha response if available
      if (captchaToken) {
        const captchaResponseField = document.createElement('input');
        captchaResponseField.type = 'hidden';
        captchaResponseField.name = 'g-recaptcha-response';
        captchaResponseField.value = captchaToken;
        formEl.appendChild(captchaResponseField);
      } else {
        // If we're on localhost or testing, bypass captcha
        const bypassField = document.createElement('input');
        bypassField.type = 'hidden';
        bypassField.name = '_captcha';
        bypassField.value = 'false';
        formEl.appendChild(bypassField);
      }
      
      // Add autoresponse option
      const autoResponseField = document.createElement('input');
      autoResponseField.type = 'hidden';
      autoResponseField.name = '_autoresponse';
      autoResponseField.value = 'Thank you for contacting us! We will get back to you soon.';
      formEl.appendChild(autoResponseField);
      
      // Add form to body, submit it, then remove it
      document.body.appendChild(formEl);
      formEl.submit();
      
      // Log submission (helpful for debugging)
      console.log(`Sending form submission to FormSubmit.co ${isLocalhost ? '(from localhost)' : ''}`);
      
      // Clean up after a short delay to ensure submission
      setTimeout(() => {
        document.body.removeChild(formEl);
        document.body.removeChild(iframe);
        
        const successMessage = isLocalhost 
          ? 'Message sent successfully from localhost!' 
          : 'Message sent successfully!';
          
        toast.success(successMessage);
        form.reset();
        setCaptchaToken(null);
        
        // Reset the captcha in production
        if (!isLocalhost) {
          recaptchaRef.current?.reset();
        }
        
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hello@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us more about your project..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Only show CAPTCHA in production */}
        {!isLocalhost && (
          <div className="mt-6 mb-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
            {!captchaToken && form.formState.isSubmitted && (
              <p className="text-sm text-red-500 mt-2">Please complete the CAPTCHA verification</p>
            )}
          </div>
        )}

        {isLocalhost && (
          <div className="mt-6 mb-4 p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-sm">
            <p>Running in localhost mode: reCAPTCHA verification is bypassed for testing</p>
          </div>
        )}

        <Button
          type="submit"
          variant="high"
          size="lg"
          className="w-full md:w-auto"
          isLoading={isSubmitting}
        >
          Send Message
        </Button>
      </form>
    </Form>
  );
}