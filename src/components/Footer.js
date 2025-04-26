import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FooterContainer = styled(motion.footer)`
  width: 100%;
  padding: 30px 20px;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(139, 92, 246, 0.2);
  margin-top: 80px;
  z-index: 10;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: rgba(139, 92, 246, 0.9);
  margin-bottom: 15px;
  font-weight: 500;
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 5px 0;
`;

const Copyright = styled.div`
  margin-top: 30px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
`;

const PrivacyLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  margin-left: 15px;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(139, 92, 246, 0.9);
  }
`;

const Footer = ({
  kvkNumber = "96855053",
  businessName = "KMC Systems",
  vatNumber = "NL005233304B45",
  address = "Pieter Stastokstraat 18, 1507PE",
  email = "keremcmp@hotmail.com",
  phone = "+31 6166 2268",
  year = new Date().getFullYear()
}) => {
  return (
    <FooterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FooterContent>
        <BusinessInfo>
          <InfoSection>
            <SectionTitle>Business Information</SectionTitle>
            <InfoText><strong>Name:</strong> {businessName}</InfoText>
            <InfoText><strong>KVK:</strong> {kvkNumber}</InfoText>
            <InfoText><strong>VAT:</strong> {vatNumber}</InfoText>
          </InfoSection>
          
          <InfoSection>
            <SectionTitle>Contact</SectionTitle>
            <InfoText><strong>Email:</strong> {email}</InfoText>
            <InfoText><strong>Phone:</strong> {phone}</InfoText>
          </InfoSection>
        </BusinessInfo>
        
        <Copyright>
          © {year} {businessName}. All rights reserved.
          <PrivacyLink to="/privacy">Privacy Policy</PrivacyLink>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 