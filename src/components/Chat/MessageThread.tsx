import React from 'react';
import styled from 'styled-components';
import { useChatContext } from '../../context/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ThreadContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageThread: React.FC = () => {
  const { state } = useChatContext();
  
  return (
    <ThreadContainer>
      {state.messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {state.isAiTyping && <TypingIndicator />}
    </ThreadContainer>
  );
};

export default MessageThread; 