import { useCallback } from 'react'
import { useChatStore } from '@/stores/chatStore'

export function useChat() {
  const {
    messages,
    isLoading,
    isTyping,
    error,
    currentSession,
    user,
    sendMessage,
    loadChatHistory,
    setUser,
    clearMessages,
    reset,
    setError,
  } = useChatStore()

  const initializeChat = useCallback(async (userId: string) => {
    try {
      if (!currentSession) {
        //await createNewSession(userId)
      }
    } catch (err) {
      console.error('Failed to initialize chat:', err)
    }
  }, [currentSession])

  const sendChatMessage = useCallback(async (content: string) => {
    try {
      await sendMessage(content)
    } catch (err) {
      console.error('Failed to send message:', err)
      throw err
    }
  }, [sendMessage])

  const retryConnection = useCallback(async () => {
    if (user?.id) {
      setError(null)
      //await createNewSession(user.id)
    }
  }, [user?.id, setError])

  const clearChat = useCallback(() => {
    clearMessages()
  }, [clearMessages])

  const resetChat = useCallback(() => {
    reset()
  }, [reset])

  return {
    // State
    messages,
    isLoading,
    isTyping,
    error,
    currentSession,
    user,
    
    // Actions
    initializeChat,
    sendMessage: sendChatMessage,
    retryConnection,
    clearChat,
    resetChat,
    setUser,
    loadChatHistory,
    
    // Computed
    isConnected: !!currentSession,
    hasMessages: messages.length > 0,
  }
}

export default useChat 