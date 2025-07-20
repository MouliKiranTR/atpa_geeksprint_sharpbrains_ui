import React, { useState, useRef, useCallback, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CHAT_CONFIG } from '@/constants'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
  className?: string
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  isLoading = false,
  placeholder = "Type your message...",
  className
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const isMessageValid = message.trim().length > 0 && 
                        message.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH

  const handleSend = useCallback(() => {
    if (!isMessageValid || disabled || isLoading) return

    const trimmedMessage = message.trim()
    onSendMessage(trimmedMessage)
    setMessage('')
    
    // Focus back to input after sending
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [message, isMessageValid, disabled, isLoading, onSendMessage])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
      setMessage(value)
    }
  }

  return (
    <div className={cn('flex items-end gap-2 p-4 border-t bg-background', className)}>
      <div className="flex-1 space-y-1">
        <Input
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className="min-h-[44px] resize-none"
          autoComplete="off"
          maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
        />
        
        {/* Character count */}
        <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">Enter</kbd>
            to send
          </span>
          <span className={cn(
            "transition-colors",
            message.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH * 0.8 && "text-orange-500",
            message.length >= CHAT_CONFIG.MAX_MESSAGE_LENGTH && "text-red-500"
          )}>
            {message.length}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </div>

      <Button
        onClick={handleSend}
        disabled={!isMessageValid || disabled || isLoading}
        size="icon"
        className="h-[44px] w-[44px] shrink-0"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  )
} 