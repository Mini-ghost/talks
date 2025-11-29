<script setup lang="ts">
defineProps<{
  orbit?: boolean
}>()
</script>

<template>
  <div class="absolute size-30 grid place-content-center">
    <img src="https://vite.dev/logo.svg" class="size-30">

    <Transition name="fade">
      <div v-if="orbit" class="orbit-wrapper">
        <!-- 軌道 -->
        <div class="orbit-track orbit-track--vue"></div>
        <div class="orbit-track orbit-track--react"></div>
        <div class="orbit-track orbit-track--svelte"></div>
        <div class="orbit-track orbit-track--angular"></div>

        <!-- Vue - 最內圈 -->
        <div class="orbit-container orbit-container--vue">
          <devicon-vuejs class="orbit-item animation-icon__vue" />
        </div>

        <!-- React - 第二圈 -->
        <div class="orbit-container orbit-container--react">
          <devicon-react class="orbit-item animation-icon__react" />
        </div>

        <!-- Svelte - 第三圈 -->
        <div class="orbit-container orbit-container--svelte">
          <devicon-svelte class="orbit-item animation-icon__svelte" />
        </div>

        <!-- Angular - 最外圈 -->
        <div class="orbit-container orbit-container--angular">
          <devicon-angularjs class="orbit-item animation-icon__angular" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.orbit-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.orbit-track {
  position: absolute;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.orbit-track--vue { width: 160%; height: 160%; }
.orbit-track--react { width: 200%; height: 200%; }
.orbit-track--svelte { width: 240%; height: 240%; }
.orbit-track--angular { width: 280%; height: 280%; }

.orbit-container {
  position: absolute;
  animation: rotate 20s linear infinite;
}

.orbit-container--vue { width: 160%; height: 160%; animation-delay: 0s; }
.orbit-container--react { width: 200%; height: 200%; animation-delay: -4s; }
.orbit-container--svelte { width: 240%; height: 240%; animation-delay: -9s; }
.orbit-container--angular { width: 280%; height: 280%; animation-delay: -14s; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbit-item {
  position: absolute;
  font-size: 1.8em;
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards, counterRotate 20s linear infinite;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes counterRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(-360deg); }
}

.animation-icon__vue {
  top: 0;
  left: 50%;
  animation-delay: 0.3s, 0s;
}

.animation-icon__react {
  top: 0;
  left: 50%;
  animation-delay: 0.6s, -4s;
}

.animation-icon__svelte {
  top: 0;
  left: 50%;
  animation-delay: 0.9s, -9s;
}

.animation-icon__angular {
  top: 0;
  left: 50%;
  animation-delay: 1.2s, -14s;
}
</style>
