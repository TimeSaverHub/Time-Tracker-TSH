'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { projectService } from '@/firebase/project-service'
import type { Project } from '@/types/time-tracking'

export function useProjects() {
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProjects() {
      if (!currentUser) return
      try {
        const data = await projectService.getProjects(currentUser.uid)
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [currentUser])

  return { projects, loading }
} 