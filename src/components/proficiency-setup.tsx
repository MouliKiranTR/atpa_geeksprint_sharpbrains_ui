import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProficiencyDropdown } from '@/components/ui/proficiency-dropdown'
import { SimpleRoleDropdown, SimpleProductTypeDropdown } from '@/components/ui/role-selector'
import { ProficiencyLevel, ProductTypes, UserRole, ReasoningFocus } from '@/types'
import { PROFICIENCY_LEVELS, REASONING_FOCUS } from '@/constants'
import { User, ArrowRight, Info, Target, BookOpen, Shield } from 'lucide-react'

interface ProficiencySetupProps {
  onComplete: (config: {
    level: ProficiencyLevel;
    role: UserRole;
    productType: ProductTypes;
    reasoningFocus: ReasoningFocus;
  }) => void
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
  subtitle = "Configure your preferences to get responses tailored just for you"
}: ProficiencySetupProps) {
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | ''>('')
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('')
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | ''>('')
  const [selectedReasoning, setSelectedReasoning] = useState<ReasoningFocus>('comprehensive')
  const [error, setError] = useState('')

  const handleContinue = () => {
    if (!selectedLevel || !selectedRole || !selectedProduct) {
      setError('Please fill in all required fields to continue')
      return
    }
    
    setError('')
    onComplete({
      level: selectedLevel,
      role: selectedRole,
      productType: selectedProduct,
      reasoningFocus: selectedReasoning
    })
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
                    You can change these settings anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg font-medium mb-4">
                <Target className="h-5 w-5" />
                <h2>Product Settings</h2>
              </div>
              <SimpleProductTypeDropdown
                value={selectedProduct}
                onChange={setSelectedProduct}
                label="Select Product"
                placeholder="Choose your product..."
                required={true}
              />
            </div>

            {/* User Profile Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <BookOpen className="h-5 w-5" />
                <h2>Your Profile</h2>
              </div>
              
              <div className="space-y-4">
                <ProficiencyDropdown
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  label="What's your experience level with technical topics?"
                  placeholder="Select your proficiency level..."
                  error={error}
                  required={true}
                />

                <SimpleRoleDropdown
                  value={selectedRole}
                  onChange={setSelectedRole}
                  label="What's your role?"
                  placeholder="Select your role..."
                  required={true}
                />
              </div>
            </div>

            {/* Analysis Settings */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-lg font-medium">
                <Shield className="h-5 w-5" />
                <h2>Analysis Preferences</h2>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Reasoning Focus
                </label>
                <select
                  value={selectedReasoning}
                  onChange={(e) => setSelectedReasoning(e.target.value as ReasoningFocus)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  {Object.entries(REASONING_FOCUS).map(([key, { name, description }]) => (
                    <option key={key} value={key}>{name} - {description}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                onClick={handleContinue}
                disabled={!selectedLevel || !selectedRole || !selectedProduct}
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
                These settings help us provide better, more relevant responses. 
                You can update your preferences anytime in chat settings.
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
  onComplete: (config: {
    level: ProficiencyLevel;
    role: UserRole;
    productType: ProductTypes;
    reasoningFocus: ReasoningFocus;
  }) => void
  onCancel?: () => void
}) {
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | ''>('')
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('')
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | ''>('')
  const [selectedReasoning, setSelectedReasoning] = useState<ReasoningFocus>('comprehensive')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!selectedLevel || !selectedRole || !selectedProduct) {
      setError('Please fill in all required fields')
      return
    }
    
    setError('')
    onComplete({
      level: selectedLevel,
      role: selectedRole,
      productType: selectedProduct,
      reasoningFocus: selectedReasoning
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Configure Your Experience</h2>
        
        <div className="space-y-4">
          <SimpleProductTypeDropdown
            value={selectedProduct}
            onChange={setSelectedProduct}
            label="Product"
            placeholder="Choose product..."
            required={true}
          />

          <ProficiencyDropdown
            value={selectedLevel}
            onChange={setSelectedLevel}
            label="Experience Level"
            placeholder="Choose your level..."
            error={error}
            required={true}
          />

          <SimpleRoleDropdown
            value={selectedRole}
            onChange={setSelectedRole}
            label="Role"
            placeholder="Choose your role..."
            required={true}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Reasoning Focus
            </label>
            <select
              value={selectedReasoning}
              onChange={(e) => setSelectedReasoning(e.target.value as ReasoningFocus)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              {Object.entries(REASONING_FOCUS).map(([key, { name, description }]) => (
                <option key={key} value={key}>{name} - {description}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!selectedLevel || !selectedRole || !selectedProduct}
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