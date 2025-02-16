import React from 'react';
import styled from 'styled-components';
import MessageThread from './MessageThread';
import InputArea from './InputArea';
import { useChatContext } from '../../context/ChatContext';

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StatusBar = styled.div<{ isConnected: boolean }>`
  padding: 8px;
  text-align: center;
  background-color: ${({ isConnected, theme }) =>
    isConnected ? theme.primary : theme.secondary};
  color: white;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const ChatInterface: React.FC = () => {
  const { state, sendMessage } = useChatContext();

  return (
    <ChatContainer>
      <StatusBar isConnected={state.isConnected}>
        {state.isConnected ? 'Connected' : 'Connecting...'}
      </StatusBar>
      {state.error && (
        <div style={{ color: 'red', marginBottom: '16px' }}>{state.error}</div>
      )}
      <MessageThread />
      <InputArea onSendMessage={sendMessage} />
    </ChatContainer>
  );
};

export default ChatInterface; 