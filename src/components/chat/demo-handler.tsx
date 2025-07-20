import { Message } from '@/types'
import { generateId } from '@/lib/utils'

export const DEMO_RESPONSES = [
  "Hello! Welcome to our onboarding process. I'm here to help you get started. What would you like to know?",
  "That's a great question! Let me help you with that. As part of your onboarding, you'll need to complete several steps.",
  "I understand you're looking for information about our company policies. Here are the key points you should know...",
  "Getting started is easy! First, make sure you have access to all the necessary tools and systems.",
  "Let me walk you through the next steps in your onboarding journey. This will help you get up to speed quickly.",
  "I'm here to assist you throughout the entire process. Feel free to ask me anything about your role or the company!",
]

export const getDemoResponse = (userMessage: string): Message => {
  // Simple keyword-based responses for demo
  let responseContent = DEMO_RESPONSES[0]
  
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('start') || lowerMessage.includes('first') || lowerMessage.includes('begin')) {
    responseContent = "Great! Let's start your onboarding journey. First, I'll need to gather some basic information about your role and department. This will help me provide you with personalized guidance throughout the process. What position will you be taking on?"
  } else if (lowerMessage.includes('company') || lowerMessage.includes('about')) {
    responseContent = "I'd be happy to tell you about our company! We're a dynamic organization focused on innovation and employee growth. Our core values include collaboration, integrity, and continuous learning. We have offices worldwide and a diverse team of talented professionals. What specific aspect of the company would you like to know more about?"
  } else if (lowerMessage.includes('policy') || lowerMessage.includes('rules') || lowerMessage.includes('guidelines')) {
    responseContent = "Our company policies are designed to create a positive and productive work environment. Key areas include: work hours and flexibility, code of conduct, IT security guidelines, and benefits information. I can provide detailed information about any of these areas. Which policy area interests you most?"
  } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    responseContent = "I'm here to provide comprehensive support throughout your onboarding! I can help with: understanding your role and responsibilities, navigating company systems and tools, connecting with team members, accessing training resources, and answering any questions about company culture. What would you like assistance with?"
  } else if (lowerMessage.includes('tools') || lowerMessage.includes('software') || lowerMessage.includes('systems')) {
    responseContent = "You'll have access to several essential tools and systems: our project management platform, communication tools like Slack or Teams, HR portal for benefits and time-off requests, and specialized software for your role. I can guide you through setting up and using any of these tools. Which one would you like to start with?"
  } else {
    // Random response for other inputs
    const randomIndex = Math.floor(Math.random() * (DEMO_RESPONSES.length - 1)) + 1
    responseContent = DEMO_RESPONSES[randomIndex]
  }

  return {
    id: generateId(),
    message: responseContent,
    timestamp: new Date(),
    sender: 'agent',
    type: 'text',
  }
}

export const isOfflineMode = (error: string | null): boolean => {
  if (!error) return false
  return error.includes('404') || error.includes('Network Error') || error.includes('Failed to fetch')
} 