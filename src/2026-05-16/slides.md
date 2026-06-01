---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
layout: center
class: text-center
glowSeed: 4
title: 從入門到被開除 90% 的前端工程師都寫錯的 SSR | 我從 Server Side Rendering 學到的 N 件事
clicks: 1
---

<div class="grid grid-cols-[1fr_max-content] gap-4 items-center">

  <div class="text-start *:leading-normal!">
    <h1 class="font-500">
      <div>從入門到被開除<br /> 90% 的前端工程師都寫錯的 SSR</div>
    </h1>
    <p>我從 Server Side Rendering 學到的 N 件事</p>
  </div>

  <img src="/cover.png" width="300" height="300" class="rounded-xl" />

</div>

---
layout: intro
class: px-28
---

# Alex Liu {.font-600}

<ul class="flex items-center gap-2 text-xs opacity-60 [&&]:list-none mt-4 text-green [&_li]:bg-green/10 [&_li]:border [&_li]:border-green [&_li]:rounded [&_li]:m-0 [&_li]:px-2">
  <li>#vue</li>
  <li>#nuxt</li>
  <li>#typescript</li>
</ul>


<div class="dark:opacity-80">

  <ul class="text-0.785em leading-normal [&&]:list-none mt-4 [&_li]:m-0 [&_li]:p-0">
    <li>​​iCHEF / 客立樂 資深前端工程師</li>
    <li>​​Nuxt Ecosystem Team 成員</li>
    <li>2024 iThome 鐵人賽 Modern Web 組冠軍</li>
    <li>2025 JSDC 技術講者</li>
    <li>出版：《為你寫的 Vue Components》</li>
  </ul>
</div>

<img src="https://talks.mini-ghost.dev/2023/open-source-adventure/alex-liu.jpeg" load="lazy" width="140" height="140" class="rounded-full w-40 abs-tr mt-30 mr-30" />

<div class="mt-10 flex gap-4">
  <div class="flex items-center space-x-1.5">
    <carbon-user class="dark:opacity-40" />
    <a href="https://mini-ghost.dev/" target="_blank" class="border-none! font-300">mini-ghost.dev</a>
  </div>
  <div class="flex items-center space-x-1.5">
    <ph-threads-logo class="dark:opacity-40" />
    <a href="https://www.threads.com/@minighost.dev" target="_blank" class="border-none! font-300">@minighost.dev</a>
  </div>
  <div class="flex items-center space-x-1.5">
    <ph-github-logo class="dark:opacity-40" />
    <a href="https://github.com/Mini-ghost" target="_blank" class="border-none! font-300">Mini-ghost</a>
  </div>
</div>

---

<div class="grid grid-cols-2 gap-4 pt-6 -mx-6">

<div>

<h2 class="font-600 text-center transition-transform duration-500" :class="{ 'translate-x-5.5em translate-y-6em scale-150': $clicks < 1 }">
  <span relative>
    C<v-click at="2"><div class="absolute -top-1.5em left-0.5em flex gap-1 items-center text-1rem text-amber font-400"><ph-arrow-bend-up-right-duotone/>Client</div></v-click>
  </span>SR
</h2>

<div -mx-6>
  <ClientSideWorkflow mt-6 :clicks="4" />
</div>

</div>

<div>

<h2 class="font-600 text-center transition-transform duration-500" :class="{ '-translate-x-5.5em translate-y-6em scale-150': $clicks < 1 }">
  <span relative>
    S<v-click at="3"><div class="absolute -bottom-1.5em left-0.5em flex gap-1 items-center text-1rem text-green font-400 s"><ph-arrow-bend-down-right-duotone/>Server</div></v-click>
  </span>SR
</h2>

<div -mx-6>
  <UniversalWorkflow mt-6 :clicks="13" />
</div>

</div>

</div>

<span class="absolute top-14.25em left-1/2 -translate-x-1/2 scale-125 transition-opacity" :class="{ 'opacity-0': $clicks >= 1 }">&</span>


<div v-click="22" class="absolute top-55% left-76% flex gap-1 items-center text-0.75rem text-sky font-400 s"><ph-arrow-bend-down-right-duotone/><span class="mt-1.75em ms-1">Vue 必須在<br />Node.js Server 中生成 HTML</span></div>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-amber bg-amber/10 rounded">問題一</span>
</div>

<h2 class="font-500 mt-4">你的元件在 Server-Side Rendering 時偷懶嗎？</h2>

---

<img
  src="/nuxt_issue_10365.png"
  alt="Can't update layout content after component created at server side #10365"
  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5/6 h-auto rounded-t-xl"
  onload="this.style.visibility = 'visible';"
  style="filter:contrast(1.15);visibility:hidden;"
/>

---

## 在 Server 生成 HTML 的結果可能跟你想的不一樣！ {.font-500}

<div class="grid grid-cols-2 gap-4 mt-4">

<div>

<div v-click="1">

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Parent.vue</span>
</div>

```vue {*|*|*|*|*|*|13|14|14|15|*}{at:2}
<script setup lang="ts">
const title = shallowRef('預設標題')

provide('title', {
  title,
  setTitle(value: string) {
    title.value = value
  },
})
</script>

<template>
  <header>Parent: {{ title }}</header>
  <Child />
  <footer>Parent: {{ title }}</footer>
</template>
```

</div>

</div>

<div>

<div v-click="2">

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Child.vue</span>
</div>

```vue {*|*|*|*|*|none|*|7|none|*}{at:3}
<script setup lang="ts">
const { title, setTitle } = inject('title')
setTitle('新的標題')
</script>

<template>
  <div>Child: {{ title }}</div>
</template>
```

</div>


<div v-click="3">

<div>
  <span class="px-1.5 text-xs text-blue bg-blue/10 rounded">結果</span>
</div>

</div>

<div v-click="4">

<div class="relative">

````md magic-move {at:5}
```html
<header>Parent: 新的標題</header>
<div>Child: 新的標題</div>
<footer>Parent: 新的標題</footer>
```

```html
<header>Parent: 新的標題</header>
<div>Child: 新的標題</div>
<footer>Parent: 新的標題</footer>
```

```html

```

```html
<header>Parent: 預設標題</header>
```

```html
<header>Parent: 預設標題</header>
```

```html
<header>Parent: 預設標題</header>
<div>Child: 新的標題</div>
```

```html
<header>Parent: 預設標題</header>
<div>Child: 新的標題</div>
<footer>Parent: 新的標題</footer>
```

````


<div v-click="[5, 6]" class="absolute inset-0 grid place-items-center text-1xl text-red-500 font-600 bg-black/10 backdrop-blur-sm rounded-md duration-300">
  <div class="flex items-center gap-2">
    <ph-warning-circle-duotone />
  </div>
</div>

</div>

</div>

<div v-click="12">
  <div class="flex items-center gap-2 mt-2">
    <div>
      <span class="px-1.5 text-xs text-purple bg-purple/10 rounded">重點</span>
    </div>
    <div flex text-xs font-bold mt-1>在 Server 時，已經生成的 HTML 字串，<div v-click="13">不會隨著資料改變而更新</div></div>
  </div>
</div>

</div>

</div>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Takeaway</span>
</div>

<h2 class="font-500 mt-4">在 Server Side Rendering 時<br />避免從內層修改外層的元件設計</h2>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-amber bg-amber/10 rounded">問題二</span>
</div>

<h2 class="font-500 mt-4">所以我說那個 Instance 呢？</h2>

---

<img
  src="/nuxt_issue_21270.png"
  alt="An error occurs when while asynchronously using useRuntimeConfig() within useAsyncData() #21270"
  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-5/6 h-auto rounded-t-xl"
  onload="this.style.visibility = 'visible';"
  style="filter:contrast(1.15);visibility:hidden;"
/>

---
clicks: 3
---

<div v-click="1" class="transition-all duration-300">

```ts
export async function useUserDetails() {
  const { data: user } = await useAsyncData(() => $fetch('/api/user'))
  const { data: orders } = await useAsyncData(() => $fetch(`/api/orders?userId=${user.value?.id}`))

  return computed(() => ({
    user: user.value,
    orders: orders.value,
  }))
}
```

</div>

<div :class="{ 'translate-y-[-10.3em]': $clicks < 1 }" class="transition-transform duration-800">

````md magic-move {at:2}
```vue
<script setup lang="ts">
const { data: user } = await useAsyncData(() => $fetch('/api/user'))
const { data: orders } = await useAsyncData(() => $fetch(`/api/orders?userId=${user.value?.id}`))

const details = computed(() => ({
  user: user.value,
  orders: orders.value,
}))
</script>
```

```vue
<script setup lang="ts">
const details = await useUserDetails()
</script>
```
````

</div>


<img
  src="/async-with-composable-error.png"
  class="w-full h-auto rounded-t-xl transition-transform duration-500"
  :class="{ 'translate-y-1/2': $clicks < 3 }"
  onload="this.style.visibility = 'visible';"
  style="filter:contrast(1.15);visibility:hidden;"
/>

---

<div class="relative">

## 所以 Instance 去哪了！{.font-500}

<div class="flex items-center absolute -top-7 left-0">
  <span class="px-1.5 text-xs text-gray bg-gray/10 rounded">同步版本</span>
  <ph-arrow-bend-right-down-duotone class="text-xs mt-2" />
</div>

</div>

<div class="grid grid-cols-2 mt-2">

<div>

<div>
  <span class="px-1.5 text-xs text-purple bg-purple/10 rounded">Parent.vue</span>
</div>

```vue {*|*|2|2|3|3|none|*}{at:0}
<template>
  <Sibling1 />
  <Sibling2 />
</template>
```

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Sibling1.vue</span>
</div>

```ts {*|none|*|none|none|none|none|*}{at:0}
export default defineComponent({
  setup() {
    onMounted(() => console.log('Sibling1 onMounted'))
  },
})
```

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Sibling2.vue</span>
</div>

```ts {*|none|none|none|*|none|none|*}{at:0}
export default defineComponent({
  setup() {
    onMounted(() => console.log('Sibling2 onMounted'))
  },
})
```

</div>

<CurrentInstanceSyncWorkflow  mt-4 :clicks="1" />

</div>

---

<div class="relative w-fit">

## 所以 Instance 去哪了！{.font-500.w-fit}

<div class="flex items-center absolute -top-7 left-0">
  <span class="px-1.5 text-xs text-gray bg-gray/10 rounded">非同步版本</span>
  <ph-arrow-bend-right-down-duotone class="text-xs mt-2" />
</div>

</div>

<div class="grid grid-cols-2 mt-4">

<div>

<div>
  <span class="px-1.5 text-xs text-purple bg-purple/10 rounded">Parent.vue</span>
</div>

```vue {*|*|2|2|3|3|none|none|none}{at:0}
<template>
  <AsyncSibling />
  <Sibling />
</template>
```

<div class="gap-1">
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">AsyncSibling.vue</span>
</div>

```ts {*|none|2-5|3|none|none|none|4|4}{at:0}
export default defineComponent({
  async setup() {
    const { data: user } = await useAsyncUser()
    const { data: orders } = await useAsyncOrders(user)
  }
})
```

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Sibling.vue</span>
</div>

```ts {*|none|none|none|*|none|none|none|none}{at:0}
export default defineComponent({
  setup() {
    onMounted(() => console.log('Sibling onMounted'))
  },
})
```


</div>

<div class="relative">
  <CurrentInstanceAsyncWorkflow  :clicks="1" />
  <span v-click="8" class="absolute bottom-8 right-4 text-4xl">
    🤯
  </span>
</div>

</div>

---

## Instance 奪還戰 {.font-500}

<div class="mt-4">

````md magic-move
```ts
export default defineComponent({
  setup() {
    const { data: user } = await useAsyncUser()
    const { data: orders } = await useAsyncOrders(user)
  }
})
```
```ts
import { withAsyncContext } from 'vue'

export default defineComponent({
  async setup() {
    let result, restore

    ([result, restore] = withAsyncContext(() => useAsyncUser()))
    const { data: user } = await result // 遺失 instance
    restore()                           // 還原 instance

    ([result, restore] = withAsyncContext(() => useAsyncOrders(user)))
    const { data: orders } = await result // 遺失 instance
    restore()                             // 還原 instance

    return { user, orders }
  }
})
```
````

<div v-click>
  <div class="grid grid-cols-2">
    <div class="text-center">
      <ph-arrow-down-duotone/> 等效於
    </div>
    <div class="text-center">
      <ph-arrow-up-duotone/> 編譯成
    </div>
  </div>

```vue
<script setup lang="ts">
const { data: user } = await useAsyncUser()
const { data: orders } = await useAsyncOrders(user)
</script>
```

</div>

</div>

---

## 所以 Instance 找回來了嗎？ {.font-500}

<div class="relative mt-4">

````md magic-move
```ts
export async function useUserDetails() {
  const { data: user } = await useAsyncData(() => $fetch('/api/user'))
  const { data: orders } = await useAsyncData(() => $fetch(`/api/orders?userId=${user.value?.id}`))

  return computed(() => ({
    user: user.value,
    orders: orders.value,
  }))
}
```

```ts
import { withAsyncContext } from 'vue'

export async function useUserDetails() {
  let result, restore

  ([result, restore] = withAsyncContext(() => useAsyncData(() => $fetch('/api/user'))))
  const { data: user } = await result
  restore() // 還原 instance

  ([result, restore] = withAsyncContext(() => useAsyncData(() => $fetch(`/api/orders?userId=${user.value?.id}`))))
  const { data: orders } = await result
  restore() // 還原 instance

  return computed(() => ({
    user: user.value,
    orders: orders.value,
  }))
}
```
````

<span class="absolute bottom-25 right-24 text-4xl transition-opacity duration-800" :class="{ 'opacity-0': $clicks >= 1 }">
  🤯
</span>

<span class="absolute top-42 -left-5 text-4xl transition-opacity duration-800" :class="{ 'opacity-0': $clicks < 1 || $clicks >= 2 }">
  👍
</span>

</div>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Takeaway</span>
</div>

<h2 class="font-500 mt-4 !leading-relaxed">
  <code>&lt;script setup&gt;</code>
  做了很多事，<br />搞清楚它的運作方式會很有幫助
</h2>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-amber bg-amber/10 rounded">問題三</span>
</div>

<h2 class="font-500 mt-4">最熟悉的陌生元件 <code>&lt;Suspense&gt;</code></h2>

---

## 我遇到的問題是這樣的！ {.font-500}

<div class="flex items-center gap-2 text-sm mt-2 pt-12 pb-4">
  <div v-click="1" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
    <ph-number-circle-one-duotone />
    <span class="mt-px">進入首頁</span>
    <code> / </code>
  </div>
  <ph-arrow-right-duotone v-click="2" class="text-gray" />
  <div class="relative">
    <div v-click="2" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
      <ph-number-circle-two-duotone />
      <span class="mt-px">進入文章頁面</span>
      <code> /article?id=10 </code>
    </div>
    <div v-click="3" class="absolute -top-7 left-1/3 flex items-center gap-1">
      <ph-arrow-bend-up-right-duotone class="text-gray -rotate-45"/>
      <div class="text-green -mt-4 space-x-1">
        <ph-number-circle-three-duotone />
        <span>發出 API 請求</span>
      </div>
    </div>
    <div v-click="6" class="absolute -bottom-9 left-1/2 flex items-center gap-1">
      <ph-arrow-bend-down-right-duotone class="text-gray rotate-25"/>
      <div class="text-amber text-nowrap mt-4 space-x-1">
        <ph-number-circle-five-duotone />
        <span>又發出 API 請求</span>
      </div>
    </div>
  </div>
  <ph-arrow-right-duotone v-click="4" class="text-gray" />
  <div class="relative">
    <div v-click="4" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
      <ph-number-circle-four-duotone />
      <span class="mt-px">進入使用者頁面</span>
      <code> /user?id=11 </code>
    </div>
    <div v-click="7" class="absolute -top-7 left-2/3 flex items-center gap-1">
      <ph-arrow-bend-up-right-duotone class="text-gray -rotate-25"/>
      <div class="text-green text-nowrap -mt-1 space-x-1">
        <ph-number-circle-six-duotone />
        <span>發出 API 請求</span>
      </div>
    </div>
  </div>
</div>

<div
  class="grid grid-cols-3 gap-1 transition-transform duration-500 mt-4"
  :class="{ 'translate-y-6': $clicks >= 6 }"
>

<div>

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">app.vue</span>
</div>

```vue {*|none}{at:1}
<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
</template>
```

</div>

<div>

<div :class="{ 'grayscale': ![2, 3].includes($clicks) }">
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">article.vue</span>
</div>


```vue {*|none|*|4-10|none|none|4-10|none}{at:1}
<script setup lang="ts">
const route = useRoute()

watch(
  () => route.query.id,
  (id) => {
    ofetch(`/api/article/${id}`)
  },
  { immediate: true }
)
</script>
```

</div>

<div>

<div :class="{ 'grayscale': [1, 2, 3].includes($clicks) }">
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">user.vue</span>
</div>

```vue {*|none|none|none|*|4|4|6-12}{at:1}
<script setup lang="ts">
const route = useRoute()

await sleep(2000) // 較慢的 API

watch(
  () => route.query.id, 
  (id) => {
    ofetch(`/api/user/${id}`)
  }, 
  { immediate: true }
)
</script>
```

</div>

</div>

---
layout: none
class: h-full
---

<div class="grid grid-rows-2 h-full">
  <div class="px-14 pt-6">
    <h2 v-click="1" class="text-3xl font-500">加上 <code>&lt;Suspense&gt;</code> 前的流程</h2>
    <div class="flex items-center gap-4 mt-8">
      <!-- 1 -->
      <div v-click="2" class="relative">
        <code class="absolute -top-3em left-0 !text-0.5em text-gray">/article?id=10</code>
        <div class="relative size-40 border border-green bg-green/10 rounded overflow-hidden">
          <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">app.vue</span>
          <div
            class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-80% border border-green bg-green/10 rounded transition-transform duration-500"
            :class="{ 'translate-y-150% -rotate-45': $clicks <= 2 }"
          >
            <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">article.vue</span>
            <span class="absolute top-1/2 left-1/2 -translate-1/2">Mounted</span>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <ph-arrow-right-duotone v-click="4" class="text-gray" />
      <div v-click="4" class="relative">
        <code class="absolute -top-3em left-0 !text-0.5em text-gray">/user?id=11</code>
        <div class="relative size-40 border border-green bg-green/10 rounded overflow-hidden">
        <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">app.vue</span>
        <div 
          class="absolute top-55% left-1/2 -translate-1/2 w-5/6 h-80% border border-green bg-green/10 grayscale rounded transition-transform duration-500"
          :class="{ 'translate-y-150% -rotate-45': $clicks > 4 }"
        >
          <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">article.vue</span>
          <span class="absolute top-1/2 left-1/2 -translate-1/2">Unmount</span>
        </div>
        <div
          class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-80% border border-green bg-green/10 rounded transition-transform duration-500"
          :class="{ '!-translate-x-0 !translate-y-150% !-rotate-45': $clicks <= 4 }"
        >
          <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">user.vue</span>
          <span class="absolute top-1/2 left-1/2 -translate-1/2">Mounted</span>
        </div>
        </div>
      </div>
    </div>
  </div>

  <div class="px-14 pt-4 border-t border-main">
    <h2 v-click="6" class="text-3xl font-500">加上 <code>&lt;Suspense&gt;</code> 後的流程</h2>
    <div class="flex items-center gap-4 mt-8">
      <!-- 1 -->
      <div v-click="7" class="relative">
        <code class="absolute -top-3em left-0 !text-0.5em text-gray">/article?id=10</code>
        <div class="relative size-40 border border-green bg-green/10 rounded">
          <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">app.vue</span>
          <div class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-80% border border-purple bg-purple/10 rounded overflow-hidden">
            <span class="absolute top-0 right-0 text-xs bg-purple px-1.5 py-px rounded-bl">suspense</span>
            <div
              class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-70% border border-green bg-green/10 rounded transition-transform duration-500"
              :class="{ 'translate-y-150% -rotate-45': $clicks <= 7 }"
            >
              <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">article.vue</span>
              <span class="absolute top-1/2 left-1/2 -translate-1/2">Mounted</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 2 -->
      <ph-arrow-right-duotone v-click="9" class="text-gray" />
      <div v-click="9" class="relative">
        <code class="absolute -top-3em left-0 !text-0.5em text-gray">/user?id=11</code>
        <div class="relative size-40 border border-green bg-green/10 rounded">
          <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">app.vue</span>
          <div class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-80% border border-purple bg-purple/10 rounded overflow-hidden">
            <span class="absolute top-0 right-0 text-xs bg-purple px-1.5 py-px rounded-bl">suspense</span>
            <div
              class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[30%] w-5/6 h-70% border border-green bg-green/10 rounded transition-all duration-500"
              :class="{ '!h-33% !translate-y-[58%]': $clicks > 9 }"
            >
              <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">article.vue</span>
            </div>
            <div
              class="absolute top-74% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-33% border border-dashed border-amber bg-amber/10 rounded transition-all duration-500"
              :class="{ '!translate-y-100%': $clicks <= 9 }"
            >
              <span class="absolute top-0 right-0 text-xs bg-amber/10 px-1.5 py-px rounded-bl">user.vue</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 3 -->
      <ph-arrow-right-duotone v-click="11" class="text-gray" />
      <div v-click="11" class="relative size-40 border border-green bg-green/10 rounded overflow-hidden">
        <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">app.vue</span>
        <div class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-80% border border-purple bg-purple/10 rounded">
          <span class="absolute top-0 right-0 text-xs bg-purple px-1.5 py-px rounded-bl">suspense</span>
          <div 
            class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[58%] w-5/6 h-33% border border-green bg-green/10 rounded transition-all duration-500"
            :class="{ '!border-gray !bg-gray/10': $clicks > 11 }"
          >
            <span
              class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl transition-colors duration-500"
              :class="{ '!bg-gray': $clicks > 11 }"
            >
              article.vue
            </span>
          </div>
          <div
            class="absolute top-74% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-33% border border-amber border-dashed bg-amber/10 rounded transition-all duration-500"
            :class="{ '!border-green !bg-green/10 !border-solid': $clicks > 11 }"
          >
            <span
              class="absolute top-0 right-0 text-xs bg-amber/10 px-1.5 py-px rounded-bl transition-colors duration-500"
              :class="{ '!bg-green': $clicks > 11 }"
            >
              user.vue
            </span>
          </div>
        </div>
      </div>
      <!-- 4 -->
      <ph-arrow-right-duotone v-click="13" class="text-gray" />
      <div v-click="13" class="relative size-40 border border-green bg-green/10 rounded">
        <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl">app.vue</span>
        <div class="absolute top-55% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-80% border border-purple bg-purple/10 rounded overflow-hidden">
          <span class="absolute top-0 right-0 text-xs bg-purple px-1.5 py-px rounded-bl z-10">suspense</span>
          <div 
            class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[58%] w-5/6 h-33% border border-gray bg-gray/10 rounded transition-all duration-500"
            :class="{ '!-translate-y-200% rotate-45': $clicks >= 14 }"
          >
            <span class="absolute top-0 right-0 text-xs bg-gray px-1.5 py-px rounded-bl transition-colors duration-500">article.vue</span>
          </div>
          <div
            class="absolute top-74% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-33% border border-green bg-green/10 rounded transition-all duration-500"
            :class="{ '!top-55% !h-70%': $clicks >= 14 }"
          >
            <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl transition-colors duration-500">user.vue</span>
            <span v-click="14" class="absolute top-1/2 left-1/2 -translate-1/2">Mounted</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style scoped>
:not(pre) > code {
  font-size: 0.9em;
  background: var(--slidev-code-background);
  border-radius: var(--slidev-code-radius);
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  font-weight: 300;
}
</style>

---

<h2 class="font-500">回顧<code>&lt;Suspense&gt;</code> 衍伸的問題</h2>

<div class="grid grid-cols-[max-content_repeat(2,minmax(0,1fr))] gap-6 pt-5% h-full">
  <div>
    <div class="!*:text-xs flex items-center gap-1">
      <code class="text-gray">/article?id=10</code> <ph-arrow-right-duotone class="text-gray" /> <code>/user?id=11</code>
    </div>
    <div
      class="relative size-60 border border-green bg-green/10 rounded overflow-hidden transition-all mt-2"
      :class="{ '!border-gray/20 !bg-gray/10': $clicks >= 1 }"
    >
      <span
        class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl transition-all"
        :class="{ '!bg-gray/20 text-gray': $clicks >= 1 }"
      >
        app.vue
      </span>
      <div class="absolute top-52% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-82% border border-purple bg-purple/10 rounded">
        <span class="absolute top-0 right-0 text-xs bg-purple px-1.5 py-px rounded-bl">suspense</span>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[45%] w-5/6 h-35% border border-green bg-green/10 rounded transition-all duration-500">
          <span class="absolute top-0 right-0 text-xs bg-green px-1.5 py-px rounded-bl transition-colors duration-500">
            article.vue
          </span>
        </div>
        <div class="absolute top-74% left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-35% border border-amber border-dashed bg-amber/10 rounded transition-all duration-500">
          <span class="absolute top-0 right-0 text-xs bg-amber/10 px-1.5 py-px rounded-bl transition-colors duration-500">user.vue</span>
        </div>
      </div>
    </div>
    <div v-click="1" class="flex items-start gap-1 text-sm text-amber leading-relaxed mt-4">
      <span class="-mt-0.5"><code>article.vue</code> 持續待在畫面上，直到<br /><code>user.vue</code> 準備好為止</span>
    </div>
  </div>

<div v-click="2">

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">article.vue</span>
</div>

```vue {4-10}
<script setup lang="ts">
const route = useRoute()

watch(
  () => route.query.id,
  (id) => {
    ofetch(`/api/article/${id}`)
  },
  { immediate: true }
)
</script>
```

<div v-click="3" class="text-center text-gray">
  <ph-arrow-up-duotone />
</div>

<div v-click="3" class="text-gray">路由變化，但頁面還沒卸載，也因此 watcher 觸發了 API 請求</div>

</div>

<div v-click="2">

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">user.vue</span>
</div>

```vue {4}
<script setup lang="ts">
const route = useRoute()

await sleep(2000) // 較慢的 API

watch(
  () => route.query.id, 
  (id) => {
    ofetch(`/api/user/${id}`)
  }, 
  { immediate: true }
)
</script>
```

</div>

</div>

---

<h2 class="font-500 w-fit">解決 <code>&lt;Suspense&gt;</code> 衍伸的問題</h2>

<p class="opacity-70 !my-0.5em">凍結 Suspense 切換時的 router 變化</p>

<div class="grid grid-cols-[max-content_minmax(0,1fr)] gap-6">

<div>

```vue
<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
</template>
```

<div class="text-center text-gray">
  <ph-arrow-down-duotone />
</div>

```vue
<template>
  <RouterView v-slot="{ Component, route }">
    <Suspense>
      <RouteProvider
        :render-key="key"
        :route="route"
      >
        <component :is="Component" />
      </RouteProvider>
    </Suspense>
  </RouterView>
</template>
```

</div>

<div class="-translate-y-7">

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">RouteProvider</span>
</div>

```vue
<script setup lang="ts">
const previousKey = props.renderKey
const previousRoute = props.route

const route = {}
for (const key in props.route) {
  Object.defineProperty(route, key, {
    enumerable: true,
    get: () => previousKey === props.renderKey
      ? props.route[key]
      : previousRoute[key],
  })
}

provide(routeLocationKey, shallowReactive(route))
</script>
```
<div class="text-sm text-gray mt-2">

`routeLocationKey` 為 `vue-router` 內部使用的 injection key，我們用這個方法凍結了 Suspense 切換時的 route 變化。

</div>

</div>

</div>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Takeaway</span>
</div>

<h2 class="font-500 mt-4 !leading-relaxed">
  <code>&lt;Suspense&gt;</code> 套上去後，<br />元件的生命週期會跟過去的習慣截然不同，<br />
  使用前請詳閱公開說明書。
</h2>

<p v-click class="text-gray">但 Nuxt 都幫我們處理好了</p>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-amber bg-amber/10 rounded">問題四</span>
</div>

<h2 class="font-500 mt-4">有了 axios 為什麼還要 <code>$fetch</code></h2>

---
clicks: 4
---

<div class="flex flex-col gap-3 max-w-3xl mx-auto text-sm">

  <div class="self-start max-w-[80%] flex flex-col gap-1">
    <span class="px-1.5 text-xs text-purple bg-purple/10 rounded w-fit">鬱金香</span>
    <div class="px-3 py-2 bg-gray/10 border border-gray/20 rounded-lg rounded-tl-none">
      大大想問，用 <code>$fetch</code> 是不是比較好，跟內部 SSR 的機制相關之類的，還是用 axios 其實也沒差
    </div>
  </div>

  <div v-click="1" class="self-start max-w-[80%] flex flex-col gap-1">
    <span class="px-1.5 text-xs text-sky bg-sky/10 rounded w-fit">月亮</span>
    <div class="px-3 py-2 bg-gray/10 border border-gray/20 rounded-lg rounded-tl-none flex flex-col gap-2">
      <div class="px-2 py-1 border-l-2 border-purple/40 bg-purple/5 text-xs text-gray rounded-r">
        <span class="text-purple/80">鬱金香</span>：大大想問，用 <code>$fetch</code> 是不是比較好...還是用 axios 其實也沒差
      </div>
      <span>印象中只用 axios 會在 SSR 階段取不到資料，必須配合 Nuxt 提供的 API，例如 <code>$fetch</code> 或 <code>useAsyncData</code></span>
    </div>
  </div>

  <div v-click="2" class="self-end max-w-[80%] flex flex-col gap-1 items-end">
    <span class="px-1.5 text-xs text-green bg-green/10 rounded w-fit">Alex Liu</span>
    <div class="px-3 py-2 bg-green/10 border border-green/20 rounded-lg rounded-tr-none">
      這部分我會推薦使用 <code>$fetch</code> 就好
    </div>
  </div>

  <div v-click="3" class="self-end max-w-[80%] flex flex-col gap-1 items-end">
    <span class="px-1.5 text-xs text-green bg-green/10 rounded w-fit">Alex Liu</span>
    <div class="px-3 py-2 bg-green/10 border border-green/20 rounded-lg rounded-tr-none flex flex-col gap-2">
      <div class="px-2 py-1 border-l-2 border-sky/40 bg-sky/5 text-xs text-gray rounded-r">
        <span class="text-sky/80">月亮</span>：印象中只用 axios 會在 SSR 階段取不到資料，必須配合 Nuxt 提供的 API...
      </div>
      <span>有這種事！！！</span>
    </div>
  </div>

  <div v-click="4" class="self-start max-w-[80%] flex flex-col gap-1">
    <span class="px-1.5 text-xs text-amber bg-amber/10 rounded w-fit">海豹</span>
    <div class="px-3 py-2 bg-gray/10 border border-gray/20 rounded-lg rounded-tl-none flex flex-col gap-2">
      <div class="px-2 py-1 border-l-2 border-green/40 bg-green/5 text-xs text-gray rounded-r">
        <span class="text-green/80">Alex Liu</span>：有這種事！！！
      </div>
      <span>就真的拿不到</span>
    </div>
  </div>
</div>

<style scoped>
:not(pre) > code {
  font-size: 0.9em;
  background: var(--slidev-code-background);
  border-radius: var(--slidev-code-radius);
  padding: 0.05rem 0.3rem;
  font-weight: 300;
}
</style>

---

<h2 class="font-500">在 Nuxt 中取得 API 資料的方法</h2>

<div class="space-y-6 mt-6">


<div v-click="1">

<div class="relative">
  <ph-check-fat-duotone v-click="2"/><span class="absolute left-0 transition-transform" :class="{' translate-x-1.75em ': $clicks >= 2 }">使用 <code>$fetch</code> 取得外部 API 資料</span>
</div>

```ts
const { data } = useAsyncData(() => {
  return $fetch('https://jsonplaceholder.typicode.com/posts').catch((error) => console.error(error))
})
```

</div>

<div v-click="3">

<div class="relative">
 <ph-check-fat-duotone v-click="4"/><span class="absolute left-0 transition-transform" :class="{' translate-x-1.75em ': $clicks >= 4 }">使用 <code>$fetch</code> 取得內部 API 資料</span>
</div>

```ts
const { data } = useAsyncData(() => $fetch('/api/posts').catch((error) => console.error(error)))
```

</div>

<div v-click="5">

<div class="relative">
 <ph-check-fat-duotone v-click="6"/><span class="absolute left-0 transition-transform" :class="{' translate-x-1.75em ': $clicks >= 6 }">使用 <code>axios</code> 取得外部 API 資料</span>
</div>

```ts
import axios from 'axios'

const { data } = useAsyncData(() => {
  return axios('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data)
    .catch((error) => console.error(error))
})
```

</div>

<div>

</div>

</div>

---

<h2 class="font-500">在 Nuxt 中取得 API 資料的方法</h2>

<div class="space-y-4 mt-6">

<div v-click="1">

<div class="relative">
 <ph-x-circle-duotone v-click="2"/><span class="absolute left-0 transition-transform" :class="{' translate-x-1.75em ': $clicks >= 2 }">使用 <code>axios</code> 取得內部 API 資料</span>
</div>

```ts
import axios from 'axios'

const { data } = useAsyncData(() => {
  return axios('/api/posts').then((res) => res.data).catch((error) => console.error(error))
})
```

</div>

<div v-click="3">

```text
 ERROR  Invalid URL
    at new URL (node:internal/url:775:36)
    at dispatchHttpRequest (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/adapters/http.js:232:20)
    at node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/adapters/http.js:152:5
    at new Promise (<anonymous>)
    at wrapAsync (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/adapters/http.js:132:10)
    at http (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/adapters/http.js:170:10)
    at Axios.dispatchRequest (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/core/dispatchRequest.js:51:10)
    at Axios._request (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/core/Axios.js:187:33)
    at Axios.request (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/core/Axios.js:40:25)
    at wrap (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/helpers/bind.js:5:15)
    at Axios.request (node_modules/.pnpm/axios@1.8.4/node_modules/axios/lib/core/Axios.js:45:41)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

<Arrow v-click="4" x1="280" y1="268" x2="210" y2="268" color="#fbbf24" />

</div>

</div>

---

<h2 class="font-500">在 Nuxt 中取得 API 資料的方法</h2>

<div class="space-y-4 mt-6">


<div v-click="1">

<div class="relative">
 <ph-x-circle-duotone v-click="2"/><span class="absolute left-0 transition-transform" :class="{' translate-x-1.75em ': $clicks >= 2 }">使用 <code>ofetch</code> 取得內部 API 資料</span>
</div>

```ts
import { $fetch } from 'ofetch'

const { data } = useAsyncData(() => {
  return $fetch('/api/posts').then((res) => res.data).catch((error) => console.error(error))
})
```

</div>

<div v-click="3">

```text
 ERROR  [GET] "/api/posts": <no response> Failed to parse URL from /api/posts
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async $fetchRaw2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:270:14)
    at async $fetch2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:316:15)

  [cause]: Failed to parse URL from /api/posts
      at Object.fetch (node:internal/deps/undici/undici:11372:11)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async $fetchRaw2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:258:26)
      at async $fetchRaw2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:270:14)
      at async $fetch2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:316:15)

    [cause]: Invalid URL
        at new URL (node:internal/url:775:36)
        at new _Request (node:internal/deps/undici/undici:5055:25)
        at fetch2 (node:internal/deps/undici/undici:9195:25)
        at Object.fetch (node:internal/deps/undici/undici:11370:18)
        at fetch (node:internal/process/pre_execution:282:25)
        at node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs:26:58
        at $fetchRaw2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:258:32)
        at onError (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:179:16)
        at $fetchRaw2 (node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/shared/ofetch.03887fc3.mjs:270:20)
        at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```

<Arrow v-click="4" x1="320" y1="485" x2="250" y2="485" color="#fbbf24" />

</div>

</div>

---

<h2>為什麼會遇到 Invalid URL 錯誤</h2>

<div v-click class="flex items-center mt-6">
<div class="text-gray">錯誤訊息關鍵字：</div><div class="flex items-center gap-2"><div class="text-blue bg-blue/10 border border-blue rounded px-1">Invalid URL</div><div class="text-blue bg-blue/10 border border-blue rounded px-1">Failed to parse URL from /api/posts</div></div>
</div>

<div class="grid grid-cols-[max-content_1fr_1fr] gap-x-4 mt-4">

<div />

<v-click>
  <div class="text-center font-500 opacity-50">Browser</div>
  <div class="text-center font-500 opacity-50">Node.js</div>
</v-click>

<!--  -->
<v-click>

<div class="text-sm">

```ts
fetch('/api/posts')
```

</div>

<div class="text-sm text-center font-500 my-auto opacity-75">可以</div>
<div class="text-sm text-center font-500 my-auto opacity-75">不可以</div>

</v-click>

<!--  -->
<v-click>

<div class="text-sm">

```ts
fetch('https://example.com/api/posts')
```

</div>

<div class="text-sm text-center font-500 my-auto opacity-75">可以</div>
<div class="text-sm text-center font-500 my-auto opacity-75">可以</div>

</v-click>

<!--  -->
<v-click>

<div class="text-sm">

```ts
new URL('/api/posts')
```

</div>

<div class="text-sm text-center font-500 my-auto opacity-75">不可以</div>
<div class="text-sm text-center font-500 my-auto opacity-75">不可以</div>

</v-click>

<!--  -->
<v-click>

<div class="text-sm">

```ts
new URL('/api/posts', 'https://example.com')
```

</div>

<div class="text-sm text-center font-500 my-auto opacity-75">可以</div>
<div class="text-sm text-center font-500 my-auto opacity-75">可以</div>

</v-click>

</div>

<div v-click class="flex items-center gap-1 mt-6">
  <ph-lightbulb-duotone/><div><code>fetch('/api/posts')</code> 在瀏覽器中通常合法，是因為瀏覽器有當前頁面的 URL context。</div>
</div>
<div v-click class="flex items-center gap-1 text-amber mt-2">
  <ph-question-duotone/><div>為什麼 Nuxt 在 Server 可以使用 <code>$fetch('/api/posts')</code>？</div>
</div>

---
clicks: 1
---

<h2 class="flex items-center font-500 gap-1.5">
  <div class="text-end h-1em overflow-hidden">
    <div class="transition-transform duration-800" :class="{ '-translate-y-1.3em': $clicks === 1 }">
      <div aria-hidden="true">Nuxt</div>
      <div>Nitro</div>
    </div>
  </div>
  的<code>$fetch</code> 做了什麼
</h2>

<div class="text-xs text-gray my-3">
  <ph-shovel-duotone/> 挖掘原始碼 ...
</div>

```ts
import { createApp, toNodeListener } from "h3";
import { Headers, createFetch } from "ofetch";
import { fetchNodeRequestHandler, callNodeRequestHandler } from "node-mock-http";

function createNitroApp(): NitroApp {
  const h3App = createApp({ ... });

  // Create local fetch caller
  const nodeHandler = toNodeListener(h3App);

  const localFetch: typeof fetch = (input, init) => {
    if (!input.toString().startsWith("/")) return globalThis.fetch(input, init);
    return fetchNodeRequestHandler(nodeHandler, input, init).then((response) => normalizeFetchResponse(response));
  };

  const $fetch = createFetch({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });

  globalThis.$fetch = $fetch;
}
```

<div class="text-xs text-gray my-3">
  後續 Nuxt 5（Nitro 3）做法不同但目的完全一樣 ...
</div>

---

<h2 class="font-500">Nuxt 的 <code>$fetch</code> 有什麼優勢</h2>

<div class="mt-12">
  <strong>使用 <code>axios('http://localhost:3000/api/posts')</code></strong>
  <div v-click="1" class="mt-4">
    <div class="grid grid-cols-[9em_minmax(0,1fr)_9em] gap-1">
      <div class="grid place-items-center text-center border border-green bg-green/10 rounded px-4 py-3">Nitro Server</div>
      <div class="flex items-center justify-between gap-1 mx-2">
        <span class="px-2 py-0.5 text-xs text-gray bg-gray/10 rounded">DNS resolve</span>
        <span class="px-2 py-0.5 text-xs text-gray bg-gray/10 rounded">TCP/TLS handshake</span>
        <span class="px-2 py-0.5 text-xs text-gray bg-gray/10 rounded">HTTP encode</span>
        <span class="px-2 py-0.5 text-xs text-gray bg-gray/10 rounded">network transfer</span>
        <span class="px-2 py-0.5 text-xs text-gray bg-gray/10 rounded">HTTP decode</span>
      </div>
      <div class="text-center border border-green bg-green/10 rounded px-4 py-3">
        <div>Nitro Server</div>
        <div class="text-xs opacity-70">defineEventHandler</div>
      </div>
    </div>
  </div>
</div>

<div class="mt-10">
  <strong>使用 <code>$fetch('/api/posts')</code></strong>
  <div v-click="2" class="mt-4">
    <div class="grid grid-cols-[9em_max-content_9em] gap-1">
      <div class="grid place-items-center text-center border border-green bg-green/10 rounded px-4 py-3">Nitro Server</div>
      <div class="flex items-center justify-between gap-1 mx-2">
        <span class="px-2 py-0.5 text-xs text-gray bg-gray/10 rounded">function call</span>
      </div>
      <div class="text-center border border-green bg-green/10 rounded px-4 py-3">
        <div>Nitro Server</div>
        <div class="text-xs opacity-70">defineEventHandler</div>
      </div>
    </div>
  </div>
</div>

---

<img
  src="/$fetch_docs.png"
  class="rounded-t-xl"
  alt="Nuxt uses ofetch to expose globally the $fetch helper for making HTTP requests."
  onload="this.style.visibility = 'visible';"
  style="filter:contrast(1.15);visibility:hidden;"
/>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Takeaway</span>
</div>

<h2 class="font-500 mt-4">感謝 Nuxt 在 DX 上的努力<br>讓我們可以少發許多網路請求</h2>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-amber bg-amber/10 rounded">問題五</span>
</div>

<h2 class="font-500 mt-4">記憶體洩漏 + 跨請求污染</h2>

---

<div class="absolute -bottom-10 left-1/2 -translate-x-1/2 w-5/6 h-auto">

<div class="absolute -top-0.5em left-2em flex gap-1 items-center text-1rem text-amber font-400"><ph-arrow-bend-up-right-duotone/><span class="-mt-1">fix: memory leak on nuxt 3</span></div>

<img
  src="/vue-final-modal_ 1f37bda.png"
  class="rounded-t-xl"
  alt="fix: memory leak on nuxt 3"
  onload="this.style.visibility = 'visible';"
  style="filter:contrast(1.15);visibility:hidden;"
/>
</div>

---

<h2 class="font-500">復盤：為什麼會遇到記憶體洩漏</h2>

<!-- 第一筆請求 -->
<div class="mt-6 transition-transform" :class="{ 'translate-y-6': $clicks < 6 }">
  <div class="flex items-center gap-2 text-sm">
    <div v-click="1" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
      第一輪請求
    </div>
    <ph-arrow-right-duotone v-click="2" class="text-gray" />
    <div class="relative">
      <div v-click="2" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        初始化 plugin
      </div>
    </div>
    <ph-arrow-right-duotone v-click="3" class="text-gray" />
    <div class="relative">
      <div v-click="3" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        初始化 Modal.vue
      </div>
    </div>
    <ph-arrow-right-duotone v-click="4" class="text-gray" />
    <div class="relative">
      <div v-click="4" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        Modal.vue 註冊到 modals 裡面
      </div>
    </div>
    <ph-arrow-right-duotone v-click="5" class="text-gray" />
    <div class="relative">
      <div v-click="5" class="inline-flex items-center gap-1 text-gray bg-gray/10 border border-current rounded-md px-2 py-0.5">
        請求結束
      </div>
    </div>
  </div>
</div>

<!-- 第二筆請求 -->
<div class="mt-6">
  <div class="flex items-center gap-2 text-sm mt-2">
    <div v-click="6" class="inline-flex items-center gap-1 text-cyan bg-cyan/10 border border-current rounded-md px-2 py-0.5">
      第二輪請求
    </div>
    <ph-arrow-right-duotone v-click="7" class="text-gray" />
    <div class="relative">
      <div v-click="7" class="inline-flex items-center gap-1 text-teal bg-teal/10 border border-current rounded-md px-2 py-0.5">
        初始化 plugin
      </div>
    </div>
    <ph-arrow-right-duotone v-click="8" class="text-gray" />
    <div class="relative">
      <div v-click="8" class="inline-flex items-center gap-1 text-teal bg-teal/10 border border-current rounded-md px-2 py-0.5">
        初始化 Modal.vue
      </div>
    </div>
    <ph-arrow-right-duotone v-click="9" class="text-gray" />
    <div class="relative">
      <div v-click="9" class="inline-flex items-center gap-1 text-teal bg-teal/10 border border-current rounded-md px-2 py-0.5">
        Modal.vue 註冊到 modals 裡面
      </div>
    </div>
    <ph-arrow-right-duotone v-click="10" class="text-gray" />
    <div class="relative">
      <div v-click="10" class="inline-flex items-center gap-1 text-gray bg-gray/10 border border-current rounded-md px-2 py-0.5">
        請求結束
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-2 gap-6 mt-6">

<div>

<div>
  <span class="px-1.5 text-xs text-blue bg-blue/10 rounded">modal.ts</span>
</div>

````md magic-move

```ts {*|*|3-9|none}{at:1}
const modals = shallowReactive([])

export default defineNuxtPlugin(() => {
  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {1|1|*|3-9|none}
const modals = shallowReactive([modal1])

export default defineNuxtPlugin(() => {
  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {1|1}
const modals = shallowReactive([modal1, modal2])

export default defineNuxtPlugin(() => {
  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```
````

</div>

<div>

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Modal.vue</span>
</div>

```vue {*|*|none|*|4-5|4-5|*|none|*|4-5}{at:1}
<script setup lang="ts">
const { register } = inject('modals')

// 註冊 modal 到 modals 裡面
register(getCurrentInstance())
</script>
```

</div>

</div>

<div v-click="11" class="relative m-1">
  <ph-arrow-bend-up-right-duotone class="absolute -top-3 -left-7 -rotate-72.5" />
  多次請求後，<code>modals</code> 累積了多筆 Modal.vue 的實例，並且無法 GC
</div>
<div v-click="12" class="text-amber-500 mt-2">
  <ph-warning-duotone/> 最終導致記憶體耗盡服務崩潰
</div>

---

<h2 class="font-500">避免記憶體洩漏</h2>

<!-- 第一筆請求 -->
<div class="mt-6 transition-transform" :class="{ 'translate-y-6': $clicks < 7 }">
  <div class="flex items-center gap-2 text-sm">
    <div v-click="2" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
      第一輪請求
    </div>
    <ph-arrow-right-duotone v-click="3" class="text-gray" />
    <div class="relative">
      <div v-click="3" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        初始化 plugin
      </div>
    </div>
    <ph-arrow-right-duotone v-click="4" class="text-gray" />
    <div class="relative">
      <div v-click="4" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        初始化 Modal.vue
      </div>
    </div>
    <ph-arrow-right-duotone v-click="5" class="text-gray" />
    <div class="relative">
      <div v-click="5" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        Modal.vue 註冊到 modals 裡面
      </div>
    </div>
    <ph-arrow-right-duotone v-click="6" class="text-gray" />
    <div class="relative">
      <div v-click="6" class="inline-flex items-center gap-1 text-gray bg-gray/10 border border-current rounded-md px-2 py-0.5">
        請求結束
      </div>
    </div>
  </div>
</div>

<!-- 第二筆請求 -->
<div class="mt-6">
  <div class="flex items-center gap-2 text-sm mt-2">
    <div v-click="7" class="inline-flex items-center gap-1 text-cyan bg-cyan/10 border border-current rounded-md px-2 py-0.5">
      第二輪請求
    </div>
    <ph-arrow-right-duotone v-click="8" class="text-gray" />
    <div class="relative">
      <div v-click="8" class="inline-flex items-center gap-1 text-teal bg-teal/10 border border-current rounded-md px-2 py-0.5">
        初始化 plugin
      </div>
    </div>
    <ph-arrow-right-duotone v-click="9" class="text-gray" />
    <div class="relative">
      <div v-click="9" class="inline-flex items-center gap-1 text-teal bg-teal/10 border border-current rounded-md px-2 py-0.5">
        初始化 Modal.vue
      </div>
    </div>
    <ph-arrow-right-duotone v-click="10" class="text-gray" />
    <div class="relative">
      <div v-click="10" class="inline-flex items-center gap-1 text-teal bg-teal/10 border border-current rounded-md px-2 py-0.5">
        Modal.vue 註冊到 modals 裡面
      </div>
    </div>
    <ph-arrow-right-duotone v-click="11" class="text-gray" />
    <div class="relative">
      <div v-click="11" class="inline-flex items-center gap-1 text-gray bg-gray/10 border border-current rounded-md px-2 py-0.5">
        請求結束
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-2 gap-6 mt-6">

<div>

<div>
  <span class="px-1.5 text-xs text-blue bg-blue/10 rounded">modal.ts</span>
</div>

````md magic-move

```ts
const modals = shallowReactive([])

export default defineNuxtPlugin(() => {
  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {*|*|*|none}
export default defineNuxtPlugin(() => {
  // modals 移動到 plugin 內部
  const modals = shallowReactive([])

  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {3}
export default defineNuxtPlugin(() => {
  // modals 移動到 plugin 內部
  const modals = shallowReactive([modal1])

  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {*}
export default defineNuxtPlugin(() => {
  // modals 移動到 plugin 內部
  const modals = shallowReactive([])

  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {*|*|none}
export default defineNuxtPlugin(() => {
  // modals 移動到 plugin 內部
  const modals = shallowReactive([])

  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts {3}
export default defineNuxtPlugin(() => {
  // modals 移動到 plugin 內部
  const modals = shallowReactive([modal2])

  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```

```ts
export default defineNuxtPlugin(() => {
  // modals 移動到 plugin 內部
  const modals = shallowReactive([])

  const register = (modal) => modals.push(modal)

  app.provide('modals', {
    register,
  })
})
```
````

</div>

<div>

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Modal.vue</span>
</div>

```vue {*|*|*|none|*|4-5|*|*|none|*|4-5}{at:1}
<script setup lang="ts">
const { register } = inject('modals')

// 註冊 modal 到 modals 裡面
register(getCurrentInstance())
</script>
```

</div>

</div>

<div v-click="12" class="relative m-1">
  <ph-arrow-bend-up-right-duotone class="absolute -top-3 -left-7 -rotate-72.5" />
  每個請求之間的 modals 都會重新建立，GC 也能正常回收 Modal.vue 的實例
</div>

---

<h2 class="font-500">跨請求污染：你的資料不是你的資料</h2>

<div class="grid grid-cols-[max-content_minmax(0,1fr)] gap-4 mt-6">

<div>

<div>
  <span class="px-1.5 text-xs text-blue bg-blue/10 rounded">fetchUser.ts</span>
</div>

```ts
export let user: User | null = null

export async function fetchUser() {
  if (user) return user
  user = await $fetch(`/api/user`)
  return user
}
```

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">user.vue</span>
</div>

```vue {*}
<script setup lang="ts">
const { data } = await useAsyncData(() => {
  return fetchUser()
})
</script>

<template>
  <div>{{ data?.name }}</div>
</template>
```

</div>

<div class="grid place-content-center gap-4">

<div>
  <div class="flex items-center gap-2 text-sm">
    <div v-click="1" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        Alex 發出請求
      </div>
      <ph-arrow-right-duotone v-click="2" class="text-gray" />
      <div class="relative">
        <div v-click="2" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
          沒有快取
        </div>
      </div>
      <ph-arrow-right-duotone v-click="3" class="text-gray" />
      <div class="relative">
        <div v-click="3" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
          發出請求，更新快取
        </div>
        <span v-click="3" class="absolute -top-1.5em left-55% inline-flex gap-1 text-gray">
          <ph-arrow-bend-up-right-duotone /> <ph-file-dotted-duotone /> <span>Alex</span>
        </span>
      </div>
      <ph-arrow-right-duotone v-click="4" class="text-gray" />
      <div class="relative">
        <div v-click="4" class="inline-flex items-center gap-1 text-gray bg-gray/10 border border-current rounded-md px-2 py-0.5">
          回傳
        </div>
      </div>
    </div>
</div>

<div>
  <div class="flex items-center gap-2 text-sm">
    <div v-click="5" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        Alex 發出請求
      </div>
      <ph-arrow-right-duotone v-click="6" class="text-gray" />
      <div class="relative">
        <div v-click="6" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
          有快取
        </div>
      </div>
      <ph-arrow-right-duotone v-click="7" class="text-gray" />
      <div class="relative">
        <div v-click="7" class="inline-flex items-center gap-1 text-gray bg-gray/10 border border-current rounded-md px-2 py-0.5">
          回傳
        </div>
      </div>
    </div>
</div>

<div>
  <div class="flex items-center gap-2 text-sm">
    <div v-click="8" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
        Hunter 發出請求
      </div>
      <ph-arrow-right-duotone v-click="9" class="text-gray" />
      <div class="relative">
        <div v-click="9" class="inline-flex items-center gap-1 text-blue bg-blue/10 border border-current rounded-md px-2 py-0.5">
          有快取
        </div>
      </div>
      <ph-arrow-right-duotone v-click="10" class="text-gray" />
      <div class="relative">
        <div v-click="10" class="inline-flex items-center gap-1 text-red bg-red/10 border border-current rounded-md px-2 py-0.5">
          回傳
        </div>
        <span v-click="11" class="absolute -bottom-1.5em right-2 translate-x-full text-nowrap text-gray">
          <ph-arrow-bend-down-right-duotone /> <span class="mt-1">拿到了 Alex 的資料</span>
        </span>
      </div>
    </div>
</div>

<div v-click="12" class="mt-6">

<div class="text-green">
  <ph-check-fat-duotone/> 正確做法，慎選快取與單例模式的使用時機
</div>

```ts
export async function fetchUser() {
  const user = await $fetch(`/api/user`)
  return user
}
```

</div>

</div>

</div>

---
layout: intro
class: text-center
---

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Takeaway</span>
</div>

<div class="relative">
  <h2 class="font-500 mt-4">Server 是一對多，global state 會在不同 request 間互相影響</h2>
  <span v-click="1" class="absolute -top-1.5em left-12 flex gap-1 text-nowrap text-sm text-gray">
    <ph-arrow-bend-up-right-duotone -rotate-15 /> <div class="-mt-1">Browser 是一對一</div>
  </span>
</div>

<p v-click="2" class="text-gray">慎選快取與單例模式的使用時機</p>

---
layout: intro
class: text-center pb-5
---

# Thank you! {.font-hand.italic}
