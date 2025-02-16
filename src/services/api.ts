import { Message } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMessage = async (message: string): Promise<Message> => {
  await delay(1000); // Simulate network delay
  
  return {
    id: Date.now().toString(),
    content: `AI response to: ${message}`,
    sender: 'ai',
    timestamp: new Date(),
  };
}; 