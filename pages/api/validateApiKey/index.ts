import { NextApiRequest, NextApiResponse } from 'next';

const validateApiKey = async (apiKey: string) => {
  const response = await fetch('https://api.openai.com/v1/models', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.body.apiKey;
  const isValid = await validateApiKey(apiKey);

  if (isValid) {
    res.status(200).json({
      success: true,
      message: 'API KEY is valid',
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'API KEY is Invalid',
    });
  }
};
