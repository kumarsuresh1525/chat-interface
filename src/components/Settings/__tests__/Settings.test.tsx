import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Settings from '../Settings';
import { lightTheme } from '../../../theme';

// Mock the zustand store
jest.mock('../../../hooks/useThemeStore', () => ({
  useThemeStore: () => ({
    isDarkMode: false,
    toggleTheme: jest.fn(),
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
  );
};

describe('Settings', () => {
  it('renders theme toggle button', () => {
    renderWithTheme(<Settings />);
    expect(screen.getByText('🌙 Dark Mode')).toBeInTheDocument();
  });

  it('calls toggleTheme when button is clicked', () => {
    const mockToggleTheme = jest.fn();
    jest.spyOn(require('../../../hooks/useThemeStore'), 'useThemeStore')
      .mockImplementation(() => ({
        isDarkMode: false,
        toggleTheme: mockToggleTheme,
      }));

    renderWithTheme(<Settings />);
    fireEvent.click(screen.getByText('🌙 Dark Mode'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
}); 