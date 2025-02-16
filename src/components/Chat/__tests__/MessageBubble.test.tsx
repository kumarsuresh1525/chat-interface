import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import MessageBubble from '../MessageBubble';
import { lightTheme } from '../../../theme';
import { Message } from '../../../types';

const mockMessage: Message = {
  id: '1',
  content: 'Test message',
  sender: 'user',
  timestamp: new Date('2023-01-01T12:00:00'),
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
  );
};

describe('MessageBubble', () => {
  it('renders message content', () => {
    renderWithTheme(<MessageBubble message={mockMessage} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders timestamp', () => {
    renderWithTheme(<MessageBubble message={mockMessage} />);
    expect(screen.getByText('12:00:00')).toBeInTheDocument();
  });
}); 