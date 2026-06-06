<template>
  <svg width="100%" viewBox="0 50 680 470" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="csr-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
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
      <line :x1="arrow.x1" :y1="arrow.y" :x2="arrow.x2" :y2="arrow.y" stroke="white" stroke-width="1.2" marker-end="url(#csr-arrow)" />
    </g>

    <!-- 空白頁面 box -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 3 ? 1 : 0 }">
      <rect x="40" y="216" width="140" height="44" rx="6" stroke-width="0.5" fill="#F1EFE8" stroke="#5F5E5A" />
      <foreignObject x="40" y="216" width="140" height="44">
        <div class="h-full flex flex-col items-center justify-center">
          <span class="font-sans text-sm font-medium text-[#444441]">空白頁面</span>
          <span class="font-sans text-xs opacity-70 text-[#5F5E5A]">等待 JS 載入</span>
        </div>
      </foreignObject>
    </g>

    <!-- ③ 下載 JS bundle (request) -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 4 ? 1 : 0 }">
      <text class="font-sans text-xs" x="225" y="285" text-anchor="middle" fill="white">③ 下載 JS bundle</text>
      <line x1="116" y1="295" x2="334" y2="295" stroke="white" stroke-width="1.2" marker-end="url(#csr-arrow)" />
    </g>

    <!-- ④ JS 執行 (response + 執行) -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 5 ? 1 : 0 }">
      <line x1="334" y1="315" x2="116" y2="315" stroke="white" stroke-width="1.2" marker-end="url(#csr-arrow)" />
      <text class="font-sans text-xs" x="225" y="330" text-anchor="middle" fill="white">④ JS 執行，初始化框架</text>
    </g>

    <!-- 渲染 UI box -->
    <g class="transition-opacity duration-300" :style="{ opacity: $clicks >= base + 8 ? 1 : 0 }">
      <rect x="40" y="430" width="140" height="44" rx="6" stroke-width="0.5" fill="#E6F1FB" stroke="#185FA5" />
      <foreignObject x="40" y="430" width="140" height="44">
        <div class="h-full flex flex-col items-center justify-center">
          <span class="font-sans text-sm font-medium text-[#0C447C]">Render HTML</span>
          <!-- <span class="font-sans text-xs opacity-70 text-[#185FA5]">FCP + TTI 同時發生</span> -->
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
  { title: 'CDN / Server', subtitle: '靜態資源伺服器', x: 270, bg: '#FAEEDA', border: '#854F0B', text: '#633806', textSub: '#555' },
  { title: 'API Server', subtitle: '資料 API', x: 500, bg: '#E1F5EE', border: '#0F6E56', text: '#085041', textSub: '#555' },
]

const arrows = [
  { label: '① 請求 HTML 頁面', labelX: 225, y: 158, x1: 116, x2: 334, click: 1 },
  { label: '② 回傳空殼 HTML', labelX: 225, y: 198, x1: 334, x2: 116, click: 2 },
  { label: '⑤ 發送 API 請求', labelX: 455, y: 370, x1: 116, x2: 564, click: 6 },
  { label: '⑥ 回傳 JSON 資料', labelX: 455, y: 410, x1: 564, x2: 116, click: 7 },
]
</script>
