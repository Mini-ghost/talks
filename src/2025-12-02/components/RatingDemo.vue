<script setup lang="ts">
import { shallowRef } from 'vue';
import Rating from './Rating.vue'

const star = shallowRef(3)
</script>

<template>
  <div class="flex items-center mt-1 space-x-2">
    <ph-arrow-bend-down-right-duotone class="opacity-60" />
    <Rating v-model="star" name="rating" />
  </div>
</template>