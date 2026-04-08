<script setup lang="ts">
import { useKanbanStore } from '../../stores/kanban'
const store = useKanbanStore()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-slate-900/50 border border-slate-800 p-5 rounded-3xl col-span-1 md:col-span-2">
      <div class="flex justify-between items-end mb-4">
        <div>
          <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Progresso Total</p>
          <h3 class="text-3xl font-black text-white">{{ store.stats.progress }}%</h3>
        </div>
        <p class="text-xs text-slate-400 pb-1">{{ store.stats.done }} de {{ store.stats.total }} tarefas</p>
      </div>
      <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-1000 ease-out"
          :style="{ width: `${store.stats.progress}%` }"
        ></div>
      </div>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 p-5 rounded-3xl flex flex-col justify-center">
      <p class="text-[10px] font-bold text-amber-500 uppercase">Em Execução</p>
      <h3 class="text-2xl font-black text-white">{{ store.stats.doing }}</h3>
    </div>

    <div class="bg-slate-900/50 border border-slate-800 p-5 rounded-3xl flex flex-col justify-center">
      <p class="text-[10px] font-bold text-emerald-500 uppercase">Concluídas</p>
      <h3 class="text-2xl font-black text-white">{{ store.stats.done }}</h3>
    </div>
  </div>
</template>