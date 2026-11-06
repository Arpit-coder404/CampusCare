import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { ResourceDetail } from './pages/ResourceDetail';
import { CampusMap } from './pages/CampusMap';
import { Support } from './pages/Support';
import { Services } from './pages/Services';
import { Favorites } from './pages/Favorites';
import { Report } from './pages/Report';
import { Profile } from './pages/Profile';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-campus-ivory flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/discover" element={<PageWrapper><Discover /></PageWrapper>} />
            <Route path="/essentials/:id" element={<PageWrapper><ResourceDetail /></PageWrapper>} />
            <Route path="/map" element={<PageWrapper><CampusMap /></PageWrapper>} />
            <Route path="/support" element={<PageWrapper><Support /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/favorites" element={<PageWrapper><Favorites /></PageWrapper>} />
            <Route path="/report" element={<PageWrapper><Report /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <PageWrapper>
                  <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-5">
                    <div className="text-6xl font-black text-campus-forest">404</div>
                    <h2 className="text-2xl font-bold text-campus-charcoal">Page not found</h2>
                    <p className="text-sm text-campus-charcoal-muted">
                      The route you are looking for doesn't exist in CampusCare.
                    </p>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-campus-forest text-white font-bold text-sm shadow-subtle"
                    >
                      Return to Home
                    </a>
                  </div>
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;

