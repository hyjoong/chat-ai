import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from 'openai';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sentence, apiKey, roomCount, messageTexts } = req.query;
  const aiBotCount = Number(roomCount) - 1;
  const messages = messageTexts as string;

  const splitedMessages = messages.split(',');

  const messageHistory: ChatCompletionRequestMessage[] = splitedMessages.map(
    message => {
      return {
        role: 'system',
        content: message,
      };
    },
  );

  try {
    const configuration = new Configuration({
      apiKey: apiKey as string,
    });
    const openai = new OpenAIApi(configuration);
    const { data } = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      max_tokens: 256,
      messages: [
        {
          role: 'system',
          content: `This chat room has ${aiBotCount} AI participants. You can freely respond to the user's messages without revealing that you are an AI. If you feel like the conversation has ended, you can change the topic by asking a new question, and AI will respond without revealing its identity. Additionally, if two responses have been made to a question, feel free to ask a new topic and question`,
        },
        ...messageHistory,
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
