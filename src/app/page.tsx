'use client'

import { ChatApp } from '@/components/chat/chat-app'

export default function Home() {
  return (
    <main className="h-screen">
      <ChatApp 
        userId="user123"
        requireProficiencySetup={true}
        allowSkipSetup={false}
        className="h-full"
      />
    </main>
  )
}
