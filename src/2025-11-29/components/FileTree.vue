<script setup lang="ts">
export interface TreeNode {
  name: string
  type: 'file' | 'folder'
  children?: TreeNode[]
  highlight?: boolean
}

interface Props {
  nodes: TreeNode[]
  depth?: number
}

const { depth } = withDefaults(defineProps<Props>(), {
  depth: 0,
})
</script>

<template>
  <TransitionGroup
    name="file-fade"
    tag="div"
    class="font-mono text-12px select-none"
    mode="out-in"
  >
    <div
      v-for="node in nodes"
      :key="node.name"
      class="dark:text-white/60 transition duration-500 rounded-md m-0"
      :class="{
        'dark:bg-blue-300/20': node.highlight,
      }"
    >
      <!-- 資料夾 -->
      <div
        v-if="node.type === 'folder'"
        class="flex items-center py-1 px-2 cursor-pointer transition-colors-150 whitespace-nowrap rounded-md dark:hover:bg-white/10 font-medium"
        :style="{ paddingLeft: `${depth * 24 + 8}px` }"
      >
        <span class="inline-flex items-center justify-center w-4 mr-1.5 text-10px shrink-0">
          <ph-folder-open-duotone />
        </span>
        <span class="overflow-hidden text-ellipsis">{{ node.name }}</span>
      </div>

      <!-- 檔案 -->
      <div
        v-else
        class="flex items-center py-1 px-2 cursor-pointer transition-colors-150 whitespace-nowrap rounded-md dark:hover:bg-white/10"
        :style="{ paddingLeft: `${depth * 24 + 8}px` }"
      >
        <span class="inline-flex items-center justify-center w-4 mr-1.5 text-12px shrink-0">
          <ph-gear-six-duotone v-if="node.name.includes('.config.js') || node.name.includes('.config.ts')" />
          <ph-file-vue-duotone v-else-if="node.name.endsWith('.vue')" />
          <ph-file-ts-duotone v-else-if="node.name.endsWith('.ts')" />
          <ph-file-duotone v-else />
        </span>
        <span class="overflow-hidden text-ellipsis">{{ node.name }}</span>
      </div>

      <!-- 遞迴渲染子節點 -->
      <FileTree
        v-if="node.type === 'folder' && node.children"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
  </TransitionGroup>
</template>

<style scoped>
/* 淡入淡出動畫 */
.file-fade-enter-active,
.file-fade-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.file-fade-enter-from {
  opacity: 0;
  max-height: 0;
  transform: scale(0);
  transform-origin: top;
}

.file-fade-enter-to {
  opacity: 1;
  max-height: 200px;
  transform: scale(1);
}

.file-fade-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: scale(1);
}

.file-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scale(0);
  transform-origin: center;
}

/* 移動動畫（當項目位置改變時） */
.file-fade-move {
  transition: transform 0.5s ease;
}
</style>
