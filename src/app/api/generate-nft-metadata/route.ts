import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt, generatedPrompt, imageUrl } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Original prompt is required' },
        { status: 400 }
      );
    }

    const inputPrompt = generatedPrompt || prompt;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert in digital art and NFTs. Your task is to generate a compelling name and description for an AI-generated artwork in Vincent van Gogh's style.

          The user will provide the prompt used to generate the artwork. Create:

          1. A name: Short (3-5 words), evocative, and artistic. Should reference Van Gogh's style without using his name.
          
          2. A description: 2-3 sentences that elegantly describe the artwork and its Van Gogh-inspired qualities. Mention post-impressionist elements and the emotional quality of the piece.
          
          Return your response in JSON format exactly like this:
          {
            "name": "The name you created",
            "description": "The description you created"
          }`,
        },
        {
          role: 'user',
          content: `This artwork was generated with the following prompt: "${inputPrompt}"${
            imageUrl ? ' The image can be viewed at: ' + imageUrl : ''
          }. Please generate a name and description for this NFT.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const responseContent = completion.choices[0].message.content;

    try {
      const metadata = JSON.parse(responseContent || '{}');
      return NextResponse.json(metadata);
    } catch (parseError) {
      console.error('Error parsing GPT response as JSON:', parseError);
      return NextResponse.json({
        name: 'Van Gogh Inspiration',
        description:
          "A unique artwork inspired by Van Gogh's post-impressionist style, featuring bold brushstrokes and emotional color expression.",
        error: 'Failed to parse GPT response',
      });
    }
  } catch (error: any) {
    console.error('OpenAI API error:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to generate NFT metadata' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
