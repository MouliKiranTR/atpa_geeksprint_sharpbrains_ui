'use client'

import React, { useState } from 'react'
import { RoleSelector, SimpleRoleDropdown, RoleCards } from '@/components/ui/role-selector'
import { ProficiencyDropdown } from '@/components/ui/proficiency-dropdown'
import { Button } from '@/components/ui/button'
import { UserRole, ProficiencyLevel } from '@/types'
import { USER_ROLES, PROFICIENCY_LEVELS } from '@/constants'
import { apiService } from '@/services/api'

export default function RoleDemoPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('engineer')
  const [selectedProficiency, setSelectedProficiency] = useState<ProficiencyLevel>('intermediate')
  const [testQuery, setTestQuery] = useState('How does our authentication system work?')
  const [apiResponse, setApiResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTestAPI = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.sendEnhancedQuery({
        query: testQuery,
        proficiency_level: selectedProficiency,
        user_role: selectedRole,
        analysis_type: 'general',
        include_screenshots: true,
        reasoning_focus: 'comprehensive'
      })

      if (response.success && response.data) {
        setApiResponse(response.data.analysis)
      } else {
        setApiResponse(`Error: ${response.error || 'Unknown error'}`)
      }
    } catch (error) {
      setApiResponse(`API Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const currentRoleInfo = USER_ROLES[selectedRole]
  const currentProficiencyInfo = PROFICIENCY_LEVELS[selectedProficiency]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎭 Role-Based AI Responses Demo
          </h1>
          <p className="text-xl text-gray-600">
            See how AI responses adapt based on your role and proficiency level
          </p>
        </div>

        {/* Current Selection Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Current Selection</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Your Role</h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">{currentRoleInfo.icon}</span>
                <div>
                  <div className={`font-semibold ${currentRoleInfo.color}`}>
                    {currentRoleInfo.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentRoleInfo.description}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Focus Areas:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {currentRoleInfo.focus_areas.slice(0, 3).map((area, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-lg">Your Experience Level</h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">{currentProficiencyInfo.icon}</span>
                <div>
                  <div className={`font-semibold ${currentProficiencyInfo.color}`}>
                    {currentProficiencyInfo.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {currentProficiencyInfo.description}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Characteristics:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {currentProficiencyInfo.characteristics.slice(0, 3).map((char, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Components */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Role Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Interactive Role Selector</h3>
                <RoleSelector
                  value={selectedRole}
                  onChange={setSelectedRole}
                  showDescription={true}
                  size="md"
                />
              </div>

              <div>
                <h3 className="font-medium mb-3">Simple Dropdown</h3>
                <SimpleRoleDropdown
                  value={selectedRole}
                  onChange={setSelectedRole}
                  label="Role"
                  placeholder="Choose your role..."
                />
              </div>
            </div>
          </div>

          {/* Proficiency Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Select Experience Level</h2>
            
            <ProficiencyDropdown
              value={selectedProficiency}
              onChange={setSelectedProficiency}
              label="Your Experience Level"
              placeholder="Choose your proficiency..."
            />
          </div>
        </div>

        {/* Role Cards View */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Role Cards Selection</h2>
          <RoleCards
            value={selectedRole}
            onChange={setSelectedRole}
          />
        </div>

        {/* API Testing */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Test Role-Adapted AI Response</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Test Query</label>
              <textarea
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Enter a question to see how the AI adapts its response..."
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleTestAPI}
                disabled={isLoading || !testQuery.trim()}
                className="px-6 py-2"
              >
                {isLoading ? 'Generating Response...' : 'Test AI Response'}
              </Button>

              <div className="text-sm text-gray-600">
                Will respond as: <span className={currentRoleInfo.color}>{currentRoleInfo.name}</span> 
                {' '} with <span className={currentProficiencyInfo.color}>{currentProficiencyInfo.name}</span> level
              </div>
            </div>

            {apiResponse && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">AI Response:</h3>
                <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">
                    {apiResponse}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample Queries by Role */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Sample Queries by Role</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(USER_ROLES) as UserRole[]).map((role) => {
              const roleInfo = USER_ROLES[role]
              return (
                <div key={role} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{roleInfo.icon}</span>
                    <span className={`font-semibold ${roleInfo.color}`}>
                      {roleInfo.name}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Typical Questions:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {roleInfo.typical_questions.map((question, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <button
                            onClick={() => {
                              setSelectedRole(role)
                              setTestQuery(question)
                            }}
                            className="text-left hover:text-blue-600 hover:underline"
                          >
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Implementation Guide</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Usage:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { RoleSelector } from '@/components/ui/role-selector'
import { UserRole } from '@/types'

function MyComponent() {
  const [role, setRole] = useState<UserRole>('engineer')

  return (
    <RoleSelector
      value={role}
      onChange={setRole}
      showDescription={true}
      size="md"
    />
  )
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">API Integration:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const response = await apiService.sendEnhancedQuery({
  query: "How does authentication work?",
  proficiency_level: "intermediate",
  user_role: "engineer",
  analysis_type: "general",
  reasoning_focus: "technical"
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 