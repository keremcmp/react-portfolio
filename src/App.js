// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('cursor', 'none', 'important');
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule('* { cursor: none !important; }', 0);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <CustomCursor />
        <Navbar />
        <AnimatePresence mode='wait'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ThemeProvider>
  );
}

export default App;