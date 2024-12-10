import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div`
  width: 4px;
  height: 4px;
  background: #000;
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease, height 0.2s ease;
  
  &.hovered {
    width: 6px;
    height: 6px;
  }
`;

const CursorRing = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  position: fixed;
  pointer-events: none;
  z-index: 99998;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.15s ease-out;
  opacity: 0.5;
  
  &.hovered {
    width: 40px;
    height: 40px;
    opacity: 0.25;
  }
`;

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    const elements = document.querySelectorAll('a, button, input, [role="button"]');
    elements.forEach(el => {
      el.style.cursor = 'none';
    });
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Instant movement for dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
      
      // Smooth movement for ring
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    const onMouseEnter = () => {
      dotRef.current?.classList.add('hovered');
      ringRef.current?.classList.add('hovered');
    };

    const onMouseLeave = () => {
      dotRef.current?.classList.remove('hovered');
      ringRef.current?.classList.remove('hovered');
    };

    document.addEventListener('mousemove', onMouseMove);

    // Add hover effects to interactive elements
    const elements = document.querySelectorAll('a, button, input, [role="button"]');
    elements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      elements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <CursorDot ref={dotRef} />
      <CursorRing ref={ringRef} />
    </>
  );
};

export default CustomCursor;