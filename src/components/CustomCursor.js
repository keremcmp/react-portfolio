import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const PixelCursor = styled.div`
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

  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        // Round to nearest pixel for authentic retro feel
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

    // Hide default cursor
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
    };
  }, []);

  return <PixelCursor ref={cursorRef} />;
};

export default CustomCursor;