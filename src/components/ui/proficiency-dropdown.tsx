import React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ProficiencyLevel } from '@/types'
import { PROFICIENCY_LEVELS } from '@/constants'

interface ProficiencyDropdownProps {
  value: ProficiencyLevel | ''
  onChange: (level: ProficiencyLevel) => void
  className?: string
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
}

export function ProficiencyDropdown({
  value,
  onChange,
  className,
  label = "Select Your Experience Level",
  placeholder = "Choose your proficiency level...",
  required = true,
  error
}: ProficiencyDropdownProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ProficiencyLevel)}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 focus-visible:ring-red-500',
          !value && 'text-muted-foreground'
        )}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
          const info = PROFICIENCY_LEVELS[level]
          return (
            <option key={level} value={level}>
              {info.icon} {info.name} - {info.description}
            </option>
          )
        })}
      </select>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {value && (
        <div className="mt-2 p-3 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{PROFICIENCY_LEVELS[value].icon}</span>
            <span className={cn('font-medium', PROFICIENCY_LEVELS[value].color)}>
              {PROFICIENCY_LEVELS[value].name}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {PROFICIENCY_LEVELS[value].description}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-medium">What this means:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {PROFICIENCY_LEVELS[value].characteristics.slice(0, 3).map((char, idx) => (
                <li key={idx} className="flex items-start gap-1">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// Simple version without preview
export function SimpleProficiencyDropdown({
  value,
  onChange,
  className,
  label = "Experience Level",
  placeholder = "Select level...",
  required = true
}: Omit<ProficiencyDropdownProps, 'error'>) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ProficiencyLevel)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {(Object.keys(PROFICIENCY_LEVELS) as ProficiencyLevel[]).map((level) => {
          const info = PROFICIENCY_LEVELS[level]
          return (
            <option key={level} value={level}>
              {info.icon} {info.name}
            </option>
          )
        })}
      </select>
    </div>
  )
} 