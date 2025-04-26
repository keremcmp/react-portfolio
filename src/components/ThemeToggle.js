// src/components/ThemeToggle.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.isDark ? 'var(--primary)' : 'var(--text)'};
  transition: background-color 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    top: 3px;
    left: ${props => props.isDark ? '33px' : '3px'};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--background);
    transition: left 0.3s ease;
  }
`;

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton
      isDark={isDark}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </ToggleButton>
  );
};

export default ThemeToggle;