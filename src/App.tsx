import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useThemeStore } from './hooks/useThemeStore';
import ChatInterface from './components/Chat/ChatInterface';
import Settings from './components/Settings/Settings';
import { lightTheme, darkTheme } from './theme';
import { ChatProvider } from './context/ChatContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ChatProvider>
        <AppContainer>
          <ChatInterface />
          <Settings />
        </AppContainer>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App; 