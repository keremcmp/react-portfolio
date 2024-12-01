// src/components/CustomCursor.js
import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorDot = styled(motion.div)`
  width: 5px;
  height: 5px;
  background: #ffffff;
  position: fixed;
  pointer-events: none;
  user-select: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, transform 0.1s ease;
`;

const CursorRing = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: fixed;
  pointer-events: none;
  user-select: none;
  z-index: 9998;
  mix-blend-mode: difference;
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  const updateCursor = useCallback(() => {
    if (dotRef.current && ringRef.current) {
      dotRef.current.style.transform = `translate3d(${mousePosition.current.x - 2.5}px, ${mousePosition.current.y - 2.5}px, 0)`;
      ringRef.current.style.transform = `translate3d(${mousePosition.current.x - 10}px, ${mousePosition.current.y - 10}px, 0)`;
    }
    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(updateCursor);

    const onMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => {
      if (dotRef.current) {
        dotRef.current.style.width = '8px';
        dotRef.current.style.height = '8px';
        dotRef.current.style.transform = `translate3d(${mousePosition.current.x - 4}px, ${mousePosition.current.y - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.width = '30px';
        ringRef.current.style.height = '30px';
        ringRef.current.style.opacity = '0.2';
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) {
        dotRef.current.style.width = '5px';
        dotRef.current.style.height = '5px';
      }
      if (ringRef.current) {
        ringRef.current.style.width = '20px';
        ringRef.current.style.height = '20px';
        ringRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"]'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, [updateCursor]); // Added updateCursor to dependencies

  return (
    <>
      <CursorDot
        ref={dotRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <CursorRing
        ref={ringRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;