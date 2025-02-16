import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ChatInterface from '../ChatInterface';
import { lightTheme } from '../../../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
  );
};

describe('ChatInterface', () => {
  it('renders input area', () => {
    renderWithTheme(<ChatInterface />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('sends message when form is submitted', () => {
    renderWithTheme(<ChatInterface />);
    const input = screen.getByPlaceholderText('Type a message...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Hello AI' } });
    fireEvent.submit(form);

    expect(screen.getByText('Hello AI')).toBeInTheDocument();
  });
}); 