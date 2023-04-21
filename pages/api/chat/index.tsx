import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const { sentence } = req.query;

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: sentence,
        max_tokens: 100,
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
