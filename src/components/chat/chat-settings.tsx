import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ProficiencySelector, CompactProficiencySelector } from '@/components/ui/proficiency-selector'
import { RoleSelector, SimpleRoleDropdown } from '@/components/ui/role-selector'
import { cn } from '@/lib/utils'
import { 
  ChatSettings as ChatSettingsType, 
  ProficiencyLevel, 
  UserRole,
  AnalysisType, 
  ReasoningFocus 
} from '@/types'
import { 
  ANALYSIS_TYPES, 
  REASONING_FOCUS, 
  DEFAULT_CHAT_SETTINGS 
} from '@/constants'
import { Settings, X, RotateCcw, FileText, Globe, Github } from 'lucide-react'

interface ChatSettingsProps {
  settings: ChatSettingsType
  onChange: (settings: ChatSettingsType) => void
  isOpen: boolean
  onToggle: () => void
  className?: string
  compact?: boolean
}

export function ChatSettings({
  settings,
  onChange,
  isOpen,
  onToggle,
  className,
  compact = false
}: ChatSettingsProps) {
  const handleReset = () => {
    onChange(DEFAULT_CHAT_SETTINGS)
  }

  const updateSetting = <K extends keyof ChatSettingsType>(
    key: K, 
    value: ChatSettingsType[K]
  ) => {
    onChange({ ...settings, [key]: value })
  }

  if (compact) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">Proficiency Level</Label>
            <CompactProficiencySelector
              value={settings.proficiency_level}
              onChange={(level) => updateSetting('proficiency_level', level)}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">Role</Label>
            <SimpleRoleDropdown
              value={settings.user_role}
              onChange={(role) => updateSetting('user_role', role)}
              label=""
              placeholder="Select role..."
            />
          </div>
        </div>
        
        {/* <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">Analysis Type</Label>
            <select
              value={settings.analysis_type}
              onChange={(e) => updateSetting('analysis_type', e.target.value as AnalysisType)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {(Object.keys(ANALYSIS_TYPES) as AnalysisType[]).map((type) => (
                <option key={type} value={type}>
                  {ANALYSIS_TYPES[type].icon} {ANALYSIS_TYPES[type].name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">Focus</Label>
            <select
              value={settings.reasoning_focus}
              onChange={(e) => updateSetting('reasoning_focus', e.target.value as ReasoningFocus)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {(Object.keys(REASONING_FOCUS) as ReasoningFocus[]).map((focus) => (
                <option key={focus} value={focus}>
                  {REASONING_FOCUS[focus].name}
                </option>
              ))}
            </select>
          </div>
        </div> */}
      </div>
    )
  }

  return (
    <>
      {/* Settings Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className={cn(
          'flex items-center gap-2',
          isOpen && 'bg-accent'
        )}
      >
        <Settings className="h-4 w-4" />
        <span className="hidden sm:inline">Settings</span>
      </Button>

      {/* Settings Panel */}
      {isOpen && (
        <div className={cn(
          'absolute top-full right-0 z-50 mt-2 w-96 bg-background border rounded-lg shadow-lg p-4',
          className
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Chat Settings</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 px-2"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="ml-1 text-xs">Reset</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Existing settings */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Proficiency Level</Label>
              <ProficiencySelector
                value={settings.proficiency_level}
                onChange={(level) => updateSetting('proficiency_level', level)}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <RoleSelector
                value={settings.user_role}
                onChange={(role) => updateSetting('user_role', role)}
              />
            </div>

            {/* Source Selection */}
            <div className="space-y-2">
              <Label>Knowledge Sources</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="include_lucid"
                    checked={settings.include_lucid}
                    onChange={(e) => updateSetting('include_lucid', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="include_lucid" className="flex items-center gap-1 cursor-pointer">
                    <FileText className="h-4 w-4" />
                    <span>Lucid</span>
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="include_wiki"
                    checked={settings.include_wiki}
                    onChange={(e) => updateSetting('include_wiki', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="include_wiki" className="flex items-center gap-1 cursor-pointer">
                    <Globe className="h-4 w-4" />
                    <span>Wiki</span>
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="include_github"
                    checked={settings.include_github}
                    onChange={(e) => updateSetting('include_github', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="include_github" className="flex items-center gap-1 cursor-pointer">
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Other settings */}
            {/* <div className="space-y-2">
              <Label>Analysis Type</Label>
              <select
                value={settings.analysis_type}
                onChange={(e) => updateSetting('analysis_type', e.target.value as AnalysisType)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {Object.entries(ANALYSIS_TYPES).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div> */}

            <div className="space-y-2">
              <Label>Reasoning Focus</Label>
              <select
                value={settings.reasoning_focus}
                onChange={(e) => updateSetting('reasoning_focus', e.target.value as ReasoningFocus)}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {Object.entries(REASONING_FOCUS).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="include_screenshots"
                checked={settings.include_screenshots}
                onChange={(e) => updateSetting('include_screenshots', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="include_screenshots">Include Screenshots</Label>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={onToggle}
        />
      )}
    </>
  )
}

// Hook to manage settings state
export function useChatSettings() {
  const [settings, setSettingsState] = React.useState<ChatSettingsType>(DEFAULT_CHAT_SETTINGS)
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)

  // Load settings from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('chat-settings')
      if (saved) {
        const parsedSettings = JSON.parse(saved)
        // Validate that the saved settings have all required fields
        const validatedSettings = {
          ...DEFAULT_CHAT_SETTINGS,
          ...parsedSettings
        }
        setSettingsState(validatedSettings)
      }
    } catch (error) {
      console.warn('Failed to load chat settings from localStorage:', error)
      setSettingsState(DEFAULT_CHAT_SETTINGS)
    }
  }, [])

  // Save settings to localStorage whenever they change
  const setSettings = React.useCallback((newSettings: ChatSettingsType) => {
    setSettingsState(newSettings)
    try {
      localStorage.setItem('chat-settings', JSON.stringify(newSettings))
    } catch (error) {
      console.warn('Failed to save chat settings to localStorage:', error)
    }
  }, [])

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen)
  const closeSettings = () => setIsSettingsOpen(false)

  return {
    settings,
    setSettings,
    isSettingsOpen,
    toggleSettings,
    closeSettings
  }
} 