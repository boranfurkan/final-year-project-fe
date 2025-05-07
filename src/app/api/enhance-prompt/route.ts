import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert in post-impressionist art styles. Your task is to enhance user prompts to create detailed descriptions for an AI art generator.
          
          Transform the user's basic prompt into a rich, detailed description that captures the essence of post-impressionism with:
          - Bold, expressive brushstrokes
          - Vibrant, emotional use of color
          - Swirling patterns and movement
          - Strong outlines and simplified forms
          - Emotional intensity and visual dynamism
          
          Do NOT explicitly mention "Vincent van Gogh" or any specific artist by name in your response and keep the word count under 45.
          Respond ONLY with the enhanced prompt, nothing else. No explanations or comments.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const enhancedPrompt = completion.choices[0].message.content;

    return NextResponse.json({ enhancedPrompt });
  } catch (error: any) {
    console.error('OpenAI API error:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to enhance prompt' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
