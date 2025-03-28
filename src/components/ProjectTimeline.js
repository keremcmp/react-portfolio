import React, { useMemo } from 'react';
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

const TimelineHeader = styled.h1`
  text-align: center;
  color: white;
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-weight: bold;
`;

// Animation variants - moved outside component to prevent recreation on each render
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const ProjectTimeline = () => {
  // Career timeline data
  const projects = useMemo(() => [
    {
      title: "Consultant at Carpet de Lux",
      date: "November 2014",
      sortDate: new Date(2014, 10), // Note: months are 0-indexed in JavaScript
      description: "Here I have done the administration and the various sales within the company.",
    },
    {
      title: "Electrician at EYC Elektra",
      date: "Oktober 2019",
      sortDate: new Date(2019, 9),
      description: "I have done the installation of the electrical installations and the maintenance of the installations.",
    },
    {
      title: "Sales Representative at DPG Media",
      date: "May 2022",
      sortDate: new Date(2022, 4),
      description: "I have done the sales of the company.",
    },
    {
      title: "Started my bachelor Information Sciences at the University of Amsterdam",
      date: "September 2022",
      sortDate: new Date(2022, 8),
      description: "",
    },
    {
      title: "IT Specialist at Inhousify",
      date: "Januari 2023",
      sortDate: new Date(2023, 0),
      description: "I have worked with VMWare and various other technologies.",
    },
    {
      title: "Business Developer at Byte24",
      date: "June 2023",
      sortDate: new Date(2023, 5),
      description: "Sales engineering and overall client management.",
    },
    {
      title: "Business Developer at Sterrk",
      date: "June 2024",
      sortDate: new Date(2024, 5),
      description: "Sales engineering and overall client management.",
    },
    {
      title: "Business Developer at Maxime",
      date: "January 2025",
      sortDate: new Date(2025, 0),
      description: "Sales engineering and overall client management. Also working with the development of the company.",
    },
  ], []);
  
  // Sort projects by date (newest first) - done inside useMemo to avoid unnecessary re-sorting
  const sortedProjects = useMemo(() => 
    [...projects].sort((a, b) => b.sortDate - a.sortDate),
  [projects]);

  return (
    <>
      <TimelineHeader>My Professional Journey</TimelineHeader>
      <TimelineContainer>
        {sortedProjects.map((project, index) => (
          <TimelineItem
            key={index}
            align={index % 2 === 0 ? "left" : "right"}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TimelineContent
              align={index % 2 === 0 ? "left" : "right"}
              variants={itemVariants}
            >
              <TimelineTitle>{project.title}</TimelineTitle>
              <TimelineDate>{project.date}</TimelineDate>
              <TimelineDescription>{project.description}</TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </>
  );
};

export default React.memo(ProjectTimeline);