import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'
import type { Project } from '@/types/time-tracking'

export async function getAllProjects(userId: string): Promise<Project[]> {
  const projectsRef = collection(db, 'projects')
  const q = query(projectsRef, where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[]
}

export async function createProject(
  userId: string,
  project: Omit<Project, 'id'>
): Promise<Project> {
  const projectsRef = collection(db, 'projects')
  const docRef = await addDoc(projectsRef, {
    ...project,
    userId,
    createdAt: serverTimestamp(),
  })
  return {
    id: docRef.id,
    ...project,
  }
} 