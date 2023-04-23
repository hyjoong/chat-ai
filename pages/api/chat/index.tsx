import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi, Configuration } from 'openai';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sentence, apiKey, roomCount } = req.query;

  try {
    const configuration = new Configuration({
      apiKey: apiKey as string,
    });
    const aiBotCount = Number(roomCount) - 1;
    const openai = new OpenAIApi(configuration);
    const { data } = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 128,
      messages: [
        {
          role: 'system',
          content: `This is a chat room where one user and ${aiBotCount} AI are chatting. Please feel free to provide responses, ask new questions, or change the topic within 3 lines.`,
        },
        { role: 'user', content: sentence as string },
      ],
    });

    if (data.choices[0].finish_reason === 'lengthmax_tokens') {
      res.status(401).json({
        success: false,
        message:
          'API key usage limit exceeded. Please log in with a different API key',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Success in getting chatting data',
      data: data.choices[0],
    });
  } catch (error: any) {
    res.status(400).json({ error });
  }
};
