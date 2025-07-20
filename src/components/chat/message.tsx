import React from 'react'
import { Message as MessageType } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatTimestamp, cn } from '@/lib/utils'
import { User, Bot, AlertCircle } from 'lucide-react'

interface MessageProps {
  message: MessageType
  className?: string
}

export function Message({ message, className }: MessageProps) {
  const isUser = message.sender === 'user'
  const isError = message.type === 'error'
  const isTyping = message.type === 'typing'

  return (
    <div
      className={cn(
        'flex gap-3 p-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row',
        'hover:bg-muted/30 transition-colors',
        className
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={isUser ? '/user-avatar.png' : '/agent-avatar.png'} />
        <AvatarFallback>
          {isUser ? (
            <User className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          'flex flex-col gap-1 max-w-[80%] md:max-w-[70%]',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3 text-sm shadow-sm',
            isUser
              ? 'bg-primary text-primary-foreground ml-8 rounded-br-md'
              : isError
              ? 'bg-destructive/10 text-destructive border border-destructive/20 mr-8 rounded-bl-md'
              : 'bg-muted text-foreground mr-8 rounded-bl-md',
            isTyping && 'animate-pulse'
          )}
        >
          {isError && (
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-3 w-3" />
              <span className="text-xs font-medium">Error</span>
            </div>
          )}
          
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
              </div>
              <span className="text-xs ml-2">Agent is typing...</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message.message}</p>
          )}
        </div>

        <time
          className={cn(
            'text-xs text-muted-foreground',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {formatTimestamp(message.timestamp)}
        </time>
      </div>
    </div>
  )
} 