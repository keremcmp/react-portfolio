import React, { lazy, Suspense, useState, useEffect, useCallback, useMemo, memo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Github, Linkedin, Mail } from 'lucide-react';
import image_logo from '../assets/gallery/Kerem.png'
import ProjectTimeline from '../components/ProjectTimeline';
import Footer from '../components/Footer';
import { ChevronDown } from 'lucide-react';
import { throttle } from 'lodash';


const AnimatedBackground = lazy(() => import('../components/AnimatedBackground'));
const Robot2D = lazy(() => import('../components/Robot2D'));
const ParallaxBackground = lazy(() => import('../components/ParallaxBackground'));


const INITIAL_LOAD_KEY = 'hasLoadedBefore';

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 120px;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  opacity: 1;
  transition: all 0.5s ease;
  pointer-events: none;

  svg {
    width: 45px;
    height: 45px;
    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
  }
`;

 


const ScrollText = styled(motion.span)`
 color: white;
 font-size: 1.2rem;
 text-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
`;

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
  overflow: hidden;
  cursor: none;

  * {
    cursor: none !important;
  }

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
  padding-top: 50px;
  margin-top: 0;
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    padding-bottom: 40px;
    margin-top: 0;
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
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 500px;
    height: 500px;
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
  transition: all 0.3s ease;
  position: relative;
  outline: none;
  width: 100%;
  cursor: none !important;

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
  top: 50%;
  transform: translateY(-50%);
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
    transform: none;
  }
`;

const SocialIcons = styled(motion.div)`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 1000;
  background: rgba(15, 15, 15, 0.5);
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  border-radius: 30px;
  border: 1px solid rgba(139, 92, 246, 0.2);

  @media (max-width: 768px) {
    bottom: 20px;
    padding: 8px 16px;
  }
`;

const IconLink = styled.a`
  color: rgba(139, 92, 246, 0.8);
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(139, 92, 246, 1);
  }
`;

// const Wrapper = styled.div`
//   position: relative;
//   min-height: 100vh;
// `;

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [businessInfo, setBusinessInfo] = useState({
    kvkNumber: "96855053", 
    businessName: "KMC Systems",
    vatNumber: "NL123456789B01", 
    address: "Pieter Stastokstraat 18, 1507PE ZAANDAM",
    email: "keremcmp@hotmail.com",
    phone: "+31 6166 2268"
  });

  const handleViewWork = useCallback(() => {
    navigate('/gallery');
  }, [navigate]);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem(INITIAL_LOAD_KEY);
    let loadTimer;
    
    if (!hasLoaded) {
      loadTimer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem(INITIAL_LOAD_KEY, 'true');
      }, 2000);
    } else {
      setIsLoading(false);
      setHasLoadedBefore(true);
    }

    return () => {
      if (loadTimer) clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setShowScroll(window.scrollY <= 100);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const hideTimer = setTimeout(() => {
      setShowScroll(false);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(hideTimer);
    };
  }, []);

  const SocialIconsSection = useMemo(() => (
    <SocialIcons
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <IconLink
        href="https://github.com/keremcmp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my GitHub profile"
      >
        <Github size={20} />
      </IconLink>
      <IconLink
        href="https://www.linkedin.com/in/kerem-comertpay-409764182/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my LinkedIn profile"
      >
        <Linkedin size={20} />
      </IconLink>
      <IconLink
        href="mailto:keremcmp@hotmail.com"
        aria-label="Send me an email"
      >
        <Mail size={20} />
      </IconLink>
    </SocialIcons>
  ), []);

  const LoadingScreenComponent = useMemo(() => (
    isLoading && !hasLoadedBefore && (
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
    )
  ), [isLoading, hasLoadedBefore]);

  return (
    <>
      <AnimatePresence mode="wait">
        {LoadingScreenComponent}
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
          initial={{ opacity: 1, y: 0 }}
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
              innovative web solutions with modern technologies. Furthermore I help with business solutions, I do sales
              and business development. If you finally want it your way in your business, contact me.
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
                href={process.env.PUBLIC_URL + '/documents/Resume.pdf'}
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
 
          <ScrollIndicator
            initial={{ opacity: 1, y: 0 }}
            animate={{
              opacity: showScroll ? 1 : 0,
              y: showScroll ? 0 : 20
            }}
            transition={{ duration: 0.5 }}
          >
            <ScrollText>Scroll!</ScrollText>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                repeat: showScroll ? Infinity : 0,
                duration: 1.5 
              }}
            >
              <ChevronDown size={45} color="white" strokeWidth={1.5} />
            </motion.div>
          </ScrollIndicator>
          <ProjectTimeline />
          
          <Footer 
            kvkNumber={businessInfo.kvkNumber}
            businessName={businessInfo.businessName}
            vatNumber={businessInfo.vatNumber}
            address={businessInfo.address}
            email={businessInfo.email}
            phone={businessInfo.phone}
          />
        </ContentWrapper>

        {SocialIconsSection}
      </HomeContainer>
    </>
  );
};

export default memo(Home);