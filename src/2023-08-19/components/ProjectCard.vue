<script setup lang="ts">
defineProps<{
  title: string
  description: string
  image: string
}>()
</script>

<template>
  <div class="w-full p-3 mt-2 border border-white/30 bg-white/10 rounded-lg">
    <div class="flex gap-3">
      <div class="grow space-y-3">
        <div class="text-xl font-bold">
          {{ title }}
        </div>
        <div class="text-sm">
          {{ description }}
        </div>
      </div>
      <div class="flex items-center justify-center shrink-0 w-18 h-18 p-1 bg-white rounded-lg">
        <img :src="image" :alt="description" width="120" class="w-full">
      </div>
    </div>
  </div>
</template>
