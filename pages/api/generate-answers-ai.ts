import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type ResponseData = {
  text: string;
};

interface GenerateNextAIRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: GenerateNextAIRequest,
  res: NextApiResponse<ResponseData>
) {
  const { prompt } = req.body;

  if (!prompt || prompt === "") {
    return res.status(400).json({ text: "Prompt is required" });
  }

  try {
    const aiResult = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 150,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Access the AI response from the result
    const response =
      aiResult.choices[0]?.message?.content?.trim() || "No response";
    res.status(200).json({ text: response });
  } catch (error) {
    // console.error("Error calling OpenAI API:", error);
    res.status(500).json({ text: "Error generating response" });
  }
}
