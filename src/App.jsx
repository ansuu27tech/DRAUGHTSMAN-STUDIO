import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';
import Intro from './components/Intro';
import Hero from './components/Hero';
import AboutStudio from './components/AboutStudio';
import Services from './components/Services';
import Team from './components/Team';
import Founder from './components/Founder';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import CommandBar from './components/CommandBar';
import ArchitecturalLayout from './components/ArchitecturalLayout';
import Scene3D from './components/3d/Scene3D';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Intro animation duration matches the component's internal timing
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <SEO />
      <AnimatePresence mode="wait">
        {showIntro ? (
          <Intro key="intro" />
        ) : (
          <>
            <ThemeToggle />
            <ArchitecturalLayout />
            <Scene3D />
            <CommandBar />
            <main key="main-content" style={{ opacity: 0, animation: 'fadeIn 1s forwards' }}>
              <Hero />
              <Projects />
              <Founder />
              <Team />
              <AboutStudio />
              <Services />
              <Testimonials />
              <Contact />
              <Footer />
            </main>
          </>
        )}
      </AnimatePresence>
      <style>{`
        @keyframes fadeIn {
            to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
