import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import MouseParticles from 'react-mouse-particles';

// Layouts
import MainLayout from '@/components/layout/MainLayout';

// Pages
import HomePage from '@/pages/home';
import ServicesPage from '@/pages/services';
import WorkPage from '@/pages/work';
import ContactPage from '@/pages/contact';
import FeaturesPage from '@/pages/features';
import NotFoundPage from '@/pages/not-found';

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
            <Route path="services" element={<ServicesPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
      <DesignToolbox />
      {/* <Chatbot /> */}
      <ModalProvider />
    </BrowserRouter>
  );
}

export default App;