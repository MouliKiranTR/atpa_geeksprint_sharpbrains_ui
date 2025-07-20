import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CHAT_CONFIG } from '@/constants'

const messageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(CHAT_CONFIG.MAX_MESSAGE_LENGTH, `Message must be less than ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters`)
    .transform(val => val.trim())
})

type MessageFormData = z.infer<typeof messageSchema>

interface FormMessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
  className?: string
}

export function FormMessageInput({
  onSendMessage,
  disabled = false,
  isLoading = false,
  placeholder = "Type your message...",
  className
}: FormMessageInputProps) {
  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: ''
    }
  })

  const { handleSubmit, reset, watch, formState: { errors } } = form
  const watchedMessage = watch('message') || ''

  const onSubmit = async (data: MessageFormData) => {
    if (disabled || isLoading) return
    
    try {
      await onSendMessage(data.message)
      reset() // Clear the form after successful submission
    } catch (error) {
      console.error('Failed to send message:', error)
      // Form errors will be handled by the parent component through error state
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const isMessageValid = watchedMessage.length > 0 && watchedMessage.length <= CHAT_CONFIG.MAX_MESSAGE_LENGTH

  return (
    <div className={cn('border-t bg-background p-4', className)}>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
          <div className="flex-1 space-y-1">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      disabled={disabled || isLoading}
                      onKeyDown={handleKeyDown}
                      className="min-h-[44px]"
                      autoComplete="off"
                      maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Character count and help text */}
            <div className="flex justify-between items-center text-xs text-muted-foreground px-1">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">Enter</kbd>
                to send
              </span>
              <span className={cn(
                "transition-colors",
                watchedMessage.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH * 0.8 && "text-orange-500",
                watchedMessage.length >= CHAT_CONFIG.MAX_MESSAGE_LENGTH && "text-red-500"
              )}>
                {watchedMessage.length}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH}
              </span>
            </div>
          </div>

          <Button
            type="submit"
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
        </form>
      </Form>
    </div>
  )
} 