export interface Message {
  id: string
  message: string
  timestamp: Date
  sender: 'user' | 'agent'
  type: 'text' | 'typing' | 'error'
  metadata?: Record<string, unknown>
  github_files?: GithubResponse[]
}

export interface GithubFile {
  name: string
  html_url: string
  path: string
  content: string
  line_range?: {
    start: number
    end: number
  }
}

export interface GithubResponse extends GithubFile {
  repository: string
  branch?: string
  commit_hash?: string
}

export interface ChatSession {
  id: string
  userId: string
  startedAt: Date
  lastMessageAt: Date
  status: 'active' | 'completed' | 'abandoned'
  messages: Message[]
  context?: Record<string, unknown>
}

export interface User {
  id: string
  name?: string
  email?: string
  avatar?: string
  metadata?: Record<string, unknown>
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  order: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ChatConfig {
  apiBaseUrl: string
  maxMessageLength: number
  typingDelayMs: number
  retryAttempts: number
}

// Proficiency Level Types
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'expert' | 'executive'

export type ProductTypes = 'checkpoint' | 'westlaw' | 'materia'

export interface ProficiencyLevelInfo {
  name: string
  description: string
  characteristics: string[]
  icon: string
  color: string
}

// Role Types
export type UserRole = 'engineer' | 'product_manager' | 'designer' | 'data_scientist' | 'qa_engineer' | 'devops' | 'business_analyst' | 'project_manager' | 'other'

export interface UserRoleInfo {
  name: string
  description: string
  focus_areas: string[]
  icon: string
  color: string
  typical_questions: string[]
}

export type AnalysisType = 'general' | 'design' | 'workflow' | 'integration' | 'architecture'
export type ReasoningFocus = 'comprehensive' | 'technical' | 'business' | 'security'

// Enhanced Query Types
export interface EnhancedQueryRequest {
  query: string
  analysis_type?: AnalysisType
  proficiency_level?: ProficiencyLevel
  product_type?: ProductTypes
  user_role?: UserRole
  figma_urls?: string[]
  lucid_diagram_ids?: string[]
  include_screenshots?: boolean
  reasoning_focus?: ReasoningFocus
  include_lucid?: boolean
  include_wiki?: boolean
  include_github?: boolean
}

export interface EnhancedQueryResponse {
  success: boolean
  query: string
  analysis_type: string
  proficiency_level: string
  user_role?: string
  analysis: string
  content_type: string
  visual_items_processed: number
  cost?: number
  processing_time: number
  error?: string
}

export interface VisualAnalysisRequest {
  query: string
  analysis_type?: AnalysisType
  proficiency_level?: ProficiencyLevel
  user_role?: UserRole
  include_screenshots?: boolean
}

export interface VisualAnalysisResponse {
  success: boolean
  query: string
  analysis_type: string
  proficiency_level: string
  user_role?: string
  analysis: string
  content_type: string
  files_processed: number
  cost?: number
  processing_time: number
  error?: string
}

// Chat Settings
export interface ChatSettings {
  proficiency_level: ProficiencyLevel
  user_role: UserRole
  analysis_type: AnalysisType
  reasoning_focus: ReasoningFocus
  include_screenshots: boolean
  include_lucid: boolean
  include_wiki: boolean
  include_github: boolean
  product_type: ProductTypes
} 