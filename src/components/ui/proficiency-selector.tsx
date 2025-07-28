import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ProficiencyLevel } from '@/types'
import { PROFICIENCY_LEVELS, DEFAULT_CHAT_SETTINGS } from '@/constants'
import { ChevronDown, Info } from 'lucide-react'

interface ProficiencySelectorProps {
  value: ProficiencyLevel
  onChange: (level: ProficiencyLevel) => void
  className?: string
  showDescription?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProficiencySelector({
  value = DEFAULT_CHAT_SETTINGS.proficiency_level,
  onChange,
  className,
  showDescription = false,
  size = 'md'
}: ProficiencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState<ProficiencyLevel | null>(null)

  // Ensure we have a valid proficiency level
  const safeValue = PROFICIENCY_LEVELS[value] ? value : DEFAULT_CHAT_SETTINGS.proficiency_level
  const currentLevel = PROFICIENCY_LEVELS[safeValue]

  const sizeClasses = {
    sm: 'text-xs p-2',
    md: 'text-sm p-3',
    lg: 'text-base p-4'
  }

  return (
    <div className={cn('relative', className)}>
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
        <div className="flex items-center gap-2 mb-0">
          <span className="text-lg">{currentLevel?.icon || '👤'}</span>
          <span className={currentLevel?.color || 'text-gray-600'}>
            {currentLevel?.name || 'Select Level'}
          </span>
        </div>
        <ChevronDown 
          className={cn(
            'h-4 w-4 transition-transform', 
            isOpen && 'rotate-180'
          )} 
        />
      </Button>

      {/* Description */}
      {showDescription && currentLevel?.description && (
        <p className="text-xs text-muted-foreground mt-1">
          {currentLevel.description}
        </p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg">
          {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
            const levelInfo = PROFICIENCY_LEVELS[level]
            if (!levelInfo) return null
            
            const isSelected = level === safeValue
            
            return (
              <div
                key={level}
                className={cn(
                  'relative flex items-center gap-3 p-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors',
                  isSelected && 'bg-accent text-accent-foreground'
                )}
                onClick={() => {
                  onChange(level)
                  setIsOpen(false)
                }}
                onMouseEnter={() => setShowTooltip(null)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <span className="text-lg">{levelInfo.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn('font-medium', levelInfo.color)}>
                      {levelInfo.name}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {levelInfo.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowTooltip(null)
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
      {showTooltip && PROFICIENCY_LEVELS[showTooltip] && (
        <div className="absolute top-full left-0 right-0 z-60 mt-1 bg-popover border rounded-md shadow-lg p-4">
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <span>{PROFICIENCY_LEVELS[showTooltip].icon}</span>
              <span className={PROFICIENCY_LEVELS[showTooltip].color}>
                {PROFICIENCY_LEVELS[showTooltip].name}
              </span>
            </h4>
            <p className="text-sm text-muted-foreground">
              {PROFICIENCY_LEVELS[showTooltip].description}
            </p>
            <div className="space-y-1">
              <p className="text-xs font-medium">Key Characteristics:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {PROFICIENCY_LEVELS[showTooltip].characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-1">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{char}</span>
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

// Compact version for use in form inputs
export function CompactProficiencySelector({
  value = DEFAULT_CHAT_SETTINGS.proficiency_level,
  onChange,
  className
}: Pick<ProficiencySelectorProps, 'value' | 'onChange' | 'className'>) {
  // Ensure we have a valid proficiency level
  const safeValue = PROFICIENCY_LEVELS[value] ? value : DEFAULT_CHAT_SETTINGS.proficiency_level

  return (
    <select
      value={safeValue}
      onChange={(e) => onChange(e.target.value as ProficiencyLevel)}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
        const levelInfo = PROFICIENCY_LEVELS[level]
        if (!levelInfo) return null
        
        return (
          <option key={level} value={level}>
            {levelInfo.icon} {levelInfo.name}
          </option>
        )
      })}
    </select>
  )
} 