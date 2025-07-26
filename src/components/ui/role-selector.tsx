import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { UserRole } from '@/types'
import { USER_ROLES } from '@/constants'
import { ChevronDown, Info, Briefcase } from 'lucide-react'

interface RoleSelectorProps {
  value: UserRole
  onChange: (role: UserRole) => void
  className?: string
  showDescription?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function RoleSelector({
  value,
  onChange,
  className,
  showDescription = false,
  size = 'md'
}: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState<UserRole | null>(null)

  const currentRole = USER_ROLES[value]

  const sizeClasses = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  }

  return (
    <div className={cn('relative', className)}>
      <Label className="text-sm font-medium mb-2 block">
        Your Role
      </Label>
      
      {/* Main Selector Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full justify-between',
          sizeClasses[size],
          isOpen && 'ring-2 ring-ring'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentRole.icon}</span>
          <span className={currentRole.color}>{currentRole.name}</span>
        </div>
        <ChevronDown 
          className={cn(
            'h-4 w-4 transition-transform', 
            isOpen && 'rotate-180'
          )} 
        />
      </Button>

      {/* Description */}
      {showDescription && (
        <p className="text-xs text-muted-foreground mt-1">
          {currentRole.description}
        </p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-80 overflow-y-auto">
          {(Object.keys(USER_ROLES) as UserRole[]).map((role) => {
            const roleInfo = USER_ROLES[role]
            const isSelected = role === value
            
            return (
              <div
                key={role}
                className={cn(
                  'relative flex items-center gap-3 p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors',
                  isSelected && 'bg-accent text-accent-foreground'
                )}
                onClick={() => {
                  onChange(role)
                  setIsOpen(false)
                }}
                onMouseEnter={() => setShowTooltip(role)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <span className="text-lg">{roleInfo.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn('font-medium', roleInfo.color)}>
                      {roleInfo.name}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {roleInfo.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowTooltip(showTooltip === role ? null : role)
                  }}
                >
                  <Info className="h-3 w-3" />
                </Button>
              </div>
            )
          })}
        </div>
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-0 right-0 z-60 mt-1 bg-popover border rounded-md shadow-lg p-4">
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <span>{USER_ROLES[showTooltip].icon}</span>
              <span className={USER_ROLES[showTooltip].color}>
                {USER_ROLES[showTooltip].name}
              </span>
            </h4>
            <p className="text-sm text-muted-foreground">
              {USER_ROLES[showTooltip].description}
            </p>
            <div className="space-y-1">
              <p className="text-xs font-medium">Focus Areas:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {USER_ROLES[showTooltip].focus_areas.slice(0, 3).map((area, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium">Typical Questions:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {USER_ROLES[showTooltip].typical_questions.slice(0, 2).map((question, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Simple role dropdown for forms
export function SimpleRoleDropdown({
  value,
  onChange,
  className,
  label = "Role",
  placeholder = "Select your role...",
  required = false
}: {
  value: UserRole | ''
  onChange: (role: UserRole) => void
  className?: string
  label?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as UserRole)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {(Object.keys(USER_ROLES) as UserRole[]).map((role) => (
          <option key={role} value={role}>
            {USER_ROLES[role].icon} {USER_ROLES[role].name}
          </option>
        ))}
      </select>
    </div>
  )
}

// Role cards for selection
export function RoleCards({
  value,
  onChange,
  className
}: {
  value: UserRole | ''
  onChange: (role: UserRole) => void
  className?: string
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <Label className="text-sm font-medium">Select Your Role</Label>
      
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(USER_ROLES) as UserRole[]).map((role) => {
          const roleInfo = USER_ROLES[role]
          const isSelected = role === value
          
          return (
            <div
              key={role}
              className={cn(
                'p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'hover:border-muted-foreground/50'
              )}
              onClick={() => onChange(role)}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{roleInfo.icon}</span>
                <span className={cn('font-semibold text-sm', roleInfo.color)}>
                  {roleInfo.name}
                </span>
                {isSelected && (
                  <div className="w-2 h-2 bg-primary rounded-full ml-auto" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {roleInfo.description}
              </p>
              <div className="space-y-1">
                <p className="text-xs font-medium">Focus:</p>
                <ul className="text-xs text-muted-foreground">
                  {roleInfo.focus_areas.slice(0, 2).map((area, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 