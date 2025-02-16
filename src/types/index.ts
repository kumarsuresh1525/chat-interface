export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
  messageBackground: string;
  userMessageBackground: string;
  userMessageText: string;
} 