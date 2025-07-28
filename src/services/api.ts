import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { 
  ApiResponse, 
  Message, 
  ChatSession, 
  User,
  EnhancedQueryRequest,
  EnhancedQueryResponse,
  VisualAnalysisRequest,
  VisualAnalysisResponse,
  ProficiencyLevel,
  AnalysisType,
  ReasoningFocus,
  ChatSettings,
  GithubResponse
} from '@/types'
import { CHAT_CONFIG, API_ENDPOINTS } from '@/constants'
import { generateId } from '@/lib/utils'

export interface ChatRequest {
  message: string
  proficiency_level: ProficiencyLevel
  analysis_type: AnalysisType
  reasoning_focus: ReasoningFocus
  include_screenshots: boolean
  include_figma: boolean
  include_lucid: boolean
  include_wiki: boolean
  include_github: boolean
  max_visual_items: number
}

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: CHAT_CONFIG.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error)
        return Promise.reject(error)
      }
    )
  }

  // Enhanced Query Methods
  async sendEnhancedQuery(request: EnhancedQueryRequest): Promise<ApiResponse<EnhancedQueryResponse>> {
    try {
      const formData = new FormData()
      formData.append('query', request.query)
      
      if (request.analysis_type) {
        formData.append('analysis_type', request.analysis_type)
      }
      if (request.proficiency_level) {
        formData.append('proficiency_level', request.proficiency_level)
      }
      if (request.user_role) {
        formData.append('user_role', request.user_role)
      }
      if (request.figma_urls && request.figma_urls.length > 0) {
        formData.append('figma_urls', request.figma_urls.join(','))
      }
      if (request.lucid_diagram_ids && request.lucid_diagram_ids.length > 0) {
        formData.append('lucid_diagram_ids', request.lucid_diagram_ids.join(','))
      }
      if (request.include_screenshots !== undefined) {
        formData.append('include_screenshots', request.include_screenshots.toString())
      }
      if (request.reasoning_focus) {
        formData.append('reasoning_focus', request.reasoning_focus)
      }
      if (request.include_lucid !== undefined) {
        formData.append('include_lucid', request.include_lucid.toString())
      }
      if (request.include_wiki !== undefined) {
        formData.append('include_wiki', request.include_wiki.toString())
      }
      if (request.include_github !== undefined) {
        formData.append('include_github', request.include_github.toString())
      }

      const response = await this.client.post<EnhancedQueryResponse>(
        API_ENDPOINTS.CHAT,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async sendVisualAnalysis(
    request: VisualAnalysisRequest, 
    files?: File[]
  ): Promise<ApiResponse<VisualAnalysisResponse>> {
    try {
      const formData = new FormData()
      formData.append('query', request.query)
      
      if (request.analysis_type) {
        formData.append('analysis_type', request.analysis_type)
      }
      if (request.proficiency_level) {
        formData.append('proficiency_level', request.proficiency_level)
      }
      if (request.user_role) {
        formData.append('user_role', request.user_role)
      }
      if (request.include_screenshots !== undefined) {
        formData.append('include_screenshots', request.include_screenshots.toString())
      }
      
      // Add files if provided
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('files', file)
        })
      }

      const response = await this.client.post(
        API_ENDPOINTS.VISUAL_ANALYSIS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getProficiencyLevels(): Promise<ApiResponse<Record<string, any>>> {
    try {
      const response = await this.client.get(API_ENDPOINTS.PROFICIENCY_LEVELS)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Legacy Chat methods (for backward compatibility)
  async sendMessage(
    content: string,
    settings: ChatSettings
  ): Promise<ApiResponse<Message>> {
      try {
        const response = await this.client.post<{
          github_files?: GithubResponse[]
          success: boolean
          message?: string
          conversation_id?: string
          search_summary?: string
          processing_time?: number
          cost?: number
          error?: string
        }>(
          API_ENDPOINTS.CHAT,
          {
            message: content,
            include_figma: true,
            include_lucid: settings.include_lucid,
            include_wiki: settings.include_wiki,
            include_github: settings.include_github,
            expert_level: settings.proficiency_level,
            user_role: settings.user_role,
            max_visual_items: 1,
          }
        )

        const backendData = response.data
        if (backendData.success && backendData.message) {
          const message: Message = {
            id: backendData.conversation_id || generateId(),
            message: backendData.message,
            timestamp: new Date(),
            sender: 'agent',
            type: 'text',
            metadata: {
              conversation_id: backendData.conversation_id,
              search_summary: backendData.search_summary,
              processing_time: backendData.processing_time,
              cost: backendData.cost,
            },
            github_files: backendData.github_files || []
          }

          return {
            success: true,
            data: message
          }
        } else {
          return {
            success: false,
            error: backendData.error || 'No response from backend'
          }
        }
      } catch (fallbackError) {
        throw this.handleError(fallbackError)
      }
    
  }

  async getChatHistory(sessionId: string): Promise<ApiResponse<Message[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Message[]>> = await this.client.get(
        `${API_ENDPOINTS.MESSAGES}/${sessionId}`
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // User methods
  async getUser(userId: string): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.client.get(
        `${API_ENDPOINTS.USER}/${userId}`
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await this.client.put(
        `${API_ENDPOINTS.USER}/${userId}`,
        userData
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Error handling
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message || 'An error occurred'
      return new Error(message)
    }
    return error instanceof Error ? error : new Error('Unknown error occurred')
  }
}

export const apiService = new ApiService()
export default apiService 