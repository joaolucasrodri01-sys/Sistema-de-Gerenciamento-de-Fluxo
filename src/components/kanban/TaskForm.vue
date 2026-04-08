<script setup lang="ts">
import { ref, watch } from 'vue'
import { useKanbanStore } from '../../stores/kanban'
import type { Priority } from '../../types'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])
const store = useKanbanStore()

const title = ref('')
const description = ref('')
const priority = ref<Priority>('medium')
const dueDate = ref('')

// Preenche os campos quando entra em modo de edição
watch(() => store.taskToEdit, (task) => {
  if (task) {
    title.value = task.title
    description.value = task.description
    priority.value = task.priority
    dueDate.value = task.dueDate || ''
  }
}, { immediate: true })

const resetAndClose = () => {
  title.value = ''
  description.value = ''
  priority.value = 'medium'
  dueDate.value = ''
  store.taskToEdit = null
  emit('close')
}

const handleSubmit = () => {
  if (!title.value.trim()) return

  if (store.taskToEdit) {
    // EDIÇÃO: Mantemos o ID e Status originais
    store.updateTask({
      ...store.taskToEdit, 
      title: title.value,
      description: description.value,
      priority: priority.value,
      dueDate: dueDate.value
    })
  } else {
    // CRIAÇÃO: Nova tarefa
    store.addTask({
      id: crypto.randomUUID(),
      title: title.value,
      description: description.value,
      status: 'todo',
      priority: priority.value,
      createdAt: new Date().toISOString(),
      dueDate: dueDate.value
    })
  }

  resetAndClose()
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
    <div class="bg-slate-900 border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
      <h2 class="text-2xl font-black text-white mb-6 uppercase tracking-tight italic">
        {{ store.taskToEdit ? 'Editar Tarefa' : 'Nova Tarefa' }}
      </h2>
      
      <div class="space-y-4">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-500 uppercase ml-1">Título</label>
          <input v-model="title" type="text" class="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 text-white outline-none focus:ring-2 focus:ring-indigo-500">
        </div>

        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-500 uppercase ml-1">Descrição</label>
          <textarea v-model="description" class="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 text-white h-28 resize-none outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-slate-500 uppercase ml-1">Prioridade</label>
            <select v-model="priority" class="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-bold text-slate-500 uppercase ml-1">Data de Entrega</label>
            <input v-model="dueDate" type="date" class="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-indigo-500 [color-scheme:dark]">
          </div>
        </div>
      </div>

      <div class="flex gap-4 mt-10">
        <button @click="resetAndClose" class="flex-1 py-4 text-slate-500 font-bold hover:text-white transition-all uppercase text-[10px] tracking-widest">Cancelar</button>
        <button @click="handleSubmit" class="flex-1 bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black text-white shadow-lg shadow-indigo-600/20 active:scale-95 transition-all uppercase text-[10px] tracking-widest">
          {{ store.taskToEdit ? 'Salvar Alterações' : 'Criar Agora' }}
        </button>
      </div>
    </div>
  </div>
</template>