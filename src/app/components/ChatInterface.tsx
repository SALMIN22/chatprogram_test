'use client'

import { useState } from 'react'
import axios from 'axios'

export default function ChatInterface() {
  // 사용자 입력과 채팅 메시지 기록을 위한 상태
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])

  // 폼 제출 처리 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage = { role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')

    try {
      // API 요청 보내기
      const response = await axios.post('/api/chat', { message: input })
      
      // AI 응답 추가
      const aiMessage = { role: 'assistant', content: response.data.message }
      setMessages(prevMessages => [...prevMessages, aiMessage])
    } catch (error) {
      // 에러 처리
      console.error('Error:', error)
      const errorMessage = { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' }
      setMessages(prevMessages => [...prevMessages, errorMessage])
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* 채팅 메시지 표시 영역 */}
        <div className="mb-4 h-64 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${
                message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-purple-100 text-purple-800'
              }`}>
                {message.content}
              </span>
            </div>
          ))}
        </div>
        {/* 메시지 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
