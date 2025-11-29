<script setup>
defineProps({
  name: String,
})
</script>

<template>
  <a :href="`https://www.npmjs.com/package/${name}`" target="_blank" class="font-mono dark:text-red light:text-[#a00] !hover:text-red-800 opacity-80 border-none space-x-1">
    <ri-npmjs-line class="translate-y-1px dark:opacity-60" />
    <span>{{ hideOwner ? name.split('/')[1] : name }}</span>
  </a>
</template>
