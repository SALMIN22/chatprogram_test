import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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
    console.error('Detailed error in API route:', error)
    
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
