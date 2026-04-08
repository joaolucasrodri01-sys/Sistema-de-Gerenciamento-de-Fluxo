<script setup lang="ts">
import draggable from 'vuedraggable'
import { useKanbanStore } from '../../stores/kanban'
import KanbanCard from './KanbanCard.vue'

const kanban = useKanbanStore()

const columns = [
  { id: 'todo', title: 'A Fazer', color: 'border-t-slate-500' },
  { id: 'doing', title: 'Fazendo', color: 'border-t-indigo-500' },
  { id: 'done', title: 'Concluído', color: 'border-t-emerald-500' }
] as const

const onDragChange = (event: any, newStatus: 'todo' | 'doing' | 'done') => {
  if (event.added) {
    kanban.moveTask(event.added.element.id, newStatus)
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div v-for="col in columns" :key="col.id" 
      class="bg-slate-900/40 rounded-[2rem] p-6 min-h-[70vh] border border-slate-800 flex flex-col border-t-4"
      :class="col.color"
    >
      <div class="flex justify-between items-center mb-8 px-2">
        <h2 class="text-sm font-black text-slate-400 uppercase tracking-widest">{{ col.title }}</h2>
        <span class="bg-slate-800 text-indigo-400 text-xs font-bold px-3 py-1 rounded-lg border border-slate-700">
          {{ kanban.filteredTasks.filter(t => t.status === col.id).length }}
        </span>
      </div>

      <draggable
        :list="kanban.filteredTasks.filter(t => t.status === col.id)"
        group="tasks"
        item-key="id"
        class="flex-1 space-y-4"
        ghost-class="opacity-10"
        @change="(e: any) => onDragChange(e, col.id)"
      >
        <template #item="{ element }">
          <div class="cursor-grab active:cursor-grabbing transition-transform">
            <KanbanCard :task="element" />
          </div>
        </template>
        
        <template #header v-if="kanban.filteredTasks.filter(t => t.status === col.id).length === 0">
           <div class="border-2 border-dashed border-slate-800/50 rounded-3xl h-32 flex items-center justify-center opacity-30">
             <span class="text-[10px] font-bold uppercase tracking-tighter">Solte aqui</span>
           </div>
        </template>
      </draggable>
    </div>
  </div>
</template>