import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import ReCAPTCHA from 'react-google-recaptcha';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

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

type NotificationStatus = 'success' | 'error' | null;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [notification, setNotification] = useState<{ status: NotificationStatus; message: string }>({
    status: null,
    message: '',
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if running on localhost
    const host = window.location.hostname;
    setIsLocalhost(host === 'localhost' || host === '127.0.0.1');
  }, []);

  // Clear notification after a delay
  useEffect(() => {
    if (notification.status && notificationTimeoutRef.current === null) {
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification({ status: null, message: '' });
        notificationTimeoutRef.current = null;
      }, 5000);
    }

    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = null;
      }
    };
  }, [notification]);

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

  const showNotification = (status: NotificationStatus, message: string) => {
    setNotification({ status, message });
  };

  const dismissNotification = () => {
    setNotification({ status: null, message: '' });
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
  };

  const onSubmit = async (data: FormValues) => {
    // Only require CAPTCHA in production
    if (!isLocalhost && !captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    showNotification(null, ''); // Clear any existing notification
    
    try {
      // FormSubmit.co endpoint
      const FORM_ENDPOINT = import.meta.env.VITE_FORM_EMAIL || 'contact@catalystdigital.uk';
      const formSubmitUrl = `https://formsubmit.co/${FORM_ENDPOINT}`;
      
      // Include captcha token with form data
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      
      // Only include captcha token if we have one (will be null on localhost)
      if (captchaToken) {
        formData.append('g-recaptcha-response', captchaToken);
      }
      
      formData.append('_subject', 'New Contact Form Submission');
      
      // Send data to FormSubmit
      console.log(`Sending form submission to FormSubmit.co ${isLocalhost ? '(from localhost)' : ''}`);
      const response = await fetch(formSubmitUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      const successMessage = isLocalhost 
        ? 'Message sent successfully from localhost!' 
        : 'Message sent successfully!';
        
      toast.success(successMessage);
      showNotification('success', successMessage);
      form.reset();
      setCaptchaToken(null);
      
      // Reset the captcha in production
      if (!isLocalhost) {
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = 'Failed to send message. Please try again.';
      toast.error(errorMessage);
      showNotification('error', errorMessage);
    } finally {
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
              sitekey="6LcZR1UrAAAAAEV2_aAk1dBV83sXOd-owb2DEyY-"
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

        {/* Status notification */}
        {notification.status && (
          <div 
            className={cn(
              "relative flex items-center p-4 rounded-md mb-4 text-sm font-medium animate-in fade-in",
              notification.status === 'success' && "bg-green-50 text-green-800 border border-green-200",
              notification.status === 'error' && "bg-red-50 text-red-800 border border-red-200"
            )}
          >
            <div className="mr-3 flex-shrink-0">
              {notification.status === 'success' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <p>{notification.message}</p>
            <button 
              type="button"
              onClick={dismissNotification}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
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