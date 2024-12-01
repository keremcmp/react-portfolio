// src/components/AnimatedBackground.js
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0f0f0f;
  overflow: hidden;
  z-index: 1;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(15, 15, 15, 0.5) 0%,
    rgba(15, 15, 15, 0.8) 100%
  );
`;

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dots = useRef([]);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDots = () => {
      dots.current = [];
      const numberOfDots = Math.floor((window.innerWidth * window.innerHeight) / 15000); // Adjust density here
      
      for (let i = 0; i < numberOfDots; i++) {
        dots.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1 + 0.5,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          speed: Math.random() * 0.5 + 0.2,
          offset: Math.random() * (2 * Math.PI)
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw dots
      dots.current.forEach((dot, i) => {
        const dx = mousePosition.current.x - dot.x;
        const dy = mousePosition.current.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150; // Maximum distance for interaction

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          dot.x -= (dx * force) * 0.02;
          dot.y -= (dy * force) * 0.02;
        } else {
          dot.x += (dot.baseX - dot.x) * 0.05;
          dot.y += (dot.baseY - dot.y) * 0.05;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.fill();

        // Draw connections
        dots.current.forEach((otherDot, j) => {
          if (i === j) return;
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleResize = () => {
      resizeCanvas();
      createDots();
    };

    // Initial setup
    resizeCanvas();
    createDots();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <BackgroundContainer>
      <Canvas ref={canvasRef} />
      <Overlay />
    </BackgroundContainer>
  );
};

export default AnimatedBackground;