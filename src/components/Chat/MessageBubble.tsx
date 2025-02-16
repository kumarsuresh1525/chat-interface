import React from 'react';
import styled from 'styled-components';
import { Message } from '../../types';

const Bubble = styled.div<{ $isUser: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background: ${({ $isUser, theme }) =>
    $isUser ? theme.userMessageBackground : theme.messageBackground};
  color: ${({ $isUser, theme }) =>
    $isUser ? theme.userMessageText : theme.text};
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  margin-top: 4px;
`;

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const timestamp = message.timestamp instanceof Date 
    ? message.timestamp 
    : new Date(message.timestamp);
  
  return (
    <div>
      <Bubble $isUser={isUser}>
        {message.content}
      </Bubble>
      <Timestamp>
        {timestamp.toLocaleTimeString()}
      </Timestamp>
    </div>
  );
};

export default MessageBubble; 