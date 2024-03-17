---
theme: default
layout: cover
highlighter: shiki
transition: slide-in fade
title: 從 Vorms 出發的一場開源大冒險
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
aspectRatio: '16/10'
---

# 從 Vorms 出發的一場開源大冒險
{Laravel x Vue}Conf Taiwan 2023

---
layout: image-right
title: Alex Liu
image: /alex-liu.jpeg
---

# Alex Liu

- 前端網頁工程師
- 使用 Vue（Nuxt）與 React
- Creator of Vorms
- 開源專案貢獻

  <div class="grid grid-cols-7 place-content-around gap-4">
    <div class="flex items-center justify-center">
      <img src="/gridsome.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/vue-final-modal.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/nuxt.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="https://avatars.githubusercontent.com/u/53986236" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/elk.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/vueuse.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/pinia.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/tanstack-query.svg" class="w-full">
    </div>
    <div class="flex items-center justify-center">
      <img src="/vue.svg" class="w-full">
    </div>
  </div>  

<div class="absolute grid gap-y-2 bottom-10">
  <div><logos-twitter />  @Minighost_Alex</div>
  <div><logos-facebook />  Alex Liu</div>
  <div><carbon-logo-github />  Mini-ghost</div>
</div>

<!--
本次研討會將探討從 Vorms 表單驗證和狀態管理庫出發的一場開源大冒險。在開發專案時，我們常常使用來自不同開源貢獻者的工具，但是否有可能打造一個更符合我們喜好、使開發更舒適的工具呢？本次研討會將分享從 Vorms 開始的這場冒險，包括開發過程中所學到的經驗與心得，以及在開發 Composition API 過程中的技巧。
-->

---
class: 'flex flex-col items-center justify-center'
---

<h1>為什麼要自己做一個表單工具呢？</h1>
<p>為什麼重複造輪子？</p>

<!-- 
為什麼我要自己做一個表單工具呢？

我有一個寫 React 的朋友，他是一個對自己程式能力非常有自信的人，的確我在寫 React 的時候很多問題他都會給我一些蠻有用的建議跟方向，在我眼中他算是一個很厲害的前輩了！

後來他在他的公司接手了一個 Vue 的專案，一個後台的專案，他問我有什麼表單工具推薦的，我就把我知道的一些解決方案分享給他。並跟說 Vue 在處理表但的問題比 React 容易多了，應該很輕鬆拉！

不過過了幾天他就打來跟我說他覺得我推的工具真的很難用，並且 ... 以下省略 500 字的抱怨。聽到這種問題我已經見慣不怪了！

但當我想告訴他他選的工具該怎麼使用時我發現連我都覺得好複雜，連我這個忠實的 Vue 擁護者都覺得好像有點頭痛，為什麼我什麼都沒做他就給我噴一堆錯誤，我沒叫你執行驗證啊！

我拿著這個問題開了一個 issue，得到的答案卻是：「這是預期的」

umm 我想這些工具無疑是一個很棒很主流的表單驗證工具，但主流不一定符合我的使用想像，所以我想要寫一個「符合我的想像」的表單驗證工具，一個我那個寫 React 的朋友會覺得寫 Vue 沒那麼痛苦的表單工具，所以我就開始了這場冒險。
-->

---
class: -mx-4 !w-[calc(100%+2rem)]
---

<div class="grid grid-cols-2 gap-4">

<div class="flex items-center justify-center gap-3">
<img alt="Vuelidate" src="/vuelidate-logo.png" width="48">
<strong class="text-2xl text-gray-400">Vuelidate</strong>
</div>

<div class="flex items-center justify-center gap-3">
<img alt="VeeValidate" src="https://vee-validate.logaretm.com/v4/logo.png" width="48">
<strong class="text-2xl text-gray-400">VeeValidate</strong>
</div>

```vue
<script setup lang="ts">
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const state = reactive({
  name: '',
  email: '',
})

const rules = {
  name: { required },
  email: { required, email },
}

const v$ = useVuelidate(rules, state)
</script>
```

```vue
<script setup lang="ts">
import { useForm, useField } from 'vee-validate'

const { handleSubmit } = useForm({
  initialValues: {
    name: '',
    email: '',
  }
})

// 其中一種使用方式 Laravel Validation Style
const { value: nameValue } = useField('name', 'required')
const { value: emailValue } = useField(
  'email',
  'required|email'
)

const onSubmit = handleSubmit(() => {
  // do something
})
</script>
```

</div>

<style>
img {
  display: inline-block
}
</style>

---

# What is Vorms ?
Vorms 是一個基於 Composition API 開發的表單驗證和狀態管理工具。

<div class="text-center pt-[6vh]">
  <img 
    src="https://raw.githubusercontent.com/Mini-ghost/vorms/main/docs/public/logo.svg" 
    alt="Vorms - Vue Form Validation with Composition API" 
    width="200"
  >
  <p>
  Vue Form Validation with Composition API
  </p>
  <p>
    <img alt="NPM version" src="https://img.shields.io/npm/v/@vorms/core?color=34A88C&label=">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@vorms/core?color=00629E&label=">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/Mini-ghost/vorms?style=social">
  </p>
</div>

<style>
img {
  display: inline-block
}

img + img {
  margin-left: 0.25rem;
}
</style>

---

# Feature

- 🦾 **型別安全**：採用 TypeScript 開發，並且有 TSDoc 文件註解。
- 🎈 **輕量**：壓縮後只有 12KB（gzip 壓縮後只有 4kb），並支援 tree-shaking。
- 🤹 **簡單**：Vorm 使用 Composition API，讓開發時感受非常順暢。
- 🧩 **靈活彈性**：支援 Yup、Zod 以及自訂驗證方式。

---

# 基本用法 - `useForm()`

<div class="grid grid-cols-2 gap-4 text-xs">


```ts {all|4-10|11-13|14-16|19}
import { useForm } from '@vorms/core'

const { register, handleSubmit, handleReset } = useForm({
  initialValues: {
    name: {
      first: '',
      last: '',
    },
  	email: '',
  },
  validate() {
    // validation function
  },
  async onSubmit(values, helper) {
    await mutateCreate(values)
  },
})

const { value, error, attrs } = register('name.first')
```

<div class="text-[1.1rem]">

<div v-show="$slidev.nav.clicks === 1">

### initialValues（必填）

<br>

- 表單的初始值
- 可接受巢狀物件
- 表單是否 `dirty` 的比較基準

</div>

<div v-show="$slidev.nav.clicks === 2">

### validate

- 表單的驗證邏輯
- 可接受同步或是非同步的 function 
  ```ts
  validate(values) {
    const errors = {}
    if(!values.email) {
      errors.email = 'email 為必填'
    }
    return errors
  }
  ```

- 可與第三方驗證工具整合，如 Yup、Zod ...。

</div>

<div v-show="$slidev.nav.clicks === 3">

### onSubmit（必填）

<br>

- 表單的 submit function。
- 如果沒有通過表單驗證驗證，則不會調用此函數。
- 可接受同步或是非同步的 function。（同步的話需要自己管理 `isSubmitting` 狀態）
- `helper`
  ```ts
  {
    setSubmitting: (isSubmitting: boolean) => void
    initialValues: Record<string, any>
  }
  ```

</div>

<div v-show="$slidev.nav.clicks >= 4">

```vue
<template>
  <form @submit="handleSubmit" @reset="handleReset">
    <div>
      <input v-model="value" v-bind="attrs" />
      <span v-show="error">{{ error }}</span>
    </div>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>
</template>
```

<v-click>

```html
<input
  v-model="value"
  name="name.first"
  @input="onInput"
  @change="onChange"
  @blur="onBlur"
/>
```

</v-click>

</div>

</div>

</div>

<!--
1. 加上 validate 的範例
2. 將 `validateMode`, `reValidateMode` 拆出，加上每個 mode 的範例
-->

---

# 觸發驗證的時機（validateMode / reValidateMode）
blur | change | input | submit

<v-clicks>

- `validateMode`
  - 第一次按下 submit 按鈕「**之前**」的驗證時機。
  - 預設為： `submit`

- `reValidateMode`
  - 第一次按下 submit 按鈕「**之後**」的驗證時機。
  - 預設為： `change`

</v-clicks>

<br>

<v-click>

> 不論是 `validateMode` 與 `reValidateMode`，設定為何，表單送出前一定會整張表單驗證過一次，確保所有欄位都是有效的。

</v-click>

---

# 觸發驗證的時機（validateMode / reValidateMode）
blur | change | input | submit

<div class="grid grid-cols-4 gap-4 mt-20">
<FormValidateMode mode="input" />
<FormValidateMode mode="change"  />
<FormValidateMode mode="blur" />
<FormValidateMode mode="submit" />
</div>

---

# @vorms/resolvers

整合第三方驗證工具，讓表單驗證的選擇更加彈性。

**與 Yup 一起使用**

```sh
npm install @vorms/resolvers yup
```

**與 Zod 一起使用**

```sh
npm install @vorms/resolvers zod
```

<v-click>

**與 Valibot 一起使用**

```sh
npm install @vorms/resolvers@beta valibot
```

</v-click>
---

# 第三方驗證工具

<div class="grid grid-cols-2 gap-4">

<div>

### Yup

```ts
import { useForm } from '@vorms/core'
import { yupResolver } from '@vorms/resolvers/yup'
import { object, string } from 'yup';

useForm({
  initialValues: {
    name: '',
    email: '',
  },
  validate: yupResolver(
    object({
      name: string().required(),
      email: string().required().email(),
    })
  )
})
```

</div>

<div>

### Zod

```ts
import { useForm } from '@vorms/core'
import { zodResolver } from '@vorms/resolvers/zod'
import { z } from "zod"

useForm({
  initialValues: {
    name: '',
    email: '',
  },
  validate: zodResolver(
    z.object({
      name: z.string().nonempty(),
      email: z.string().nonempty().email(),
    })
  )
})
```

</div>

</div>

<!-- 
  我自己更喜歡 zod 一點，因為 TypeScript 的關係，它可以讓我的 API 跟表單操作共用一個型別定義。
  但 Yup 的 API 我覺得更直覺，並切他支援 tree-shaking，所以我們可以根據自己的喜好來選擇。
-->

---

# Valibot
異軍突起的第三方驗證工具：Valibot？

<img src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F5a1666cd8979452baaff6612185ed894?format=webp&width=2000" class="w-3/4 mx-auto mt-10">

---

# Valibot
Valibot 跟 Zod 的比較

<div class="grid grid-cols-2 gap-2">

<div>

### Zod

```ts
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});
```

- 優點：
  - 資源文件豐富
  - 有工具可以將 JSON 轉換成 zod schema

- 缺點
  - 無法 Tree Shaking

</div>

<div>

### Valibot

```ts
import { object, string, maxLight, minLight, email } from 'valibot';

const schema = object({
  email: string([email()])
  password: string([minLight(8), maxLight(255)]),
});
```

- 優點：
  - 可以 Tree Shaking

- 缺點
  - 資源範例少

</div>

</div>

---

# Composable APIs - `useField`

<div/>

用於處理特定表單欄位的值、狀態和屬性，同時支援欄位層級的驗證功能。

```vue
<script setup lang="ts">
import { useField } from '@vorms/core'

const { value, error, attrs } = useField<string>('drink', {
  validate(value) {
    return value ? 'This is required!!' : undefined
  }
})
</script>

<template>
  <div>
    <input v-model="value" type="text" v-bind="attrs" >
    <span>{{ error }}</span>
  </div>
</template>
```

<v-clicks>

- 使用方式幾乎跟 `register` 一樣。
- 跨多層元件的解決方案

</v-clicks>

---

# Composable APIs - `useField`
`useField` 內部透過了 vue 的 Provide / Inject 來實現跨多層元件的資料傳遞。

<img src="/provide-inject.png" class="mt-10">

---

# Composable APIs - `useFieldArray()`

<div/>

回傳特定欄位（陣列）的值、元數據（狀態）和屬性，同時提供常見的操作輔助函數。此外，你還可以添加驗證功能來驗證其中的值。

<div class="grid grid-cols-2 gap-4">

```vue
<script setup lang="ts">
import { useForm, useFieldArray } from '@vorms/core'

const { handleSubmit } = useForm({
  initialValues: {
    foods: [
      'Bubble Tea',
      'Stinky Tofu',
      'Scallion Pancake'
    ]
  },
  onSubmit(data) {
    console.log(data)
  }
})

const { fields, append } = useFieldArray<string>('foods')
</script>

```

```vue
<template>
  <form @submit="handleSubmit">
    <div v-for="field in fields" :key="field.key">
      <input 
        v-model="field.value" 
        type="text" 
        :name="field.name" 
        v-bind="field.attrs"
      >
    </div>
    <button type="button" @click="append('Taiwanese Fried Chicken')">
      Append
    </button>
    <button type="submit">Order</button>
  </form>
</template>
```

</div>

---

# Composable APIs - `useFieldArray()`

<div/>

<div class="grid grid-cols-2 gap-2">

```ts
const {
  fields,
  append,
  prepend,
  remove,
  swap,
  move,
  insert,
  update,
  replace,
} = useFieldArray<string>('foods');
```

<div class="text-sm">

| 方法       | 說明                        |
| --------- | --------------------------- |
| `append`  | 在第一個欄位前面增加一個新的欄位    |
| `prepend` | 在最後一個欄位前面增加一個新的欄位   |
| `swap`    | 交換兩個欄位的位置。           |
| `remove`  | 移除指定位置的欄位，如果沒有給定位置則會清除掉所有欄位資料。 |
| `move`    | 將指定欄位移動到另一個位置。       |
| `insert`  | 在指定位置插入一個欄位。         |
| `update`  | 更新指定位置的欄位內容。           |
| `replace` | 替換整個欄位陣列的值。         |

</div>

</div>

<!-- 
  這些方法可用於處理 `useFieldArray()` 提供的欄位陣列，讓你能輕鬆地操作和更新其中的資料。
-->

---

# Composable APIs - `useFieldArray()`

<FormFieldArray />

---

# Smart Form Component

<div/>

雖然 Vue 的 `v-model` 有效的簡化了表單輸入綁定，但處理大型且複雜的表單仍然有點痛苦。

<div class="grid grid-cols-2 gap-2">

<v-clicks>

```vue
<template>
  <form  @submit="onSubmit">
    <input 
      v-model="values.drink" 
      name="drink" 
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    />

    <select 
      v-model="values.sugar"
      name="sugar" 
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    >
      <!-- v-for options -->
    </select>
    <button type="submit">Submit</button>
  </form>
</template>
```

```vue
<template>
  <SmartForm 
    :initial-values="initialValues" 
    @submit="onSubmit"
  >
    <SmartTextField name="drink" />
    <SmartSelect 
      name="sugar" 
      :options="['無糖', '少糖', '半糖', '全糖']" 
    />
    <button type="submit">Submit</button>
  </SmartForm>
</template>
```

</v-clicks>

</div>
---

# Smart Form Component

SmartForm

<div class="grid grid-cols-2 gap-4">

```vue
<script setup lang="ts">
import { useForm } from '@vorms/core';

interface SmartFormProps {
  initialValues: Record<string, any>;
}

interface SmartFormEmits {
  (event: 'submit', values: Values): void;
}

const props = defineProps<SmartFormProps>();
const emit = defineEmits<SmartFormEmits>();

const { handleSubmit, handleReset } = useForm({
  initialValues: props.initialValues,
  onSubmit(values) {
    emit('submit', values);
  },
});
</script>
```

```vue
<template>
  <form @submit="handleSubmit" @reset="handleReset">
    <slot name="default" />
  </form>
</template>
```

</div>

---

# Smart Form Component

SmartTextField / SmartSelect

<div class="grid grid-cols-2 gap-4">

```vue
<script setup lang="ts">
import { useField } from '@vorms/core'

interface SmartTextFieldProps {
  name: string;
}

const props = defineProps<SmartTextFieldProps>()

const { value, attrs } = useField(props.name)
</script>

<template>
  <input v-model="value" type="text" v-bind="attrs">
</template>
```

```vue
<script setup lang="ts">
import { useField } from '@vorms/core'

interface SmartSelectProps {
  name: string;
  options: string[]
}

const props = defineProps<SmartSelectProps>()

const { value, attrs } = useField(props.name)
</script>

<template>
  <select v-model="value" v-bind="attrs">
    <!-- v-for options -->
  </select>
</template>
```
</div>

---

# 設計 Smart Form Component 的注意事項

我從開源中學到的 Composable API 的使用技巧

其實目前的 Smart Form Component 還有一些問題！

```vue {all|10} {lines:true, startLine:1}
<script setup lang="ts">
import { useField } from '@vorms/core'

interface SmartTextFieldProps {
  name: string;
}

const props = defineProps<SmartTextFieldProps>()

const { value, attrs } = useField(props.name)
</script>

<template>
  <input v-model="value" type="text" v-bind="attrs">
</template>

```

<div v-click class="mt-[5%] text-red-500">
這裡的 `useField` 不會響應傳入的 `name` 變化。
</div>
---

# 設計 Smart Form Component 的注意事項

我從開源中學到的 Composition API 的使用技巧

確保當傳入的 name 改變時，`useField` 能做出相對應的處理。

```vue
<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from '@vorms/core'

interface SmartTextFieldProps {
  name: string;
}

const props = defineProps<SmartTextFieldProps>()

const { value, attrs } = useField(toRef(props, 'name'))
const { value, attrs } = useField(toRef(() => props.name))

// Vorms 1.2.0-beta.2 後
const { value, attrs } = useField(() => props.name)
</script>

```

---

## 啟發

<div class="flex gap-3 mb-10">

<ProjectCard 
  title="React Hook Form"
  description="📋 React Hooks for form state management and validation (Web + React Native)"
  image="https://avatars.githubusercontent.com/u/53986236?s=280&v=4"
/>

<ProjectCard 
  title="Formik"
  description="Build forms in React, without the tears 😭"
  image="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png"
/>

<ProjectCard 
  title="VeeValidate"
  description="✅ Painless Vue forms"
  image="https://vee-validate.logaretm.com/v4/logo.png"
/>

</div>

## 貢獻者

<p>
  <img src="https://contrib.rocks/image?repo=mini-ghost/vorms"  class="w-[200px]" />
</p>

---

# Vorms 的下一步

添加更多的 resolvers

- `valibot` - The modular and type safe schema library for validating structural data 🤖
- `validatorjs` - 用於瀏覽器和 Node.js 的 JavaScript 資料驗證 Library，靈感來自 Laravel 的 Validator。
- `joi`
- `ajv`
- `class-validator`

---

# 開個 PR (Pull Request) 吧！

如果你發現 Vorms 有什麼可以可以改善的地方，或是想擴充 resolvers，開個 PR 吧！

## 什麼時候開啟 PR

<br >

1. 修正程式錯誤
2. 實現一個新功能
3. 修改文件說明（改錯字、調整措辭、修正壞掉的連結、翻譯）

---

# 如何提交一個 PR
一個 PR 通常會包含以下內容：

1. 如果這個 PR 是為了解決某些 issue，可以在 PR 中提及。
2. 紀錄解決的問題以及為了解決這個問題做過的嘗試。

---

# 如何提交一個 PR
PR 範例

<img src="/github-pr-content-2.png" class="w-full" alt="github 上的 fork button" />

---

# 提出 Issue
提出 Issue 也是一個很好參與開源的方式。

1. 提出功能錯誤、效能議題。
2. 提出一個新功能的想法。


<img v-click src="/vorms-feature-issue.png" class="w-full" />

<!-- 
  - 假如你看到一個 open 的 issue，也是你打算解決的，寫下留言，告訴其他人你要開工了。這樣的話，可以避免與其他人做了重複的事情。
  - 假如某個 issue 已經處於 open 的狀態很久了，可能是有人正在處理中，又或者是已經解決了，也請你留言確認一下事情的狀態再決定下一步。
  - 假如你創建了 issue ，但是沒多久自己解決了，也要留言，讓其他人知道，然後結束該 issue 。記錄本身就是爲社群的貢獻。
-->

---

# 如果是提出錯誤 issue 應該包含什麼？

- 發生錯誤的版本號碼
- 錯誤的「**最小可重現**」（Reproducible）

<br />

<div v-click>

>如果每个人都能在提 Issue 之前可以花一些时间创建一个最小重现，合集下来就能为维护者节省数百个小时（这甚至可以帮助使用者自己找到解决方案/错误，以至于不再需要提 Issue）。
> -- Anthony Fu

</div>
---

# 開源的收穫

開源大多時候跟一般開發專案沒有太大的差異，但是有一些收穫是在一般專案中無法獲得的。

當參加開源社群時，你可以得到以下好處：

1. **學習機會與知識分享**
2. **提升技術能力** 
3. **擴展人脈** 
4. **心靈滿足和成就感** 

這些好處使參與開源社群成為一個對個人和職業發展都非常有益的活動。

<!-- 
1. 開源社群是許多有經驗的開發者和專業人士聚集的地方。透過參與討論、閱讀程式碼和參與貢獻，您能夠學習到新的技術、開發流程和最佳實踐。
2. 參與開源項目使您直接面對真實世界的問題和挑戰，這能夠提升您的技術能力和解決問題的能力。同時，獲得其他開發者的反饋也是您成長的機會。
3. 開源社群是來自世界各地的開發者、設計師和技術愛好者聚集的地方。透過與他們互動，您能夠擴展人脈，建立有價值的職業和社交關係。
4. 參與開源社群是一種無私奉獻的行為，您不僅能幫助他人解決問題，也為整個開發社群作出貢獻。這種心靈滿足和成就感是在一般專案中難以獲得的，它能夠帶給您長期的動力和滿足感。
-->

---

# 找尋專案開始貢獻

從日常開發會用到的工具開始，找到一個你喜歡的開源專案，並且開始貢獻。

```json {} {lines:true, startLine:1}
{
  "dependencies": {
    "@tanstack/vue-query": "^4.32.0",
    "@vorms/core": "1.2.0-beta.1",
    "@vorms/resolvers": "1.2.0-beta.1",
    "@vueuse/core": "^10.2.1",
    "pinia": "^2.1.6",
    "vue": "^3.3.4",
    "vue-final-modal": "^4.4.5",
  },
}
```

---

# 找尋專案開始貢獻

你可以從這些專案的 issue 中找到一些你想要解決的問題，或是從中找到一些你想要實作的功能。

<img src="/tanstack-vue-query.png" class="transform-y-20">

---

<p class="absolute top-[45%] left-1/2 -translate-y-1/2 -translate-x-1/2 w-full text-center">
平均一個專案有<strong class="text-5xl text-green-500 mx-1">28%</strong> 的貢獻是隨意且偶然的，像是寫說明文件、修正錯字、調整格式或翻譯。
</p>

---
layout: cover 
background: https://cdn2.ettoday.net/images/725/725600.jpg
class: 'flex flex-col items-center justify-center text-center space-y-1'
---

<h1>只要有心，人人都可以是食神。</h1>
