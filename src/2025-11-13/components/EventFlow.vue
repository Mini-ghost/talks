<script setup lang="ts">
import type { DataItem } from 'slidev-addon-graph'

const items: DataItem[] = [
  { name: 's1', display: '點擊 <button> 元素', color: '#f39c12', x: 0, y: -260, to: ['s2'], clicks: 1 },
  { name: 's2', display: '<button> 的事件處理函式執行', color: '#f39c12', x: 0, y: -180, to: ['s3'], clicks: 2 },
  { name: 's3', display: '副作用函式重新執行', color: '#f39c12', x: 0, y: -100, to: ['renderer'], clicks: 3 },

  { name: 'renderer', display: '渲染', color: '#5b8def', shape: 'circle', x: 0, y: -10, to: ['s5'], clicks: 4 },

  { name: 's5', display: '為 <div> 綁定 / 更新事件', color: '#27ae60', x: 0, y: 90, to: ['s6'], clicks: 5 },
  { name: 's6', display: '事件冒泡到 <div>', color: '#27ae60', x: 0, y: 170, to: ['s7'], clicks: 6 },
  { name: 's7', display: '<div> 的事件處理函式執行', color: '#27ae60', x: 0, y: 250, clicks: 7 }
]
</script>

<template>
  <SlidevGraph
    id="event-flow"
    :items="items"
  />
</template>