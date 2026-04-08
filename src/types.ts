export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'doing' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  createdAt: string
  dueDate?: string 
}