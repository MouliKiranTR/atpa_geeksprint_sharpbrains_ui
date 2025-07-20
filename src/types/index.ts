export interface Message {
  id: string
  message: string
  timestamp: Date
  sender: 'user' | 'agent'
  type: 'text' | 'typing' | 'error'
  metadata?: Record<string, unknown>
}

export interface ChatSession {
  id: string
  userId: string
  startedAt: Date
  lastMessageAt: Date
  status: 'active' | 'completed' | 'abandoned'
  messages: Message[]
  context?: Record<string, unknown>
}

export interface User {
  id: string
  name?: string
  email?: string
  avatar?: string
  metadata?: Record<string, unknown>
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  order: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ChatConfig {
  apiBaseUrl: string
  maxMessageLength: number
  typingDelayMs: number
  retryAttempts: number
} 