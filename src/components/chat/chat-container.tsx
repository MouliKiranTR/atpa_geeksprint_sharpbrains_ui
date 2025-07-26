import React, { useEffect } from 'react'
import { useChatStore } from '@/stores/chatStore'
import { MessageList } from './message-list'
import { FormMessageInput } from './form-message-input'
import { ChatSettings } from './chat-settings'
import { cn } from '@/lib/utils'
import { generateId } from '@/lib/utils'
import { AlertCircle, RefreshCw, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROFICIENCY_LEVELS, USER_ROLES, DEFAULT_CHAT_SETTINGS } from '@/constants'
import { apiService } from '@/services/api'
import { ProficiencyLevel, UserRole, ChatSettings as ChatSettingsType, GithubResponse } from '@/types'

interface ChatContainerProps {
  className?: string
  userId?: string
  defaultProficiency?: ProficiencyLevel
  defaultRole?: UserRole
}

// GitHub Files Pane Component
function GitHubFilesPane({ files }: { files: GithubResponse[] }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="w-full h-full border-l bg-muted/30 p-4 overflow-auto">
      <h3 className="text-lg font-semibold mb-4">GitHub Files</h3>
      <div className="space-y-4">
        {files.map((file, index) => (
          <div key={index} className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span className="font-medium">{file.path}</span>
              {file.line_range && (
                <span>Lines {file.line_range.start}-{file.line_range.end}</span>
              )}
            </div>
            <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
              <code>{file.content}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatContainer({ 
  className, 
  userId = 'default-user', 
  defaultProficiency,
  defaultRole 
}: ChatContainerProps) {
  const {
    messages,
    isLoading,
    isTyping,
    error,
    sendMessage,
    setError,
    settings,
    setSettings,
  } = useChatStore()

  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [currentGithubFiles, setCurrentGithubFiles] = React.useState<GithubResponse[]>([])

  // Update GitHub files when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'agent' && lastMessage.github_files) {
        setCurrentGithubFiles(lastMessage.github_files);
      }
    }
  }, [messages]);

  // Set default proficiency level and role if provided (only on initial load)
  useEffect(() => {
    if (defaultProficiency && 
        settings.proficiency_level === DEFAULT_CHAT_SETTINGS.proficiency_level &&
        defaultProficiency !== DEFAULT_CHAT_SETTINGS.proficiency_level) {
      setSettings({ ...settings, proficiency_level: defaultProficiency })
    }
    
    if (defaultRole && 
        settings.user_role === DEFAULT_CHAT_SETTINGS.user_role &&
        defaultRole !== DEFAULT_CHAT_SETTINGS.user_role) {
      setSettings({ ...settings, user_role: defaultRole })
    }
  }, [defaultProficiency, defaultRole])

  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content)
    } catch (err) {
      console.error('Failed to send message:', err)
      setError(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  const handleClearError = () => {
    setError(null)
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  // Get current proficiency level and role info for display
  const currentLevelInfo = PROFICIENCY_LEVELS[settings.proficiency_level]
  const currentRoleInfo = USER_ROLES[settings.user_role]

  const showGitHubPane = settings.include_github && currentGithubFiles.length > 0;

  return (
    <div className={cn(
      'flex flex-col h-full max-h-screen bg-background border rounded-lg overflow-hidden',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-card to-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-card-foreground flex items-center gap-2">
              🤖 Onboarding Assistant
              {isLoading && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
            </h2>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              {userId ? (
                <>
                  <span>Connected • Ready to help</span>
                  <span className="text-primary">•</span>
                  <span className={currentLevelInfo.color}>
                    {currentLevelInfo.icon} {currentLevelInfo.name}
                  </span>
                  <span className="text-primary">•</span>
                  <span className={currentRoleInfo.color}>
                    {currentRoleInfo.icon} {currentRoleInfo.name}
                  </span>
                </>
              ) : (
                'Connecting...'
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Settings */}
          <ChatSettings
            settings={settings}
            onChange={setSettings}
            isOpen={isSettingsOpen}
            onToggle={toggleSettings}
          />
          
          {error && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/5 border-b border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive flex-1">{error}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearError}
            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
          >
            ×
          </Button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 min-h-0">
        {/* Chat Messages */}
        <div className={cn(
          "flex flex-col flex-1 min-w-0",
          showGitHubPane && "w-[60%]"
        )}>
          <MessageList
            messages={messages}
            isTyping={isTyping}
            className="flex-1 min-h-0"
            onSuggestedMessageClick={handleSendMessage}
          />
          
          {/* Input */}
          <FormMessageInput
            onSendMessage={handleSendMessage}
            disabled={!userId || !!error}
            isLoading={isLoading}
            placeholder={
              !userId 
                ? "Connecting..." 
                : error 
                ? "Fix connection to continue..." 
                : `Ask me anything (${currentLevelInfo.name} • ${currentRoleInfo.name})...`
            }
          />
        </div>

        {/* GitHub Files Pane */}
        {showGitHubPane && (
          <div className="w-[40%] border-l">
            <GitHubFilesPane files={currentGithubFiles} />
          </div>
        )}
      </div>
    </div>
  )
} 