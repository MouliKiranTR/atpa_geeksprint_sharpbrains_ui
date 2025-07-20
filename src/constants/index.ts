export const API_ENDPOINTS = {
  CHAT: '/api/v1/chat/message',
  MESSAGES: '/api/messages',
  SESSION: '/api/session',
  USER: '/api/user',
} as const

export const CHAT_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  MAX_MESSAGE_LENGTH: 1000,
} as const

export const MESSAGE_TYPES = {
  TEXT: 'text',
  TYPING: 'typing',
  ERROR: 'error',
} as const

export const CHAT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
} as const

export const SENDER_TYPES = {
  USER: 'user',
  AGENT: 'agent',
} as const 

export interface ChatRequest {
  message: string,
  include_figma: boolean,
  include_lucid: boolean,
  include_documents: boolean,
  max_visual_items: number,


} 

export interface ChatResponse {
  response: string,
}