<script setup lang="ts">
import { useNav } from '@slidev/client'
import { ref, watch } from 'vue'

const { currentSlideRoute } = useNav()

const top = ref(0)
const left = ref(0)

function random (base: number) {
  return Math.random() * base
}

watch(
  currentSlideRoute,
  () => {
    top.value = random(100)
    left.value = random(100)
  }, 
  {
    immediate: true
  }
)
</script>

<template>
  <span
    class="absolute transition-all duration-300 size-[600px] -translate-1/2 blur-[120px] pointer-events-none bg-gradient-to-l from-[#00DC82]/80 to-white/10 dark:opacity-60 rounded-full -z-1"
    :style="{ top: `${top}%`, left: `${left}%` }"  
  />
  <span
    class="absolute transition-all duration-300 size-[600px] -translate-1/2 blur-[120px] pointer-events-none bg-gradient-to-t from-amber-400/80 to-white/10 dark:opacity-60 rounded-full -z-1"
    :style="{ top: `${100 - top}%`, left: `${100 - left}%` }"  
  />
</template>
