<script setup>
defineProps({
  name: String,
  hideOwner: Boolean,
})
</script>

<template>
  <span>
    <carbon-logo-github class="transform translate-y-1px mr-1 opacity-40" />
    <a :href="`https://github.com/${name}`" target="_blank" class="font-mono opacity-60">
      {{ hideOwner ? name.split('/')[1] : name }}
    </a>
  </span>
</template>
