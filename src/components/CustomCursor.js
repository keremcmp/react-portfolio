import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  width: ${props => props.isHovered ? '24px' : '8px'};
  height: ${props => props.isHovered ? '24px' : '8px'};
  background: white;
  position: fixed;
  pointer-events: none;
  user-select: none;
  z-index: 99999;
  border-radius: 50%;
  mix-blend-mode: difference;
  transition: width 0.2s ease, height 0.2s ease;
  will-change: transform;
  transform: translate(-50%, -50%);
`;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
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
    
    // Add listeners to existing elements
    addHoverListeners([
      ...document.querySelectorAll('a, button, .navbar *, .button, input')
    ]);

    // Observer for dynamically added elements
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
      observer.disconnect();
    };
  }, []);

  return <Cursor ref={cursorRef} isHovered={isHovered} />;
};

export default CustomCursor;