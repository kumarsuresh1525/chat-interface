import { rest, RestRequest, ResponseComposition, DefaultBodyType } from 'msw';

export const handlers = [
  rest.post('/api/message', (
    req: RestRequest,
    res: ResponseComposition<DefaultBodyType>,
    ctx
  ) => {
    return res(
      ctx.json({
        id: '1',
        content: 'Mocked AI response',
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
      })
    );
  }),
]; 