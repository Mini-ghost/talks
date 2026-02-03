<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

interface CacheItem {
  key: string
  timestamp: number
  isNew?: boolean
  isUpdated?: boolean
}

const props = withDefaults(defineProps<{
  clicks?: number
}>(), {
  clicks: 0
})

const { $clicks } = useSlideContext()
const MAX_STEPS = 8

// Define cache state for each step
const steps: (CacheItem | null)[][] = [
  // Step 0: Empty cache
  [null, null, null, null],
  // Step 1: A(0)
  [{ key: 'A', timestamp: 0, isNew: true }, null, null, null],
  // Step 2: A(0), B(1)
  [{ key: 'A', timestamp: 0 }, { key: 'B', timestamp: 1, isNew: true }, null, null],
  // Step 3: A(0), B(1), C(2)
  [{ key: 'A', timestamp: 0 }, { key: 'B', timestamp: 1 }, { key: 'C', timestamp: 2, isNew: true }, null],
  // Step 4: A(0), B(1), C(2), D(3)
  [{ key: 'A', timestamp: 0 }, { key: 'B', timestamp: 1 }, { key: 'C', timestamp: 2 }, { key: 'D', timestamp: 3, isNew: true }],
  // Step 5: E(4), B(1), C(2), D(3) - A evicted, E added
  [{ key: 'E', timestamp: 4, isNew: true }, { key: 'B', timestamp: 1 }, { key: 'C', timestamp: 2 }, { key: 'D', timestamp: 3 }],
  // Step 6: E(4), B(1), C(2), D(5) - D accessed
  [{ key: 'E', timestamp: 4 }, { key: 'B', timestamp: 1 }, { key: 'C', timestamp: 2 }, { key: 'D', timestamp: 5, isUpdated: true }],
  // Step 7: E(4), F(6), C(2), D(5) - B evicted, F added
  [{ key: 'E', timestamp: 4 }, { key: 'F', timestamp: 6, isNew: true }, { key: 'C', timestamp: 2 }, { key: 'D', timestamp: 5 }],
]

const step = computed(() => {
  const relativeClick = $clicks.value - props.clicks
  return Math.min(Math.max(relativeClick, 0), MAX_STEPS - 1)
})
const currentCache = computed(() => steps[step.value])

const stepDescriptions = [
  'Empty cache',
  'Add A',
  'Add B',
  'Add C',
  'Add D (cache full)',
  'Add E (evict A, LRU=0)',
  'Access D (update timestamp)',
  'Add F (evict B, LRU=1)',
]
</script>

<template>
  <div class="flex flex-col w-fit gap-6 p-8">
    <div class="flex gap-2 p-4 bg-white/5 border border-white/10 rounded-xl">
      <div
        v-for="(item, index) in currentCache"
        :key="index"
        class="cache-slot relative w-22 h-17 flex flex-col items-center justify-center gap-1 rounded-lg bg-white/8 border border-white/15 font-mono transition-all duration-400"
        :class="{
          'bg-white/3 border-dashed border-white/10': !item,
          'is-new': item?.isNew,
          'is-updated': item?.isUpdated,
        }"
      >
        <span class="absolute top-1 left-1.5 text-2.5 text-white/35 font-500">{{ index }}</span>
        <template v-if="item">
          <span class="key text-5 font-600 text-white/90 leading-none">{{ item.key }}</span>
          <span class="timestamp text-xs text-white/50">t={{ item.timestamp }}</span>
        </template>
      </div>
    </div>

    <div class="text-sm text-white/70 px-4 py-2 bg-white/5 rounded-md border border-white/10">
      Step {{ step + 1 }}：<strong>{{ stepDescriptions[step] }}</strong>
    </div>
  </div>
</template>

<style scoped>
/* 狀態樣式 - 需要 box-shadow glow 和動畫 */
.cache-slot.is-new {
  background: rgba(66, 211, 146, 0.15);
  border-color: rgba(66, 211, 146, 0.4);
  box-shadow: 0 0 20px rgba(66, 211, 146, 0.2);
  animation: pulse-green 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.cache-slot.is-new .key {
  color: #42d392;
}

.cache-slot.is-updated {
  background: rgba(251, 191, 36, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.2);
  animation: pulse-amber 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.cache-slot.is-updated .timestamp {
  color: #fbbf24;
  font-weight: 600;
}

@keyframes pulse-green {
  0% { transform: scale(1.08); box-shadow: 0 0 30px rgba(66, 211, 146, 0.4); }
  100% { transform: scale(1); box-shadow: 0 0 20px rgba(66, 211, 146, 0.2); }
}

@keyframes pulse-amber {
  0% { transform: scale(1.05); box-shadow: 0 0 30px rgba(251, 191, 36, 0.4); }
  100% { transform: scale(1); box-shadow: 0 0 20px rgba(251, 191, 36, 0.2); }
}
</style>
