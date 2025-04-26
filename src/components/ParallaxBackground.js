// src/components/ParallaxBackground.js
import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
`;

const ParallaxLayer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: rgba(139, 92, 246, ${props => props.opacity});
  filter: blur(${props => props.blur}px);
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  // slow er...
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -20]);

  return (
    <ParallaxContainer>
      {/* Background layer - larger, more subtle circles */}
      <ParallaxLayer style={{ y: y1 }}>
        <Circle size={400} opacity={0.03} blur={70} top={10} left={10} />
        <Circle size={500} opacity={0.02} blur={80} top={70} left={80} />
      </ParallaxLayer>
      
      {/* Middle layer - medium sized circles */}
      <ParallaxLayer style={{ y: y2 }}>
        <Circle size={300} opacity={0.04} blur={50} top={30} left={20} />
        <Circle size={250} opacity={0.05} blur={40} top={60} left={70} />
        <Circle size={200} opacity={0.04} blur={45} top={20} left={90} />
      </ParallaxLayer>
      
      {/* Foreground layer - smaller, slightly more visible circles */}
      <ParallaxLayer style={{ y: y3 }}>
        <Circle size={150} opacity={0.06} blur={30} top={40} left={30} />
        <Circle size={100} opacity={0.07} blur={25} top={80} left={40} />
        <Circle size={120} opacity={0.06} blur={35} top={15} left={60} />
      </ParallaxLayer>
    </ParallaxContainer>
  );
};

export default ParallaxBackground;