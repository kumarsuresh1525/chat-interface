import { sendMessage } from '../api';

describe('API Service', () => {
  it('returns AI response with correct format', async () => {
    const response = await sendMessage('Hello');
    
    expect(response).toMatchObject({
      id: expect.any(String),
      content: expect.stringContaining('Hello'),
      sender: 'ai',
      timestamp: expect.any(Date),
    });
  });

  it('includes the original message in the response', async () => {
    const testMessage = 'Test message';
    const response = await sendMessage(testMessage);
    
    expect(response.content).toContain(testMessage);
  });
}); 