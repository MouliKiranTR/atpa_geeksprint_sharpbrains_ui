import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProficiencySelector } from '@/components/ui/proficiency-selector'
import { Label } from '@/components/ui/label'
import { ProficiencyLevel } from '@/types'
import { PROFICIENCY_LEVELS, ANALYSIS_TYPES, DEFAULT_CHAT_SETTINGS } from '@/constants'
import { apiService } from '@/services/api'
import { Loader2, Send, Copy, Check } from 'lucide-react'

export function ProficiencyDemo() {
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel>('intermediate')
  const [settings, setSettings] = useState(DEFAULT_CHAT_SETTINGS)
  const [testQuery, setTestQuery] = useState('How does our authentication system work?')
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleTestQuery = async () => {
    setIsLoading(true)
    setResponse(null)
    
    try {
      const result = await apiService.sendEnhancedQuery({
        query: testQuery,
        proficiency_level: selectedLevel,
        analysis_type: settings.analysis_type,
        reasoning_focus: settings.reasoning_focus,
        include_screenshots: settings.include_screenshots
      })

      if (result.success && result.data) {
        setResponse(result.data.analysis)
      } else {
        setResponse(`Error: ${result.error || 'Failed to get response'}`)
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (response) {
      await navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const levelInfo = PROFICIENCY_LEVELS[selectedLevel]

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">🎯 Proficiency Level Demo</h1>
        <p className="text-lg text-muted-foreground">
          See how AI responses adapt to different user expertise levels
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Settings Panel */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-background shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            
            <div className="space-y-6">
              <ProficiencySelector
                value={selectedLevel}
                onChange={setSelectedLevel}
                showDescription={true}
              />

              <div className="space-y-2">
                <Label>Test Query</Label>
                <textarea
                  value={testQuery}
                  onChange={(e) => setTestQuery(e.target.value)}
                  className="w-full h-24 px-3 py-2 border rounded-md resize-none text-sm"
                  placeholder="Enter your test question..."
                />
              </div>

              {/* <div className="space-y-2">
                <Label>Analysis Type</Label>
                <select
                  value={settings.analysis_type}
                  onChange={(e) => setSettings(prev => ({ 
                    ...prev, 
                    analysis_type: e.target.value as any 
                  }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  {Object.entries(ANALYSIS_TYPES).map(([key, type]) => (
                    <option key={key} value={key}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <Button
                onClick={handleTestQuery}
                disabled={isLoading || !testQuery.trim()}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Response...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Test Query
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Response Panel */}
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-background shadow-sm min-h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Response Preview
                <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${levelInfo.color}`}>
                  {levelInfo.icon} {levelInfo.name}
                </span>
              </h2>
              {response && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {levelInfo.description}
            </p>

            {response ? (
              <div className="bg-muted/50 rounded-lg p-4 max-h-80 overflow-y-auto">
                <div className="text-sm whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Send className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p>Click "Test Query" to see how the response adapts to the selected proficiency level</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Proficiency Level Comparison */}
      <div className="border rounded-lg p-6 bg-background shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Proficiency Level Comparison</h2>
        <p className="text-muted-foreground mb-6">
          Click any level below to see how the same question would be answered differently
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
            const info = PROFICIENCY_LEVELS[level]
            const isSelected = level === selectedLevel
            
            return (
              <div
                key={level}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'hover:border-muted-foreground/50'
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{info.icon}</span>
                  <span className={`font-semibold ${info.color}`}>
                    {info.name}
                  </span>
                  {isSelected && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {info.description}
                </p>
                <div>
                  <p className="text-xs font-medium mb-2">Key Characteristics:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {info.characteristics.slice(0, 2).map((char, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
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

      {/* API Integration Info */}
      <div className="border rounded-lg p-6 bg-background shadow-sm">
        <h2 className="text-xl font-semibold mb-4">API Integration</h2>
        <p className="text-muted-foreground mb-6">
          How to use proficiency levels in your application
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Enhanced Query API Call:</h3>
            <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto border">
{`const response = await apiService.sendEnhancedQuery({
  query: "${testQuery}",
  proficiency_level: "${selectedLevel}",
  analysis_type: "${settings.analysis_type}",
  reasoning_focus: "${settings.reasoning_focus}",
  include_screenshots: ${settings.include_screenshots}
})`}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Available Endpoints:</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-lg border">
                <code className="font-medium">POST /api/v1/enhanced-query</code>
                <p className="text-xs text-muted-foreground mt-2">
                  Enhanced query with proficiency level support
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border">
                <code className="font-medium">GET /api/v1/proficiency-levels</code>
                <p className="text-xs text-muted-foreground mt-2">
                  Get available proficiency levels and descriptions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 