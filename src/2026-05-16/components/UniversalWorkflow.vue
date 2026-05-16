<template>
  <svg width="100%" viewBox="0 50 680 470" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="ur-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </marker>
    </defs>

    <!-- Base: Column headers + dashed lines -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base ? 1 : 0 }">
      <g v-for="col in columns" :key="col.title">
        <rect :x="col.x" y="60" width="140" height="56" rx="8" stroke-width="0.5" :fill="col.bg" :stroke="col.border" />
        <foreignObject :x="col.x" y="60" width="140" height="56">
          <div class="h-full flex flex-col items-center justify-center">
            <span class="font-sans text-sm font-medium" :style="{ color: col.text }">{{ col.title }}</span>
            <span class="font-sans text-xs mt-0.5 opacity-70" :style="{ color: col.textSub }">{{ col.subtitle }}</span>
          </div>
        </foreignObject>
      </g>
      <line v-for="cx in [110, 340, 570]" :key="cx" :x1="cx" y1="116" :x2="cx" y2="490" stroke="#ccc" stroke-width="1" stroke-dasharray="4 4" />
    </g>

    <!-- Arrows -->
    <g v-for="arrow in arrows" :key="arrow.label" class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + arrow.click ? 1 : 0 }">
      <text class="font-sans text-xs" :x="arrow.labelX" :y="arrow.y - 10" text-anchor="middle" fill="white">{{ arrow.label }}</text>
      <line :x1="arrow.x1" :y1="arrow.y" :x2="arrow.x2" :y2="arrow.y" stroke="white" stroke-width="1.2" marker-end="url(#ur-arrow)" />
    </g>

    <!-- Render HTML box -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 4 ? 1 : 0 }">
      <rect x="268" y="268" width="144" height="44" rx="6" stroke-width="0.5" fill="#EEEDFE" stroke="#534AB7" />
      <foreignObject x="268" y="268" width="144" height="44">
        <div class="h-full flex flex-col items-center justify-center">
          <span class="font-sans text-sm font-medium text-[#3C3489]">Render HTML</span>
          <span class="font-sans text-xs opacity-70 text-[#534AB7]">伺服器端渲染完整頁面</span>
        </div>
      </foreignObject>
    </g>

    <!-- 顯示內容 box -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 6 ? 1 : 0 }">
      <rect x="40" y="368" width="140" height="44" rx="6" stroke-width="0.5" fill="#E6F1FB" stroke="#185FA5" />
      <foreignObject x="40" y="368" width="140" height="44">
        <div class="h-full flex flex-col items-center justify-center">
          <span class="font-sans text-sm font-medium text-[#0C447C]">顯示內容</span>
          <!-- <span class="font-sans text-xs opacity-70 text-[#185FA5]">First Contentful Paint</span> -->
        </div>
      </foreignObject>
    </g>

    <!-- 可互動 box -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 8 ? 1 : 0 }">
      <rect x="40" y="465" width="140" height="38" rx="6" stroke-width="0.5" fill="#E6F1FB" stroke="#185FA5" />
      <foreignObject x="40" y="465" width="140" height="38">
        <div class="h-full flex items-center justify-center">
          <span class="font-sans text-sm font-medium text-[#0C447C]">可互動</span>
        </div>
      </foreignObject>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{ clicks?: number }>()
const { $clicks } = useSlideContext()
const base = computed(() => props.clicks ?? 0)

const columns = [
  { title: 'Browser', subtitle: '使用者端', x: 40, bg: '#E6F1FB', border: '#185FA5', text: '#0C447C', textSub: '#555' },
  { title: 'Server', subtitle: '應用程式伺服器', x: 270, bg: '#EEEDFE', border: '#534AB7', text: '#3C3489', textSub: '#555' },
  { title: 'Data source', subtitle: '資料庫 / API', x: 500, bg: '#E1F5EE', border: '#0F6E56', text: '#085041', textSub: '#555' },
]

const arrows = [
  { label: '① 請求 HTML 頁面', labelX: 225, y: 158, x1: 116, x2: 334, click: 1 },
  { label: '② 查詢資料', labelX: 455, y: 208, x1: 346, x2: 564, click: 2 },
  { label: '③ 回傳資料', labelX: 455, y: 248, x1: 564, x2: 346, click: 3 },
  { label: '④ 回傳完整 HTML', labelX: 225, y: 348, x1: 334, x2: 116, click: 5 },
  { label: '⑤ 載入 JS，Hydration', labelX: 225, y: 448, x1: 334, x2: 116, click: 7 },
]
</script>

