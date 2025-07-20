import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Message, ChatSession, User } from '@/types'
import { generateId } from '@/lib/utils'
import apiService from '@/services/api'
import { getDemoResponse, isOfflineMode } from '@/components/chat/demo-handler'

interface ChatState {
  // State
  currentSession: ChatSession | null
  messages: Message[]
  user: User | null
  isLoading: boolean
  isTyping: boolean
  error: string | null

  // Actions
  setUser: (user: User) => void
  setCurrentSession: (session: ChatSession) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  sendMessage: (content: string) => Promise<void>
  loadChatHistory: (sessionId: string) => Promise<void>
  setTyping: (isTyping: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearMessages: () => void
  reset: () => void
}

const initialState = {
  currentSession: null,
  messages: [],
  user: null,
  isLoading: false,
  isTyping: false,
  error: null,
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setUser: (user) => {
          set({ user }, false, 'setUser')
        },

        setCurrentSession: (session) => {
          set({ currentSession: session }, false, 'setCurrentSession')
        },

        addMessage: (messageData) => {
          const message: Message = {
            ...messageData,
            id: generateId(),
            timestamp: new Date(),
          }
          
          set(
            (state) => ({
              messages: [...state.messages, message],
            }),
            false,
            'addMessage'
          )
        },

        sendMessage: async (content) => {
          const { currentSession, addMessage, setLoading, setTyping, setError, error } = get()
          
          try {
            setError(null)
            setLoading(true)

            // Add user message immediately
            addMessage({
              message: content,
              sender: 'user',
              type: 'text',
            })

            // Show typing indicator
            setTyping(true)

            // Send to API
            const response = await apiService.sendMessage(
              content,
            )

            if (response.success && response.data) {
              // Add agent response
              addMessage({
                message: response.data.message,
                sender: 'agent',
                type: 'text',
                metadata: response.data.metadata,
              })
            } else {
              throw new Error(response.error || 'Failed to send message')
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            setError(errorMessage)
          } finally {
            setLoading(false)
            setTyping(false)
          }
        },  

        loadChatHistory: async (sessionId) => {
          const { setLoading, setError } = get()
          
          try {
            setLoading(true)
            setError(null)

            const response = await apiService.getChatHistory(sessionId)
            
            if (response.success && response.data) {
              set({ messages: response.data }, false, 'loadChatHistory')
            } else {
              throw new Error(response.error || 'Failed to load chat history')
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            setError(errorMessage)
          } finally {
            setLoading(false)
          }
        },

        
        setTyping: (isTyping) => {
          set({ isTyping }, false, 'setTyping')
        },

        setLoading: (isLoading) => {
          set({ isLoading }, false, 'setLoading')
        },

        setError: (error) => {
          set({ error }, false, 'setError')
        },

        clearMessages: () => {
          set({ messages: [] }, false, 'clearMessages')
        },

        reset: () => {
          set(initialState, false, 'reset')
        },
      }),
      {
        name: 'chat-store',
        partialize: (state) => ({
          user: state.user,
          currentSession: state.currentSession,
        }),
      }
    ),
    { name: 'chat-store' }
  )
) 