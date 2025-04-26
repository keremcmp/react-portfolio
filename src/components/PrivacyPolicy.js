import React from 'react';
import styled from 'styled-components';

const PrivacyContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 40px auto;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.9);

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: rgba(255, 255, 255, 0.95);
  }

  p {
    line-height: 1.6;
    margin-bottom: 15px;
    color: rgba(255, 255, 255, 0.85);
  }

  // Add some basic responsive padding
  @media (max-width: 600px) {
    padding: 20px 15px;
    margin: 20px auto;
  }
`;

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <PrivacyContainer>
      <h1>Privacy Policy</h1>
      <p>
        This website is a personal portfolio and does not collect any personal data from its visitors,
        other than what is explicitly submitted through the contact form.
      </p>
      <p>
        Information submitted through the contact form (such as name and email address) is used solely
        for the purpose of responding to your inquiry. This information is not shared with third parties,
        sold, or used for marketing purposes.
      </p>
      <p>
        This site does not use cookies for tracking purposes. Any cookies used are strictly necessary for
        the basic functionality of the website technology (e.g., session management if applicable).
      </p>
      <p>
        We are committed to ensuring that your information is secure. While no online transmission is
        100% secure, we take reasonable precautions to protect the information submitted via the contact form.
      </p>
      <p>
        This privacy statement is subject to change without notice. Last updated: {lastUpdated}.
      </p>
    </PrivacyContainer>
  );
};

export default PrivacyPolicy; 