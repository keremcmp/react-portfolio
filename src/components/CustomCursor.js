import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const PixelCursor = styled.div`
  /* Only show cursor on devices that support hover */
  @media (hover: none) {
    display: none;
  }

  @media (pointer: coarse) {
    display: none;
  }

  /* Regular cursor styles for desktop */
  width: 16px;
  height: 16px;
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  image-rendering: pixelated;

  &::before, &::after {
    content: '';
    position: absolute;
    background: white;
    box-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
  }

  /* Main pointer pixel */
  &::before {
    width: 3px;
    height: 3px;
    left: 0;
    top: 0;
  }

  /* Second pixel */
  &::after {
    width: 3px;
    height: 3px;
    left: 3px;
    top: 3px;
  }

  &.clicked {
    &::before, &::after {
      background: #cccccc;
    }
  }
`;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    };

    setIsMobile(checkMobile());

    // Only set up cursor if not on mobile
    if (!checkMobile()) {
      const onMouseMove = (e) => {
        if (cursorRef.current) {
          const x = Math.round(e.clientX);
          const y = Math.round(e.clientY);
          cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
      };

      const onMouseDown = () => {
        cursorRef.current?.classList.add('clicked');
      };

      const onMouseUp = () => {
        cursorRef.current?.classList.remove('clicked');
      };

      // Hide default cursor on desktop only
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
      
      const elements = document.querySelectorAll('a, button, input, textarea, select');
      elements.forEach(el => {
        el.style.cursor = 'none';
      });

      // Add event listeners
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
        
        // Restore default cursor when component unmounts
        document.documentElement.style.cursor = '';
        document.body.style.cursor = '';
        elements.forEach(el => {
          el.style.cursor = '';
        });
      };
    }
  }, []);

  // Don't render cursor component at all on mobile
  if (isMobile) return null;

  return <PixelCursor ref={cursorRef} />;
};

export default CustomCursor;