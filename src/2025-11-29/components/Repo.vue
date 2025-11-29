<script setup>
defineProps({
  name: String,
  hideOwner: Boolean,
})
</script>

<template>
  <a :href="`https://github.com/${name}`" target="_blank" class="font-mono opacity-80 border-none space-x-1">
    <carbon-logo-github class="translate-y-1px dark:opacity-60" />
    <span>{{ hideOwner ? name.split('/')[1] : name }}</span>
  </a>
</template>
