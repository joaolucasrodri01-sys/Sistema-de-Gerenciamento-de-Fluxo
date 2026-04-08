<script setup lang="ts">
import { ref, watch } from 'vue'
import { useKanbanStore } from './stores/kanban'
import KanbanBoard from './components/kanban/KanbanBoard.vue'
import TaskForm from './components/kanban/TaskForm.vue'
import KanbanStats from './components/kanban/KanbanStats.vue'

const store = useKanbanStore()
const showModal = ref(false)


watch(() => store.taskToEdit, (task) => {
  if (task) {
    showModal.value = true
  }
})


const handleCloseModal = () => {
  showModal.value = false
  store.taskToEdit = null
}
</script>

<template>
  <div class="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
    <div class="max-w-7xl mx-auto">
      
      <header class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <h1 class="text-4xl font-black text-white tracking-tighter uppercase italic">
              Sistema de Gerenciamento de Fluxo<span class="text-indigo-500 not-italic font-light"></span>
            </h1>
          </div>
          <p class="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] ml-1">
            Visual Task Management System
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4">
          <div class="relative group w-full sm:w-80">
            <input 
              v-model="store.searchQuery"
              type="text" 
              placeholder="Pesquisar em tarefas..." 
              class="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-5 py-3 pl-12 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 shadow-inner"
            >
            <svg class="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>

          <button 
            @click="showModal = true"
            class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-3.5 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 border-t border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            NOVA TAREFA
          </button>
        </div>
      </header>

      <KanbanStats />

      <main class="mt-4">
        <KanbanBoard />
      </main>

      <TaskForm 
        :show="showModal" 
        @close="handleCloseModal" 
      />

      <footer class="mt-24 pb-12 flex flex-col items-center gap-4 border-t border-slate-800/50 pt-10">
        <div class="flex gap-6 text-slate-600 font-bold text-[10px] uppercase tracking-widest">
          <span>v2.4.0 Stable</span>
          <span>•</span>
          <span>Local Storage Enabled</span>
          <span>•</span>
          <span>Drag & Drop Active</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #0f172a;
  color: #f1f5f9;
}


.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>