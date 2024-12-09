import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CursorOutline = styled.div`
  width: ${props => props.isHovered ? '50px' : '30px'};
  height: ${props => props.isHovered ? '50px' : '30px'};
  position: fixed;
  pointer-events: none;
  user-select: none;
  z-index: 99998;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transition: width 0.2s ease, height 0.2s ease;
  will-change: transform;
  transform: translate(-50%, -50%);
`;

const CursorDot = styled.div`
  width: 4px;
  height: 4px;
  background: white;
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const outlineRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });
  const outlinePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // First useEffect for cursor hiding
  useEffect(() => {
    // Force hide cursor in Safari/macOS
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    const elements = document.querySelectorAll('a, button, input, textarea, select');
    elements.forEach(el => {
      el.style.cursor = 'none';
    });
  }, []);

  // Second useEffect for cursor movement and events
  useEffect(() => {
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      mousePosition.current = { x: clientX, y: clientY };
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };

    const updateOutlinePosition = () => {
      const speed = 0.1;

      const dx = mousePosition.current.x - outlinePosition.current.x;
      const dy = mousePosition.current.y - outlinePosition.current.y;

      outlinePosition.current.x += dx * speed;
      outlinePosition.current.y += dy * speed;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${outlinePosition.current.x}px, ${outlinePosition.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(updateOutlinePosition);
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    const addHoverListeners = (elements) => {
      elements.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(updateOutlinePosition);
    
    addHoverListeners([
      ...document.querySelectorAll('a, button, .navbar *, .button, input')
    ]);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          addHoverListeners([
            ...document.querySelectorAll('a, button, .navbar *, .button, input')
          ]);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <CursorOutline ref={outlineRef} isHovered={isHovered} />
      <CursorDot ref={dotRef} />
    </>
  );
};

export default CustomCursor;