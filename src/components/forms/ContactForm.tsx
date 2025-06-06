import { useState } from 'react';
import { Button } from '@/components/common/Button';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // FormSubmit will handle the actual submission
    // We just need to show loading state
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form 
      action="https://formsubmit.co/2a691052f277f4be38cd3142bd44895f" 
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* FormSubmit configuration fields */}
      <input type="hidden" name="_subject" value="New Contact Form Submission - Catalyst Digital" />
      <input type="hidden" name="_next" value={`${window.location.origin}/contact?success=true`} />
      <input type="hidden" name="_template" value="table" />
      
      {/* Honeypot field for spam protection */}
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
            minLength={2}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="hello@email.com"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us more about your project..."
          required
          minLength={10}
          className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <Button
        type="submit"
        variant="high"
        size="lg"
        className="w-full md:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}