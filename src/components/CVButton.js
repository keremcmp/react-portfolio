// src/components/CVButton.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DownloadButton = styled(motion.a)`
  padding: 12px 24px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }

  &::before {
    content: '↓';
    font-size: 1.2em;
  }
`;

const CVButton = () => {
  return (
    <DownloadButton
      href="/documents/your-cv.pdf"  // EDIT: Add your CV file name here
      download="YourName-CV.pdf"     // EDIT: Change this to your name
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Download CV
    </DownloadButton>
  );
};

export default CVButton;