'use client'

import React, { useState } from 'react'
import { ProficiencyDropdown, SimpleProficiencyDropdown } from '@/components/ui/proficiency-dropdown'
import { ProficiencySetup, CompactProficiencySetup } from '@/components/proficiency-setup'
import { Button } from '@/components/ui/button'
import { ProficiencyLevel } from '@/types'
import { PROFICIENCY_LEVELS } from '@/constants'

export default function DemoPage() {
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | ''>('')
  const [simpleLevel, setSimpleLevel] = useState<ProficiencyLevel | ''>('')
  const [showSetup, setShowSetup] = useState(false)
  const [showCompactSetup, setShowCompactSetup] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Proficiency Level Components Demo
          </h1>
          <p className="text-xl text-gray-600">
            Interactive demo of all proficiency level UI components
          </p>
        </div>

        {/* Dropdown Components */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Full Proficiency Dropdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Full Proficiency Dropdown</h2>
            <p className="text-gray-600 mb-6">
              Complete dropdown with descriptions and preview of selected level
            </p>
            
            <ProficiencyDropdown
              value={selectedLevel}
              onChange={setSelectedLevel}
              label="Your Experience Level"
              placeholder="Please select your proficiency..."
              required={true}
            />

            {selectedLevel && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Selected: <strong>{PROFICIENCY_LEVELS[selectedLevel].name}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Simple Proficiency Dropdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Simple Proficiency Dropdown</h2>
            <p className="text-gray-600 mb-6">
              Compact version without preview, perfect for forms
            </p>
            
            <SimpleProficiencyDropdown
              value={simpleLevel}
              onChange={setSimpleLevel}
              label="Experience Level"
              placeholder="Choose level..."
              required={true}
            />

            {simpleLevel && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  ✅ Selected: <strong>{PROFICIENCY_LEVELS[simpleLevel].name}</strong>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Setup Components */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Setup Components</h2>
          <p className="text-gray-600 mb-6">
            Full-screen and modal setup experiences for onboarding users
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              onClick={() => setShowSetup(true)}
              size="lg"
              className="h-16"
            >
              Show Full Setup Experience
            </Button>
            
            <Button
              onClick={() => setShowCompactSetup(true)}
              variant="outline"
              size="lg"
              className="h-16"
            >
              Show Compact Setup Modal
            </Button>
          </div>
        </div>

        {/* Level Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Proficiency Level Overview</h2>
          <p className="text-gray-600 mb-6">
            Compare all available proficiency levels and their characteristics
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
              const info = PROFICIENCY_LEVELS[level]
              return (
                <div key={level} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{info.icon}</span>
                    <span className={`font-bold text-lg ${info.color}`}>
                      {info.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {info.description}
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700">Key traits:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {info.characteristics.slice(0, 2).map((char, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-blue-500 mt-0.5">•</span>
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Dropdown:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ProficiencyDropdown
  value={selectedLevel}
  onChange={setSelectedLevel}
  label="Your Experience Level"
  placeholder="Please select..."
  required={true}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Simple Version:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<SimpleProficiencyDropdown
  value={level}
  onChange={setLevel}
  label="Level"
  placeholder="Choose..."
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Full Setup Experience:</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ProficiencySetup
  onComplete={(level) => console.log('Selected:', level)}
  allowSkip={false}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Modals */}
      {showSetup && (
        <ProficiencySetup
          onComplete={(level) => {
            console.log('Setup completed with level:', level)
            setShowSetup(false)
          }}
          onSkip={() => {
            console.log('Setup skipped')
            setShowSetup(false)
          }}
          allowSkip={true}
        />
      )}

      {showCompactSetup && (
        <CompactProficiencySetup
          onComplete={(level) => {
            console.log('Compact setup completed with level:', level)
            setShowCompactSetup(false)
          }}
          onCancel={() => setShowCompactSetup(false)}
        />
      )}
    </div>
  )
} 