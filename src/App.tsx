import { Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

// Layouts
import MainLayout from '@/components/layout/MainLayout';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/home'));
const ServicesPage = lazy(() => import('@/pages/services'));
const WorkPage = lazy(() => import('@/pages/work'));
const ContactPage = lazy(() => import('@/pages/contact'));
const FeaturesPage = lazy(() => import('@/pages/features'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

// Components
import { Loader } from '@/components/common/Loader';
import { DesignToolbox } from '@/components/design/DesignToolbox';
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