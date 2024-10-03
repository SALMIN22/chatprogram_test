import { NextResponse } from 'next/server'
import OpenAI from 'openai';

// Edge Runtime 설정 추가
export const runtime = 'edge';

// ChatGPTMessage 타입이 사용되지 않으면 제거하거나 주석 처리합니다.
// type ChatGPTMessage = {
//   role: string;
//   content: string;
// };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function POST(request: Request) {
  try {
    console.log('API route called')
    const { message } = await request.json()
    console.log('Received message:', message)
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set')
      throw new Error('OPENAI_API_KEY is not set')
    }
    console.log('API Key exists:', process.env.OPENAI_API_KEY.slice(0, 5) + '...')

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    })

    console.log('OpenAI response:', completion.choices[0].message)

    const aiResponse = completion.choices[0].message.content

    return NextResponse.json({ message: aiResponse })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        error: 'An error occurred while processing your request.',
        details: error.message,
        stack: error.stack
      }, { status: 500 })
    } else {
      return NextResponse.json({
        error: 'An unknown error occurred.',
      }, { status: 500 })
    }
  }
}
