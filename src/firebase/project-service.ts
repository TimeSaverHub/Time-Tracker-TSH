import { db } from './config'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import type { Project } from '@/types/time-tracking'

export const projectService = {
  getUserProjects: async (userId: string): Promise<Project[]> => {
    const projectsRef = collection(db, 'projects')
    const q = query(projectsRef, where('userId', '==', userId))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project))
  },

  getProjects: async (userId: string): Promise<Project[]> => {
    return projectService.getUserProjects(userId)
  },

  async addProject(project: Omit<Project, 'id'>): Promise<string> {
    const projectsRef = collection(db, 'projects')
    const docRef = await addDoc(projectsRef, project)
    return docRef.id
  },

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    const projectRef = doc(db, 'projects', id)
    await updateDoc(projectRef, project)
  },

  async deleteProject(id: string): Promise<void> {
    const projectRef = doc(db, 'projects', id)
    await deleteDoc(projectRef)
  }
} 