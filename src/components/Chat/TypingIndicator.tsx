import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-5px); }
`;

const Container = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 16px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
`;

const TypingIndicator: React.FC = () => (
  <Container>
    <Dot /><Dot /><Dot />
  </Container>
);

export default TypingIndicator; 