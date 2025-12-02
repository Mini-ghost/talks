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
title: 為你寫的 Vue Components
clicks: 1
---

<h1 class="flex gap-2 transition-transform duration-800" :class="{ 'translate-x-[-0.55em]': $clicks === 1 }">
  <div class="text-end h-1em overflow-hidden">
    <div class="transition-transform duration-800" :class="{ 'translate-y-[-1.125em]': $clicks === 1 }">
      <div aria-hidden="true">為你自己寫</div>
      <div>為你寫的</div>
    </div>
  </div>
  <strong class="tagline ps-px">Vue Components</strong>
</h1>

打造高品質 Vue Components 的設計實戰指南

<img src="https://dmh6legpso131.cloudfront.net/images/logo_white.svg" class="absolute bottom-10 right-10 w-[120px]" />

---
class: pl-30 py-30
---

# Alex Liu

Vue / Nuxt / TypeScript

<div class="opacity-60">

  <div class="[&_ul]:list-none [&_ul]:mt-4 [&_li]:m-0 [&_li]:p-0">

  - 曜比科技 資深前端工程師
  - Nuxt Ecosystem Team 成員
  - 第 16 屆 iThome 鐵人賽 Modern Web 組冠軍
  - 為你寫的 Vue Components 作者

  </div>
</div>

<img src="https://talks.mini-ghost.dev/2023/open-source-adventure/alex-liu.jpeg" width="140" height="140" class="rounded-full w-35 abs-tr mt-30 mr-60" />

<div class="absolute flex items-center gap-x-4 bottom-30 text-sm">
  <div class="flex items-center space-x-1.5">
    <carbon-user class="opacity-40" />
    <a href="https://mini-ghost.dev/" target="_blank" class="border-none! font-300">mini-ghost.dev</a>
  </div>
  <div class="flex items-center space-x-1.5">
    <ph-threads-logo class="opacity-40" />
    <a href="https://www.threads.com/@minighost.dev" target="_blank" class="border-none! font-300">@minighost.dev</a>
  </div>
  <div class="flex items-center space-x-1.5">
    <ph-github-logo class="opacity-40" />
    <a href="https://github.com/Mini-ghost" target="_blank" class="border-none! font-300">Mini-ghost</a>
  </div>
</div>

---
class: grid place-content-center
---

## 關於《為你寫的 Vue Components》{.!text-2xl.text-center}

<div class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 items-center mt-12">
  <div v-click class="text-3xl text-end font-bold">5 次</div>
  <div v-click class="text-start opacity-50">重複實作相同的元件</div>

  <div v-click class="text-3xl text-end font-bold">5 個月</div>
  <div v-click class="text-start opacity-50">從無到有實作元件與文章撰寫</div>

  <div v-click class="text-3xl text-end font-bold">5 個月</div>
  <div v-click class="text-start opacity-50">出版準備（調整內容、校稿、校稿、校稿）</div>

  <!-- 3972 + 7504 + 8917 + 6066 + 14775 + 12956 + 21012 + 10867 + 14745 + 10379 + 9713 + 6530 + 6795 + 4785 + 10775 + 11926 + 8161 + 15634 + 9895 + 13569 + 8303 + 14867 + 8307 + 21325 + 9804 + 7889 + 8629 + 9975 + 7950 -->
  <div v-click class="text-3xl text-end font-bold">30.6 萬字</div>
  <div v-click class="text-start opacity-50">元件架構、UI Library 比較、實作、無障礙</div>

  <div v-click class="text-3xl text-end font-bold">27 個</div>
  <div v-click class="text-start opacity-50">常見的元件</div>

  <div v-click class="text-3xl text-end font-bold">1 篇</div>
  <div v-click class="text-start opacity-50">Server Side Rendering 常忽略的細節</div>
</div>

---
layout: intro
class: text-center pb-5
---

<h1 class="font-500">每次斟酌 每個段落<br>是妳應得的溫柔</h1>

方大同 (Khalil Fong)，《為你寫的情歌》

---
class: grid place-content-center text-center font-500
clicks: 1
---

<div class="text-6xl font-600 h-1em overflow-hidden text-[#42d392]">
  <div class="transition-transform duration-800" :class="{ 'translate-y-[-1em]': $clicks === 1 }">
    <div>Good Code</div>
    <div>Good Components</div>
  </div>
</div>

is a love letter to the next developer who will maintain it.

---

<div class="grid grid-cols-[max-content_1fr] gap-8 pl-20 pt-12">

<div class="grid place-content-start">
  <h1 class="text-end font-500">良好的<br />元件設計</h1>
</div>

<div class="grid grid-cols-1 gap-2">
  <div v-click class="relative flex flex-col gap-1 p-4 rounded bg-green/15 text-green-100 pl-18 overflow-hidden">
    <div class="absolute left-[-0.25em] bottom-[-0.25em] text-8xl i-ph-stack-duotone text-green opacity-40" />
    <div class="font-500">明確的分層與責任劃分</div>
    <div class="text-xs opacity-60">明確可依循的架構規範，元件不做什麼與可以做什麼一樣重要</div>
  </div>

  <div v-click class="relative flex flex-col gap-1 p-4 rounded bg-violet/15 text-violet-100 pl-18 overflow-hidden">
    <div class="absolute left-[-0.25em] bottom-[-0.25em] text-8xl i-ph-sliders-horizontal-duotone text-violet opacity-40" />
    <div class="font-500">靈活但適當的使用場景</div>
    <div class="text-xs opacity-60">避免孤芳自賞，為使用者設計元件而不是為自己設計元件</div>
  </div>

  <div v-click class="relative flex flex-col gap-1 p-4 rounded bg-orange/15 text-orange-100 pl-18 overflow-hidden">
    <div
      class="absolute left-[-0.25em] bottom-[-0.25em] text-8xl i-ph-person-arms-spread-duotone text-orange opacity-40" />
    <div class="font-500">良好的 HTML 與無障礙</div>
    <div class="text-xs opacity-60">選對 HTML 少奮鬥幾百行程式碼</div>
  </div>

  <div v-click class="relative flex flex-col gap-1 p-4 rounded bg-blue/15 text-blue-100 pl-18 overflow-hidden">
    <div class="absolute left-[-0.25em] bottom-[-0.25em] text-8xl i-ph-cloud-duotone text-blue opacity-40" />
    <div class="font-500">支援 Server-Side Rendering</div>
    <div class="text-xs opacity-60">留意 SSR 的眉角，讓元件更加通用</div>
  </div>
</div>

</div>

---
layout: intro
class: text-center
---

## <ph-stack-duotone /> 明確的分層與責任劃分

---

<div class="grid grid-cols-[minmax(0,1fr)_max-content] gap-8 place-items-end">

<img src="https://bradfrost.com/wp-content/uploads/2013/06/atomic-design.png" />

<h1 class="font-500"> Atomic Design <br /> by Brad Frost</h1>

</div>

--- 

# 原子化設計（Atomic Design）{.font-500}

<div class="grid grid-cols-[max-content_1fr] gap-6 px-20 mt-12">
  <div v-click class="text-end">
    <div><ph-atom-duotone /> 原子</div>
    <div class="opacity-60 text-sm"> Atoms</div>
  </div>
  <div v-click>具有最高的重用性，只要調整樣式設定就可以跨專案使用。原子元件可以貼近但不專為特定需求服務。</div>

  <div v-click class="text-end">
    <div><ph-squares-four-duotone /> 分子</div>
    <div class="opacity-60 text-sm">Molecules</div>
  </div>
  <div v-click>可能是由原子組成的元件，更多時候是與特定專案高度耦合的元件，牽涉到專案獨有的業務邏輯。</div>

  <div v-click class="text-end">
    <div><ph-tree-structure-duotone /> 組織</div>
    <div class="opacity-60 text-sm">Organisms</div>
  </div>
  <div v-click>與專案緊密耦合，更可能與特定的模板、頁面高度整合。組織元件可以直接與後端 API 或資料模組有所耦合。</div>

  <div v-click class="text-end">
    <div><ph-layout-duotone /> 模板</div>
    <div class="opacity-60 text-sm">Templates</div>
  </div>
  <div v-click>高度重複的頁面結構，模板層就會起到很大的作用。</div>

  <div v-click class="text-end">
    <div><ph-browsers-duotone /> 頁面</div>
    <div class="opacity-60 text-sm">Pages</div>
  </div>
  <div v-click>最高層的元件，負責整合所有的元件，並且與後端 API 進行溝通。</div>
</div>

---

<div
  class="flex justify-center items-center gap-x-1em transition duration-800 [&_h2]:transition [&_h2]:duration-800 [&_h2]:!text-3rem [&_h2]:font-600"
  :class="{
    'translate-y-200px': $clicks < 1
  }"
>
  <div>
    <h2 :class="{ 'translate-x-4.45em': $clicks < 1 }">
      B<span v-click="1" >lock</span>
    </h2>
    <div v-click="2" class="text-sm opacity-60 mt-2">區塊</div>
  </div>
  <div>
    <h2 :class="{ 'translate-x-2.178em': $clicks < 1 }">
      E<span v-click="1">lement</span>
    </h2>
    <div v-click="2" class="text-sm opacity-60 mt-2">元素</div>
  </div>
  <div>
    <h2 :class="{ '-translate-x-1.42em': $clicks < 1 }">
      M<span v-click="1">odifier</span>
    </h2>
    <div v-click="2" class="text-sm opacity-60 mt-2">修飾符</div>
  </div>
</div>

<div class="grid grid-cols-2 items-center gap-4 mt-10">

<img v-click="3" src="/atomic-button-architecture.png" class="bg-white p-3 rounded-md" />

<v-click at="4">

```html
<button class="atomic-button atomic-button--primary">
  <span class="atomic-button__prepend"></span>
  <span class="atomic-button__content">按鈕</span>
  <span class="atomic-button__append"></span>
</button>
```

</v-click>

</div>

<ul class="[&_li]:list-none [&_li]:m-0 text-green mt-10">
  <v-clicks at="5">
    <li><ph-check-circle-duotone/> 語義化命名，清晰地描述元件的層級和關聯性</li>
    <li><ph-check-circle-duotone/> 減少巢狀層級，提升渲染效率和程式碼的簡潔性</li>
    <li><ph-check-circle-duotone/> 模組化開發，避免選擇器衝突</li>
    <li class="text-gray">
      <ph-smiley-meh/> 樣式可能比較難從外部覆蓋
    </li>
  </v-clicks>
</ul>

<div v-click="9" class="w-fit">

```vue
<AtomicButton class="block" />
```
</div>

---

## clsx + tailwind-merge + class-variance-authority {.font-500.mb-4}

<p class="opacity-50 [&&]:-mt-2 [&&]:mb-4">Inspired by Shadcn</p>

<div class="mt-4 space-y-1">

<v-click>

<div>
  <span class="px-1.5 text-sm text-[#38bdf8] bg-[#38bdf8]/20 rounded">tailwind-merge</span>
</div>

<div class="text-sm">合併 Tailwind CSS classes 避免發生樣式的衝突</div>

<div class="grid grid-cols-2 gap-4">

```ts
twMerge('px-2 bg-red hover:bg-green', 'p-3 bg-[#B91C1C]')
```

```text
'hover:bg-green p-3 bg-[#B91C1C]'
```

</div>

</v-click>

<v-click>

<div>
  <span class="px-1.5 text-sm text-purple bg-purple/20 rounded">class-variance-authority</span>
</div>

<div class="text-sm">宣告樣式變化（variants）的 function，把零散的 Tailwind / className 規則收斂成一個好維護又有型別的 class 生成函式。</div>

<div class="grid grid-cols-2 gap-4">

```ts 
const buttonVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      contained:'text-white border-transparent',
      outlined: 'bg-white border-white',
    },
  },
  defaultVariants: {
    variant: "contained",
  }
})
```

```ts
buttonVariants()
// → 'inline-flex items-center text-white border-transparent'

buttonVariants({ variant: 'outlined' })
// → 'inline-flex items-center bg-white border-white'
```

</div>

</v-click>

</div>

---
layout: intro
class: text-center
---

## <ph-sliders-horizontal-duotone /> 靈活的使用場景

---

## \<AtomicTabs /\> 的 onBeforeChange {.font-500}

<p class="opacity-60 !my-2"><code>onBeforeChange</code> 可以讓開發人員在使用者切換 Tab 前做一些事情，像是可以用於決定是否切換 Tab。</p>

<div v-click="1" class="grid grid-cols-2 gap-4 mt-4">

````md magic-move {at:2}
```ts
const onTabClick = (value) => {
  if (props.modelValue === value) return;

  const { onBeforeChange } = props;

  if (onBeforeChange) {
    onBeforeChange(value, (valid) => {
      if (valid === false) return;
      emit('update:modelValue', value);
    });

    return;
  }

  emit('update:modelValue', value);
};
```

```ts
const onTabClick = (value) => {
  if (props.modelValue === value) return;

  const { onBeforeChange } = props;

  if (onBeforeChange) {
    onBeforeChange(value, (valid) => {
      if (valid === false) return;
      emit('update:modelValue', value);
    });

    return;
  }

  emit('update:modelValue', value);
};
```

```ts
const onTabClick = (value) => {
  if (props.modelValue === value) return;

  const { onBeforeChange } = props;

  if (onBeforeChange) {
    onBeforeChange(value, (valid) => {
      if (valid === false) return;
      emit('update:modelValue', value);
    });

    return;
  }

  emit('update:modelValue', value);
};
```

```ts
const onTabClick = () => {
  if (props.modelValue === value) return;

  const { onBeforeChange } = props;

  if (!onBeforeChange || onBeforeChange.length <= 1) {
    onBeforeChange?.(value);
    emit('update:modelValue', value);
    return;
  }

  onBeforeChange(value, (valid) => {
    if (valid === false) return;
    emit('update:modelValue', value);
  });
};
```
````

<div>

<v-click at="2">

<p class="!m-0"><code>onBeforeChange</code> 的使用方式</p>

```ts
const onBeforeChange = (value, done) => {
  done();      // 更換 Tab
  done(true);  // 更換 Tab
  done(false); // 阻止更換 Tab
};
```

</v-click>

<div v-click="3" class="h-1.5em overflow-hidden">
  <div
    class="transition-transform duration-800" 
    :class="{
      'translate-y-[-1.5em]': $clicks >= 4,
    }"
  >
    <div class="text-amber"><ph-warning-duotone/> <span>使用<code>onBeforeChange</code> 一定要呼叫<code>done()</code>？</span></div>
    <div class="text-green"><carbon-idea /> <span>使用 function.length 判斷參數數量</span></div>
  </div>
</div>

<v-click at="5">

不呼叫<code>done()</code>也能正常執行

```ts
const onBeforeChange = (value) => {
  console.log(`切換 Tab 到 ${value}`);
};
```

</v-click>

</div>

</div>

---

## 選擇 Props 還是 Emit？ {.font-500}

<div class="grid grid-cols-[120px_1fr_1fr] gap-x-3 mt-4">

<div />

<v-click>
  <div class="font-500 opacity-50">Props</div>
  <div class="font-500 opacity-50">Emit</div>
</v-click>

<v-click>

<div class="text-sm font-500 my-auto opacity-75">Implementation</div>

```ts
const props = defineProps({
  beforeChange: Function
})
```

```ts
const emit = defineEmits(['beforeChange'])
```

</v-click>
<v-click>

<div class="text-sm font-500 my-auto opacity-75">Usage</div>

```ts
props.beforeChange(value)
```

```ts
emit('beforeChange', value)
```

</v-click>
<v-click>

<div class="text-sm font-500 my-auto opacity-75">Template</div>

```vue
<AtomicTabs :beforeChange="beforeChange" />
```

```vue
<AtomicTabs @beforeChange="beforeChange" />
```

</v-click>

</div>

<div v-click="5" class="flex items-center gap-1 text-green space-y-1 my-2">
  <carbon-idea /><span>在 Vue 裡面，emit 等於以 on 開頭並且 props 的第一個單字大寫的 props</span>
</div>

<div v-click="6" class="grid grid-cols-2 gap-3 mt-1">

<div class="flex flex-col items-center children:w-full">

```vue
<AtomicTabs @beforeChange="beforeChange" />
```

<ph-arrow-down-duotone mx-auto />

```ts
const vnode = {
  type: AtomicTabs,
  props: {
    onBeforeChange: beforeChange
  }
}
```

</div>

<div v-click="7">

```ts
const props = defineProps({
  onBeforeChange: Function
})
```

```ts
!!props.onBeforeChange // 是否有傳入事件
props.onBeforeChange.length // 參數的數量
```

</div>

</div>

---

## \<AtomicPopover /\> 的點擊事件 {.font-500}

<div class="grid grid-cols-2 gap-4 mt-4">

<div>

<div class="text-sm h-1.5em overflow-hidden">
  <div
    class="transition-transform duration-800" 
    :class="{
      'translate-y-[-1.5em]': $clicks >= 1 && $clicks < 2,
      'translate-y-[-3em]': $clicks >= 2
    }"
  >
    <div class="text-white/60"><ph-smiley-blank-duotone/> 手動綁定從元件內部傳出來的事件</div>
    <div class="text-green/80"><ph-smiley-duotone/> 自動綁定事件到 Reference Slot 上</div>
    <div class="text-green"><ph-smiley-wink-duotone/> 自動綁定事件到 Reference Slot 上 並且沒有額外的結構</div>
  </div>
</div>

````md magic-move

```vue {2-9}
<template>
  <AtomicPopover>
    <template #reference="{ props }">
      <AtomicButton v-bind="props">點擊展開</AtomicButton>
    </template>
    <div>
      Popover Content
    </div>
  </AtomicPopover>
</template>
```

```vue {2-9|2-9|2-9}
<template>
  <AtomicPopover>
    <template #reference>
      <AtomicButton>點擊展開</AtomicButton>
    </template>  
    <div>
      Popover Content
    </div>
  </AtomicPopover>
</template>
```

````

````md magic-move {at:2}

```html
<div>
  <button type="button">點擊展開</button>
</div>
```

```html
<button type="button">點擊展開</button>
```

````

</div>

<div>

<v-click at="3">

<div class="text-xs font-500">Slots</div>

```ts
const slots = useSlots()
```

</v-click>

<v-click at="4">

<div class="text-xs font-500">Script</div>

````md magic-move {at:5}

```ts
const ReferenceComponent = defineComponent({
  name: 'ReferenceComponent',
  setup() {
    return () => {
      const child = slots.reference?.()[0]
      return child
    }
  }
})
```

```ts
const ReferenceComponent = defineComponent({
  name: 'ReferenceComponent',
  setup() {
    return () => {
      const reference = slots.reference?.()
      return findFirstLegitChild(reference)
    }
  }
})
```

````

</v-click>

<v-click at="6">

<div class="text-xs font-500">Template</div>

```vue
<template>
  <template v-if="slots.reference">
    <ReferenceComponent @click="onClick" />
  </template>
</template>
```

</v-click>

</div>

</div>

---
layout: intro
class: text-center
---

## <ph-person-arms-spread-duotone /> 良好的 HTML 與無障礙

---

## 一個可以點擊的按鈕

<div class="grid grid-cols-2 gap-4 mt-4">

<div>

````md magic-move

```html
<span @click="onClick">五倍紅寶石</span>
```

```html
<span
  @click="onClick"
  @keydown.enter="onClick"
  @keydown.space="onClick"
>
  五倍紅寶石
</span>
```

```html
<span
  tabindex="0"
  @click="onClick"
  @keydown.enter="onClick"
  @keydown.space="onClick"
>
  五倍紅寶石
</span>
```

```html
<span
  tabindex="0"
  role="button"
  @click="onClick"
  @keydown.enter="onClick"
  @keydown.space="onClick"
>
  五倍紅寶石
</span>
```

````

<ul class="[&_li]:list-none [&_li]:m-0 text-amber">
  <v-clicks at="1">
    <li><ph-warning-duotone/> 需要加上鍵盤按下 <kbd>Enter</kbd> 與 <kbd>Space</kbd> 的事件處理</li>
    <li><ph-warning-duotone/> 需要讓元素可以透過 <kbd>Tab</kbd> 鍵聚焦</li>
    <li><ph-warning-duotone/> 需要讓瀏覽器知道這個元素是按鈕</li>
    <li class="text-gray"><ph-smiley-meh/> 有人說比較好切版</li>
  </v-clicks>
</ul>

</div>

<div>

```html
<button type="button" @click="onClick">五倍紅寶石</button>
```

<ul class="[&_li]:list-none [&_li]:m-0 text-green">
  <v-clicks at="5">
    <li><ph-check-circle-duotone/> 完成了</li>
  </v-clicks>
</ul>

</div>

</div>

---

## \<AtomicRating /\> 的鍵盤操作 {.font-500}

<div class="flex gap-6">
  <RatingDemo class="ml-20" />

  <v-clicks>
    <ul class="flex space-x-2 text-sm mt-2 [&&]:list-none [&_li]:m-0">
      <li><ph-check-square-duotone/> <span>點擊可選取分數</span></li>
      <li><ph-check-square-duotone/> <span>要可以使用鍵盤的 <kbd>Right</kbd>、<kbd>Left</kbd>、<kbd>Up</kbd>、<kbd>Down</kbd> 控制</span></li>
    </ul>
  </v-clicks>
</div>

<div v-click class="grid grid-cols-2 gap-4 mt-2">

<div>

<div>
  <span class="px-1.5 text-xs text-opacity-90 bg-gray/10 rounded">使用 &lt;span&gt;</span>
</div>

````md magic-move {at:4}
```html
<div>
  <span />
  <span />
  <span />
  <span />
  <span />
</div>
```

```html
<div>
  <span @click="onClick" />
  <span @click="onClick" />
  <span @click="onClick" />
  <span @click="onClick" />
  <span @click="onClick" />
</div>
```

```html
<div>
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
</div>
```

```html
<div tabindex="0">
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
</div>
```

```html
<div tabindex="0" role="slider">
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
</div>
```

```html
<div tabindex="0" role="slider" aria-valuenow="0" ...>
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
  <span @click="onClick" @keydown="onKeydown" />
</div>
```
````

<ul class="[&_li]:list-none [&_li]:m-0 text-amber">
  <v-clicks at="4">
    <li><ph-warning-duotone/> 需要加上滑鼠點擊事件的事件處理</li>
    <li><ph-warning-duotone/> 需要加上鍵盤按下的事件處理</li>
    <li><ph-warning-duotone/> 需要讓元素可以透過 <kbd>Tab</kbd> 鍵聚焦</li>
    <li><ph-warning-duotone/> 需要讓瀏覽器知道這個評分元件</li>
    <li><ph-warning-duotone/> 需要考慮無障礙屬性的設定</li>
    <li class="text-gray"><ph-smiley-meh/> 有人說比較好切版</li>
  </v-clicks>
</ul>

</div>

<div>

<div>
  <span class="px-1.5 text-xs text-opacity-90 bg-gray/10 rounded">使用 &lt;input type="radio"&gt;</span>
</div>

```html
<div>
  <input type="radio" name="rating" value="1" />
  <input type="radio" name="rating" value="2" />
  <input type="radio" name="rating" value="3" />
  <input type="radio" name="rating" value="4" />
  <input type="radio" name="rating" value="5" />
</div>
```

<ul class="[&_li]:list-none [&_li]:m-0 text-green">
  <v-clicks at="10">
    <li><ph-check-circle-duotone/> 完成了</li>
  </v-clicks>
</ul>

</div>

</div>

---
layout: intro
class: text-center
---

## <ph-cloud-duotone /> 支援 Server-Side Rendering

---

## 你的元件在 Server-Side Rendering 時偷懶嗎？ {.font-500}

<v-click>

<div mt-1>
  <span class="px-1.5 text-xs text-blue bg-blue/10 rounded">Element Plus 3.8</span>
</div>

<div class="grid grid-cols-2 gap-4">

```vue {2-7}
<template>
  <ElTabs v-model="tab">
    <ElTabPane label="User" name="first">User</ElTabPane>
    <ElTabPane label="Config" name="second">Config</ElTabPane>
    <ElTabPane label="Role" name="third">Role</ElTabPane>
    <ElTabPane label="Task" name="fourth">Task</ElTabPane>
  </ElTabs>
</template>
```

<img src="/element-plus-tabs-ui.png" class="border border-blue/20 rounded-md" />

</div>

</v-click>

<div v-click class="mt-1">
  <div>
    <span class="px-1.5 text-xs text-green bg-green/10 rounded">Server-Side Rendering</span>
  </div>

  <img src="/element-plus-tabs-ssr.png" class="w-[calc(50%-0.5rem)] rounded-md mt-1" />
</div>

<span v-click class="text-amber">遇到「由內層元件決定外層元件渲染」的設計，這種設計在 Server Side Rendering 的場景下通常會出問題。</span>

---
layout: intro
class: text-center pb-5
---

<h1 class="font-600">已經生成的 HTML 字串<br><v-click>不會隨著資料改變而更新</v-click></h1>

---

## 在 Server 生成 HTML 的流程 {.font-500}

<div class="grid grid-cols-2 gap-4 mt-4">

```js {*|2|3-5|6-11|*}
const vnode = {
  type: 'div',
  props: {
    id: 'foo',
  },
  children: [
    {
      type: 'p',
      children: '為你寫的 Vue Components',
    },
  ],
}
```

<div>

<v-click at="1">

<div>
  <span class="px-1.5 text-xs text-gray bg-gray/10 rounded">1. 開啟標籤</span>
</div>

```text
<div
```

</v-click>

<v-click at="2">

<div>
  <span class="px-1.5 text-xs text-gray bg-gray/10 rounded">2. 設定屬性</span>
</div>

```text
<div id="foo">
```

</v-click>

<v-click at="3">

<div>
  <span class="px-1.5 text-xs text-gray bg-gray/10 rounded">3. 渲染子層元素</span>
</div>

```text
<div id="foo">
  <p>為你寫的 Vue Components</p>
```

</v-click>

<v-click at="4">

<div>
  <span class="px-1.5 text-xs text-gray bg-gray/10 rounded">4. 生成完畢</span>
</div>

```html
<div id="foo">
  <p>為你寫的 Vue Components</p>
</div>
```

</v-click>

</div>

</div>

---

## 在 Server 生成 HTML 的結果可能跟你想的不一樣 {.font-500}

<div class="grid grid-cols-2 gap-4 mt-4">

<div>

<v-click>

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Parent.vue</span>
</div>

```vue
<script setup lang="ts">
const number = ref(0)

provide('number', {
  number,
  update(value: number) {
    number.value = value
  },
})
</script>

<template>
  <div>Parent: {{ number }}</div>
  <Child />
  <div>Parent: {{ number }}</div>
</template>
```

</v-click>

</div>

<div>

<v-click>

<div>
  <span class="px-1.5 text-xs text-green bg-green/10 rounded">Child.vue</span>
</div>

```vue
<script setup lang="ts">
const { number, update } = inject('number')

update(10)
</script>

<template>
  <div>Child: {{ number }}</div>
</template>
```

</v-click>

<v-click>

<div>
  <span class="px-1.5 text-xs text-purple bg-purple/10 rounded">結果</span>
</div>

```html
<div>Parent: 0</div>
<div>Child: 10</div>
<div>Parent: 10</div>
```

</v-click>

</div>

</div>

---

## 復盤：為什麼你的元件在 Server-Side Rendering 時偷懶 {.font-500}

<div v-click class="mt-4">

```vue {2-7}
<template>
  <ElTabs v-model="tab">
    <ElTabPane label="User" name="first">User</ElTabPane>
    <ElTabPane label="Config" name="second">Config</ElTabPane>
    <ElTabPane label="Role" name="third">Role</ElTabPane>
    <ElTabPane label="Task" name="fourth">Task</ElTabPane>
  </ElTabs>
</template>
```

</div>

<div class="grid grid-cols-[max-content_1fr] gap-x-4">

<v-click>

<div class="text-xs text-end mt-2">生成一個空的 Nav 區塊</div>

```html
<div class="el-tabs">
  <div class="el-tabs__nav"><!-- 空 --></div>
```

</v-click>

<v-click>

<div class="text-xs text-end mt-2 space-y-1">
  <div>ElTabPane 生成 Content 區塊<br>同時通知 ElTabs 生成 Tab 按鈕</div>
  <div class="text-amber"><ph-warning-duotone/> 但 Tab 按鈕不會被生成</div>
</div>

```html
<div class="el-tabs">
  <div class="el-tabs__nav"><!-- Client Side 會生成 Tab 按鈕，但 Server Side 不會 --></div>
  <div class="el-tabs__content">User</div>
```

</v-click>

<v-click>

<div class="text-xs text-end mt-2">生成完畢</div>

```html
<div class="el-tabs">
  <div class="el-tabs__nav"><!-- Client Side 會生成 Tab 按鈕，但 Server Side 不會 --></div>
  <div class="el-tabs__content">User</div>
  <div class="el-tabs__content" style="display: none;">Config</div>
  <div class="el-tabs__content" style="display: none;">Role</div>
  <div class="el-tabs__content" style="display: none;">Task</div>
</div>
```

</v-click>

</div>

---

## Server-Side Rendering 還有其他需要注意的

<div class="mt-4">

<v-clicks>

- 正確的渲染預期的 HTML 的結構
- 水合作用不匹配（Hydration Mismatch / Hydration Error）
- 跨請求狀態污染（Cross-Request State Pollution）
- 使用特定於平台的API（Access to Platform-Specific APIs）
- 生命週期差異

</v-clicks>

</div>

---
layout: intro
class: text-center pb-5
---

<h2 class="flex justify-center items-center gap-x-0.785rem !text-3rem font-600 [&_div]:transition-all [&_div]:duration-800">
  <div :class="{ 'translate-x-4.41em': $clicks < 1 }">
    J<span v-click="1">oyful</span>
  </div>
  <div :class="{ 'translate-x-1.85em': $clicks < 1 }">
    U<span v-click="1">ser</span>
  </div>
  <div :class="{ 'translate-x-0.2em': $clicks < 1 }">
    E<span v-click="1">xperience</span>
  </div>
</h2>

---
layout: intro
class: text-center pb-5
---

<a href="https://5xcampus.com" target="_blank">
  <img src="https://dmh6legpso131.cloudfront.net/images/logo_white.svg" class="w-[240px] mx-auto" />
</a>

---
layout: intro
class: text-center pb-5
---

# Thanks to {.!mb-16.!text-4xl.font-600}

<div class="flex items-center justify-center gap-18">
  <div class="flex flex-col items-center">
    <img src="https://webconf.tw/_ipx/s_350x498/images/speakers/38_KURO.webp" class="size-30 object-cover rounded-full mb-4" />
    <div>Kuro Hsu</div>
    <div class="text-xs opacity-60">Vue.js Taiwan 社群主辦人</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">
      <a href="https://kurohsu.dev/" target="_blank"><ph-link-duotone/></a>
      <a href="https://github.com/kurotanshi" target="_blank"><ph-github-logo-duotone/></a>
    </div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/achen224" class="size-30 object-cover rounded-full mb-4" />
    <div>Alex</div>
    <div class="text-xs opacity-60">YouTuber Alex 宅幹嘛</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">
      <a href="https://www.youtube.com/@AlexOtakuWhat" target="_blank"><ph-youtube-logo-duotone/></a>
    </div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/antfu" class="size-30 object-cover rounded-full mb-4" />
    <div>Anthony Fu</div>
    <div class="text-xs opacity-60">Vue / Nuxt 核心團隊成員</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">
      <a href="https://antfu.me" target="_blank"><ph-link-duotone/></a>
      <a href="https://github.com/antfu" target="_blank"><ph-github-logo-duotone/></a>
    </div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/yyx990803" class="size-30 object-cover rounded-full mb-4" />
    <div>尤雨溪（Evan）</div>
    <div class="text-xs opacity-60">Vue / Vite 作者</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">      
      <a href="https://evanyou.me" target="_blank"><ph-link-duotone/></a>
      <a href="https://github.com/yyx990803" target="_blank"><ph-github-logo-duotone/></a>
    </div>
  </div>
</div>

---
layout: intro
class: text-center pb-5
---

# Thanks to {.!mb-16.!text-4xl.font-600}

<div class="flex items-center justify-center gap-10">
  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/hank21014" class="size-30 object-cover rounded-full mb-4" />
    <div>謝孟和</div>
    <div class="text-xs opacity-60 space-x-2">&nbsp;</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">&nbsp;</div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/ChiaHanTu" class="size-30 object-cover rounded-full mb-4" />
    <div>杜佳瀚</div>
    <div class="text-xs opacity-60 space-x-2">&nbsp;</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">&nbsp;</div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/TimingJL" class="size-30 object-cover rounded-full mb-4" />
    <div>陳泰銘（Taimming）</div>
    <div class="text-xs opacity-60 space-x-2">&nbsp;</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">&nbsp;</div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://gitlab.com/uploads/-/system/user/avatar/2335526/avatar.png" class="size-30 object-cover rounded-full mb-4" />
    <div>林是辰（鱈魚）</div>
    <div class="text-xs opacity-60 space-x-2">&nbsp;</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">&nbsp;</div>
  </div>

  <div class="flex flex-col items-center">
    <img src="https://avatars.githubusercontent.com/st9140626" class="size-30 object-cover rounded-full mb-4" />
    <div>黄亭瑋</div>
    <div class="text-xs opacity-60 space-x-2">&nbsp;</div>
    <div class="text-xs opacity-60 space-x-2 mt-2">&nbsp;</div>
  </div>
</div>

---

<img src="/v-conf.jpg" class="rounded-xl shadow-xl" alt="2026 V-Conf Taiwan" />

---
layout: intro
class: text-center pb-5
---

# Thank you! {.font-hand.italic}
