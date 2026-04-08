import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Task } from '../types'

export const useKanbanStore = defineStore('kanban', () => {
  // Persistência automática no localStorage
  const tasks = useStorage<Task[]>('agilesync-tasks', [])
  
  const searchQuery = ref('')
  const taskToEdit = ref<Task | null>(null)

  const filteredTasks = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return tasks.value
    return tasks.value.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    )
  })

  const stats = computed(() => {
    const total = tasks.value.length
    const done = tasks.value.filter(t => t.status === 'done').length
    const progress = total > 0 ? Math.round((done / total) * 100) : 0
    return { total, done, progress }
  })

  function addTask(task: Task) {
    tasks.value = [task, ...tasks.value]
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex(t => t.id === updatedTask.id)
    if (index !== -1) {
      // Criamos uma nova cópia do array para disparar a reatividade do useStorage
      const updatedArray = [...tasks.value]
      updatedArray[index] = { ...updatedTask }
      tasks.value = updatedArray
    }
    taskToEdit.value = null
  }

  function moveTask(taskId: string, newStatus: Task['status']) {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) {
      task.status = newStatus
      // Força o salvamento ao mover
      tasks.value = [...tasks.value]
    }
  }

  function deleteTask(taskId: string) {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }

  return { 
    tasks, searchQuery, taskToEdit, filteredTasks, stats,
    addTask, updateTask, moveTask, deleteTask 
  }
})