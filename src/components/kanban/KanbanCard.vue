<script setup lang="ts">
import { computed } from 'vue'
import { useKanbanStore } from '../../stores/kanban'
import type { Task } from '../../types'

const props = defineProps<{ task: Task }>()
const store = useKanbanStore()

// Verifica se a data passou (Atrasado)
const isOverdue = computed(() => {
  if (!props.task.dueDate || props.task.status === 'done') return false
  const date = new Date(props.task.dueDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
})

// Verifica se vence hoje
const isToday = computed(() => {
  if (!props.task.dueDate) return false
  const today = new Date().toISOString().split('T')[0]
  return props.task.dueDate === today
})

// Formata a data de YYYY-MM-DD para DD/MM/YYYY
const formattedDate = computed(() => {
  if (!props.task.dueDate) return null
  const [year, month, day] = props.task.dueDate.split('-')
  return `${day}/${month}/${year}`
})
</script>

<template>
  <div 
    class="bg-slate-900/80 border-2 p-5 rounded-[2rem] group transition-all duration-300 relative shadow-lg"
    :class="[
      isOverdue ? 'border-rose-500/40 bg-rose-500/5' : 
      isToday ? 'border-amber-500/40 bg-amber-500/5' : 
      'border-slate-800 hover:border-indigo-500/50'
    ]"
  >
    <div v-if="isOverdue" class="absolute -top-3 left-6 bg-rose-500 text-[8px] font-black text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
      Atrasado
    </div>
    <div v-else-if="isToday" class="absolute -top-3 left-6 bg-amber-500 text-[8px] font-black text-slate-900 px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
      Vence Hoje
    </div>

    <div class="flex justify-between items-start mb-4">
      <span class="text-[9px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-widest" 
        :class="{
          'text-rose-500 border-rose-500/20 bg-rose-500/5': task.priority === 'high',
          'text-amber-500 border-amber-500/20 bg-amber-500/5': task.priority === 'medium',
          'text-emerald-500 border-emerald-500/20 bg-emerald-500/5': task.priority === 'low'
        }">
        {{ task.priority }}
      </span>
      
      <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button @click="store.taskToEdit = task" class="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
        </button>
        <button @click="store.deleteTask(task.id)" class="p-2 text-slate-500 hover:text-rose-500 hover:bg-slate-800 rounded-xl transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    </div>

    <h3 class="font-bold text-slate-100 text-sm mb-1 leading-tight">{{ task.title }}</h3>
    <p v-if="task.description" class="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 italic">{{ task.description }}</p>

    <div class="mt-4 flex items-center justify-between border-t border-slate-800/50 pt-4">
      <div v-if="formattedDate" class="flex items-center text-[10px] font-black uppercase tracking-tighter"
        :class="isOverdue ? 'text-rose-400' : isToday ? 'text-amber-400' : 'text-slate-600'">
        <svg class="mr-1.5" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        {{ formattedDate }}
      </div>
      <div v-else class="text-[9px] text-slate-700 font-bold uppercase tracking-[0.2em]">
        Sem prazo
      </div>
    </div>
  </div>
</template>