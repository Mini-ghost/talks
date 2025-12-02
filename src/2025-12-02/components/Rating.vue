<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: string
  raw?: boolean
}>(), {
  name: 'rating',
})

const value = defineModel<number>()
</script>

<template>
  <span class="inline-flex gap-1">
    <label class="sr-only">
      <input v-model="value" type="radio" :name="props.name" :value="0" />
    </label>
    <label
      v-for="star in 5"
      :key="star"
      class="
        cursor-pointer text-gray-400 transition-colors
        [&:has(input:checked)]:text-yellow-400
        [&:has(~label_input:checked)]:text-yellow-400
        hover:text-yellow-400
        [&:has(~label:hover)]:text-yellow-400
      "
    >
      <input
        v-model="value"
        type="radio"
        :name="name"
        :value="star"
        :class="raw ? '' : 'sr-only'"
      />
      <ph-star-duotone v-if="!raw" class="text-2xl" />
    </label>
  </span>
</template>