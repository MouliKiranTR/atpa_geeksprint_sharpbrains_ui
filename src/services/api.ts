import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ApiResponse, Message, ChatSession, User } from '@/types'
import { CHAT_CONFIG, API_ENDPOINTS } from '@/constants'
import { generateId } from '@/lib/utils'

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

  // Chat methods
  async sendMessage(content: string): Promise<ApiResponse<Message>> {
    try {
      const response = await this.client.post(
        API_ENDPOINTS.CHAT,
        {
          message: content,
          include_figma: true,
          include_lucid: true,
          include_documents: true,
          max_visual_items: 1,
        }
      )

      // Transform backend response to frontend format
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
          }
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
    } catch (error) {
      throw this.handleError(error)
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