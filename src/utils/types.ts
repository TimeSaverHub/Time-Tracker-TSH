export interface TimeEntry {
    id: string
    startTime: Date
    endTime: Date | null
    description: string
    hourlyRate: number
    currency: string
    userId: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface User {
    id: string
    email: string
    name: string | null
    role: 'user' | 'admin'
    createdAt: Date
    settings: UserSettings
  }
  
  export interface UserSettings {
    defaultHourlyRate: number
    defaultCurrency: string
    language: 'en' | 'nl'
  }
  
  export interface AuthContextType {
    user: User | null
    loading: boolean
    error: Error | null
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, name: string) => Promise<void>
    signOut: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
  }
  
  