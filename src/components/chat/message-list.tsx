import React, { useEffect, useRef } from 'react'
import { ChatSettings, Message as MessageType } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from './message'
import { cn } from '@/lib/utils'
import { PRODUCT_TYPES } from '@/constants'

interface MessageListProps {
  messages: MessageType[]
  isTyping?: boolean
  className?: string
  autoScroll?: boolean
  settings: ChatSettings
  onSuggestedMessageClick?: (message: string) => void
}

export function MessageList({ 
  messages, 
  settings,
  isTyping = false, 
  className,
  autoScroll = true,
  onSuggestedMessageClick
}: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [messages, isTyping, autoScroll])

  // Create typing indicator message
  const typingMessage: MessageType | null = isTyping ? {
    id: 'typing-indicator',
    message: '',
    timestamp: new Date(),
    sender: 'agent',
    type: 'typing'
  } : null

  const allMessages = [...messages, ...(typingMessage ? [typingMessage] : [])]

  if (allMessages.length === 0) {
    return (
      <div className={cn(
        'flex-1 flex items-center justify-center p-8',
        className
      )}>
        <div className="text-center space-y-6 max-w-md animate-in fade-in-50 duration-500">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-10 h-10 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">
              👋 Welcome to Onboarding Chat
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I&apos;m your AI onboarding assistant! I&apos;m here to help you get started and answer any questions you might have with {PRODUCT_TYPES[settings.product_type].name}. 
              Feel free to ask me about:
            </p>
            <div className="grid grid-cols-1 gap-2 mt-4">
              <div className="p-3 bg-muted/50 rounded-lg text-xs text-left">
                💼 Getting started with your role
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-xs text-left">
                🛠️ Tools and resources available
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Type a message below to begin our conversation!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea ref={scrollAreaRef} className={cn('flex-1', className)}>
      <div className="space-y-0">
        {allMessages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            className={cn(
              index === 0 && 'pt-8',
              index === allMessages.length - 1 && 'pb-4'
            )}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  )
} 