import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ProficiencySelector, CompactProficiencySelector } from '@/components/ui/proficiency-selector'
import { RoleSelector, SimpleProductTypeDropdown, SimpleRoleDropdown } from '@/components/ui/role-selector'
import { cn } from '@/lib/utils'
import { Drawer } from 'vaul'
import { 
  ChatSettings as ChatSettingsType, 
  ProficiencyLevel, 
  UserRole,
  AnalysisType, 
  ReasoningFocus, 
  ProductTypes
} from '@/types'
import { 
  ANALYSIS_TYPES, 
  REASONING_FOCUS, 
  DEFAULT_CHAT_SETTINGS, 
  PRODUCT_TYPES,
  PROFICIENCY_LEVELS,
  USER_ROLES
} from '@/constants'
import { 
  Settings, 
  X, 
  RotateCcw, 
  FileText, 
  Globe, 
  Github,
  BookOpen,
  Brain,
  Target,
  Shield
} from 'lucide-react'

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

  // Ensure we have valid settings by merging with defaults
  const safeSettings: ChatSettingsType = {
    ...DEFAULT_CHAT_SETTINGS,
    ...settings
  }

  if (compact) {
    return (
      <div className={cn('space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg', className)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Proficiency Level</Label>
            <CompactProficiencySelector
              value={safeSettings.proficiency_level}
              onChange={(level) => updateSetting('proficiency_level', level)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {PROFICIENCY_LEVELS[safeSettings.proficiency_level]?.description || 'Loading...'}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Role</Label>
            <SimpleRoleDropdown
              value={safeSettings.user_role}
              onChange={(role) => updateSetting('user_role', role)}
              label=""
              placeholder="Select role..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {USER_ROLES[safeSettings.user_role]?.description || 'Loading...'}
            </p>
          </div>
         
          <div className="space-y-2">
            <Label className="text-sm font-medium">Product Type</Label>
            <SimpleProductTypeDropdown
              value={safeSettings.product_type}
              onChange={(productType) => updateSetting('product_type', productType)}
              label=""
              placeholder="Select product type..."
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={onToggle}>
      <Drawer.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
      </Drawer.Trigger>
      
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className={cn(
          "fixed right-0 top-0 h-full w-[400px] border-l bg-background p-6 shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          "duration-300 ease-in-out overflow-y-auto"
        )}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <Drawer.Title className="font-semibold text-xl">Chat Settings</Drawer.Title>
              <p className="text-sm text-gray-500 dark:text-gray-400">Customize your chat experience</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="ml-1 text-xs">Reset</span>
              </Button>
              <Drawer.Close asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Drawer.Close>
            </div>
          </div>

          <div className="space-y-8">
            {/* Product Section */}
            <section className="space-y-4 py-3">
              <div className="flex items-center gap-2 text-lg font-medium">
                <Target className="h-5 w-5" />
                <h2>Product Settings</h2>
              </div>
              
              <div className="space-y-4 pl-7">
                <div className="space-y-2">
                  <Label>Product Type</Label>
                  <SimpleProductTypeDropdown
                    value={safeSettings.product_type}
                    onChange={(productType) => updateSetting('product_type', productType)}
                  />
                </div>
              </div>
            </section>

            {/* User Profile Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <BookOpen className="h-5 w-5" />
                <h2>Your Profile</h2>
              </div>
              
              <div className="space-y-4 pl-7">
                <div className="space-y-2">
                  <Label>Your Proficiency Level With <b>{PRODUCT_TYPES[safeSettings.product_type]?.name || 'Product'}</b></Label>
                  <ProficiencySelector
                    value={safeSettings.proficiency_level}
                    onChange={(level) => updateSetting('proficiency_level', level)}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {PROFICIENCY_LEVELS[safeSettings.proficiency_level]?.description || 'Loading...'}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Your Role With <b>{PRODUCT_TYPES[safeSettings.product_type]?.name || 'Product'}</b></Label>
                  <RoleSelector
                    value={safeSettings.user_role}
                    onChange={(role) => updateSetting('user_role', role)}
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {USER_ROLES[safeSettings.user_role]?.description || 'Loading...'}
                  </p>
                </div>
              </div>
            </section>

            {/* Knowledge Sources Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <Brain className="h-5 w-5" />
                <h2>Knowledge Sources</h2>
              </div>
              
              <div className="space-y-4 pl-7">
                <Label className="block mb-3">Enable or disable different knowledge sources</Label>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="checkbox"
                      id="include_lucid"
                      checked={safeSettings.include_lucid}
                      onChange={(e) => updateSetting('include_lucid', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="include_lucid" className="flex items-center gap-2 cursor-pointer flex-1">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <span className="font-medium">Lucid Documentation</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Access official documentation and guides</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="checkbox"
                      id="include_wiki"
                      checked={safeSettings.include_wiki}
                      onChange={(e) => updateSetting('include_wiki', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="include_wiki" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Globe className="h-5 w-5 text-green-500" />
                      <div>
                        <span className="font-medium">Wiki Knowledge Base</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Include community knowledge and best practices</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="checkbox"
                      id="include_github"
                      checked={safeSettings.include_github}
                      onChange={(e) => updateSetting('include_github', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="include_github" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Github className="h-5 w-5 text-purple-500" />
                      <div>
                        <span className="font-medium">GitHub Resources</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Access code examples and discussions</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            </section>

            {/* Analysis Settings Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <Shield className="h-5 w-5" />
                <h2>Analysis Settings</h2>
              </div>
              
              <div className="space-y-4 pl-7">
                <div className="space-y-2">
                  <Label>Reasoning Focus</Label>
                  <select
                    value={safeSettings.reasoning_focus}
                    onChange={(e) => updateSetting('reasoning_focus', e.target.value as ReasoningFocus)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    {Object.entries(REASONING_FOCUS).map(([key, { name, description }]) => (
                      <option key={key} value={key}>{name} - {description}</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {REASONING_FOCUS[safeSettings.reasoning_focus]?.description || 'Loading...'}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              These settings help us provide more relevant and personalized responses.
              You can update them anytime.
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
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