import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useFormSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [successType, setSuccessType] = useState<'contact' | 'newsletter' | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    if (searchParams.get('success') === 'true') {
      setSuccessType('contact');
      // Clean up URL after detecting success
      const newUrl = location.pathname;
      navigate(newUrl, { replace: true });
    } else if (searchParams.get('newsletter') === 'success') {
      setSuccessType('newsletter');
      // Clean up URL after detecting success
      const newUrl = location.pathname;
      navigate(newUrl, { replace: true });
    }
  }, [location, navigate]);

  const clearSuccess = () => {
    setSuccessType(null);
  };

  return {
    successType,
    clearSuccess,
    isContactSuccess: successType === 'contact',
    isNewsletterSuccess: successType === 'newsletter',
  };
} 