import { renderHook, act } from '@testing-library/react';
import { useThemeStore } from '../useThemeStore';

describe('useThemeStore', () => {
  it('initializes with dark mode disabled', () => {
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.isDarkMode).toBe(false);
  });

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useThemeStore());
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.isDarkMode).toBe(true);
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.isDarkMode).toBe(false);
  });
}); 