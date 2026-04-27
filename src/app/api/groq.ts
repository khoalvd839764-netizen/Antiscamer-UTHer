// filepath: api/groq.ts
import { NextRequest, NextResponse } from 'next/server';

// Thay bằng API key của bạn từ https://console.groq.com/
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';

export async function POST(request: NextRequest) {
  try {
    const { messages, model = 'llama-3.3-70b-versatile' } = await request.json();
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error: 'Groq API error', detail: error.message }, { status: 500 });
  }
}

export const runtime = 'nodejs';