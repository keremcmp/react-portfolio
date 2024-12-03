// src/pages/Home.js
import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Github, Linkedin, Youtube, Mail } from 'lucide-react';
const AnimatedBackground = lazy(() => import('../components/AnimatedBackground'));
const Robot2D = lazy(() => import('../components/Robot2D'));
const ParallaxBackground = lazy(() => import('../components/ParallaxBackground'));

const LoadingFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0f0f0f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
`;

const HomeContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    text-align: center;
    padding-top: 80px;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 3;
  padding-bottom: 100px; // Space for social icons on mobile

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Content = styled(motion.div)`
  padding: 0 100px;
  width: 50%;
  position: relative;

  @media (max-width: 1024px) {
    padding: 0 50px;
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    margin-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: clamp(10px, 2vw, 20px);
  margin-top: clamp(20px, 3vh, 30px);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 300px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: clamp(15px, 2vh, 20px);
  background: linear-gradient(45deg, #ffffff 30%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  line-height: 1.2;
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  line-height: 1.6;
  margin-bottom: clamp(20px, 3vh, 30px);
  color: rgba(255, 255, 255, 0.9);
  max-width: 60ch;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const BaseButton = styled(motion.button)`
  padding: clamp(12px, 2vh, 15px) clamp(20px, 3vw, 30px);
  border-radius: 5px;
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  outline: none;
  width: 100%;

  @media (min-width: 769px) {
    width: auto;
  }
`;


const CTA = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  
  &:hover, &:focus-visible {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DownloadCV = styled(BaseButton).attrs({ as: 'a' })`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover, &:focus-visible {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 16l-4-4h8l-4 4zm0 2l-4-4h8l-4 4z'/%3E%3C/svg%3E") center/contain no-repeat;
  }
`;

const RobotContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  
  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 150px;
    max-height: 20vh;
    margin-top: -60px;
    order: -1;
  }
`;

const SocialIcons = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 10;

  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    margin-top: auto;
    padding-top: 30px;
    gap: 15px;
  }
`;


const IconLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const handleViewWork = () => {
    navigate('/skills');
  };

  return (
    <HomeContainer role="main" aria-label="Home">
      <Helmet>
        <title>Kerem Comertpay - Web Developer Portfolio</title>
        <meta name="description" content="Portfolio of Kerem Comertpay - A passionate developer crafting digital experiences through code and creativity." />
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Helmet>

      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <AnimatedBackground />
        <ParallaxBackground />
      </Suspense>

      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <RobotContainer aria-hidden="true">
          <Suspense fallback={null}>
            <Robot2D />
          </Suspense>
        </RobotContainer>

        <Content>
          <Title
            aria-level="1"
            role="heading"
          >
            Hi, I'm Kerem Comertpay
          </Title>
          <Description>
            A passionate developer crafting digital experiences through code and creativity.
            I specialize in building innovative web solutions with modern technologies.
          </Description>
          <ButtonContainer>
            <CTA
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewWork}
              aria-label="View my work - Navigate to skills section"
            >
              View My Work
            </CTA>
            <DownloadCV
              href={process.env.PUBLIC_URL + "/documents/cute.pdf"}
              download="Kerem-Comertpay-CV.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download my CV"
              title="Download CV in PDF format"
            >
              Download CV
            </DownloadCV>
          </ButtonContainer>
        </Content>

        <SocialIcons>
          <IconLink 
            href="https://github.com/keremcmp" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Visit my GitHub profile"
          >
            <Github size={20} />
          </IconLink>
          <IconLink 
            href="https://www.linkedin.com/in/kerem-comertpay-409764182/" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Visit my LinkedIn profile"
          >
            <Linkedin size={20} />
          </IconLink>
          <IconLink 
            href="mailto:keremcmp@hotmail.com" 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send me an email"
          >
            <Mail size={20} />
          </IconLink>
        </SocialIcons>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;