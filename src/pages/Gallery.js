// src/pages/Gallery.js
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import randomImage from '../assets/gallery/random_sample_image copy.jpg';

// Lazy load images
// const randomImage = '/gallery/random_sample_image.jpg'; // Replace with your image path

const GalleryContainer = styled(motion.main)`
  min-height: 100vh;
  padding: clamp(80px, 10vh, 120px) clamp(20px, 5vw, 50px) clamp(20px, 5vh, 50px);
  background: #0f0f0f;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  gap: clamp(15px, 2vw, 30px);
  padding: clamp(10px, 2vw, 20px);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  aspect-ratio: 16/9;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }

  @media (hover: hover) {
    &:hover .overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(15px, 3vw, 20px);
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  class="overlay";

  @media (max-width: 768px) {
    opacity: 1;
    transform: none;
  }
`;

const ProjectTitle = styled.h3`
  color: white;
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 5px;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.5;
  
  @media (max-width: 480px) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #8b5cf6;
  animation: spin 1s ease-in-out infinite;
  margin: 50px auto;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  max-width: 90%;
  max-height: 90vh;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(15, 15, 15, 0.95);
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
`;

const CarouselImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const ThumbnailStrip = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow-x: auto;
  background: rgba(0, 0, 0, 0.5);

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const Thumbnail = styled.img`
  height: 60px;
  width: auto;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  z-index: 3;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const ModalInfo = styled.div`
  padding: 20px;
  color: white;

  h2 {
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.8);
  }

  span {
    color: #8b5cf6;
  }
`;

const projects = [
  {
    id: 1,
    title: 'Greece',
    description: 'July 2024',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024',
  },
  {
    id: 2,
    title: 'Italy',
    description: 'May 2024',
    images: [randomImage, randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024'
  },
  {
    id: 3,
    title: 'Turkey',
    description: 'August 2024',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024',
  },
  {
    id: 4,
    title: 'Croatia',
    description: 'September 2024',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024',
  },
  {
    id: 5,
    title: 'Belgium',
    description: 'October 2024',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024',
  },
  {
    id: 6,
    title: 'France',
    description: 'November 2024',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024',
  },
  {
    id: 7,
    title: 'Germany',
    description: 'December 2024',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2024',
  },
  {
    id: 8,
    title: 'Austria',
    description: 'January 2025',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2025',
  },
  {
    id: 9,
    title: 'Czech Republic',
    description: 'February 2025',
    images: [randomImage, randomImage, randomImage],
    thumbnail: randomImage,
    category: 'Vacation',
    year: '2025',
  },
  // more projies
];

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(0);

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex(prev => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  const handleKeyPress = useCallback((e) => {
    if (!selectedProject) return;

    switch (e.key) {
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'Escape':
        setSelectedProject(null);
        break;
      default:
        break;
    }
  }, [selectedProject, nextImage, prevImage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects.flatMap(project => 
        project.images.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  return (
    <GalleryContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Project Gallery - Kerem Comertpay</title>
        <meta name="description" content="Explore my portfolio of web development projects, including frontend and backend applications." />
      </Helmet>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Grid>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }
              }}
              role="button"
              aria-label={`View ${project.title} project details`}
            >
              <ProjectImage 
                src={project.thumbnail} 
                alt={project.title}
                loading="lazy"
              />
              <ProjectInfo className="overlay">
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </Grid>
      )}

      <AnimatePresence>
        {selectedProject && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <CloseButton 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
              >
                ×
              </CloseButton>
              
              <CarouselContainer
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <CarouselImage
                  key={currentImageIndex}
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <CarouselButton 
                  className="prev" 
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  ←
                </CarouselButton>
                <CarouselButton 
                  className="next" 
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  →
                </CarouselButton>

                <ImageCounter>
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </ImageCounter>
              </CarouselContainer>

              <ThumbnailStrip>
                {selectedProject.images.map((image, index) => (
                  <Thumbnail
                    key={index}
                    src={image}
                    active={index === currentImageIndex}
                    onClick={() => setCurrentImageIndex(index)}
                    alt={`${selectedProject.title} thumbnail ${index + 1}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </ThumbnailStrip>

              <ModalInfo>
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                <span>{selectedProject.category} • {selectedProject.year}</span>
                {selectedProject.technologies && (
                  <div style={{ marginTop: '10px' }}>
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} style={{ 
                        background: 'rgba(139, 92, 246, 0.2)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        margin: '0 4px 4px 0',
                        display: 'inline-block',
                        fontSize: '0.9rem'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </ModalInfo>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default Gallery;