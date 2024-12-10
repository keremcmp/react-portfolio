// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${props => props.isScrolled ? '70px' : '80px'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 max(50px, 5vw);
  background: ${props => props.isScrolled ? 'var(--nav-bg)' : 'var(--nav-bg)'};
  backdrop-filter: blur(10px);
  z-index: 100;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @supports not (backdrop-filter: blur(10px)) {
    background: var(--bg-secondary);
  }
`;

const Logo = styled(motion(Link))`
  font-size: clamp(20px, 2.5vw, 24px);
  font-weight: bold;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: clamp(20px, 3vw, 30px);
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;
const MobileNavButton = styled.button.attrs({
  'aria-label': props => props.isOpen ? 'Close menu' : 'Open menu',
  'aria-expanded': props => props.isOpen
})`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: ${props => props.isScrolled ? '70px' : '80px'};
    left: 0;
    right: 0;
    background: rgba(15, 15, 15, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const baseNavLinkStyles = `
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }
`;

const MobileNavLink = styled(Link)`
  ${baseNavLinkStyles}
  text-align: center;
  font-size: 1.1rem;
  background: ${props => props.isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NavLink = styled(motion(Link))`
  ${baseNavLinkStyles}
  position: relative;
  font-weight: ${props => props.isActive ? '600' : '400'};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: #8b5cf6;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/skills', label: 'Skills' },
  { path: '/contact', label: 'Contact' },
  { path: '/gallery', label: 'Gallery' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleKeyPress = (e, path) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(false);
      // Handle navigation here if needed
    }
  };

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      isScrolled={isScrolled}
    >
      <Logo to="/">Kerem Comertpay</Logo>
      
      <NavLinks>
        {navItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            isActive={location.pathname === path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </NavLink>
        ))}
        <ThemeToggle />
      </NavLinks>

      <MobileNavButton 
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      >
        {isOpen ? '×' : '☰'}
      </MobileNavButton>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            isOpen={isOpen}
            isScrolled={isScrolled}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map(({ path, label }) => (
              <MobileNavLink
                key={path}
                to={path}
                isActive={location.pathname === path}
                onClick={() => setIsOpen(false)}
                onKeyPress={(e) => handleKeyPress(e, path)}
              >
                {label}
              </MobileNavLink>
            ))}
            <ThemeToggle />
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;