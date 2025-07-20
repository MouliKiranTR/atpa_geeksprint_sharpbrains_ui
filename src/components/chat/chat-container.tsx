import React, { useEffect } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { MessageList } from './message-list'
import { FormMessageInput } from './form-message-input'
import { cn } from '@/lib/utils'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatContainerProps {
  className?: string
  userId?: string
}

export function ChatContainer({ className, userId = 'default-user' }: ChatContainerProps) {
  const {
    messages,
    isLoading,
    isTyping,
    error,
    sendMessage,
    setError,
  } = useChatStore()

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content)
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  
  const handleClearError = () => {
    setError(null)
  }

  return (
    <div className={cn(
      'flex flex-col h-full max-h-screen bg-background border rounded-lg overflow-hidden',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-card to-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-card-foreground flex items-center gap-2">
              🤖 Onboarding Assistant
              {isLoading && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
            </h2>
            <p className="text-xs text-muted-foreground">
              {userId ? `Connected • Ready to help` : 'Connecting...'}
            </p>
          </div>
        </div>
        
        {error && (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/5 border-b border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive flex-1">{error}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearError}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            ×
          </Button>
        </div>
      )}

      {/* Messages */}
      <MessageList
        messages={messages}
        isTyping={isTyping}
        className="flex-1 min-h-0"
        onSuggestedMessageClick={handleSendMessage}
      />

      {/* Input */}
      <FormMessageInput
        onSendMessage={handleSendMessage}
        disabled={!userId || !!error}
        isLoading={isLoading}
        placeholder={
          !userId 
            ? "Connecting..." 
            : error 
            ? "Fix connection to continue..." 
            : "Ask me anything about getting started..."
        }
      />
    </div>
  )
} 