'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { Project } from '@/types/time-tracking'
import { useLanguage } from '@/context/language-context'

interface ProjectFilterProps {
  projects: Project[]
  selectedProjectId?: string
  onProjectSelect: (projectId?: string) => void
}

export function ProjectFilter({
  projects,
  selectedProjectId,
  onProjectSelect,
}: ProjectFilterProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedProject ? (
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: selectedProject.color }}
              />
              {selectedProject.name}
            </div>
          ) : (
            t('projects.all')
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t('projects.search')} />
          <CommandEmpty>{t('projects.noResults')}</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onProjectSelect(undefined)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  !selectedProjectId ? 'opacity-100' : 'opacity-0'
                )}
              />
              {t('projects.all')}
            </CommandItem>
            {projects.map((project) => (
              <CommandItem
                key={project.id}
                onSelect={() => {
                  onProjectSelect(project.id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    project.id === selectedProjectId ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  {project.name}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 