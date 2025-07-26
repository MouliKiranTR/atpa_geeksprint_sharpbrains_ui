import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProficiencyDropdown } from '@/components/ui/proficiency-dropdown'
import { ProficiencyLevel } from '@/types'
import { PROFICIENCY_LEVELS } from '@/constants'
import { User, ArrowRight, Info } from 'lucide-react'

interface ProficiencySetupProps {
  onComplete: (level: ProficiencyLevel) => void
  onSkip?: () => void
  allowSkip?: boolean
  title?: string
  subtitle?: string
}

export function ProficiencySetup({
  onComplete,
  onSkip,
  allowSkip = false,
  title = "Welcome! Let's personalize your experience",
  subtitle = "Select your experience level to get responses tailored just for you"
}: ProficiencySetupProps) {
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | ''>('')
  const [error, setError] = useState('')

  const handleContinue = () => {
    if (!selectedLevel) {
      setError('Please select your proficiency level to continue')
      return
    }
    
    setError('')
    onComplete(selectedLevel)
  }

  const handleSkip = () => {
    if (onSkip) {
      onSkip()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {subtitle}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Why we ask:</strong> This helps us provide responses at the right level of technical detail for you. 
                    You can change this anytime in settings.
                  </p>
                </div>
              </div>
            </div>

            {/* Proficiency Selection */}
            <ProficiencyDropdown
              value={selectedLevel}
              onChange={setSelectedLevel}
              label="What's your experience level with technical topics?"
              placeholder="Select your proficiency level..."
              error={error}
              required={true}
            />

            {/* Level Preview Grid */}
            {!selectedLevel && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Available levels:
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
                    const info = PROFICIENCY_LEVELS[level]
                    return (
                      <div
                        key={level}
                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-colors"
                        onClick={() => setSelectedLevel(level)}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{info.icon}</span>
                          <span className={`font-medium text-sm ${info.color}`}>
                            {info.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {info.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleContinue}
                disabled={!selectedLevel}
                className="flex-1 h-12 text-base"
                size="lg"
              >
                Continue to Chat
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              {allowSkip && (
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="px-6 h-12"
                  size="lg"
                >
                  Skip for now
                </Button>
              )}
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This setting helps us provide better, more relevant responses. 
                You can update your proficiency level anytime in chat settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Compact version for in-app use
export function CompactProficiencySetup({
  onComplete,
  onCancel
}: {
  onComplete: (level: ProficiencyLevel) => void
  onCancel?: () => void
}) {
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | ''>('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!selectedLevel) {
      setError('Please select your proficiency level')
      return
    }
    
    setError('')
    onComplete(selectedLevel)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Select Your Experience Level</h2>
        
        <div className="space-y-4">
          <ProficiencyDropdown
            value={selectedLevel}
            onChange={setSelectedLevel}
            label="Experience Level"
            placeholder="Choose your level..."
            error={error}
            required={true}
          />
          
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!selectedLevel}
              className="flex-1"
            >
              Save
            </Button>
            {onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="px-4"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 