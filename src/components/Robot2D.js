// src/components/Robot2D.js
import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { throttle } from 'lodash';

const SpeechBubble = styled.div`
  position: absolute;
  background: rgba(139, 92, 246, 0.1);
  border: 2px solid rgba(139, 92, 246, 0.3);
  padding: 10px 15px;
  border-radius: 20px;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  backdrop-filter: blur(5px);
  color: white;
  font-size: 0.9rem;
  white-space: nowrap;
  z-index: 3;
  will-change: transform;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);

  /* Add speech bubble tail */
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid rgba(139, 92, 246, 0.3);
  }

  /* Add inner tail to match background */
  &::before {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid rgba(139, 92, 246, 0.1);
    z-index: 1;
  }
`;

const float = keyframes`
  0% { 
    transform: translateY(-50%);
  }
  50% { 
    transform: translateY(calc(-50% - 10px));
  }
  100% { 
    transform: translateY(-50%);
  }
`;

const RobotContainer = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%) translateZ(0);
  width: 200px;
  height: 200px;
  z-index: 2;
  animation: ${float} 3s ease-in-out infinite;
  transition: transform 0.1s ease-out;
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000px;
  -webkit-transform: translateY(-50%) translateZ(0);
`;

const Robot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateZ(0);
  will-change: transform;
`;

const Head = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  width: 80px;
  height: 80px;
  background: rgba(139, 92, 246, 0.2);
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: 40px;
  backdrop-filter: blur(5px);
  will-change: transform;
`;

const Eye = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: #8b5cf6;
  border-radius: 50%;
  box-shadow: 0 0 10px #8b5cf6;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;

  &.left {
    left: 15px;
    top: 25px;
  }

  &.right {
    right: 15px;
    top: 25px;
  }
`;

const Body = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  width: 100px;
  height: 120px;
  background: rgba(139, 92, 246, 0.1);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(5px);
  will-change: transform;
`;

const Antenna = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%) translateZ(0);
  width: 4px;
  height: 20px;
  background: rgba(139, 92, 246, 0.5);
  will-change: transform;

  &::after {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: #8b5cf6;
    border-radius: 50%;
    box-shadow: 0 0 10px #8b5cf6;
  }
`;

const Robot2D = () => {
  const robotRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateEyePosition = (e) => {
      if (!robotRef.current || !leftEyeRef.current || !rightEyeRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = robotRef.current.getBoundingClientRect();
        const robotCenterX = rect.left + rect.width / 2;
        const robotCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);

        const eyeMovement = 5;
        const eyeX = Math.cos(angle) * eyeMovement;
        const eyeY = Math.sin(angle) * eyeMovement;

        const transform = `translate(${eyeX}px, ${eyeY}px)`;
        leftEyeRef.current.style.transform = transform;
        rightEyeRef.current.style.transform = transform;
      });
    };

    const handleMouseMove = throttle(updateEyePosition, 16);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <RobotContainer ref={robotRef}>
      <Robot>
        <SpeechBubble>work in progress...</SpeechBubble>
        <Head>
          <Antenna />
          <Eye ref={leftEyeRef} className="left" />
          <Eye ref={rightEyeRef} className="right" />
        </Head>
        <Body />
      </Robot>
    </RobotContainer>
  );
};

export default Robot2D;