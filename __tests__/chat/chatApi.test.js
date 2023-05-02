const { default: handler } = require('../../pages/api/chat');

describe('Chat API test', () => {
  const mockRequest = () => {
    const req = {};
    req.query = { sentence: 'test sentence' };
    return req;
  };

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('return success response', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        message: 'Success in getting chatting data',
        data: expect(String),
      }),
    );
  });

  it('return error response', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const error = new Error('OpenAI API error');

    jest.spyOn(global, 'fetch').mockImplementation(() => {
      throw error;
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error });
  });
});
