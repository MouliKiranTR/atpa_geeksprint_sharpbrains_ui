import React, { useState } from 'react'
import { RoleSelector, SimpleRoleDropdown } from '@/components/ui/role-selector'
import { ProficiencyDropdown } from '@/components/ui/proficiency-dropdown'
import { Button } from '@/components/ui/button'
import { UserRole, ProficiencyLevel } from '@/types'
import { USER_ROLES, PROFICIENCY_LEVELS } from '@/constants'

export function RoleDemoSimple() {
  const [selectedRole, setSelectedRole] = useState<UserRole>('engineer')
  const [selectedProficiency, setSelectedProficiency] = useState<ProficiencyLevel>('intermediate')
  const [showPreview, setShowPreview] = useState(false)

  const currentRoleInfo = USER_ROLES[selectedRole]
  const currentProficiencyInfo = PROFICIENCY_LEVELS[selectedProficiency]

  const generateSampleResponse = () => {
    const responses: Record<UserRole, Record<ProficiencyLevel, string>> = {
      engineer: {
        beginner: "Let me explain the authentication system step by step. Authentication is how we verify who you are when you log in. Think of it like showing your ID card at a building entrance...",
        intermediate: "Our authentication system uses JWT tokens with OAuth 2.0. The flow involves the client sending credentials to the auth server, which validates them and returns a signed token...",
        expert: "The authentication architecture implements a distributed token-based system with RS256 asymmetric signing. We use refresh token rotation with secure httpOnly cookies and implement PKCE for additional security...",
        executive: "Our authentication system provides secure user access with industry-standard security measures. It supports 99.9% uptime and scales to handle millions of users with minimal infrastructure costs..."
      },
      product_manager: {
        beginner: "Authentication helps ensure only the right people can access our product. It's like having a secure login that protects user data and provides a personalized experience...",
        intermediate: "Our authentication system enables user management, personalization, and security. It supports social logins, tracks user engagement, and provides analytics on user behavior patterns...",
        expert: "The authentication platform drives our user acquisition funnel with conversion optimization, supports A/B testing for login flows, and provides detailed user journey analytics...",
        executive: "Authentication is critical for user retention (increases engagement by 40%), enables premium features, and provides competitive advantage through seamless user experience..."
      },
      designer: {
        beginner: "The login screen is the first thing users see. We want it to feel welcoming and easy to use, with clear buttons and helpful messages when something goes wrong...",
        intermediate: "Our authentication UI follows Material Design principles with consistent spacing, accessible color contrast, and responsive design patterns that work across all devices...",
        expert: "The auth interface implements progressive disclosure, microinteractions for feedback, and accessibility standards (WCAG 2.1 AA). We use design tokens for consistency and support dark mode...",
        executive: "Our authentication design reduces user drop-off by 25%, increases conversion rates, and provides a premium brand experience that differentiates us from competitors..."
      },
      data_scientist: {
        beginner: "Authentication creates data about user behavior. We can see when people log in, which features they use, and how often they return to help improve the product...",
        intermediate: "Our auth system generates login analytics, user session data, and behavioral patterns. We track authentication success rates, failure patterns, and user journey metrics...",
        expert: "The authentication data pipeline feeds our ML models for fraud detection, user segmentation, and churn prediction. We use statistical analysis to optimize login flows and identify security anomalies...",
        executive: "Authentication analytics drive key business metrics: 15% improvement in user retention, 40% reduction in fraud, and data-driven insights that increase customer lifetime value..."
      },
      qa_engineer: {
        beginner: "We test authentication to make sure it works correctly. This means checking that valid users can log in and invalid users cannot access the system...",
        intermediate: "Our auth testing includes unit tests for token validation, integration tests for OAuth flows, and end-to-end tests for complete user journeys. We test edge cases and error scenarios...",
        expert: "Authentication testing strategy covers security penetration testing, load testing for scalability, automated regression testing, and continuous security monitoring with SAST/DAST tools...",
        executive: "Our comprehensive auth testing reduces security incidents by 90%, ensures 99.9% system reliability, and maintains compliance with industry standards, saving significant costs in breach prevention..."
      },
      devops: {
        beginner: "DevOps manages how the authentication system runs in production. We make sure it's always available and secure for users to log in...",
        intermediate: "Our auth infrastructure uses containerized services with auto-scaling, monitoring with Prometheus/Grafana, and deployment pipelines with automated security scanning...",
        expert: "The authentication platform implements zero-downtime deployments, distributed caching with Redis, circuit breakers for resilience, and comprehensive observability with distributed tracing...",
        executive: "Our DevOps approach ensures 99.99% auth service uptime, reduces deployment time by 80%, and maintains security compliance while optimizing infrastructure costs by 30%..."
      },
      business_analyst: {
        beginner: "Authentication helps us understand our users and their needs. It shows us how people interact with our system and what improvements we should make...",
        intermediate: "Auth analytics provide insights into user behavior patterns, feature adoption rates, and business process optimization. We analyze login trends and user engagement metrics...",
        expert: "The authentication data supports business intelligence initiatives, customer segmentation analysis, ROI calculations, and strategic decision-making through comprehensive KPI tracking...",
        executive: "Authentication insights drive strategic business decisions: 25% increase in user engagement, improved customer satisfaction scores, and data-backed product roadmap prioritization..."
      },
      project_manager: {
        beginner: "As a project manager, I coordinate the authentication system development with different teams - engineering, design, QA, and business stakeholders...",
        intermediate: "Managing auth projects involves coordinating security requirements, compliance timelines, resource allocation, and cross-team dependencies while ensuring deliverables meet business goals...",
        expert: "Authentication project management requires risk assessment, vendor coordination, compliance milestone tracking, and agile methodology implementation with detailed sprint planning and stakeholder communication...",
        executive: "Auth project delivery achieved 20% faster time-to-market, maintained budget compliance, and delivered strategic business value while managing complex regulatory requirements..."
      },
      other: {
        beginner: "Authentication is a security system that makes sure only the right people can access our applications. It's like having a key to unlock a door...",
        intermediate: "Our authentication system provides secure access control, user management, and session handling across different applications and services in our organization...",
        expert: "The authentication infrastructure implements enterprise-grade security protocols, supports multiple authentication methods, and integrates with existing organizational identity providers...",
        executive: "Authentication enables secure digital transformation, supports compliance requirements, and provides strategic value through improved security posture and user experience..."
      }
    }

    return responses[selectedRole]?.[selectedProficiency] || 
           "Authentication systems verify user identity and manage access to protected resources."
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎭 Role & Proficiency Demo
        </h2>
        <p className="text-lg text-gray-600">
          See how AI responses adapt to your role and experience level
        </p>
      </div>

      {/* Selection Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Select Your Role</h3>
          <RoleSelector
            value={selectedRole}
            onChange={setSelectedRole}
            showDescription={true}
            size="md"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Select Experience Level</h3>
          <ProficiencyDropdown
            value={selectedProficiency}
            onChange={setSelectedProficiency}
            label="Your Proficiency Level"
            placeholder="Choose your level..."
          />
        </div>
      </div>

      {/* Current Selection Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Current Selection</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentRoleInfo.icon}</span>
            <div>
              <div className={`font-medium ${currentRoleInfo.color}`}>
                {currentRoleInfo.name}
              </div>
              <div className="text-sm text-gray-600">
                {currentRoleInfo.description}
              </div>
            </div>
          </div>
          
          <div className="text-gray-400">+</div>
          
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentProficiencyInfo.icon}</span>
            <div>
              <div className={`font-medium ${currentProficiencyInfo.color}`}>
                {currentProficiencyInfo.name}
              </div>
              <div className="text-sm text-gray-600">
                {currentProficiencyInfo.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Response Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Sample AI Response</h3>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>

        {showPreview && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">
                Question: "How does our authentication system work?"
              </div>
              <div className="text-xs text-gray-400">
                Response tailored for: <span className={currentRoleInfo.color}>
                  {currentRoleInfo.name}
                </span> ({currentProficiencyInfo.name} level)
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 leading-relaxed">
                {generateSampleResponse()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Role Comparison */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Role Comparison</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(USER_ROLES) as UserRole[]).slice(0, 6).map((role) => {
            const roleInfo = USER_ROLES[role]
            const isSelected = role === selectedRole
            
            return (
              <div
                key={role}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{roleInfo.icon}</span>
                  <span className={`font-medium text-sm ${roleInfo.color}`}>
                    {roleInfo.name}
                  </span>
                  {isSelected && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  {roleInfo.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Implementation Example */}
      <div className="bg-gray-900 text-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Implementation Example</h3>
        <pre className="text-sm overflow-x-auto">
{`// Role and proficiency selection in your app
const [userRole, setUserRole] = useState<UserRole>('${selectedRole}')
const [proficiency, setProficiency] = useState<ProficiencyLevel>('${selectedProficiency}')

// Send to API with role context
const response = await api.sendEnhancedQuery({
  query: "How does authentication work?",
  user_role: userRole,
  proficiency_level: proficiency,
  analysis_type: "general"
})

// AI adapts response based on:
// - Role: ${currentRoleInfo.name} (${currentRoleInfo.description})
// - Level: ${currentProficiencyInfo.name} (${currentProficiencyInfo.description})`}
        </pre>
      </div>
    </div>
  )
} 