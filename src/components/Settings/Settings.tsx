import React from 'react';
import styled from 'styled-components';
import { useThemeStore } from '../../hooks/useThemeStore';

const SettingsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px;
  background: ${({ theme }) => theme.messageBackground};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ThemeToggle = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <SettingsContainer>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </ThemeToggle>
    </SettingsContainer>
  );
};

export default Settings; 