import React, { useState, useEffect } from 'react'
import { ChatContainer } from './chat-container'
import { ProficiencySetup } from '../proficiency-setup'
import { ProficiencyLevel } from '@/types'
import { DEFAULT_CHAT_SETTINGS } from '@/constants'

interface ChatAppProps {
  userId?: string
  className?: string
  requireProficiencySetup?: boolean
  allowSkipSetup?: boolean
}

export function ChatApp({ 
  userId = 'default-user',
  className,
  requireProficiencySetup = true,
  allowSkipSetup = false
}: ChatAppProps) {
  const [userProficiency, setUserProficiency] = useState<ProficiencyLevel | null>(null)
  const [setupComplete, setSetupComplete] = useState(false)

  // Load saved proficiency level from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('user-proficiency-level')
    if (saved && ['beginner', 'intermediate', 'expert', 'executive'].includes(saved)) {
      setUserProficiency(saved as ProficiencyLevel)
      setSetupComplete(true)
    }
  }, [])

  // Save proficiency level to localStorage
  const saveProficiency = (level: ProficiencyLevel) => {
    localStorage.setItem('user-proficiency-level', level)
    setUserProficiency(level)
    setSetupComplete(true)
  }

  const handleProficiencyComplete = (level: ProficiencyLevel) => {
    saveProficiency(level)
  }

  const handleSkipSetup = () => {
    // Use default proficiency level
    saveProficiency(DEFAULT_CHAT_SETTINGS.proficiency_level)
  }

  // Show setup screen if required and not completed
  if (requireProficiencySetup && !setupComplete) {
    return (
      <ProficiencySetup
        onComplete={handleProficiencyComplete}
        onSkip={allowSkipSetup ? handleSkipSetup : undefined}
        allowSkip={allowSkipSetup}
      />
    )
  }

  // Show chat interface
  return (
    <ChatContainer
      userId={userId}
      className={className}
      defaultProficiency={userProficiency || DEFAULT_CHAT_SETTINGS.proficiency_level}
    />
  )
}

// Hook to manage proficiency state
export function useUserProficiency() {
  const [proficiency, setProficiency] = useState<ProficiencyLevel | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user-proficiency-level')
    if (saved && ['beginner', 'intermediate', 'expert', 'executive'].includes(saved)) {
      setProficiency(saved as ProficiencyLevel)
    }
  }, [])

  const updateProficiency = (level: ProficiencyLevel) => {
    localStorage.setItem('user-proficiency-level', level)
    setProficiency(level)
  }

  const clearProficiency = () => {
    localStorage.removeItem('user-proficiency-level')
    setProficiency(null)
  }

  return {
    proficiency,
    updateProficiency,
    clearProficiency,
    isSet: proficiency !== null
  }
} 