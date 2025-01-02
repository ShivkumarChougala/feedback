import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

// Retry logic for handling 429 (Quota exceeded) errors
async function retryRequest(req: Request, retries: number = 3, delay: number = 1000) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      max_tokens: 400,
      stream: true,
      prompt,
    });

    const encoder = new TextEncoder();

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.text || '';
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error: any) {
    if (error.status === 429 && retries > 0) {
      // Retry on 429 (rate limit exceeded) with exponential backoff
      console.warn('Rate limit exceeded. Retrying...');
      await new Promise(res => setTimeout(res, delay));
      return retryRequest(req, retries - 1, delay * 2); // Exponential backoff
    }

    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error('An unexpected error occurred:', error);
      return NextResponse.json(
        { error: 'An unexpected error occurred.', details: error.message },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  return await retryRequest(req); // Call retryRequest function
}
