import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sentence, apiKey } = req.query;

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: sentence,
        max_tokens: 200,
      }),
    });
    const { choices } = await response.json();
    const data = choices[0].text;
    res.status(200).json({
      success: true,
      message: 'Success in getting chatting data',
      data,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
