<template>
  <svg width="100%" viewBox="0 50 680 510" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="ci-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </marker>
    </defs>

    <!-- Rows -->
    <g v-for="(row, i) in rows" :key="row.y" class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + i ? 1 : 0 }">
      <!-- Step (left) -->
      <rect x="40" :y="row.y" width="200" height="56" rx="8" stroke-width="0.5"
        :fill="colors[row.step.color].bg" :stroke="colors[row.step.color].stroke" />
      <foreignObject x="40" :y="row.y" width="200" height="56">
        <div class="h-full flex items-center justify-center">
          <span class="font-sans text-sm font-medium" :style="{ color: colors[row.step.color].title }">{{ row.step.title }}</span>
        </div>
      </foreignObject>

      <!-- Action (middle) -->
      <rect x="270" :y="row.y" width="220" height="56" rx="8" stroke-width="0.5"
        :fill="colors.action.bg" :stroke="colors.action.stroke" />
      <foreignObject x="270" :y="row.y" width="220" height="56">
        <div class="h-full flex items-center justify-center">
          <span class="font-sans text-sm font-medium" :style="{ color: colors.action.title }">{{ row.action.title }}</span>
        </div>
      </foreignObject>

      <!-- Current instance (right) -->
      <rect x="520" :y="row.y" width="120" height="56" rx="8" stroke-width="0.5"
        :fill="colors[row.current.color].bg" :stroke="colors[row.current.color].stroke" />
      <foreignObject x="520" :y="row.y" width="120" height="56">
        <div class="h-full flex items-center justify-center">
          <span class="font-sans text-sm font-medium" :style="{ color: colors[row.current.color].title }">{{ row.current.label }}</span>
        </div>
      </foreignObject>
    </g>

    <!-- Connector arrows -->
    <line v-for="(y, i) in arrowYs" :key="y" class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + i + 1 ? 1 : 0 }"
      x1="140" :y1="y" x2="140" :y2="y + 30"
      stroke="#73726C" stroke-width="1.5" marker-end="url(#ci-arrow)" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ clicks?: number }>()
const { $clicks } = useSlideContext()
const base = computed(() => props.clicks ?? 0)

type ColorKey = 'parent' | 'sibling1' | 'sibling2' | 'action'

const colors: Record<ColorKey, { bg: string; stroke: string; title: string; sub: string }> = {
  parent: { bg: '#EEEDFE', stroke: '#534AB7', title: '#3C3489', sub: '#534AB7' },
  sibling1: { bg: '#E1F5EE', stroke: '#0F6E56', title: '#085041', sub: '#0F6E56' },
  sibling2: { bg: '#FAEEDA', stroke: '#854F0B', title: '#633806', sub: '#854F0B' },
  action: { bg: '#F1EFE8', stroke: '#5F5E5A', title: '#444441', sub: '#5F5E5A' },
}

interface Row {
  y: number
  step: { color: ColorKey; title: string }
  action: { title: string }
  current: { color: ColorKey; label: string }
}

const rows: Row[] = [
  {
    y: 60,
    step: { color: 'parent', title: '1. Parent setup() 開始' },
    action: { title: 'setCurrentInstance(Parent)' },
    current: { color: 'parent', label: 'Parent' },
  },
  {
    y: 146,
    step: { color: 'sibling1', title: '2. Sibling1 setup() 開始' },
    action: { title: 'setCurrentInstance(Sibling1)' },
    current: { color: 'sibling1', label: 'Sibling1' },
  },
  {
    y: 232,
    step: { color: 'sibling1', title: '3. Sibling1 setup() 結束' },
    action: { title: 'unsetCurrentInstance()' },
    current: { color: 'parent', label: 'Parent' },
  },
  {
    y: 318,
    step: { color: 'sibling2', title: '4. Sibling2 setup() 開始' },
    action: { title: 'setCurrentInstance(Sibling2)' },
    current: { color: 'sibling2', label: 'Sibling2' },
  },
  {
    y: 404,
    step: { color: 'sibling2', title: '5. Sibling2 setup() 結束' },
    action: { title: 'unsetCurrentInstance()' },
    current: { color: 'parent', label: 'Parent' },
  },
  {
    y: 490,
    step: { color: 'parent', title: '6. Parent setup() 結束' },
    action: { title: 'unsetCurrentInstance()' },
    current: { color: 'action', label: 'null' },
  },
]

const arrowYs = rows.slice(0, -1).map(r => r.y + 56)
</script>
