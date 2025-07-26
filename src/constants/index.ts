import { ProficiencyLevel, ProficiencyLevelInfo, AnalysisType, ReasoningFocus, UserRole, UserRoleInfo } from '@/types'

export const API_ENDPOINTS = {
  CHAT: '/api/v1/chat/message',
  ENHANCED_QUERY: '/api/v1/enhanced-query',
  VISUAL_ANALYSIS: '/api/v1/visual-analysis',
  PROFICIENCY_LEVELS: '/api/v1/proficiency-levels',
  MESSAGES: '/api/messages',
  SESSION: '/api/session',
  USER: '/api/user',
} as const

export const CHAT_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  MAX_MESSAGE_LENGTH: 1000,
} as const

export const MESSAGE_TYPES = {
  TEXT: 'text',
  TYPING: 'typing',
  ERROR: 'error',
} as const

export const CHAT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
} as const

export const SENDER_TYPES = {
  USER: 'user',
  AGENT: 'agent',
} as const

// Proficiency Level Configuration
export const PROFICIENCY_LEVELS: Record<ProficiencyLevel, ProficiencyLevelInfo> = {
  beginner: {
    name: 'Beginner',
    description: 'New to the domain, needs simple explanations with step-by-step guidance',
    characteristics: [
      'Limited technical knowledge',
      'Needs background context',
      'Prefers analogies and examples',
      'Benefits from detailed explanations'
    ],
    icon: '👶',
    color: 'text-green-600'
  },
  intermediate: {
    name: 'Intermediate',
    description: 'Has some experience, understands basic concepts',
    characteristics: [
      'Basic familiarity with tools',
      'Understands common terminology',
      'Needs practical implementation details',
      'Appreciates best practices'
    ],
    icon: '🎯',
    color: 'text-blue-600'
  },
  expert: {
    name: 'Expert',
    description: 'Deep technical knowledge, focuses on advanced concepts',
    characteristics: [
      'Extensive domain expertise',
      'Interested in architectural patterns',
      'Values performance considerations',
      'Seeks optimization opportunities'
    ],
    icon: '🔧',
    color: 'text-orange-600'
  },
  executive: {
    name: 'Executive',
    description: 'Business-focused, needs strategic insights and ROI analysis',
    characteristics: [
      'Business stakeholder perspective',
      'Interested in strategic value',
      'Needs cost-benefit analysis',
      'Focuses on competitive advantage'
    ],
    icon: '💼',
    color: 'text-red-600'
  }
} as const

// User Role Configuration
export const USER_ROLES: Record<UserRole, UserRoleInfo> = {
  engineer: {
    name: 'Software Engineer',
    description: 'Develops and maintains software systems and applications',
    focus_areas: [
      'Code architecture and design patterns',
      'API development and integration',
      'Performance optimization',
      'Testing and debugging',
      'Technology stack decisions'
    ],
    icon: '👨‍💻',
    color: 'text-blue-700',
    typical_questions: [
      'How do I implement this feature?',
      'What\'s the best architecture for this?',
      'How can I optimize performance?',
      'What are the security considerations?'
    ]
  },
  product_manager: {
    name: 'Product Manager',
    description: 'Drives product strategy, roadmap, and feature development',
    focus_areas: [
      'Product strategy and roadmap',
      'User requirements and stories',
      'Market analysis and competition',
      'Feature prioritization',
      'Stakeholder communication'
    ],
    icon: '📊',
    color: 'text-purple-600',
    typical_questions: [
      'What features should we prioritize?',
      'How does this impact user experience?',
      'What are the business implications?',
      'How do we measure success?'
    ]
  },
  designer: {
    name: 'UX/UI Designer',
    description: 'Creates user experiences and interface designs',
    focus_areas: [
      'User experience design',
      'Interface design and prototyping',
      'Design systems and components',
      'User research and testing',
      'Accessibility and usability'
    ],
    icon: '🎨',
    color: 'text-pink-600',
    typical_questions: [
      'How can we improve user experience?',
      'What design patterns work best?',
      'How do we ensure accessibility?',
      'What are the usability considerations?'
    ]
  },
  data_scientist: {
    name: 'Data Scientist',
    description: 'Analyzes data to derive insights and build predictive models',
    focus_areas: [
      'Data analysis and modeling',
      'Machine learning algorithms',
      'Statistical analysis',
      'Data visualization',
      'Business intelligence'
    ],
    icon: '📈',
    color: 'text-emerald-600',
    typical_questions: [
      'What patterns can we find in the data?',
      'How do we build predictive models?',
      'What insights can we derive?',
      'How do we measure and track metrics?'
    ]
  },
  qa_engineer: {
    name: 'QA Engineer',
    description: 'Ensures software quality through testing and automation',
    focus_areas: [
      'Test strategy and planning',
      'Automated testing frameworks',
      'Bug detection and reporting',
      'Quality assurance processes',
      'Performance and security testing'
    ],
    icon: '🔍',
    color: 'text-amber-600',
    typical_questions: [
      'How do we ensure quality?',
      'What testing strategy should we use?',
      'How can we automate testing?',
      'What are the risk areas?'
    ]
  },
  devops: {
    name: 'DevOps Engineer',
    description: 'Manages infrastructure, deployment, and operations',
    focus_areas: [
      'Infrastructure and cloud services',
      'CI/CD pipelines and automation',
      'Monitoring and observability',
      'Security and compliance',
      'Scalability and reliability'
    ],
    icon: '⚙️',
    color: 'text-slate-600',
    typical_questions: [
      'How do we scale the infrastructure?',
      'What\'s the deployment strategy?',
      'How do we monitor and alert?',
      'What are the security requirements?'
    ]
  },
  business_analyst: {
    name: 'Business Analyst',
    description: 'Analyzes business processes and requirements',
    focus_areas: [
      'Business process analysis',
      'Requirements gathering',
      'Stakeholder management',
      'Process improvement',
      'Business intelligence'
    ],
    icon: '📋',
    color: 'text-indigo-600',
    typical_questions: [
      'What are the business requirements?',
      'How can we improve processes?',
      'What are the stakeholder needs?',
      'How do we measure business impact?'
    ]
  },
  project_manager: {
    name: 'Project Manager',
    description: 'Coordinates projects, timelines, and team resources',
    focus_areas: [
      'Project planning and execution',
      'Team coordination and communication',
      'Timeline and budget management',
      'Risk assessment and mitigation',
      'Stakeholder reporting'
    ],
    icon: '📅',
    color: 'text-cyan-600',
    typical_questions: [
      'What\'s the project timeline?',
      'How do we manage resources?',
      'What are the project risks?',
      'How do we track progress?'
    ]
  },
  other: {
    name: 'Other Role',
    description: 'General role not specified in the predefined categories',
    focus_areas: [
      'Cross-functional collaboration',
      'General business understanding',
      'Process awareness',
      'Technology familiarity'
    ],
    icon: '👤',
    color: 'text-gray-600',
    typical_questions: [
      'How does this work?',
      'What should I know about this?',
      'How can I contribute?',
      'What are the next steps?'
    ]
  }
} as const

export const ANALYSIS_TYPES: Record<AnalysisType, { name: string; description: string; icon: string }> = {
  general: {
    name: 'General Analysis',
    description: 'Comprehensive overview and analysis of content',
    icon: '📊'
  },
  design: {
    name: 'Design Analysis',
    description: 'UI/UX, visual hierarchy, and design patterns',
    icon: '🎨'
  },
  workflow: {
    name: 'Workflow Analysis',
    description: 'Process flows, decision points, and user journeys',
    icon: '⚡'
  },
  integration: {
    name: 'Integration Analysis',
    description: 'Data flows, system connections, and architecture',
    icon: '🔗'
  },
  architecture: {
    name: 'Architecture Analysis',
    description: 'System architecture and technical patterns',
    icon: '🏗️'
  }
} as const

export const REASONING_FOCUS: Record<ReasoningFocus, { name: string; description: string }> = {
  comprehensive: {
    name: 'Comprehensive',
    description: 'Thorough analysis covering all aspects'
  },
  technical: {
    name: 'Technical',
    description: 'Deep technical implementation details'
  },
  business: {
    name: 'Business',
    description: 'Business value and operational perspective'
  },
  security: {
    name: 'Security',
    description: 'Security architecture and compliance'
  }
} as const

// Default Settings
export const DEFAULT_CHAT_SETTINGS = {
  proficiency_level: 'intermediate' as ProficiencyLevel,
  user_role: 'engineer' as UserRole,
  analysis_type: 'general' as AnalysisType,
  reasoning_focus: 'comprehensive' as ReasoningFocus,
  include_screenshots: true,
  include_lucid: true,
  include_wiki: true,
  include_github: true
}

export interface ChatRequest {
  message: string,
  include_figma: boolean,
  include_lucid: boolean,
  include_documents: boolean,
  max_visual_items: number,
}

export interface ChatResponse {
  response: string,
}