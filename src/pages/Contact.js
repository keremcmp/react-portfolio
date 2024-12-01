// src/pages/Contact.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import emailjs from '@emailjs/browser';

const ContactContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(80px, 10vh, 100px) clamp(20px, 5vw, 50px);
  position: relative;
`;

const ContactForm = styled(motion.form)`
  width: 100%;
  max-width: min(600px, 90%);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: clamp(20px, 5vw, 40px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @supports not (backdrop-filter: blur(10px)) {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const InputGroup = styled(motion.div)`
  margin-bottom: clamp(15px, 3vh, 20px);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
`;

const baseInputStyles = `
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  color: white;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Input = styled.input`
  ${baseInputStyles}
`;

const TextArea = styled.textarea`
  ${baseInputStyles}
  height: 150px;
  resize: vertical;
  min-height: 100px;
  max-height: 300px;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: clamp(12px, 2vh, 15px);
  background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : 'white'};
  color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.5)' : '#0f0f0f'};
  border: none;
  border-radius: 5px;
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }

  ${props => !props.disabled && `
    &:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-2px);
    }
  `}
`;

const LoadingSpinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid #0f0f0f;
  border-radius: 50%;
  border-top-color: transparent;
`;

const MessageStatus = styled(motion.div)`
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  background: ${props => props.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.success ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.success ? '#10B981' : '#EF4444'};
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  margin-bottom: clamp(20px, 4vh, 30px);
  text-align: center;
  color: rgba(255, 255, 255, 0.95);
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  margin-bottom: clamp(25px, 5vh, 30px);
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.6;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const submitButtonRef = useRef();

  // Reset status after 5 seconds
  useEffect(() => {
    let timeoutId;
    if (status.submitted) {
      timeoutId = setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [status.submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    submitButtonRef.current?.blur();

    try {
      const result = await emailjs.sendForm(
        'service_7w7zhor',
        'template_vgjbskc',
        form.current,
        'LzgftItNBZG3uEo49'
      );

      if (result.status === 200) {
        setStatus({
          submitted: true,
          success: true,
          message: 'Message sent successfully! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Email send error:', error);
      setStatus({
        submitted: true,
        success: false,
        message: 'Oops! Something went wrong. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset status when user starts typing again
    if (status.submitted) {
      setStatus(prev => ({ ...prev, submitted: false }));
    }
  };

  return (
    <ContactContainer>
      <Helmet>
        <title>Contact - Kerem Comertpay</title>
        <meta name="description" content="Get in touch with Kerem Comertpay. Send me a message and I'll get back to you as soon as possible." />
      </Helmet>

      <ContactForm
        ref={form}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <Title>Get In Touch</Title>
        <Subtitle>
          Have a question or want to work together? Feel free to reach out!
        </Subtitle>

        {status.submitted && (
          <MessageStatus
            success={status.success}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {status.message}
          </MessageStatus>
        )}
        
        <InputGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Your name"
            aria-required="true"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="your.email@example.com"
            aria-required="true"
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Your message here..."
            aria-required="true"
          />
        </InputGroup>

        <SubmitButton
          ref={submitButtonRef}
          type="submit"
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <>
              <LoadingSpinner 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </>
          ) : 'Send Message'}
        </SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;