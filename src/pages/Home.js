import React, { lazy, Suspense, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Github, Linkedin, Mail } from 'lucide-react';
import image_logo from "../data/Kerem.png";

const AnimatedBackground = lazy(() => import('../components/AnimatedBackground'));
const Robot2D = lazy(() => import('../components/Robot2D'));
const ParallaxBackground = lazy(() => import('../components/ParallaxBackground'));

const INITIAL_LOAD_KEY = 'hasLoadedBefore';

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0f0f0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingText = styled(motion.h2)`
  color: white;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: 20px;
  background: linear-gradient(45deg, #ffffff 30%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoadingBar = styled(motion.div)`
  width: 200px;
  height: 3px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 3px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: #8b5cf6;
    border-radius: 3px;
    animation: loading 1s ease-in-out infinite;
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(350%);
    }
  }
`;

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
    height: 100vh;
    padding-top: 80px;
  }
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 3;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 40px;
  }
`;

const Content = styled(motion.div)`
  padding: 0 100px;
  width: 50%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
`;

const Logo = styled.img`
  width: 600px;
  height: 600px;
  object-fit: contain;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 300px;
    height: 150px;
  }
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

  &:hover,
  &:focus-visible {
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

  &:hover,
  &:focus-visible {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
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
    position: fixed;
    width: 100%;
    height: 50vh;
    bottom: 0;
    right: 0;
    top: auto;
    opacity: 0.2;
  }
`;

const SocialIcons = styled(motion.div)`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.5s ease;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-top: 40px;
    opacity: 1;
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem(INITIAL_LOAD_KEY);
    
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem(INITIAL_LOAD_KEY, 'true');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setHasLoadedBefore(true);
    }
  }, []);

  const handleViewWork = () => {
    navigate('/skills');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !hasLoadedBefore && (
          <LoadingScreen
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingText
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome
            </LoadingText>
            <LoadingBar />
          </LoadingScreen>
        )}
      </AnimatePresence>

      <HomeContainer role="main" aria-label="Home">
        <Helmet>
          <title>Kerem Comertpay - Web Developer Portfolio</title>
          <meta
            name="description"
            content="Portfolio of Kerem Comertpay - A passionate developer crafting digital experiences through code and creativity."
          />
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
          transition={{ duration: 0.8, delay: isLoading && !hasLoadedBefore ? 0.5 : 0 }}
        >
          <RobotContainer aria-hidden="true">
            <Suspense fallback={null}>
              <Robot2D />
            </Suspense>
          </RobotContainer>

          <Content>
            <Logo 
              src={process.env.PUBLIC_URL + image_logo} 
              alt="Kerem Comertpay Logo"
            />
            <Description>
              A passionate developer crafting digital experiences through code and creativity. I specialize in building
              innovative web solutions with modern technologies.
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
                href={process.env.PUBLIC_URL + '/documents/cute.pdf'}
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

          <SocialIcons
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
    </>
  );
};

export default Home;