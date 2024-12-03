import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  position: fixed;
  pointer-events: none;
  user-select: none;
  z-index: 9999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
`;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const updateCursor = () => {
      // Interpolation factor (adjust for smoothness and speed)
      const speed = 0.2;

      cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * speed;
      cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(updateCursor);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <Cursor ref={cursorRef} />;
};

export default CustomCursor;
