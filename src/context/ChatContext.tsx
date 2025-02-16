import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Message } from '../types';
import { mockChatService } from '../services/mockChatService';

interface ChatState {
  messages: Message[];
  isConnected: boolean;
  error: string | null | undefined;
  isAiTyping: boolean;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_AI_TYPING'; payload: boolean };

const initialState: ChatState = {
  messages: [],
  isConnected: false,
  error: null,
  isAiTyping: false,
};

const ChatContext = createContext<{
  state: ChatState;
  sendMessage: (content: string) => void;
} | null>(null);

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_AI_TYPING':
      return {
        ...state,
        isAiTyping: action.payload,
      };
    default:
      return state;
  }
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    // Connect to mock service
    mockChatService.connect();
    dispatch({ type: 'SET_CONNECTED', payload: true });

    // Handle incoming messages
    const unsubscribeMessage = mockChatService.onMessage((message) => {
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    });

    // Handle typing status
    const unsubscribeTyping = mockChatService.onTyping((isTyping) => {
      dispatch({ type: 'SET_AI_TYPING', payload: isTyping });
    });

    return () => {
      unsubscribeMessage();
      unsubscribeTyping();
      mockChatService.disconnect();
    };
  }, []);

  const sendMessage = (content: string) => {
    if (!content.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'Message cannot be empty' });
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: message });
    dispatch({ type: 'SET_ERROR', payload: null as null });
    mockChatService.sendMessage(message).catch(error => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    });
  };

  return (
    <ChatContext.Provider value={{ state, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}; 