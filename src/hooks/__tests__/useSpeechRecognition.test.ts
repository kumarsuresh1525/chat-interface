import { renderHook, act } from '@testing-library/react';
import { useSpeechRecognition } from '../useSpeechRecognition';

// Mock the Web Speech API
const mockSpeechRecognition = {
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
};

global.window.webkitSpeechRecognition = jest.fn().mockImplementation(() => mockSpeechRecognition);

describe('useSpeechRecognition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    expect(result.current.transcript).toBe('');
    expect(result.current.isListening).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles start listening', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      result.current.startListening();
    });
    
    expect(result.current.isListening).toBe(true);
  });

  it('handles stop listening', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      result.current.startListening();
      result.current.stopListening();
    });
    
    expect(result.current.isListening).toBe(false);
  });
}); 