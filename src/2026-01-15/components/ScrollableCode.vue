<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps<{
  // 指定 click 對應的行號，例如 [1, 8, 35] 表示 click 0 → 行 1, click 1 → 行 8, click 2 → 行 35
  scrollToLine?: number[]
  // 最大高度，預設 400px
  maxHeight?: string
}>()

const maxHeight = props.maxHeight ?? '400px'

const { $clicks } = useSlideContext()
const container = ref<HTMLDivElement>()

function scrollToTarget(click: number, smooth = true) {
  const targetLine = props.scrollToLine?.[click]
  if (targetLine != null && container.value) {
    const targetElement = container.value.querySelector(
      `.line:nth-child(${targetLine})`
    ) as HTMLElement | null

    if (targetElement) {
      container.value.scrollTo({
        top: targetElement.offsetTop - 10,
        behavior: smooth ? 'smooth' : 'instant'
      })
    }
  }
}

// 初始載入時滾動到正確位置（不用動畫）
onMounted(() => {
  scrollToTarget($clicks.value, false)
})

// 後續點擊時滾動（有動畫）
watch($clicks, (click) => {
  scrollToTarget(click, true)
})
</script>

<template>
  <div
    ref="container"
    class="rounded overflow-y-auto [&_.slidev-code-wrapper]:!m-0"
    :style="{ maxHeight: maxHeight }"
  >
    <slot />
  </div>
</template>
