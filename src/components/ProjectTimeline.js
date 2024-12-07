import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const TimelineContainer = styled(motion.section)`
  padding: 100px 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(139, 92, 246, 0.3);
    transform: translateX(-50%);
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
    &::before {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  padding: 40px 0;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 45px;
  }
`;

const TimelineContent = styled(motion.div)`
  width: 45%;
  padding: 25px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background: rgba(139, 92, 246, 0.8);
    border-radius: 50%;
    ${props => props.align === 'left' ? 'right: -60px;' : 'left: -60px;'}
  }

  @media (max-width: 768px) {
    width: 100%;
    &::before {
      left: -45px;
    }
  }
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: white;
`;

const TimelineDate = styled.span`
  font-size: 0.9rem;
  color: rgba(139, 92, 246, 0.8);
  margin-bottom: 15px;
  display: block;
`;

const TimelineDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const ProjectTimeline = () => {
  const projects = [
    {
      title: "Project Name 1",
      date: "2024",
      description: "Description of your first major project or achievement",
      align: "left"
    },
    {
      title: "Project Name 2",
      date: "2023",
      description: "Description of your second major project or achievement",
      align: "right"
    },
    {
      title: "Project Name 3",
      date: "2023",
      description: "Description of your second major project or achievement",
      align: "left"
    },
    {
        title: "Project Name 4",
        date: "2023",
        description: "Description of your second major project or achievement",
        align: "right"
    },
    {
        title: "Project Name 5",
        date: "2023",
        description: "Description of your second major project or achievement",
        align: "left"
    },

  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <TimelineContainer>
      {projects.map((project, index) => (
        <TimelineItem
          key={index}
          align={project.align}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <TimelineContent
            align={project.align}
            variants={itemVariants}
          >
            <TimelineTitle>{project.title}</TimelineTitle>
            <TimelineDate>{project.date}</TimelineDate>
            <TimelineDescription>{project.description}</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default ProjectTimeline;