import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import MouseParticles from 'react-mouse-particles';

// Layouts
import MainLayout from '@/components/layout/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import WorkPage from '@/pages/WorkPage';
import ContactPage from '@/pages/ContactPage';
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
      <MouseParticles
        g={0.5}
        num={6}
        radius={1}
        life={10.5}
        v={0.3}
        color="hsl(var(--primary))"
        cull="col,image-wrapper"
        alpha={0.2}
      />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="work" element={<WorkPage />} />
            <Route path="contact" element={<ContactPage />} />
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