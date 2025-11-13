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
title: Vue.js 設計實戰 | 渲染器的設計 & 載入與更新
addons:
  - slidev-addon-graph
---

<h1 class="tagline !text-3em !leading-normal font-500">Vue.js 設計實戰</h1>
渲染器的設計 & 載入與更新

---

# 渲染器的設計 {class="font-500"}

<div />

<div class="grid grid-cols-[max-content_1fr] gap-4">

最簡單的渲染器

```ts
function render (domString, container) {
  container.innerHTML = domString
}
```


<v-click>

使用方式

````md magic-move {at:2}

```ts
render('<h1>Hello!</h1>', document.querySelector('#app'))
```

```ts
const title = ref('Hello!')

effect(() => {
    render(`<h1>${title.value}</h1>`, document.querySelector('#app'))
})

title.value = 'Hello! Vue'
```

````
</v-click>

</div>

<!--
渲染器的設計，這裡我們可以看到一個最簡單的渲染器，[click]  它可以將指定的 DOM 字串渲染到給定的容器裡面。[click] 如果搭配 Vue 的 effect function 就可以做到當依賴更新就重新渲染畫面的最簡單功能。
-->

---

<div class="flex justify-center items-center gap-20 px-24 text-xl transition duration-800 z-1" :class="{ 'translate-y-150px': $clicks < 3 }">

<div>

# renderer{.!text-3rem}

<div v-click>

<div italic op-75 font-serif text-base text-2xl>noun</div>

渲染器

</div>
</div>

<div>

# render{.!text-3rem}

<div v-click>

<div italic op-75 font-serif text-base text-2xl>verb</div>

渲染；繪製；彩現

</div>
</div>

</div>

<div v-click="3" max-w-2xl mt-3 mx-auto transition duration-800>

````md magic-move

```ts {*|*}{at:4}
function createRenderer() {
  function render (vnode, container) {
    // ...
  }

  return { render }
}
```

```ts
function createRenderer() {
  function render (vnode, container) {
    // ...
  }

  function hydrate (vnode, container) {
    // ...
  }

  return { render, hydrate}
}
```

```ts
function createRenderer() {
  function render (vnode, container) {
    // ...
  }

  return { render }
}

// Separate API for creating hydration-enabled renderer.
// Hydration logic is only used when calling this function, making it
// tree-shakable.
function createHydrationRenderer() {
  function render (vnode, container) {
    // ...
  }

  return { render }
}
```

````

</div>

<!--
一開始我們還是做個簡單的名詞解釋。[click] renderer，名詞，中文翻譯叫做渲染器。[click] render，動詞，中文叫渲染、繪製、彩現，好像都看過有人使用。

[click] 接下來我們的程式碼都會環繞在 createRenderer 這個 function 上，它會回傳一個 render function，我們可以利用它進行畫面的繪製。

不過為什麼不直接設計一個 render function 就好了呢？我自己認為有兩個原因。其一是 renderer 其實是一個更高層次的概念，它不止可以建立一個繪製畫面的 function，[click] 如果遇到 Server Side Rendering 的環境，它也可以建立一個 hydrate function 對既有的 HTML 進行 Hydration。

[click] 在 Vue 的原始碼裡面為了可以有更好的 Tree Shaking，它會分成 createRenderer 與 createHydrationRenderer 兩個 function，如果我們使用到了 Server Side Rendering 才會建立包含 hydrate 能力的程式碼。
-->

---
class: grid grid-cols-[max-content_1fr] gap-8 items-start
---

<div class="text-right">

# 渲染器實作 {.font-500}
Renderer Implementation

</div>

<div>

````md magic-move

```ts
const renderer = createRenderer()

const vnode1 = {
  type: 'h1',
  children: 'Hello!!'
}

const vnode2 = {
  type: 'h1',
  children: 'Vue'
}

renderer.render(vnode1, document.querySelector('#app')) // mount
renderer.render(vnode2, document.querySelector('#app')) // patch
renderer.render(null, document.querySelector('#app'))   // unmount
```

```ts
function createRenderer() {
  function render (vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        container.innerHTML = ''
      }
    }

    container._vnode = vnode
  }

  return {
    render
  }
}
```

````

<div v-click transition duration-500 mt-4>

```ts
function patch(oldVNode, newVNode, container) {
  if (!oldVNode) {
    mountElement(newVNode, container)
  } else {
    // update
  }
}
```

</div>

</div>

<!--
渲染器的實作，隨著我們在不同的階段呼叫 render function，渲染器會對指定容器進行掛載、更新，直到最後卸載整個元件或是畫面。

我們接下來就來一步一步的拆解渲染器底層的設計，[click] 首先， 如果有接收到 vnode，渲染器會將舊 vnode 與新的 vnode 都傳給 patch function，進行更新，或叫做修補。反之則清空容器的 HTML。

[click] 那在 patch function 裡面，如果沒有舊的 vnode，這表示要進行掛載的動作，反之則進行更新。

在 function 命名上，我自己會覺得 patch 比 update 更能同時涵蓋掛載與更新兩種情境。
-->

---
class: grid grid-cols-2 gap-4
---

<div class="!space-y-4">

<div v-click="1" class="overflow-hidden h-1.5em">
  <div class="transition-transform duration-800" :class="{ 'translate-y-[-1.5em] delay-1000': $clicks >= 2 }">
    <div class="flex items-center gap-2 text-amber/80 transition duration-800">
      <ph-warning-duotone />
      <span>與瀏覽器 DOM API 高度耦合</span>
    </div>
    <div class="flex items-center gap-2 text-green/80 transition duration-800">
      <ph-check-circle-duotone />
      <span>不依賴特定平台的 API，完全解耦</span>
    </div>
  </div>
</div>

<div transition duration-800 :class="{ 'translate-y-[-2.5em]': $clicks === 0 }">

````md magic-move

```ts {*|3,6,9}
function createRenderer() {
  function mountElement(vnode, container) {
    const el = document.createElement(vnode.type)

    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    }

    container.appendChild(el)
  }
}
```

```ts {*}{class="overflow-hidden"}
function createRenderer(options) {
  const {
    createElement,
    setElementText,
    insert
  } = options

  function mountElement(vnode, container) {
    const el = createElement(vnode.type)

    if (typeof vnode.children === 'string') {
      setElementText(el, vnode.children)
    }

    insert(el, container)
  }
}
```

````

</div>

</div>

<div v-click="3" transition duration-800 class="!space-y-4">

<div class="h-1.5em" />

````md magic-move

```ts
const renderer = createRenderer({
  createElement(type) {
    return document.createElement(type)
  },
  insert(el, parent) {
    parent.appendChild(el)
  },
  setElementText(el, text) {
    el.textContent = text
  }
})
```

```ts
const renderer = createRenderer({
  createElement(type) {
    return document.createElement(type)
  },
  insert(el, parent) {
    parent.appendChild(el)
  },
  setElementText(el, text) {
    el.textContent = text
  }
})
```
````

</div>

<!--
我們繼續往下鑽，看看 mountElement 的實作。

在 mountElement 裡面，我們依據 `vnode.type` 建立了一個 DOM 元素，並在更新元素的內容後將其 append 到容器裡面。

看起來很簡單，[click] 不過我們不難發現，現在的實作與瀏覽器特有的 API 高度耦合。正如前面提到的，我們希望可以設計出一個跨平台的渲染器，它不一定只跑在瀏覽器裡面，渲染器也有可能跑在後端服務上，那現在這樣顯然不是一個好的做法。

[click] 這時，createRenderer 就發揮它的功能了，[click] 我們可以定義一個 options， 將這些 API 從外部傳入。 這樣我們就可以設計出一個不依賴特定平台的渲染器了。
-->

---
clicks: 4
class: relative
---

<div class="grid grid-cols-[max-content_1fr] gap-8 h-full">

<div>
  <div class="text-right">

# 依賴注入 {.font-500}
Dependency Injection

  </div>
</div>

<div
  v-click 
  class="absolute top-1/2 left-1/2 -translate-y-1/2 grid place-content-center size-80 text-blue border border-blue/50 bg-blue/20 rounded-full transition-all duration-600"
  :class="{
    '-translate-x-1/2': $clicks <= 2
  }"
>
  <span
    class="transition-all duration-600"
    :class="{
      'pb-45': $clicks === 2
    }"
  >
    render function
  </span>
</div>
<div
  v-click 
  class="absolute -translate-1/2 grid place-content-center size-50 rounded-full transition-all duration-600"
  :class="{
    'top-[calc(50%+3.25rem)] left-1/2 ': $clicks <= 2,
    'top-1/2 left-1/3': $clicks > 2,
    'text-amber border border-amber/50 bg-amber/20' : $clicks <= 3,
    'text-green border border-green/50 bg-green/20' : $clicks > 3,
  }"
>
  <span>
    <transition name="fade-out" mode="out-in">
      <span v-if="$clicks <= 3">DOM API</span>
      <span v-else>Node API</span>
    </transition>
  </span>
</div>

</div>

<!--
這裡就可以提一個可能能蠻常聽到的概念，叫做：依賴注入。

[click] 依賴注入的概念其實非常的簡單， 這是我們原本的 render function，[click] 在原本的實作上，它內部包含了瀏覽器的 DOM API，我們無法在瀏覽器以外的地方使用它，現在的 render function 是一個專為瀏覽器設計的 function。

[click] 依賴注入就是將 DOM API 從 render function 中分離出來變成參數傳入，[click] 這一來我們只要把傳入參數換成 Node 的 API，那它就可以在 Node Server 裡面運行。又或是想支援 Native 平台，也可以用這個概念去建立屬於該平台的渲染器。
-->

---

# 掛載子節點和元素的屬性 {.font-500}


<div class="grid grid-cols-2 gap-4">

````md magic-move

```ts
const vnode = {
  type: 'h1',
  children: 'Hello!'
}
```

```ts
const vnode = {
  type: 'header',
  props: {
    class: 'fixed w-full p-4'
  },
  children: [
    {
      type: 'h1',
      children: 'Hello!'
    },
    {
      type: 'p',
      children: 'This is a simple renderer.'
    }
  ]
}
```

````

````md magic-move

```ts
function mountElement(vnode, container) {
  const el = createElement(vnode.type)

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  }

  insert(el, container)
}
```

```ts
function mountElement(vnode, container) {
  const el = createElement(vnode.type)

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(childVnode => {
      patch(null, childVnode, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProp(el, key, null, vnode.props[key])
    }
  }

  insert(el, container)
}
```

````

</div>

<!--
回到前面的 mountElement，我們現在已經可以將 vnode 繪製成 DOM 掛到容器裡面了，[click] 不過 vnode 除了有文字內容外，更可能包含的是一組子節點，我們用陣列表示，同時還可以透過 props 來設定 DOM 的屬性。

[click] 所以我們也要將這些情境都考量進去，如果遇到的 children 是一個陣列，我們就使用迴圈將其一個一個繪製到或是更新到畫面上。

props 部分也是如此，我們使用 patchProp function 將其設定到 DOM 元素上。
-->

---
layout: none
class: p-14
---

<div class="grid grid-cols-2">
  <div class="space-y-2">
    <h2 class="text-2rem font-500">HTML Attributes</h2>
    <ul class="space-y-2 text-green text-0.9em  [&_li]:space-x-1">
      <li v-click><ph-lightbulb-duotone/> <span>在 HTML 標記上的「字串設定」</span></li>
      <li v-click><ph-lightbulb-duotone/> <span>透過 <code>setAttribute()</code> / <code>getAttribute()</code> 操作</span></li>
    </ul>
  </div>
  <div class="space-y-2">
    <h2 class="text-2rem font-500">DOM Properties</h2>
    <ul class="space-y-2 text-green text-0.9em  [&_li]:space-x-1">
      <li v-click><ph-lightbulb-duotone/> <span>在 DOM 物件上的「物件屬性」</span></li>
      <li v-click><ph-lightbulb-duotone/> <span>透過 <code>element.property</code> 操作</span></li>
    </ul> 
  </div>
</div>

<div transition duration-800 scale-75 origin-left-top mb--28 mt-8 class="[&_table]:w-130% [&_th]:py-2 [&_td]:py-2 [&_th]:text-start [&_th]:font-400 [&_tr]:border-b [&_tr]:border-[#9ca3af33]" v-click>

| 類別                | HTML Attribute                    | DOM Property                                           |
| ------------------- | --------------------------------- | ------------------------------------------------------ |
| class               | `<div class="a b">`               | `el.className`（字串）、`el.classList`（DOMTokenList） |
| value（input）      | `<input value="初始值">`             | `el.value`（當前值）、`el.defaultValue`（初始值）      |
| checked（checkbox） | `<input type="checkbox" checked>` | `el.checked`（boolean）、`el.defaultChecked`           |
| disabled            | `disabled=""`（存在就生效）         | `el.disabled`（boolean）                               |
| href / src          | `<a href="/path">`                | `el.href`（絕對路徑）                                  |
| tabindex            | `tabindex="-1"`                   | `el.tabIndex`（number）                                |
| style               | `style="color: red;"`             | `el.style`（CSSStyleDeclaration）                      |
| data-*              | `<div data-id="42">`              | `el.dataset.id`                                        |
| aria-*              | `<button aria-pressed="true">`    | `el.ariaPressed`                                       |

</div>

<!--
名詞解釋，什麼是 HTML Attributes，什麼是 DOM Properties。

大多數時候它們兩個會有對應的關係，[click] 像是 class 對應到 DOM Properties 可以是 className 或是 classList；表單元素上的 value，會對應到元素的 value 與 defaultValue；disabled 是一致的，不過 對於 HTML Attributes 來說，**disabled 與否是判斷有沒有這個 Attributes 跟它的值無關**；tabindex，在 DOM Properties 的字母大小寫不太一樣；data-* 對應的是 dataset，比較新的瀏覽器開始支援無障礙屬性。

屬性之多，族繁不及備載。
-->

---
class: grid grid-cols-2 gap-4 h-fit
---

<div class="flex flex-col items-center children:w-full">

```html
<button disabled>Button</button>
```

<v-click>

<ph-arrow-down-duotone class="opacity-50"/>

```ts
const button = {
  type: 'button',
  props: {
    disabled: ''
  },
  children: 'Button'
}
```

</v-click>

<v-click>

<ph-arrow-down-duotone class="opacity-50"/>

```ts
const button = document.createElement('button')
button.setAttribute('disabled', '')
```

<v-click at="9">

<div class="relative">

````md magic-move {at:10}

```ts
const button = document.createElement('button')
button.disabled = ''
```

```ts
const button = document.createElement('button')
button.disabled = '' // 轉換為 false

```
````

<div v-click="11" class="absolute top-1 bottom-1 left-0 right-0 bg-red/20 flex items-center justify-center rounded">
  ❌
</div>

</div>

</v-click>

</v-click>

</div>

<div class="flex flex-col items-center children:w-full">

<v-click>

```html
<button :disabled="false">Button</button>
```

</v-click>

<v-click>

<ph-arrow-down-duotone class="opacity-50"/>

```ts
const button = {
  type: 'button',
  props: {
    disabled: false
  },
  children: 'Button'
}
```

</v-click>

<v-click at="5">

<ph-arrow-down-duotone class="opacity-50"/>

<div class="relative">

````md magic-move {at:6}

```ts
const button = document.createElement('button')
button.setAttribute('disabled', false)
```

```ts
const button = document.createElement('button')
button.setAttribute('disabled', false) // 轉換為 'false'
```

````

<div v-click="7" class="absolute top-1 bottom-1 left-0 right-0 bg-red/20 flex items-center justify-center rounded">
  ❌
</div>

</div>

<v-click at="8">

```ts
const button = document.createElement('button')
button.disabled = false
```

</v-click>

</v-click>

</div>

<div v-click="12" transition duration-800 class="col-span-full flex items-center gap-2 text-amber">
  <ph-warning-duotone />
  <span>不論哪一種方式都存在缺陷，要徹底解決，只能進行特殊處理</span>
</div>

<!--
回到正題，我們看看怎麼設定 props 到 DOM 上。這是一個 disabled 的按鈕，[click] 它的 vnode 會長這樣，[click] 我們可以用 setAttribute('disabled', '') 來將這個按鈕 disabled。

不過在 Vue 裡面，[click] 我們還可以使用 v-bind 的寫法，[click] 與之對應的 vnode 長這樣，使用 v-bind:disabled 的 vnode 上的 disabled 是一個 boolean 值。

[click] 我們一樣 setAttribute('disabled', false)，但這樣有問題，[click] setAttribute 的第二個參數會被強制字串化，[click] 這裡我們原本期待拿到一個沒有被 disabled 的按鈕，但事與願違，按鈕依舊被 disabled 了。

所以我們得換個方法，[click] 直接設定 DOM Properties 吧！沒問題這樣可以 work，一樣的方式套到上一個範例，[click] 我們現在對 button.disabled 設定了一個空字串，但是，button.disabled 只接受 boolean，沒關係，瀏覽器很聰明，[click] 它會把空字串轉換成 false 套入，[click] 出事了，變成了一個沒有 disabled 的按鈕。[click]
-->

---

<div class="grid grid-cols-[min-content_1fr] gap-4">

<div>

````md magic-move

```ts {*|7}
function patchProp(el, key, prevValue, nextValue) {
  if (key in el) {
    const type = typeof el[key]
    if (type === 'boolean' && nextValue === '') {
      el[key] = true
    } else {
      el[key] = nextValue
    }
  } else {
    el.setAttribute(key, nextValue)
  }
}
```

```ts
function shouldSetAsProp(el, key, value) {
  // 特殊屬性處理
  if (key === 'form' && el.tagName === 'INPUT') {
    return false
  }
  return key in el
}

function patchProp(el, key, prevValue, nextValue) {
  if (shouldSetAsProp(el, key, nextValue)) {
    const type = typeof el[key]
    if (type === 'boolean' && nextValue === '') {
      el[key] = true
    } else {
      el[key] = nextValue
    }
  } else {
    el.setAttribute(key, nextValue)
  }
}
```

````

<div v-click="['1']" transition duration-300 class="col-span-full flex items-start gap-2 text-amber mt-5">
  <ph-warning-duotone shrink-0 mt-1 />
  <span>Readonly 的屬性（如：el.form）無法直接修改，必須透過 setAttribute 進行設定</span>
</div>

</div>

<div class="space-y-6 py-3">
  <div class="space-y-3">
    <div v-click="3" class="flex items-center gap-2 text-orange transition duration-800">
      <ph-check-square-duotone/>
      <span>優先使用 DOM Property</span>
    </div>
    <div v-click="4" class="ps-1.5em opacity-80 space-y-2 [&_div]:space-x-2">
      <div><ph-arrow-elbow-down-right-duotone class="opacity-50 translate-y-[-0.25em]" /><span>檢查欄位是否為 boolean 進行特殊處理</span></div>
      <div v-click="5" class="text-0.8em opacity-60 ps-1.5em">itemscope, allowfullscreen, formnovalidate, ismap, nomodule, novalidate, readonly, async, autofocus, autoplay, controls, default, defer, disabled, hidden, inert, loop, open, required, reversed, scoped, seamless, checked, muted, multiple, selected
      </div>
    </div>
  </div>


  <div class="space-y-3">
    <div v-click="6" class="flex items-center gap-2 text-orange transition duration-800">
      <ph-lightbulb-duotone/>
      <span>非常時期（屬性），非常手段</span>
    </div>
    <div class="ps-1.5em opacity-80 space-y-2 [&_div]:space-x-2">
      <div v-click="7"><ph-arrow-elbow-down-right-duotone class="opacity-50 translate-y-[-0.25em]" /><span>SVG 元素大多需要用 attribute</span></div>
      <div v-click="8"><ph-arrow-elbow-down-right-duotone class="opacity-50 translate-y-[-0.25em]" /><span>表單元素的 form ...etc. 必須用 attribute</span></div>
      <div v-click="9"><ph-arrow-elbow-down-right-duotone class="opacity-50 translate-y-[-0.25em]" /><span>spellcheck、draggable ...etc. 必須用 attribute</span></div>
    </div>
  </div>
</div>

</div>

<!--
因為 HTML Attribute 只能存字串，並且因為設定 HTML Attribute 內部會經過「序列化」處理，速度比較慢，所以能夠使用 DOM Property 的我們就優先選用 DOM Property，其它的則使用 HTML Attribute。

但這樣還有另外一個問題 [click]，有些屬性無法簡單使用 DOM Properties 設定，像是 `input.form`。

[click] 我們可以把這些屬性一個一個列舉出來，像是如果想在 `<input>` 元素上設定 `form` 屬性，就必須強制使用 `setAttribute`。

這裡我們在處理兩件事情，[click] 優先使用 DOM Property，[click] 但遇到 boolean 屬性的欄位要特別檢查 [click] 在原始碼裡面有列舉這些屬性。

[click] 遇到非常屬性，就需要非常手段。像是 [click] SVG 大多數時候都需要使用 HTML Attribute，[click] 範例提到的表單元素的 `form` 屬性，[click] 還有很多各種屬性。
-->

---

# `class` 的設定方式 {.font-500}

<div v-click transition duration-500 class="text-sm [&_th]:py-2 [&_td]:py-2 [&_tr]:transition [&_tr]:duration-500" :class="{ '[&_tbody_tr:nth-child(1)]:bg-amber/40': $clicks >= 2 }">


| 方式 | Executions Pre Second |
| ---- | --------------------- |
| <ph-lightning-duotone transition-all duration-300 :class="[ $clicks >= 2 ? 'w-1em' : 'w-0' ]" /> `className`    | 9637.7 Ops/sec |
| <ph-number-square-three-duotone transition-all duration-300 :class="[ $clicks >= 2 ? 'w-1em' : 'w-0' ]" /> `setAttribute` | 4761.1 Ops/sec |
| <ph-number-square-two-duotone transition-all duration-300 :class="[ $clicks >= 2 ? 'w-1em' : 'w-0' ]" /> `classList`    | 5949.4 Ops/sec |

</div>

<div :class="{ '-translate-y-10rem': $clicks === 0 }" transition duration-800>

````md magic-move { class: '!mt-4' }

```ts
function patchProp(el, key, prevValue, nextValue) {
  if (shouldSetAsProp(el, key, nextValue)) {
    const type = typeof el[key]
    if (type === 'boolean' && nextValue === '') {
      el[key] = true
    } else {
      el[key] = nextValue
    }
  } else {
    el.setAttribute(key, nextValue)
  }
}
```

```ts
function patchProp(el, key, prevValue, nextValue) {
  if (key === 'class') {
    el.className = nextValue || ''
  } else if (shouldSetAsProp(el, key, nextValue)) {
    const type = typeof el[key]
    if (type === 'boolean' && nextValue === '') {
      el[key] = true
    } else {
      el[key] = nextValue
    }
  } else {
    el.setAttribute(key, nextValue)
  }
}
```

````

</div>

<!--
接著來看 class 的設定，現在其實已經可以做到 class 的設定了，由於 class 不在 DOM Properties 裡面，所以會走到 setAttribute 的邏輯。[click] 不過這樣做效能並不好，[click] 根據測試，使用 el.className 設定 class 的效能大約是 setAttribute 的兩倍以上。所以遇到 class 的設定，我們就選用 el.className 來處理。
-->

---

# 卸載操作 {.font-500}

```ts {*|5-7}
function render (vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container)
  } else {
    if (container._vnode) {
      container.innerHTML = ''
    }
  }

  container._vnode = vnode
}
```

<v-clicks class="mt-4 text-red space-y-3 [&_li]:m-0 [&_li]:list-none [&_li]:space-x-2">

- <ph-x-circle-duotone /> <span>無法觸發元件的 beforeUnmount、unmounted 生命週期</span>
- <ph-x-circle-duotone /> <span>元素上也可能有自訂指令；卸載時要呼叫對應的指令卸載鉤子</span>
- <ph-x-circle-duotone /> <span>使用 `innerHTML` 不會移除 DOM 元素上的事件監聽器</span>

</v-clicks>

<!-- 
接著來看卸載的操作，[click] 前面提到的實作是直接將容器的 `innerHTML` 清空。不過這樣有幾個問題，[click] 首先是元件的生命週期函式不會被呼叫到，[click] 其次是元素上可能有自訂指令，這些指令的卸載鉤子也不會被呼叫到，[click] 最後是如果元素上有事件監聽器，這些監聽器也不會被移除，可能會造成記憶體洩漏的問題。
-->

---

# 卸載操作 {.font-500}

````md magic-move

```ts
function mountElement(vnode, container) {
  const el = createElement(vnode.type)

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(childVnode => {
      patch(null, childVnode, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProp(el, key, null, vnode.props[key])
    }
  }

  insert(el, container)
}
```

```ts {2}
function mountElement(vnode, container) {
  const el = vnode.el = createElement(vnode.type)

  if (typeof vnode.children === 'string') {
    setElementText(el, vnode.children)
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach(childVnode => {
      patch(null, childVnode, el)
    })
  }

  if (vnode.props) {
    for (const key in vnode.props) {
      patchProp(el, key, null, vnode.props[key])
    }
  }

  insert(el, container)
}
```

```ts
const el = vnode.el = createElement(vnode.type)
```

````

<div v-click="2" transition duration-500 delay-300>

````md magic-move {at:3}

```ts
function render (vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container)
  } else {
    if (container._vnode) {
      const el = container._vnode.el
      const parent = el.parentNode
      if (parent) {
        parent.removeChild(el)
      }
    }
  }

  container._vnode = vnode
}
```

```ts
function unmount(vnode) {
  const el = vnode.el
  const parent = el.parentNode
  if (parent) {
    parent.removeChild(el)
  }
}

function render (vnode, container) {
  if (vnode) {
    patch(container._vnode, vnode, container)
  } else {
    if (container._vnode) {
      unmount(container._vnode)
    }
  }

  container._vnode = vnode
}
```

````

</div>

<!--
我們看看怎麼解決這個問題，[click] 首先我們在 mountElement 裡面，將建立好的 DOM 元素存到 vnode.el 上面，這樣我們就可以在之後的卸載操作中取得對應的 DOM 元素。[click] 看回 render function，[click] 我們把卸載的邏輯抽成一個 unmount function，在 render 裡面，如果沒有傳入 vnode，我們就呼叫 unmount function，將對應的 DOM 元素從畫面上移除。
-->

---

# 卸載操作 {.font-500}

<div class="grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-center gap-2">

```ts {*|2}
const vnode = {
  type: 'p',
  props: { id: 'foo' }
}
```

<ph-arrow-right-duotone class="opacity-50" />

```ts {*|2}{at:1}
const vnode = {
  type: 'input',
  props: { type: 'text' }
}
```

</div>

<div v-click mt-3>

```ts
function patch(oldVNode, newVNode, container) {
  if (oldVNode && oldVNode.type !== newVNode.type) {
    unmount(oldVNode)
    oldVNode = null
  }

  const { type } = newVNode
  if (typeof type === 'string') {
    if (!oldVNode) {
      mountElement(newVNode, container)
    } else {
      patchElement(oldVNode, newVNode)
    }
  } else if (typeof type === 'object') {
    // 元件
  }
}
```

</div>

<!--
在另外一個情境也會發生卸載操作，[click] 例如前後繪製的是不同的元素。[click] 這時候在 patch 時我們就要先進行卸載，再繼續往下更新。
-->

---

# 事件的處理 {.font-500}

<div class="grid grid-cols-2 gap-3">

<div class="flex flex-col items-center children:w-full">

```html
<button @click="() => alert('Clicked!')">
  Click
</button>
```

<v-click>

<ph-arrow-down-duotone class="opacity-50"/>

```ts
const vnode = {
  type: 'button',
  props: {
    onClick: () => alert('Clicked!')
  },
  children: 'Click'
}
```

</v-click>

</div>

<v-click>

````md magic-move

```ts
const isOn = (key: string): boolean =>
  key.charCodeAt(0) === 111 /* o */ &&
  key.charCodeAt(1) === 110 /* n */ &&
  // uppercase letter
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97)

function patchEvent(el, key, prevValue, nextValue) {
  const name = key.slice(2).toLowerCase()
  el.addEventListener(name, nextValue)
}

function patchProps(el, key, prevValue, nextValue) {
  if (isOn(key)) {
    patchEvent(el, key, prevValue, nextValue)
  }
}
```

```ts
function patchEvent(el, key, prevValue, nextValue) {
  const name = key.slice(2).toLowerCase()
  el.addEventListener(name, nextValue)
}
```

```ts
function patchEvent(el, key, prevValue, nextValue) {
  const name = key.slice(2).toLowerCase()
  if (prevValue) {
    el.removeEventListener(name, prevValue)
  }
  el.addEventListener(name, nextValue)
}
```

```ts
function patchEvent(el, key, prevValue, nextValue) {
  const name = key.slice(2).toLowerCase()
  let invoker = el._vei
  if (nextValue) {
    if (!invoker) {
      invoker = el._vei = (e) => {
        invoker.value(e)
      }
      invoker.value = nextValue
      el.addEventListener(name, invoker)
    } else {
      invoker.value = nextValue
    }
  } else if (invoker) {
    el.removeEventListener(name, invoker)
  }
}
```

```ts
function patchEvent(el, key, prevValue, nextValue) {
  const invokers = el._vei || (el._vei = {})
  const invoker = el._vei[key]
  const name = key.slice(2).toLowerCase()
  if (nextValue) {
    if (!invoker) {
      invoker = invokers[key] = (e) => {
        invoker.value(e)
      }
      invoker.value = nextValue
      el.addEventListener(name, invoker)
    } else {
      invoker.value = nextValue
    }
  } else if (invoker) {
    el.removeEventListener(name, invoker)
  }
}
```

```ts
function patchEvent(el, key, prevValue, nextValue) {
  const invokers = el._vei || (el._vei = {})
  const invoker = el._vei[key]
  const name = key.slice(2).toLowerCase()
  if (nextValue) {
    if (!invoker) {
      invoker = invokers[key] = (e) => {
        if (Array.isArray(invoker.value)) {
          invoker.value.forEach(fn => fn(e))
        } else {
          invoker.value(e)
        }
      }
      invoker.value = nextValue
      el.addEventListener(name, invoker)
    } else {
      invoker.value = nextValue
    }
  } else if (invoker) {
    el.removeEventListener(name, invoker)
  }
}
```

````

</v-click>

</div>

<!--
事件的處理，這是在 Vue 模板裡面對元素綁定事件的方法，[click] 它會被轉換成這樣的 vnode。

在 Vue 裡面，如果遇到屬性是 `on` 頭，後面接著大寫的英文，就會被判定為事件處理。

[click] 這裡將事件處理獨立出來看，假設 vnode 上有一個 `onClick` 事件，我們就使用 `addEventListener` 將事件掛上去。[click] 接著，隨著程式的運行，我們隨時有可能更新這個事件處理器的 function，所以我們得在加入新的事件監聽器前，要記得先移除舊的監聽器。

但如果我們頻繁更新事件處理器 function，會造成不斷的 `removeEventListener` 然後 `addEventListener`，應該有更好的方式處理。

[click] 所以我們引入 **invoker** 的概念，我們只會註冊一次事件監聽器，之後更新事件處理 function 時，只要更新 `invoker.value` 即可。

現在這裡只能支援一個事件，毫無疑問，我們必須支援多個事件，解決方法很簡單 [click] 在這裡可以把 invoker 依照它對應的事件名稱存到 invokers 物件裡面就可以了！

最後，Vue 還支援一個事件綁定多個 function，這時拿到的 value 會是一個陣列， [click] 如果 value 是一個陣列，我們就一個一個依序呼叫事件執行，這樣就可以支援多個事件處理器的情境。
-->

---
clicks: 8
---

# 事件「冒泡」與更新時機問題 {.font-500}

<div v-click transition duration-800 class="grid grid-cols-[1fr_20rem] gap-3">

```ts
const condition = ref(false)
const vnode = {
  type: 'div',
  props: condition.value
    ? {
        onClick: () => console.log('[DIV] Clicked!')
      }
    : {},
  children: [
    {
      type: 'button',
      props: {
        onClick: () => condition.value = true
      },
      children: 'Click'
    }
  ]
}

effect(() => {
  renderer.render(vnode, document.querySelector('#app'))
})
```

<EventFlow class="w-80 h-full" clicks />

</div>

---

<div class="grid grid-cols-[20rem_1fr] h-full place-content-center gap-3">

<EventFlow class="w-80 h-full" :clicks="false" />

````md magic-move

```ts
function patchEvent(el, key, prevValue, nextValue) {
  const invokers = el._vei || (el._vei = {})
  const invoker = el._vei[key]
  const name = key.slice(2).toLowerCase()
  if (nextValue) {
    if (!invoker) {
      invoker = invokers[key] = (e) => {
        if (Array.isArray(invoker.value)) {
          invoker.value.forEach(fn => fn(e))
        } else {
          invoker.value(e)
        }
      }
      invoker.value = nextValue
      el.addEventListener(name, invoker)
    } else {
      invoker.value = nextValue
    }
  } else if (invoker) {
    el.removeEventListener(name, invoker)
  }
}
```

```ts {8,16}
function patchEvent(el, key, prevValue, nextValue) {
  const invokers = el._vei || (el._vei = {})
  const invoker = el._vei[key]
  const name = key.slice(2).toLowerCase()
  if (nextValue) {
    if (!invoker) {
      invoker = invokers[key] = (e) => {
        if (e.timeStamp < invoker.attached) return
        if (Array.isArray(invoker.value)) {
          invoker.value.forEach(fn => fn(e))
        } else {
          invoker.value(e)
        }
      }
      invoker.value = nextValue
      invoker.attached = performance.now()
      el.addEventListener(name, invoker)
    } else {
      invoker.value = nextValue
    }
  } else if (invoker) {
    el.removeEventListener(name, invoker)
  }
}
```

````

</div>

---
clicks: 13
---

# 更新子節點 {.font-500}

<div class="grid grid-cols-2 gap-2 items-center h-[calc(100%-4rem)]">

````md magic-move

```html
<!-- 沒有子節點 -->
<div></div>

<!-- 文字 -->
<div>Hello!</div>

<!-- 多個子節點 -->
<div>
  <span>Hello!</span>
  <span>Vue</span>
</div>
```

```ts
// 沒有子節點
const vnode1 = {
  type: 'div'
  children: null
}

// 文字子節點
const vnode2 = {
  type: 'div'
  children: 'Hello!'
}

// 多個子節點
const vnode3 = {
  type: 'div'
  children: [
    { type: 'span', children: 'Hello!' },
    { type: 'span', children: 'Vue' }
  ]
}
```

````

<VNodePatchFlow v-click="2" clicks class="h-full" />

</div>

---

# 更新子節點 {.font-500}

<div class="grid grid-cols-2 gap-3">

```ts {*|20}
function patchElement(oldVNode, newVNode) {
  const el = newVNode.el = oldVNode.el
  const oldProps = oldVNode.props
  const newProps = newVNode.props

  for (const key in newProps) {
    const oldValue = oldProps[key]
    const newValue = newProps[key]
    if (oldValue !== newValue) {
      patchProp(el, key, oldValue, newValue)
    }
  }

  for (const key in oldProps) {
    if (!(key in newProps)) {
      patchProp(el, key, oldProps[key], null)
    }
  }

  patchChildren(oldVNode, newVNode, el)
}
```

<div v-click="1" transition duration-800 :class="{ 'translate-y-[-2em]': $clicks >= 4 }">

````md magic-move {at:2}

```ts
function patchChildren(oldVNode, newVNode, container) {
  if (typeof newVNode.children === 'string') {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(child => unmount(child))
    }
    setElementText(container, newVNode.children)
  }
}
```

```ts
function patchChildren(oldVNode, newVNode, container) {
  if (typeof newVNode.children === 'string') {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(c => unmount(c))
    }
    setElementText(container, newVNode.children)
  } else if (Array.isArray(newVNode.children)) {
    if (Array.isArray(oldVNode.children)) {
      //
    } else {
      setElementText(container, '')
    }
    newVNode.children.forEach(c => {
      patch(null, c, container)
    })
  }
}
```

```ts
function patchChildren(oldVNode, newVNode, container) {
  if (typeof newVNode.children === 'string') {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(c => unmount(c))
    }
    setElementText(container, newVNode.children)
  } else if (Array.isArray(newVNode.children)) {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(c => unmount(c))
    } else {
      setElementText(container, '')
    }
    newVNode.children.forEach(c => {
      patch(null, c, container)
    })
  }
}
```

```ts
function patchChildren(oldVNode, newVNode, container) {
  if (typeof newVNode.children === 'string') {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(c => unmount(c))
    }
    setElementText(container, newVNode.children)
  } else if (Array.isArray(newVNode.children)) {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(c => unmount(c))
    } else {
      setElementText(container, '')
    }
    newVNode.children.forEach(c => {
      patch(null, c, container)
    })
  } else {
    if (Array.isArray(oldVNode.children)) {
      oldVNode.children.forEach(c => unmount(c))
    } else if (typeof oldVNode.children === 'string') {
      setElementText(container, '')
    }
  }
}
```

````

</div>

</div>

<!--
更新子節點，我們從 `patchElement` 出發，前面我們有提到，新舊 vnode 的 type 不同時，我們會 unmount 所有節點後再重新 mount，如果 type，我們就可以言用原本的元素，只對 props 進行更新。

更新方式很簡單，把新的 props 與舊的 props 比對更新，移除不存在的屬性即可。

接著我們就可以來更新子節點拉！我們前面一共盤點了九種情境，好在我們不用每一種情境都處理。

[click]  首先第一種情境。新節點是一個「文字子節點」，這時「沒有子節點」與「文字子節點」都不需要特別處理，我們只要處理「一組子節點就好」，處理方式也很簡單，就是一個一個把他們給 unmount 就完成了。

[click] 當新的子節點是一組陣，而舊的是文字子節點，清空文字子節點。[click] 舊的子節點是陣列，那就一個一個 unmount。最後將節點更新上去。

[click] 最後只剩下「沒有新的子節點」，那我們只要ˊˇ依照前面的模式，檢查舊有節點並且移除就完成拉！
-->

---

# 文字與註解節點 {.font-500}

<div class="grid grid-cols-[1fr_max-content] gap-3">

````md magic-move

```html
<div>我是文字節點</div>
<div><!-- 我是註解節點 --></div>
```

```ts
const Text = Symbol('Text')
const node1 = {
  type: Text,
  children: '我是文字節點'
}

const Comment = Symbol('Comment')
const node2 = {
  type: Comment,
  children: '我是註解節點'
}
```

````

<div v-click transition duration-800>

````md magic-move { at: 3, class: 'translate-y-[-4rem]' }

```ts
function patch(oldVNode, newVNode, container) {
  const { type } = newVNode

  if (typeof type === 'string') {
    // 元素節點
  } else if (type === Text) {
    // 文字節點
  } else if (type === Comment) {
    // 註解節點
  }
}
```

```ts
function patch(oldVNode, newVNode, container) {
  const { type } = newVNode

  if (typeof type === 'string') {
    // 元素節點
  } else if (type === Text) {
    if (!oldVNode) {
      const el = newVNode.el = createText(newVNode.children)
      insert(el, container)
    } else {
      const el = newVNode.el = oldVNode.el
      if (newVNode.children !== oldVNode.children) {
        setText(el, newVNode.children)
      }
    }
  } else if (type === Comment) {
    // 註解節點
  }
}
```

```ts
function patch(oldVNode, newVNode, container) {
  const { type } = newVNode

  if (typeof type === 'string') {
    // 元素節點
  } else if (type === Text) {
    if (!oldVNode) {
      const el = newVNode.el = createText(newVNode.children)
      insert(el, container)
    } else {
      const el = newVNode.el = oldVNode.el
      if (newVNode.children !== oldVNode.children) {
        setText(el, newVNode.children)
      }
    }
  } else if (type === Comment) {
    if (!oldVNode) {
      const el = newVNode.el = createComment(newVNode.children)
      insert(el, container)
    } else {
      newVNode.el = oldVNode.el
    }
  }
}
```

````

</div>

</div>

---

# Fragment {.font-500}

<div class="grid grid-cols-[1fr_max-content] gap-3">

````md magic-move

```html
<template>
  <button>Click</button>
  <p>Hello! Vue</p>
</template>
```

```ts
const Fragment = Symbol('Fragment')
const vnode = {
  type: Fragment,
  children: [
    { type: 'button', children: 'Click' },
    { type: 'p', children: 'Hello! Vue' }
  ]
}
```

````

<div v-click transition duration-800 class="-translate-y-[4rem]">

```ts
function patch(oldVNode, newVNode, container) {
  const { type } = newVNode

  if (condition) {
    // 其他節點
  } else if (type === Fragment) {
    if (!oldVNode) {
      newVNode.children.forEach(c => patch(null, c, container))
    } else {
      patchChildren(oldVNode, newVNode, container)
    }
  }
}
```

<div v-click="4" transition duration-800>

```ts
function unmount(vnode) {
  if (vnode.type === Fragment) {
    vnode.children.forEach(c => unmount(c))
    return
  }
  const parent = vnode.el.parentNode
  if (parent) {
    parent.removeChild(vnode.el)
  }
}
```

</div>

</div>

</div>

---
layout: intro
class: text-center pb-5
---

# Thank you! {.font-hand.italic}
