import { Message } from '../types';

const commonResponses = new Map<string, string[]>([
  ['how are you', [
    "I'm doing great, thanks for asking! How are you?",
    "I'm wonderful! Thanks for asking. How's your day going?",
    "I'm excellent! Always happy to chat. How about you?"
  ]],
  ['hello', [
    "Hi there! How can I help you today?",
    "Hello! Great to see you. What's on your mind?",
    "Hey! How can I assist you today?"
  ]],
  ['hi', [
    "Hello! How can I help you today?",
    "Hi there! What can I do for you?",
    "Hey! What's on your mind?"
  ]],
  ['what can you do', [
    "I can help you with various tasks like answering questions, providing information, or having a friendly chat!",
    "I'm here to assist you with information, answer questions, or just chat. What would you like to know?",
    "I can help with many things - from answering questions to having conversations. What interests you?"
  ]],
  ['who are you', [
    "I'm an AI assistant, here to help and chat with you!",
    "I'm your friendly AI chat companion, ready to help and converse.",
    "I'm an AI created to assist and chat with you. How can I help?"
  ]],
  ['thanks', [
    "You're welcome! Let me know if you need anything else.",
    "Glad I could help! Feel free to ask more questions.",
    "My pleasure! Don't hesitate to ask if you need more assistance."
  ]]
]);

type ChatCallback = (message: Message) => void;
type TypingCallback = (isTyping: boolean) => void;

interface MessageEvent {
  content: string;
}

class MockChatService {
  private messageCallbacks: ChatCallback[] = [];
  private typingCallbacks: TypingCallback[] = [];
  private isConnected: boolean = false;

  connect() {
    this.isConnected = true;
    return Promise.resolve();
  }

  disconnect() {
    this.isConnected = false;
  }

  private getMockResponse(message: MessageEvent | string): string {
    const content = typeof message === 'string' ? message : message.content;
    const lowerMessage = content.toLowerCase().trim();

    // Check for exact matches
    if (commonResponses.has(lowerMessage)) {
      const responses = commonResponses.get(lowerMessage)!;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Check for partial matches
    for (const [key, responses] of commonResponses.entries()) {
      if (lowerMessage.includes(key)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // Default response
    return `I understand you're saying "${content}". How can I assist you with that?`;
  }

  async sendMessage(message: Message) {
    if (!this.isConnected) {
      throw new Error('Not connected to chat service');
    }

    // Simulate typing delay
    this.typingCallbacks.forEach(cb => cb(true));

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response: Message = {
      id: Date.now().toString(),
      content: this.getMockResponse({ content: message.content }),
      sender: 'ai',
      timestamp: new Date(),
    };

    this.typingCallbacks.forEach(cb => cb(false));
    this.messageCallbacks.forEach(cb => cb(response));
  }

  onMessage(callback: ChatCallback) {
    this.messageCallbacks.push(callback);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }

  onTyping(callback: TypingCallback) {
    this.typingCallbacks.push(callback);
    return () => {
      this.typingCallbacks = this.typingCallbacks.filter(cb => cb !== callback);
    };
  }
}

export const mockChatService = new MockChatService(); 