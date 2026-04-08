<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue'

defineProps<{
  show: boolean
  title: string
}>()

const emit = defineEmits(['close'])

// Fechar ao apertar ESC (detalhe de senioridade em UX)
const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', handleEsc))
onUnmounted(() => window.removeEventListener('keydown', handleEsc))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" @click="emit('close')"></div>
      
      <div class="relative bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-white">{{ title }}</h3>
          <button @click="emit('close')" class="text-slate-400 hover:text-white transition">
            <X :size="20" />
          </button>
        </div>
        
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>