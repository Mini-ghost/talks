<script setup lang="ts">
import type { DataItem } from 'slidev-addon-graph'

const items: DataItem[] = [
  // 主流程
  {
    name: 'scan',
    display: '掃描資料夾 (scanPages)',
    color: '#3b82f6',
    to: ['add'],
    clicks: 1
  },
  {
    name: 'add',
    display: '添加頁面到路由樹 (addPage)',
    color: '#3b82f6',
    to: ['write'],
    clicks: 2
  },
  {
    name: 'write',
    display: '收集 metadata (writeRouteInfoToNode)',
    color: '#3b82f6',
    to: ['extract', 'getRoute'],
    clicks: 3
  },

  // 分支流程（紫色標示）
  {
    name: 'extract',
    display: '擷取 definePage 裡面的設定\n(extractDefinePageInfo)',
    color: '#9b59b6',
    to: ['gen'],
    clicks: 4
  },
  {
    name: 'getRoute',
    display: '擷取 <route> block\n(getRouteBlock)',
    color: '#9b59b6',
    to: ['gen'],
    clicks: 4
  },

  // 匯聚與結束
  {
    name: 'gen',
    display: '生成虛擬模組和 Type 定義',
    color: '#f39c12',
    to: ['transform'],
    clicks: 5
  },
  {
    name: 'transform',
    display: '打包時移除 definePage (definePageTransform)',
    color: '#27ae60',
    clicks: 6
  },
]
</script>

<template>
  <SlidevGraph id="unplugin-vue-router" :items="items" />
</template>