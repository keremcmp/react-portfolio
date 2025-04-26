// src/pages/Skills.js
import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Tilt from 'react-parallax-tilt';

const SkillsContainer = styled(motion.main)`
  min-height: 100vh;
  padding: clamp(60px, 10vh, 100px) clamp(20px, 5vw, 50px);
  background: #0f0f0f;
  
  @media (max-width: 768px) {
    transform: none !important;
    width: ${props => props.level}%;
    background: #0f0f0f;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(15px, 2vw, 20px);
  padding: clamp(10px, 2vw, 20px);
  margin-bottom: clamp(30px, 5vh, 60px);
`;

const SkillTitle = styled.h3`
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.95);
`;

const SkillDescription = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  opacity: 0.8;
  line-height: 1.6;
  max-width: 40ch;
`;

const ProgressSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: clamp(10px, 2vw, 20px);
  visibility: visible !important;
  opacity: 1 !important;
`;

const ProgressContainer = styled.div`
  margin-bottom: clamp(20px, 3vh, 25px);
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
`;

const ProgressBar = styled(motion.div)`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &:focus-within {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.color || '#8b5cf6'};
  border-radius: 4px;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 3vw, 2.5rem);
  margin-bottom: clamp(30px, 5vh, 40px);
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
`;

const SubSectionTitle = styled(motion.h3)`
  font-size: clamp(1.5rem, 2.5vw, 1.8rem);
  margin-bottom: clamp(20px, 3vh, 30px);
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
`;

// Memoize the static data
const skillsData = [
  {
    title: "Sales Engineer",
    description: "I have been in sales for almost 10 years now and have developed myself in different sections of selling",
    color: "#61DAFB",
    icon: "💼"
  },
  {
    title: "Backend Development",
    description: "Scalable server solutions with Node.js, Python, and robust database management. API design and system architecture.",
    color: "#68A063",
    icon: "⚙️"
  },
  {
    title: "Machine Learning",
    description: "I have built several algorithms and recommender systems.",
    color: "#FF61F6",
    icon: "✨"
  }
];

const programmingSkills = [
  { name: 'JavaScript', level: 90, color: '#4F9800', years: 3 },
  { name: 'React', level: 85, color: '#4F9800', years: 2 },
  { name: 'Python', level: 75, color: '#D57526', years: 2 },
  { name: 'Node.js', level: 80, color: '#4F9800', years: 2 },
  { name: 'HTML/CSS', level: 95, color: '#4F9800', years: 3 },
  { name: 'SQL', level: 70, color: '#D57526', years: 2 },
  { name: 'Scikit-learn', level: 75, color: '#D57526', years: 2 },
  { name: 'R', level: 80, color: '#4F9800', years: 3 },
  { name: 'pandas', level: 85, color: '#4F9800', years: 2 }
];

// Create memoized components for reusable parts
const MemoizedSkillCard = memo(({ skill, index }) => (
  <Tilt
    glareEnable={true}
    glareMaxOpacity={0.45}
    glarePosition="all"
    glareBorderRadius="10px"
    scale={1.02}
    tiltMaxAngleX={15}
    tiltMaxAngleY={15}
  >
    <StyledSkillCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <span role="img" aria-label={skill.title} style={{ fontSize: '2rem', marginBottom: '15px' }}>
        {skill.icon}
      </span>
      <SkillTitle>{skill.title}</SkillTitle>
      <SkillDescription>{skill.description}</SkillDescription>
    </StyledSkillCard>
  </Tilt>
));

const ProgressItem = memo(({ skill, index }) => (
  <ProgressContainer key={skill.name}>
    <ProgressLabel>
      <span>{skill.name}</span>
      <span>{skill.level}% • {skill.years} {skill.years === 1 ? 'year' : 'years'}</span>
    </ProgressLabel>
    <ProgressBar>
      <ProgressFill
        color={skill.color}
        animate={{ width: `${skill.level}%` }}
        initial={{ width: 0 }}
        transition={{ duration: 1, delay: index * 0.1 }}
      />
    </ProgressBar>
  </ProgressContainer>
));

const Skills = () => {
  // Memoize the skill cards section
  const skillCardsSection = useMemo(() => (
    <Grid>
      {skillsData.map((skill, index) => (
        <MemoizedSkillCard key={skill.title} skill={skill} index={index} />
      ))}
    </Grid>
  ), []);

  // Memoize the progress section
  const progressSection = useMemo(() => (
    <ProgressSection>
      <SubSectionTitle
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Programming Proficiency
      </SubSectionTitle>
      {programmingSkills.map((skill, index) => (
        <ProgressItem key={skill.name} skill={skill} index={index} />
      ))}
    </ProgressSection>
  ), []);

  return (
    <SkillsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Skills - Kerem Comertpay</title>
        <meta 
          name="description" 
          content="Explore my technical skills and expertise in web development, including frontend, backend, and UI/UX design." 
        />
      </Helmet>

      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </SectionTitle>
      
      {skillCardsSection}
      {progressSection}
    </SkillsContainer>
  );
};

// Keep only StyledSkillCard
const StyledSkillCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: clamp(15px, 3vw, 20px);
  border-radius: 10px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  transform: perspective(1000px);
  
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(15, 15, 15, 0.8);
  }

  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
  }

  &:focus-within {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }
`;

// Export memoized component
export default memo(Skills);