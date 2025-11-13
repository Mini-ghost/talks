<script setup lang="ts">
import type { DataItem } from 'slidev-addon-graph'

const items: DataItem[] = [
  // 左欄：新子節點（逐步顯示，每一列對應右邊三個）
  { name: 'new-none',  display: '沒有子節點',  color: '#5b8def', to: ['old-none-1','old-text-1','old-group-1'], clicks: 1 },
  { name: 'new-text',  display: '文本子節點',  color: '#5b8def', to: ['old-none-2','old-text-2','old-group-2'], clicks: 5 },
  { name: 'new-group', display: '一組子節點',  color: '#5b8def', to: ['old-none-3','old-text-3','old-group-3'], clicks: 9 },

  // 右欄第 1 組（常駐）
  { name: 'old-none-1',  display: '沒有子節點',  color: '#333', clicks: 2 },
  { name: 'old-text-1',  display: '文本子節點',  color: '#333', clicks: 3 },
  { name: 'old-group-1', display: '一組子節點',  color: '#333', clicks: 4 },

  // 右欄第 2 組（常駐）
  { name: 'old-none-2',  display: '沒有子節點',  color: '#333', clicks: 6 },
  { name: 'old-text-2',  display: '文本子節點',  color: '#333', clicks: 7 },
  { name: 'old-group-2', display: '一組子節點',  color: '#333', clicks: 8 },

  // 右欄第 3 組（常駐）
  { name: 'old-none-3',  display: '沒有子節點',  color: '#333', clicks: 10 },
  { name: 'old-text-3',  display: '文本子節點',  color: '#333', clicks: 11 },
  { name: 'old-group-3', display: '一組子節點',  color: '#333', clicks: 12 },
]
</script>

<template>
  <SlidevGraph
    id="vnode-patch-flow"
    :items="items"
  />
</template>
