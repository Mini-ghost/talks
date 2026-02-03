---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
layout: center
class: text-center
glowSeed: 4
background: https://cover.sli.dev
title: Vue.js 設計實戰 | 非同步元件與函數式元件 & 內建元件
clicks: 1
---

<h1 class="tagline !text-3em !leading-normal font-600">Vue.js 設計實戰</h1>
非同步元件與函數式元件 & 內建元件

---

# 非同步元件 {class="font-500"}
Async Components

<div class="grid grid-cols-[minmax(max-content,1fr)_minmax(0,1fr)] gap-6">

<div>

<div>
  <span class="inline-block px-1.5 text-xs text-green bg-green/10 rounded">最簡單的非同步元件</span>
</div>

````md magic-move
```vue
<script setup lang="ts">
import Comp from './Comp.vue'
</script>

<template>
  <Comp />
</template>
```

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'

let AsyncComp = null

const loaded = shallowRef(false)

const loader = () => import('./AsyncComp.vue')
loader().then(comp => {
  AsyncComp = comp.default
  loaded.value = true
})
</script>

<template>
  <template v-if="loaded && AsyncComp">
    <AsyncComp />
  </template>
</template>
```
````

</div>

<div v-click="2">
  <div>
    <span class="inline-block px-1.5 text-xs text-blue bg-blue/10 rounded">我們還需要考慮到…</span>
  </div>
  <div mt-3 space-y-3>
    <v-clicks at="2">
      <div class="flex gap-2">
        <ph-check-square-duotone text-gray opacity-60/>
        <span opacity-80>載入失敗時顯示的錯誤元件</span>
      </div>
      <div class="flex gap-2">
        <ph-check-square-duotone text-gray opacity-60/>
        <span opacity-80>載入元件的超時時間</span>
      </div>
      <div class="flex gap-2">
        <ph-check-square-duotone text-gray opacity-60/>
        <span opacity-80>載入時的 Loading 元件</span>
      </div>
      <div class="flex gap-2">
        <ph-check-square-duotone text-gray opacity-60/>
        <span opacity-80>載入失敗時的重試機制</span>
      </div>
    </v-clicks>
  </div>
</div>

</div>

---

# 非同步元件 {class="font-500"}
載入失敗時顯示的錯誤元件

<div class="grid grid-cols-2 gap-6">

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import ErrorComponent from './ErrorComponent.vue'

let AsyncComp = null

const loaded = shallowRef(false)
const error = shallowRef()

const loader = () => import('./AsyncComp.vue')
loader()
  .then(comp => {
    AsyncComp = comp.default
    loaded.value = true
  })
  .catch(err => {
    error.value = err
  })
</script>
```

```vue
<template>
  <template v-if="loaded && AsyncComp">
    <AsyncComp />
  </template>
  <template v-else-if="error">
    <ErrorComponent :error="error" />
  </template>
</template>
```

</div>

---

# 非同步元件 {class="font-500"}
載入元件的超時時間

<div class="grid grid-cols-2 gap-6">

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import ErrorComponent from './ErrorComponent.vue'

let AsyncComp = null

const loaded = shallowRef(false)
const error = shallowRef()

setTimeout(() => {
  if (!loaded.value && !error.value) {
    error.value = new Error('Async component timed out')
  }
}, 3000)

// load
</script>
```

```vue
<template>
  <template v-if="loaded && AsyncComp">
    <AsyncComp />
  </template>
  <template v-else-if="error">
    <ErrorComponent :error="error" />
  </template>
</template>
```

</div>

---

# 非同步元件 {class="font-500"}
載入時的 Loading 元件

<div class="grid grid-cols-2 gap-6">

````md magic-move
```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import LoadingComponent from './LoadingComponent.vue'

let AsyncComp = null

const loaded = shallowRef(false)
const error = shallowRef()

// timeout
// load
</script>
```

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import LoadingComponent from './LoadingComponent.vue'

let AsyncComp = null

const loaded = shallowRef(false)
const error = shallowRef()
const delayed = shallowRef(true)

setTimeout(() => delayed.value = false, 200)

// timeout
// load
</script>
```
````

````md magic-move
```vue
<template>
  <template v-if="loaded && AsyncComp">
    <AsyncComp />
  </template>
  <template v-else-if="error">
    <ErrorComponent :error="error" />
  </template>
  <template v-else>
    <LoadingComponent />
  </template>
</template>
```

```vue
<template>
  <template v-if="loaded && AsyncComp">
    <AsyncComp />
  </template>
  <template v-else-if="error">
    <ErrorComponent :error="error" />
  </template>
  <template v-else-if="!delayed">
    <LoadingComponent />
  </template>
</template>
```
````

</div>

---

# 非同步元件 {class="font-500"}
載入失敗時的重試機制

<div class="grid grid-cols-2 gap-6">

````md magic-move
```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import LoadingComponent from './LoadingComponent.vue'

let AsyncComp = null

const loaded = shallowRef(false)

// 略

const loader = () => import('./AsyncComp.vue')
loader()
  .then(comp => {
    AsyncComp = comp.default
    loaded.value = true
  })
  .catch(err => {
    error.value = err
  })
</script>
```

```ts
let retries = 0
const retry = () => {
  retries++
  return load()
}

const load = () => loader()
  .catch(err => {
    if (retries < 3) return retry()
    throw err
  })

load()
  .then(comp => {
    AsyncComp = comp.default
    loaded.value = true
  })
  .catch(err => error.value = err)
```
````

```vue
<template>
  <template v-if="loaded && AsyncComp">
    <AsyncComp />
  </template>
  <template v-else-if="error">
    <ErrorComponent :error="error" />
  </template>
  <template v-else-if="!delayed">
    <LoadingComponent />
  </template>
</template>
```

</div>

---
class: grid grid-cols-[max-content_1fr] gap-4
clicks: 4
---

# 非同步元件 {class="font-500"}

<div>
  <div>
    <span class="inline-block px-1.5 text-xs text-green bg-green/10 rounded">defineAsyncComponent</span>
  </div>

<ScrollableCode 
  class="mt-1"
  max-height="460px" 
  :scroll-to-line="[1, 6, 36, 57]" 
>

```ts {*|6-34|36-75|*}{lines: true}
function defineAsyncComponent(source) {
  const { loader, loadingComponent, errorComponent, delay, timeout, onError } = source

  let resolvedComp = null

  const load = () => {
    let thisRequest
    return pendingRequest || (thisRequest = pendingRequest = loader()
      .catch(err => {
        if (onError) {
          return new Promise((resolve, reject) => {
            const userRetry = () => resolve(retry())
            const userFail = () => reject(err)
            onError(err, userRetry, userFail, retries + 1)
          })
        } else {
          throw err
        }
      })
      .then((comp: any) => {
        if (thisRequest !== pendingRequest && pendingRequest) {
          return pendingRequest
        }

        // interop module default
        if (comp && (comp.__esModule || comp[Symbol.toStringTag] === 'Module')) {
          comp = comp.default
        }

        resolvedComp = comp
        return comp
      }))

  }

  return defineComponent({
    name: 'AsyncComponentWrapper',
    setup() {
      if (resolvedComp) {
        return () => h(resolvedComp!)
      }

      if (delay) {
        setTimeout(() => {
          delayed.value = false
        }, delay)
      }

      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            error.value = new Error('Async component timed out')
          }
        }, timeout)
      }

      load()
        .then(() => {
          loaded.value = true
        })
        .catch(err => {
          error.value = err
        })

      return () => {
        if (loaded.value && resolvedComp) {
          return h(resolvedComp)
        } else if (error.value && errorComponent) {
          return h(errorComponent, { error: error.value })
        } else if (loadingComponent && !delayed.value) {
          return h(loadingComponent)
        }
      }
    }
  })
}
```

</ScrollableCode>

</div>

---

# 函數式元件 {class="font-500"}
Functional Components

<div class="grid grid-cols-[minmax(max-content,1fr)_minmax(0,1fr)] gap-6">

<div>

<div>
  <span class="inline-block px-1.5 text-xs text-cyan bg-cyan/10 rounded">核心定義</span>
</div>

<div mt-4 space-y-3>
  <v-clicks>
    <div class="flex gap-2 items-start">
      <ph-function-duotone text-cyan mt-1 flex-shrink-0/>
      <span opacity-80><span class="text-cyan font-500">本質是普通函式</span>：回傳值是虛擬 DOM</span>
    </div>
    <div class="flex gap-2 items-start">
      <ph-prohibit-duotone text-amber mt-1 flex-shrink-0/>
      <span opacity-80><span class="text-amber font-500">無狀態</span>：沒有自身的 State，也沒有 this 實例</span>
    </div>
    <div class="flex gap-2 items-start">
      <ph-package-duotone text-green mt-1 flex-shrink-0/>
      <span opacity-80><span class="text-green font-500">可接收 Props</span>：由外部傳入的屬性</span>
    </div>
  </v-clicks>
</div>

</div>

<div v-click>

```ts
export const Transition =
  /*@__PURE__*/ decorate((props, { slots }) =>
    h(BaseTransition, props, slots),
  )

const decorate = (t) => {
  t.displayName = 'Transition'
  t.props = TransitionPropsValidators
  return t
}
```

</div>

</div>

---

# 函數式元件 {class="font-500"}
mountComponent

<div class="grid grid-cols-2 gap-6">

<div>

````md magic-move
```ts {*|2-6|8-9}{lines: true}
const mountComponent = (initialVNode, ...) => {
  // 1. 建立元件實例
  const instance = createComponentInstance(
    initialVNode,
    parentComponent
  )

  // 2. 設置元件
  setupComponent(instance)

  // 3. 設置渲染副作用
  setupRenderEffect(instance, ...)
}
```

```ts {8-12}{lines: true}
const mountComponent = (initialVNode, ...) => {
  // 1. 建立元件實例
  const instance = createComponentInstance(
    initialVNode,
    parentComponent
  )

  // 2. 設置元件（setupComponent 展開）
  const isStateful = isStatefulComponent(instance)
  const setupResult = isStateful
    ? setupStatefulComponent(instance)
    : undefined

  // 3. 設置渲染副作用
  setupRenderEffect(instance, ...)
}
```
````

</div>

<div v-click="1" class="space-y-2">
  <div class="space-y-1">
    <div>
      <span class="inline-block px-1.5 text-xs text-gray bg-gray/10 rounded">createComponentInstance</span>
    </div>
    <div class="border border-amber/30 rounded-lg p-3 bg-amber/5">
      <div class="flex items-center gap-2">
        <ph-warning-duotone text-amber/>
        <span class="text-amber font-500 text-sm">我們發現</span>
      </div>
      <div class="opacity-70 text-xs mt-2">
        Vue 3 中，函數式元件<span class="text-amber font-500 px-0.5">依然會建立實例</span>
      </div>
    </div>
  </div>

  <div v-click="3" class="space-y-1">
    <div>
      <span class="inline-block px-1.5 text-xs text-gray bg-gray/10 rounded">setupComponent</span>
    </div>
    <div class="border border-gray/30 rounded-lg p-3 bg-gray/5 mb-4">
      <div class="flex items-center gap-2">
        <ph-gear-duotone text-gray/>
        <span class="text-gray font-500 text-sm">有狀態元件必須執行</span>
      </div>
      <div class="opacity-70 text-xs mt-2 space-y-1">
        <div>建立 <code>instance.ctx</code> 的 Proxy</div>
        <div>處理 <code>setup()</code> 初始化</div>
        <div>處理 <code>computed</code>、<code>methods</code>（Options API）</div>
      </div>
    </div>
    <div v-click="3" class="border border-green/30 rounded-lg p-3 bg-green/5">
      <div class="flex items-center gap-2">
        <ph-rocket-launch-duotone text-green/>
        <span class="text-green font-500 text-sm">函數式元件完全跳過</span>
      </div>
      <div class="opacity-70 text-xs mt-2">
        省去 Proxy 的建立與 setup() 執行
      </div>
    </div> 
  </div>
</div>

</div>

---
class: flex flex-col
---

# 函數式元件 {class="font-500"}
Functional Components 定位轉變

<div class="grid grid-cols-2 gap-6 grow">

<div class="space-y-2">
  <div class="border border-gray/30 rounded-lg p-4 bg-gray/5">
    <div class="flex items-center gap-2 mb-2">
      <ph-clock-counter-clockwise-duotone text-gray text-xl/>
      <span class="text-gray font-500">Vue 2 時代</span>
    </div>
    <div class="opacity-70 text-sm">
      使用函數式元件主要是為了<span class="text-gray font-500">效能最佳化</span>，因為它是真正的「無實例」
    </div>
  </div>

  <div class="border border-green/30 rounded-lg p-4 bg-green/5">
    <div class="flex items-center gap-2 mb-2">
      <ph-check-circle-duotone text-green text-xl/>
      <span class="text-green font-500">Vue 3 時代</span>
    </div>
    <div class="opacity-70 text-sm">
      使用函數式元件主要是為了<span class="text-green font-500">簡單性</span>，有狀態元件的初始化已經最佳化得非常好
    </div>
  </div>
</div>

<div v-click class="flex justify-center">
  <div class="text-center">
    <ph-lightbulb-duotone class="text-amber text-6xl mb-4 glow-pulse"/>
    <div class="opacity-70 mt-2 text-sm max-w-60">
      Vue 3 的 Stateful Component 初始化效能已大幅提升，函數式元件的效能優勢不再顯著
    </div>
  </div>
</div>

</div>

---

# 內建元件 {class="font-500"}
Built-in Components

<div class="grid grid-cols-[max-content_1fr] gap-6 px-20 mt-10 [&>div]:transition [&>div]:duration-500">
  <div v-click="1" class="text-end text-lime font-500">KeepAlive</div>
  <div v-click="1" class="text-start opacity-80">在多個元件之間動態切換時，有條件地快取元件實例，避免重複建立與銷毀</div>
  <div v-click="2" class="text-end text-blue font-500">Teleport</div>
  <div v-click="2" class="text-start opacity-80">將一個元件內部的一部分模板「傳送」到該元件 DOM 階層之外的某個 DOM 節點中進行渲染</div>
  <div v-click="3" class="text-end text-amber font-500">Transition</div>
  <div v-click="3" class="text-start opacity-80">用於在元素或元件進入與離開 DOM 時套用動畫效果</div>
  <div v-click="4" class="text-end text-cyan font-500">Suspense</div>
  <div v-click="4" class="text-start opacity-80">在元件樹中協調與管理非同步相依項目。當元件樹中有多個巢狀的非同步相依正在等待完成時，它可以先顯示載入中的狀態，直到這些非同步相依都被解析完成為止</div>
</div>

---

# KeepAlive {class="font-500"}
在多個元件之間動態切換時，有條件地快取元件實例，避免重複建立與銷毀

<div class="grid grid-cols-2 gap-6">

<div v-click>

<div>
  <span class="inline-block px-1.5 text-xs text-gray bg-gray/10 rounded">Without KeepAlive</span>
</div>

```vue {2}
<template>
  <component :is="TabComponent" />
</template>
```

</div>

<div v-click="3">

<div>
  <span class="inline-block px-1.5 text-xs text-lime bg-lime/10 rounded">With KeepAlive</span>
</div>

```vue {2-4}
<template>
  <KeepAlive>
    <component :is="TabComponent" />
  </KeepAlive>
</template>
```

</div>

<SwitchComponent v-click="2" />
<SwitchComponent v-click="4" use-keep-alive />

</div>

---

# KeepAlive {class="font-500"}
KeepAlive 的核心原理

<ul class="[&_li]:list-none [&_li]:ms-0 [&_li]:ps-0 space-y-1">
  <v-clicks>
    <li><span class="inline-block px-1.5 text-white bg-white/10 rounded">deactivate</span> 將元件從真實 DOM 中移除，並存放到一個「隱藏容器」中</li>
    <li><span class="inline-block px-1.5 text-lime bg-lime/10 rounded">activate</span> 將元件從「隱藏容器」中取出，重新放回真實 DOM 中</li>
  </v-clicks>
</ul>

<div class="grid grid-cols-[max-content_1fr] gap-6 mt-4">

<img v-click src="/KeepAlive.png" class="w-[330px] self-center" />

<div>

<v-clicks>

```ts
const storageContainer = createElement('div')

function deactivate(vnode) {
  move(vnode, storageContainer, null)
}

function activate(vnode, container, anchor) {
  move(vnode, container, anchor)
}
```

<span text-xs opacity-60>在這裡 `move` 本質上就是 `insertBefore` 操作，把 DOM 節點從一個容器移到另一個容器。</span>

</v-clicks>

</div>

</div>

---
clicks: 11
---

# KeepAlive {class="font-500"}
LRU（Least Recently Used）

當快取滿了需要騰出空間時，優先移除最久沒被使用的資料。

<ul class="[&_li]:list-none [&_li]:ms-0 [&_li]:ps-0 [&_li]:space-x-1 space-y-1">
  <v-clicks>
    <li><ph-check-square-duotone text-gray opacity-60/><span opacity-80>系統追蹤每筆資料的「最後存取時間」</span></li>
    <li><ph-check-square-duotone text-gray opacity-60/><span opacity-80>需要淘汰時，選擇最久沒被存取的那筆</span></li>
    <li><ph-check-square-duotone text-gray opacity-60/><span opacity-80>每次資料被存取，它就變成「最近使用」，不容易被淘汰</span></li>
  </v-clicks>
</ul>


<LeastRecentlyUsed v-click :clicks="4" class="mx-auto" />

---

# KeepAlive {class="font-500"}
在多個元件之間動態切換時，<span v-mark.circle="{ color: '#fbbf24' }">有條件地</span>快取元件實例，避免重複建立與銷毀

<div class="grid grid-cols-[max-content_1fr] gap-6">

<div>
  <div v-click>
    <span class="inline-block px-1.5 text-xs text-amber bg-amber/10 rounded">有條件地</span>
  </div>

  <ul class="[&_li]:list-none [&_li]:ms-0 space-y-1 mt-4">
    <v-clicks>
      <li class="flex gap-2 items-start">
        <ph-funnel-duotone text-lime mt-1 flex-shrink-0/>
        <span opacity-80><code>include</code> - 只快取符合的元件</span>
      </li>
      <li class="flex gap-2 items-start">
        <ph-prohibit-duotone text-lime mt-1 flex-shrink-0/>
        <span opacity-80><code>exclude</code> - 排除不需快取的元件</span>
      </li>
      <li class="flex gap-2 items-start">
        <ph-stack-duotone text-lime mt-1 flex-shrink-0/>
        <span opacity-80><code>max</code> - 限制快取數量 (LRU)</span>
      </li>
    </v-clicks>
  </ul>
</div>

<ScrollableCode max-height="380px">

```ts {*}{lines: true}
const cache = new Map()
const keys = new Set()

const max = 10
const include = // ...
const exclude = // ...

function create(name) {
  let instance
  if (
    (include && !matches(include, name)) ||
    (exclude && matches(exclude, name))
  ) {
    return vnode // 不快取，直接返回
  }

  // 快取邏輯 + LRU
  if (instance = cache.get(name)) {
    // 已存在：更新順序（移到最後）
    keys.delete(name)
    keys.add(name)
  } else {
    // 新增快取
    instance = createInstance()
    keys.add(name)
    cache.set(name, vnode)

    // 超過 max 時，移除最舊的
    if (max && keys.size > max) {
      const oldest = keys.values().next().value
      keys.delete(oldest)
      cache.delete(oldest)
    }
  }

  return instance
}
```

</ScrollableCode>

</div>

---

<div class="grid grid-cols-[max-content_1fr] gap-6">

<div>

# KeepAlive {class="font-500"}
實作細節

</div>

<ScrollableCode max-height="512px" >

```ts {*}{lines: true}
const KeepAliveImpl = {
  name: 'KeepAlive',
  __isKeepAlive: true,

  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number],
  },

  setup(props, { slots }) {
    const instance = getCurrentInstance()!
    const sharedContext = instance.ctx

    const cache = new Map<CacheKey, VNode>()
    const keys = new Set<CacheKey>()
    let current: VNode | null = null

    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement },
      },
    } = sharedContext

    // 隱藏容器
    const storageContainer = createElement('div')

    // 當快取的元件需要重新顯示時呼叫
    sharedContext.activate = (vnode, container, anchor) => {
      const instance = vnode.component!

      // 1. 將 DOM 移回真正的容器
      move(vnode, container, anchor)

      // 2. props 可能已變更，需要 patch 更新
      patch(instance.vnode, vnode, container, anchor, instance)

      // 3. 觸發 onActivated Hook
      queuePostRenderEffect(() => {
        instance.isDeactivated = false
        if (instance.a) {
          invokeArrayFns(instance.a)
        }
      })
    }

    // 當元件需要被快取時呼叫
    sharedContext.deactivate = (vnode: VNode) => {
      const instance = vnode.component!

      // 1. 將 DOM 移到隱藏容器
      move(vnode, storageContainer, null)

      // 2. 觸發 onDeactivated Hook
      queuePostRenderEffect(() => {
        if (instance.da) {
          invokeArrayFns(instance.da)
        }
        instance.isDeactivated = true
      })
    }

    function unmount(vnode: VNode) {
      resetShapeFlag(vnode)
      _unmount(vnode, instance, null, true)
    }

    function pruneCacheEntry(key: CacheKey) {
      const cached = cache.get(key)!
      if (!current || !isSameVNodeType(cached, current)) {
        unmount(cached)
      } else {
        resetShapeFlag(current)
      }
      cache.delete(key)
      keys.delete(key)
    }

    function pruneCache(filter: (name: string) => boolean) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type as ConcreteComponent)
        if (name && !filter(name)) {
          pruneCacheEntry(key)
        }
      })
    }

    // 監聽 include/exclude 變化
    watch(
      () => [props.include, props.exclude],
      ([include, exclude]) => {
        include && pruneCache(name => matches(include, name))
        exclude && pruneCache(name => !matches(exclude, name))
      },
      { flush: 'post', deep: true },
    )

    let pendingCacheKey: CacheKey | null = null

    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, instance.subTree)
      }
    }

    onMounted(cacheSubtree)
    onUpdated(cacheSubtree)

    onBeforeUnmount(() => {
      cache.forEach(cached => {
        const vnode = instance.subTree
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode)
          const da = vnode.component!.da
          da && queuePostRenderEffect(da)
          return
        }
        unmount(cached)
      })
    })

    return () => {
      pendingCacheKey = null

      if (!slots.default) {
        return (current = null)
      }

      const children = slots.default()
      const rawVNode = children[0]

      if (children.length > 1) {
        current = null
        return children
      }

      if (
        !isVNode(rawVNode) ||
        !(rawVNode.shapeFlag & 4 /* STATEFUL_COMPONENT */)
      ) {
        current = null
        return rawVNode
      }

      let vnode = rawVNode
      const comp = vnode.type as ConcreteComponent
      const name = getComponentName(comp)
      const { include, exclude, max } = props

      if (
        (include && (!name || !matches(include, name))) ||
        (exclude && name && matches(exclude, name))
      ) {
        vnode.shapeFlag &= ~256 /* COMPONENT_SHOULD_KEEP_ALIVE */
        current = vnode
        return rawVNode
      }

      const key = vnode.key == null ? comp : vnode.key
      const cachedVNode = cache.get(key)

      if (vnode.el) {
        vnode = cloneVNode(vnode)
      }

      pendingCacheKey = key

      if (cachedVNode) {
        vnode.el = cachedVNode.el
        vnode.component = cachedVNode.component
        vnode.shapeFlag |= 512 /* COMPONENT_KEPT_ALIVE */
        keys.delete(key)
        keys.add(key)
      } else {
        keys.add(key)
        if (max && keys.size > parseInt(max as string, 10)) {
          pruneCacheEntry(keys.values().next().value!)
        }
      }

      vnode.shapeFlag |= 256 /* COMPONENT_SHOULD_KEEP_ALIVE */
      current = vnode
      return vnode
    }
  },
}

export const KeepAlive = KeepAliveImpl
```

</ScrollableCode>

</div>

---

<div class="grid grid-cols-[max-content_1fr] gap-6">

<div>

# KeepAlive {class="font-500"}
渲染器設計

</div>

<div>

<v-clicks>

```ts
function unmount(vnode) {
  if (shapeFlag & 256 /* COMPONENT_SHOULD_KEEP_ALIVE */) {
    parentComponent.ctx.deactivate(vnode)
    return
  }
}
```

```ts
function patch(n1, n2e, container, anchor, parentComponent) {
  if (shapeFlag & 6 /* COMPONENT */) {
    if (n1 == null) {
      if (n2.shapeFlag & 512 /* COMPONENT_KEPT_ALIVE */) {
        parentComponent.ctx.activate(n2, container, anchor)
      } else {} // mountComponent
    } else {} // updateComponent
  }
}
```

```ts
function mountComponent(initialVNode) {
  // 判斷元件上的 `__isKeepAlive`
  if (isKeepAlive(initialVNode)) {
    instance.ctx.renderer = internals
  }
}
```

</v-clicks>

</div>

</div>

---

# Teleport {class="font-500"}
將一個元件內部的一部分模板「傳送」到該元件 DOM 階層之外的某個 DOM 節點中進行渲染

<div class="grid grid-cols-2 gap-4 mt-3">

<div>

<div class="flex gap-1 items-center text-red">
  <ph-warning-duotone flex-shrink-0/>
  <span opacity-80>「邏輯歸屬」與「渲染位置」無法分離</span>
</div>

```vue {2-5}
<template>
  <div class="card" style="overflow: hidden">
    <button @click="showModal = true">開啟 Modal</button>
    <div v-if="showModal" class="modal" />
  </div>
</template>
```

```html
<body>
  <div id="app">
    <div class="card" style="overflow: hidden">
      <button>開啟 Modal</button>
      <div class="modal"></div>
    <div>
  </div>
</body>
```

</div>

<div>

<ul class="[&_li]:list-none [&_li]:ms-0 [&_li]:ps-0 flex space-x-3">
  <li class="flex gap-1 items-center text-lime">
    <ph-check-circle-duotone flex-shrink-0/>
    <span opacity-80>逃脫 CSS 陷阱</span>
  </li>
  <li class="flex gap-1 items-center text-lime">
    <ph-check-circle-duotone flex-shrink-0/>
    <span opacity-80>逃脫 CSS 陷阱</span>
  </li>
</ul>

```vue {2-7}
<template>
  <div class="card" style="overflow: hidden">
    <button @click="showModal = true">開啟 Modal</button>
    <Teleport to="body">
      <div v-if="showModal" class="modal" />
    </Teleport>
  </div>
</template>
```

```html
<body>
  <div id="app">
    <div class="card" style="overflow: hidden">
      <button>開啟 Modal</button>
    <div>
    <div class="modal"></div>
  </div>
</body>
```

</div>

</div>

---

<div class="grid grid-cols-2 gap-4">

<div>

# Teleport {class="font-500"}
Teleport 的核心原理

Teleport 在掛載時將子節點渲染到指定的 DOM 目標容器（而非元件所在位置），實現「邏輯位置」與「渲染位置」的分離。

</div>

<div>

<a target="_blank" href="https://play.vuejs.org/#eNqFU02P0zAQ/StWLslKrbtoEYeqKWLRHkACqt29EYTSZFKyOLaxx6VVlf/O2E7aUtDuoR/j92bmjf3mkLzTmm8dJPNkYSvTamQW0Gm2LbUyy0K2Hf0iOzADDetZY1THUkpIj9CKvkoxIHwWQ1+TKIWslLRI1YQDlvsi2fVVIRez2IwaUIDQaVEiUMTYopXaUca0UzWIvEhCbpEw3GugULpuDYbiWaQP7VERtlb1vkjCOSF1u2XzusRyGkqcSi0Ph0FR3y9mRIuVBukULGZnkpJJgpbGaNoNf7JK0lUdPL9IKtXpVoD5orGlMYtkzgLisVII9ftjOEPjYDKeVz+g+vmf8ye782dFsjJgwWxJ5hHD0mwAI3z38Bl29P8I0jU5QexnwHuwSjivMdJunaxJ9hkvqP0Q3rOVm0d7t0OQdhzKC/XMPvDpGh28f2b0k9wb/jrkFbKnWzw549Jt5z5T8pNyEqGeMGfhcXiH+3/cN1pLG6UtWauGppWw8lH2NUWVfiOfjSSjFPoS+UXNLPVIGpjHxll2xfJlnCemx4ko23tQNbEnR8XyPGepRUOXRpL8+G9ZrSrXgUT+y4HZP4CACpXJxhzq5XnzYxHfOzZSArhQm2xQy4NHA99/ogjeSrIH3kKjDPzNnDDphCB+/8KG+cWgTaSF8PmnhbFC4bhWw1pcbsL3LRjvC3rBG/6GX0/XgCV/lfR/AH8WdN4=" class="flex gap-1 items-center m4-10">
  <ph-play-duotone flex-shrink-0/>
  <span opacity-80>Vue SFC Playground</span>
</a>

```vue
<script setup>
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps(['to'])

const rootRef = useTemplateRef('root')

onMounted(() => {
  const target = typeof props.to === 'string'
    ? document.querySelector(props.to)
    : props.to

  target.insertBefore(rootRef.value, null)
})
</script>

<template>
  <div ref="root">
    <slot />
  </div>
</template>
```

</div>

</div>

---

# Teleport {class="font-500"}
渲染器設計

<div class="flex items-center gap-1">
  <span class="inline-block px-1.5 text-xs text-green bg-green/10 rounded"><ph-lightbulb-duotone/> TIP</span><span>Inversion of Control (IoC)</span>
</div>

<div class="grid grid-cols-[1fr_max-content] gap-6 mt-4">

<div class="!space-y-2">

```ts
function patch(n1, n2, container) {
  const { type, shapeFlag } = n2

  if (shapeFlag & 64 /* TELEPORT */) {
    type.process(n1, n2, container, anchor, internals)
  }
}
```

```ts
const TeleportImpl = {
  name: 'Teleport',
  __isTeleport: true,
  process(n1, n2, container, anchor, internals) {
    // 在這裡處理渲染邏輯
  }
}
```

</div>

<div class="space-y-3">

<div v-click="1" class="border border-blue/30 rounded-lg p-3 bg-blue/5">
  <div class="flex items-center gap-2">
    <ph-tag-duotone text-blue/>
    <span class="text-blue font-500 text-sm">ShapeFlag 標記</span>
  </div>
  <div class="leading-relaxed opacity-70 text-xs mt-2">
    渲染器發現是 Teleport 元件後，<br/>不走一般的 mountComponent 流程
  </div>
</div>

<div v-click="2" class="border border-purple/30 rounded-lg p-3 bg-purple/5">
  <div class="flex items-center gap-2">
    <ph-arrows-clockwise-duotone text-purple/>
    <span class="text-purple font-500 text-sm">控制權轉移</span>
  </div>
  <div class="leading-relaxed opacity-70 text-xs mt-2">
    渲染器會把 patch, move, unmount ... 等方法裝進 <code>internals</code><br/>
    讓 Teleport 的 <code>process</code> 處理
  </div>
</div>

<div v-click="3" class="border border-green/30 rounded-lg p-3 bg-green/5">
  <div class="flex items-center gap-2">
    <ph-tree-duotone text-green/>
    <span class="text-green font-500 text-sm">Tree-shaking 友善</span>
  </div>
  <div class="leading-relaxed opacity-70 text-xs mt-2">
    如果沒用到 Teleport，相關程式碼可被移除
  </div>
</div>

</div>

</div>

---

<div class="grid grid-cols-[max-content_1fr] gap-6 mt-4">

<div>

# Teleport {class="font-500"}
實作細節

</div>

<div class="max-h-[502px] rounded overflow-y-auto [&_.slidev-code-wrapper]:!m-0">

```ts {*}{lines: true}
const TeleportImpl = {
  name: 'Teleport',
  __isTeleport: true,

  process(n1, n2, container, anchor, parentComponent, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      o: { insert, querySelector, createText },
    } = internals

    if (n1 == null) {
      // Insert placeholder anchors in main view
      const placeholder = (n2.el = createText(''))
      const mainAnchor = (n2.anchor = createText(''))
      insert(placeholder, container, anchor)
      insert(mainAnchor, container, anchor)

      // Resolve target and create target anchors
      const target = (n2.target = resolveTarget(n2.props, querySelector))
      const targetStart = (n2.targetStart = createText(''))
      const targetAnchor = (n2.targetAnchor = createText(''))

      if (target) {
        insert(targetStart, target)
        insert(targetAnchor, target)

        // Mount children to target
        if (n2.shapeFlag & 16 /* ARRAY_CHILDREN */) {
          mountChildren(n2.children, target, targetAnchor, parentComponent)
        }
      }
    } else {
      // Inherit DOM references
      n2.el = n1.el
      n2.anchor = n1.anchor
      n2.target = n1.target
      n2.targetStart = n1.targetStart
      n2.targetAnchor = n1.targetAnchor

      const target = n2.target
      const targetAnchor = n2.targetAnchor

      // Patch children in target
      if (target) {
        patchChildren(n1, n2, target, targetAnchor, parentComponent)
      }
    }
  },

  remove(vnode, parentComponent, internals, doRemove) {
    const { um: unmount, o: { remove: hostRemove } } = internals
    const { shapeFlag, children, anchor, targetStart, targetAnchor, target } = vnode

    // Remove target anchors
    if (target) {
      hostRemove(targetStart)
      hostRemove(targetAnchor)
    }

    // Remove main anchor
    if (doRemove) {
      hostRemove(anchor)
    }

    // Unmount children
    if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
      for (let i = 0; i < children.length; i++) {
        unmount(children[i], parentComponent, doRemove)
      }
    }
  },

  move(vnode, container, parentAnchor, internals) {
    const { o: { insert }, m: move } = internals
    const { el, anchor, shapeFlag, children } = vnode

    // Move main view anchors
    insert(el, container, parentAnchor)

    // Move children
    if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, parentAnchor)
      }
    }

    // Move end anchor
    insert(anchor, container, parentAnchor)
  },
}

export const Teleport = TeleportImpl
```

</div>

</div>

---

# Transition {class="font-500"}
原生 DOM 的轉場

<div class="grid grid-cols-2 gap-4">

<div>

<div>
  <span class="inline-block px-1.5 text-xs text-purple bg-purple/10 rounded">CSS</span>
</div>

```css
.box {
	width: 100px;
	height: 100px;
	background-color: red;
}

.enter-from {
	transform: translateX(200px);
}

.enter-to {
	transform: translateX(0px);
}

.enter-active {
	transition: transform 1s ease-in-out;
}
```

</div>

<div>

<div>
  <span class="inline-block px-1.5 text-xs text-amber bg-amber/10 rounded">JavaScript</span>
</div>

````md magic-move
```ts
const node = document.createElement('div')
node.classList.add('box')

node.classList.add('enter-from')
node.classList.add('enter-active')

document.body.appendChild(node)
```
```ts
const node = document.createElement('div')
node.classList.add('box')

node.classList.add('enter-from')
node.classList.add('enter-active')

document.body.appendChild(node)

node.classList.remove('enter-from')
node.classList.add('enter-to')
```
```ts
const node = document.createElement('div')
node.classList.add('box')

node.classList.add('enter-from')
node.classList.add('enter-active')

document.body.appendChild(node)

requestAnimationFrame(() => {
  node.classList.remove('enter-from')
  node.classList.add('enter-to')
})
```
```ts
const node = document.createElement('div')
node.classList.add('box')

node.classList.add('enter-from')
node.classList.add('enter-active')

document.body.appendChild(node)

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    node.classList.remove('enter-from')
    node.classList.add('enter-to')
  })
})
```
````

<a v-click href="https://issues.chromium.org/issues/41292070" target="_blank" class="inline-flex text-sm text-red !hover:text-red-700">
  <ph-bug-beetle-duotone mt-0.5/>
  <span class="ms-1.5">Interop: mismatch in when animations are started between different browsers</span>
</a>

</div>

</div>

---

# Transition {class="font-500"}
Transition 的核心原理

<div class="grid grid-cols-2 gap-4">

```ts {*|3-4|6-9,12-13|10-11|15-25}
const node = document.createElement('div')

node.classList.add('enter-from')
node.classList.add('enter-active')

document.body.appendChild(node)

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    node.classList.remove('enter-from')
    node.classList.add('enter-to')
  })
})

node.addEventListener('transitionend', callback)

function callback () {
  node.classList.remove('enter-to')
  node.classList.remove('enter-active')
  node.removeEventListener('transitionend', callback)
}
```

<img src="/Transition.png" class="self-center" />

</div>

---

<v-click at="2">

# Transition {class="font-500"}
Transition 的核心原理

</v-click>

<div class="grid grid-cols-2 gap-6">

<div>

<div class="relative">
<v-click at="2">在對應的 VNode 上加上 </v-click> <span class="font-500">
  <span aria-hidden="true" op-0>vnode.transition</span>
  <span
    class="absolute transition-all duration-500"
    :class="[$clicks < 2 ? 'top-4/1 left-full -translate-x-1/2 translate-y-1/2 scale-200' : 'top-0 left-0 translate-x-10.9em translate-y-0 scale-100']"
  >
    <span class="relative transition-all duration-500" :class="$clicks < 1 ? 'left-2.25em' : 'left-0'">
      vnode<span transition-all duration-800 v-click>.transition</span>
    </span>
  </span>
</span> <v-click at="2"> 裡面包涵：</v-click> 
</div>

<ul class="[&_li]:list-none [&_li]:ms-0 [&_li]:ps-0 space-y-1 mt-4">
  <v-clicks at="3">
    <li><span class="inline-block px-1.5 text-lime bg-lime/10 rounded">beforeEnter</span>：設定初始狀態</li>
    <li><span class="inline-block px-1.5 text-lime bg-lime/10 rounded">enter</span>：在下一幀切換到結束狀態</li>
    <li><span class="inline-block px-1.5 text-lime bg-lime/10 rounded">leave</span>：設定離場初始狀態</li>
  </v-clicks>
</ul>

</div>

<v-click at="6">

```ts
const TransitionImpl = {
  name: 'Transition',
  props: TransitionPropsValidators,
  setup(props, { slots }) {
    return () => {
      const child = slots.default()[0]

      child.transition = {
        beforeEnter(el) {},
        enter(el) {},
        leave(el, performRemove) {}
      }

      return child
    }
  }
}
```

</v-click>

</div>

---

# Transition {class="font-500"}
渲染器設計

<div class="grid grid-cols-2 gap-4">

```ts
function mountElement(vnode, container, anchor) {
  const el = vnode.el = createElement(vnode.type)

  const needTransition = vnode.transition
  if (needTransition) {
    vnode.transition.beforeEnter(el)
  }

  insert(el, container, anchor)
  if (needTransition) {
    vnode.transition.enter(el)
  }
}
```

```ts
function unmount(vnode) {
  const needTransition = vnode.transition
  
  const parent = vnode.el.parentNode
  if (parent) {
    const performRemove = () =>
      parent.removeChild(vnode.el)

    if (needTransition) {
      vnode.transition.leave(vnode.el, performRemove)
    } else {
      performRemove()
    }
  }
}
```

</div>

---

<div class="grid grid-cols-[max-content_1fr] gap-4 mt-4">

<div>

# Transition {class="font-500"}
實作細節

</div>

<div class="max-h-[502px] rounded overflow-y-auto [&_.slidev-code-wrapper]:!m-0">

```ts {*}{lines: true}
const TransitionImpl = {
  name: 'Transition',
  props: {
    name: {
      type: String,
      default: 'v'
    }
  },
  setup(props, { slots }) {
    return () => {
      const child = slots.default()[0]
      const name = props.name

      child.transition = {
        beforeEnter(el) {
          el.classList.add(`${name}-enter-from`)
          el.classList.add(`${name}-enter-active`)
        },

        enter(el) {
          nextFrame(() => {
            el.classList.remove(`${name}-enter-from`)
            el.classList.add(`${name}-enter-to`)

            el.addEventListener('transitionend', function callback() {
              el.classList.remove(`${name}-enter-to`)
              el.classList.remove(`${name}-enter-active`)
              el.removeEventListener('transitionend', callback)
            })
          })
        },

        leave(el, performRemove) {
          el.classList.add(`${name}-leave-from`)

          // 強制 reflow，確保 leave-from 樣式生效
          void document.body.offsetHeight

          // reflow 後才加 leave-active
          el.classList.add(`${name}-leave-active`)

          nextFrame(() => {
            el.classList.remove(`${name}-leave-from`)
            el.classList.add(`${name}-leave-to`)

            el.addEventListener('transitionend', function callback() {
              el.classList.remove(`${name}-leave-to`)
              el.classList.remove(`${name}-leave-active`)
              el.removeEventListener('transitionend', callback)
              performRemove()
            })
          })
        }
      }

      return child
    }
  }
}

export const Transition = TransitionImpl
```

</div>

</div>

---

# Suspense {class="font-500"}
基本概念與使用

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

<div class="flex items-start gap-3 mb-4">
  <ph-clock-countdown-duotone text-cyan text-2xl mt-1 flex-shrink-0/>
  <div>
    <div class="text-cyan font-500">非同步依賴協調器</div>
    <div class="opacity-60 text-sm">等待所有非同步子元件載入完成後才顯示內容</div>
  </div>
</div>

<div class="flex items-start gap-3 mb-4">
  <ph-swap-duotone text-amber text-2xl mt-1 flex-shrink-0/>
  <div>
    <div class="text-amber font-500">雙插槽設計</div>
    <div class="opacity-60 text-sm"><code>#default</code> 主要內容 / <code>#fallback</code> 後備內容</div>
  </div>
</div>

<div class="flex items-start gap-3">
  <ph-funnel-duotone text-purple text-2xl mt-1 flex-shrink-0/>
  <div>
    <div class="text-purple font-500">收集非同步依賴</div>
    <div class="opacity-60 text-sm">async setup()、defineAsyncComponent</div>
  </div>
</div>

</div>

<div>

```html {*}{lines: true}
<Suspense>
  <!-- 主要內容（可能包含非同步元件） -->
  <template #default>
    <AsyncComponent />
  </template>

  <!-- 後備內容（載入中顯示） -->
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

<div class="mt-3 border border-amber/30 rounded p-2 bg-amber/5">
  <div class="text-xs opacity-70">
    <ph-warning-duotone text-amber class="inline mr-1"/>
    <span class="text-amber font-500">實驗性功能</span>：API 可能在未來版本變更
  </div>
</div>

</div>

</div>

---

# Suspense {class="font-500"}
核心邏輯

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="space-y-3">

<v-clicks>

<div class="border border-cyan/30 rounded-lg p-4 bg-cyan/5">
  <div class="flex items-center gap-2 mb-2">
    <ph-browser-duotone text-cyan/>
    <span class="text-cyan font-500">container</span>
  </div>
  <div class="opacity-60 text-xs">
    實際 DOM 容器<br/>
    顯示 <code class="text-green">activeBranch</code>（fallback 或已解析內容）
  </div>
</div>

<div class="border border-purple/30 rounded-lg p-4 bg-purple/5">
  <div class="flex items-center gap-2 mb-2">
    <ph-eye-slash-duotone text-purple/>
    <span class="text-purple font-500">hiddenContainer</span>
  </div>
  <div class="opacity-60 text-xs">
    離線渲染容器（不在 DOM 樹中）<br/>
    存放 <code class="text-amber">pendingBranch</code>（非同步內容）
  </div>
</div>

<div class="border border-green/30 rounded-lg p-3 bg-green/5">
  <div class="flex items-center gap-2">
    <ph-lightbulb-duotone text-green/>
    <span class="text-green font-500 text-sm">避免閃爍</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    非同步內容在隱藏容器完成渲染後<br/>
    才移動到實際容器顯示
  </div>
</div>

</v-clicks>

</div>

<img class="self-center w-1/3 mx-auto" src="/Suspense.png" />

</div>

---

# Suspense {class="font-500"}
核心邏輯

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

```ts {*}{lines: true}
const SuspenseImpl = {
  name: 'Suspense',
  __isSuspense: true,
  process(n1, n2, container, ..., internals) {
    if (n1 == null) {
      mountSuspense(n2, container, ...)
    } else {
      patchSuspense(n1, n2, container, ...)
    }
  }
}
```

</div>

<div class="space-y-3">

<v-clicks>

<div class="border border-cyan/30 rounded-lg p-3 bg-cyan/5">
  <div class="flex items-center gap-2">
    <ph-cube-duotone text-cyan/>
    <span class="text-cyan font-500 text-sm">mountSuspense</span>
  </div>
  <div class="opacity-60 text-xs mt-1">首次掛載，建立 SuspenseBoundary</div>
</div>

<div class="border border-amber/30 rounded-lg p-3 bg-amber/5">
  <div class="flex items-center gap-2">
    <ph-arrows-clockwise-duotone text-amber/>
    <span class="text-amber font-500 text-sm">patchSuspense</span>
  </div>
  <div class="opacity-60 text-xs mt-1">更新邏輯，處理多種狀態切換</div>
</div>

<div class="border border-purple/30 rounded-lg p-3 bg-purple/5">
  <div class="flex items-center gap-2">
    <ph-tree-structure-duotone text-purple/>
    <span class="text-purple font-500 text-sm">控制反轉 (IoC)</span>
  </div>
  <div class="opacity-60 text-xs mt-1">渲染器委派給 SuspenseImpl 處理</div>
</div>

</v-clicks>

</div>

</div>


---

# Suspense {class="font-500"}
SuspenseBoundary 核心屬性

<div class="grid grid-cols-[max-content_1fr] gap-4 mt-4">

```ts
interface SuspenseBoundary {
  deps: number // 非同步依賴計數
  pendingId: number                 // 待處理分支的唯一 ID
  effects: Function[]               // 緩衝的 post-render effects
  isInFallback: boolean             // 狀態標記
  activeBranch: VNode | null        // 當前顯示分支
  pendingBranch: VNode | null       // 待處理分支
  container: RendererElement        // 實際容器
  hiddenContainer: RendererElement  // 隱藏容器
  resolve(force?, sync?): void
  fallback(fallbackVNode): void
  registerDep(instance, setupRenderEffect): void
}
```

<div class="space-y-3">

<v-clicks>

<div class="border border-cyan/30 rounded-lg p-3 bg-cyan/5">
  <div class="flex items-center gap-2">
    <ph-hash-duotone text-cyan/>
    <span class="text-cyan font-500 text-sm">deps</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    追蹤非同步依賴數量<br/>
    <code>deps === 0</code> 時觸發 resolve
  </div>
</div>

<div class="border border-amber/30 rounded-lg p-3 bg-amber/5">
  <div class="flex items-center gap-2">
    <ph-fingerprint-duotone text-amber/>
    <span class="text-amber font-500 text-sm">pendingId</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    唯一 ID 追蹤每個待處理分支<br/>
    防止過期回呼執行
  </div>
</div>

<div class="border border-purple/30 rounded-lg p-3 bg-purple/5">
  <div class="flex items-center gap-2">
    <ph-stack-duotone text-purple/>
    <span class="text-purple font-500 text-sm">effects</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    緩衝 onMounted、watchEffect 等<br/>
    直到 resolve 後才執行
  </div>
</div>

<div class="border border-green/30 rounded-lg p-3 bg-green/5">
  <div class="flex items-center gap-2">
    <ph-toggle-left-duotone text-green/>
    <span class="text-green font-500 text-sm">isInFallback</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    標記當前是否顯示 fallback 內容
  </div>
</div>

</v-clicks>

</div>

</div>

---

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="space-y-2 text-sm">

# Suspense {class="font-500"}
掛載流程 (mountSuspense)

<v-clicks>
  <div class="flex items-center gap-2 p-2 bg-cyan/10 rounded">
    <ph-number-circle-one-duotone text-cyan/>
    <span class="opacity-80">建立隱藏容器 <code>createElement('div')</code></span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-cyan/10 rounded">
    <ph-number-circle-two-duotone text-cyan/>
    <span class="opacity-80">建立 SuspenseBoundary 實例</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-amber/10 rounded border border-amber/30">
    <ph-number-circle-three-duotone text-amber/>
    <span class="text-amber">離線渲染 ssContent 到隱藏容器</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-cyan/10 rounded">
    <ph-number-circle-four-duotone text-cyan/>
    <span class="opacity-80">檢查 <code>suspense.deps</code></span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-purple/10 rounded">
    <ph-git-branch-duotone text-purple/>
    <span class="opacity-80">deps > 0 → 顯示 fallback</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-green/10 rounded">
    <ph-git-branch-duotone text-green/>
    <span class="opacity-80">deps === 0 → 直接 resolve</span>
  </div>
</v-clicks>
</div>

<div>

```ts
function mountSuspense(vnode, container, ...) {
  // 1. 建立隱藏容器
  const hiddenContainer = createElement('div')

  // 2. 建立邊界
  const suspense = createSuspenseBoundary(...)
  vnode.suspense = suspense

  // 3. 離線渲染主要內容
  patch(null, vnode.ssContent, hiddenContainer, ...)
  suspense.pendingBranch = vnode.ssContent

  // 4. 檢查非同步依賴
  if (suspense.deps > 0) {
    // 掛載 fallback 到實際容器
    patch(null, vnode.ssFallback, container, ...)
    setActiveBranch(suspense, vnode.ssFallback)
  } else {
    // 無非同步依賴，直接解析
    suspense.resolve(false, true)
  }
}
```

</div>

</div>

---
<div class="grid grid-cols-2 gap-6 mt-4">

<div class="space-y-3">

# Suspense {class="font-500"}
registerDep 非同步依賴註冊

<v-clicks>

<div class="border border-amber/30 rounded-lg p-3 bg-amber/5">
  <div class="flex items-center gap-2">
    <ph-code-duotone text-amber/>
    <span class="text-amber font-500 text-sm">觸發時機</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    子元件 <code>setup()</code> 回傳 Promise<br/>
    <code>instance.asyncDep = setupResult</code>
  </div>
</div>

<div class="border border-cyan/30 rounded-lg p-3 bg-cyan/5">
  <div class="flex items-center gap-2">
    <ph-arrow-fat-up-duotone text-cyan/>
    <span class="text-cyan font-500 text-sm">註冊階段</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    渲染器呼叫 <code>suspense.registerDep()</code><br/>
    <code class="text-cyan">suspense.deps++</code>
  </div>
</div>

<div class="border border-green/30 rounded-lg p-3 bg-green/5">
  <div class="flex items-center gap-2">
    <ph-arrow-fat-down-duotone text-green/>
    <span class="text-green font-500 text-sm">解析階段</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    Promise resolve 後執行渲染<br/>
    <code class="text-green">suspense.deps--</code>
  </div>
</div>

<div class="border border-purple/30 rounded-lg p-3 bg-purple/5">
  <div class="flex items-center gap-2">
    <ph-check-circle-duotone text-purple/>
    <span class="text-purple font-500 text-sm">完成條件</span>
  </div>
  <div class="opacity-60 text-xs mt-1">
    <code>deps === 0</code> 時觸發 <code>suspense.resolve()</code>
  </div>
</div>

</v-clicks>

</div>

<div>

```ts
registerDep(instance, setupRenderEffect) {
  // 增加依賴計數
  if (isInPendingSuspense) {
    suspense.deps++
  }

  instance.asyncDep
    .catch(handleError)
    .then(asyncSetupResult => {
      // 檢查是否過期或已卸載
      if (instance.isUnmounted ||
          suspense.pendingId !== instance.suspenseId) {
        return
      }

      // 處理 setup 結果並渲染
      handleSetupResult(instance, asyncSetupResult)
      setupRenderEffect(instance, vnode, ...)

      // 減少依賴計數
      if (--suspense.deps === 0) {
        suspense.resolve()
      }
    })
}
```

</div>

</div>

---

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="space-y-2 text-sm">

# Suspense {class="font-500"}
resolve 解析機制

<v-clicks>
  <div class="flex items-center gap-2 p-2 bg-red/10 rounded">
    <ph-number-circle-one-duotone text-red/>
    <span class="opacity-80">卸載 activeBranch (fallback)</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-green/10 rounded border border-green/30">
    <ph-number-circle-two-duotone text-green/>
    <span class="text-green">移動 pendingBranch 到實際容器</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-cyan/10 rounded">
    <ph-number-circle-three-duotone text-cyan/>
    <span class="opacity-80">更新 activeBranch 指向</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-purple/10 rounded">
    <ph-number-circle-four-duotone text-purple/>
    <span class="opacity-80">檢查上層 Suspense</span>
  </div>
  <div class="flex items-center gap-2 p-2 bg-amber/10 rounded">
    <ph-number-circle-five-duotone text-amber/>
    <span class="opacity-80">更新緩衝的 effects</span>
  </div>
</v-clicks>
</div>

<div>

```ts
resolve(resume = false, sync = false) {
  const { activeBranch, pendingBranch, effects } = suspense

  // 1. 卸載 fallback
  if (activeBranch) unmount(activeBranch, ...)

  // 2. 移動內容到實際容器
  move(pendingBranch, container, anchor)
  setActiveBranch(suspense, pendingBranch)

  // 3. 更新 effects（檢查上層）
  let parent = suspense.parent
  let hasUnresolvedAncestor = false
  while (parent) {
    if (parent.pendingBranch) {
      parent.effects.push(...effects)
      hasUnresolvedAncestor = true
      break
    }
    parent = parent.parent
  }
  if (!hasUnresolvedAncestor) {
    queuePostFlushCb(effects)
  }
}
```

</div>

</div>

---
layout: intro
class: text-center pb-5
---

# Thank you! {.font-hand.italic}
