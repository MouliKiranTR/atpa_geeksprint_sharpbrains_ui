'use client'

import { ChatContainer } from '@/components/chat/chat-container'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Onboarding Journey
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized assistance from our AI agent to help you navigate through your onboarding process. 
            Ask questions, get guidance, and make your journey smooth and efficient.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="h-[600px] w-full shadow-lg">
          <ChatContainer className="h-full" />
        </div>
      </div>
    </div>
  )
}
