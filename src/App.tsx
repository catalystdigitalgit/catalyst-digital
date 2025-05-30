import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

// Layouts
import MainLayout from '@/components/layout/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FeaturesPage from '@/pages/FeaturesPage';
import DemoPage from '@/pages/DemoPage';
import PricingPage from '@/pages/PricingPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Components
import { Loader } from '@/components/common/Loader';
import { DesignToolbox } from '@/components/design/DesignToolbox';
import { Chatbot } from '@/components/chat/Chatbot';
import { ModalProvider } from '@/components/providers/ModalProvider';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="demo" element={<DemoPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
      <DesignToolbox />
      <Chatbot />
      <ModalProvider />
    </BrowserRouter>
  );
}

export default App;