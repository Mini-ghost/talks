---
theme: seriph
background: https://cdn.jsdelivr.net/gh/slidevjs/slidev-covers@main/static/zRkBOOpKRhs.webp
title: 非同步程式設計模式
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: fade-out
mdc: true
---

# 非同步程式設計模式

Alex Liu @ JS Patterns 讀書會

<small class="opacity-50">2024-03-19</small>

---
class: pl-30 py-30
---

# Alex Liu

<div class="opacity-80">

- Front-End Web Developer
- JavaScript, TypeScript, Vue, Nuxt, <span class="opacity-20 px-1">React</span>
- <Repo name="mini-ghost/vorms" /> Owner

</div>

<img src="https://talks.mini-ghost.dev/2023/open-source-adventure/alex-liu.jpeg" width="140" height="140" class="rounded-full w-35 abs-tr mt-30 mr-60" />

<div class="absolute flex items-center gap-x-4 bottom-30 text-sm">
  <div class="flex items-center space-x-1.5"><carbon-user class="opacity-40" /><a href="https://mini-ghost.dev/" target="_blank" class="border-none! font-300">mini-ghost.dev</a></div>
  <div class="flex items-center space-x-1.5"><carbon-logo-x class="opacity-40" /><a href="https://twitter.com/Minighost_Alex" target="_blank" class="border-none! font-300">@Minighost_Alex</a></div>
  <div class="flex items-center space-x-1.5"><carbon-logo-github class="opacity-40" /><a href="https://github.com/Mini-ghost" target="_blank" class="border-none! font-300">Mini-ghost</a></div>
</div>

---

# 同步 & 非同步執行

<h2 class="!text-xl my-4">同步（Synchronous）</h2>

<div class="text-sm p-6 border border-solid border-gray rounded-lg bg-white/5">
  <div class="flex gap-1">
    <div class="flex items-center justify-center w-[15%] bg-red-400 py-px rounded-full">15ms</div>
    <div class="flex items-center justify-center w-[30%] bg-green-400 py-px rounded-full">30ms</div>
    <div class="flex items-center justify-center w-[25%] bg-orange-400 py-px rounded-full">25ms</div>
  </div>
</div>

<div class="h-2vw" />

<h2 class="!text-xl my-4">非同步（Asynchronous）</h2>

<div class="text-sm p-6 border border-solid border-gray rounded-lg bg-white/5">
  <div class="grid gap-2">
    <div class="flex items-center w-[15%] bg-red-400 py-px px-6 rounded-full">15ms</div>
    <div class="flex items-center w-[30%] bg-green-400 py-px px-6 rounded-full">30ms</div>
    <div class="flex items-center w-[25%] bg-orange-400 py-px px-6 rounded-full">25ms</div>
  </div>
</div>

---

# Callback Hell!!

波動拳、地獄回調、回調地獄、回調金字塔...（from Copilot）

```ts
request('https://api.example.com/data-1', (error, data) => {
  request('https://api.example.com/data-2', (error, data) => {
    request('https://api.example.com/data-3', (error, data) => {
      request('https://api.example.com/data-4', (error, data) => {
        // ...
      });
    });
  });
});
```

<div class="h-5vh"/>

<v-click>

> `async`、`await` 和 `Promise` 等語言特性使得在 JavaScript 中編寫非同步程式碼更加容易。它們允許您以一種不論是看起來還是行為表現都像同步程式碼的方式，來編寫非同步程式碼，讓他更易於閱讀和理解。

</v-click>

<!--
這個是在學習非同步程式設計時一定會提的經典範例。
-->

---

# Promise-based approach

```ts
$fetch('https://api.example.com/data-1')
  .then((data1) => $fetch('https://api.example.com/data-2'))
  .then((data2) => $fetch('https://api.example.com/data-3'))
  .then((data4) => {
    // ...
  })
  .catch((error) => {
    console.error(error);
  });

```
---

# Promise-based approach 範例

axios 攔截器（interceptors）<Repo name="axios/axios" />

<div class="grid grid-cols-2 gap-2">

```ts
if (!synchronousRequestInterceptors) {
  const chain = [dispatchRequest.bind(this), undefined];
  chain.unshift.apply(chain, requestInterceptorChain);
  chain.push.apply(chain, responseInterceptorChain);
  len = chain.length;

  promise = Promise.resolve(config);

  while (i < len) {
    promise = promise.then(chain[i++], chain[i++]);
  }

  return promise;
}
```

```ts
Promise.resolve(config)
  .then(interceptorRequest1, interceptorRequestError1)
  .then(dispatchRequest, undefined)
  .then(interceptorResponse1, interceptorResponseError1);

```

</div>


<span class="text-xs opacity-50">

參考閱讀：
- [深入淺出 axios（一）：預設 axios 物件、Axios 類別、攔截器](https://mini-ghost.dev/posts/axios-source-code-1)
- [深入淺出 axios（三）：axios 內部 Promise 導致請求延遲](https://mini-ghost.dev/posts/axios-source-code-3)

</span>

---
growX: 0
growY: 50
---

# Async/await approach

```ts
async function fetchData() {
  try {
    const data1 = await $fetch('https://api.example.com/data-1');
    const data2 = await $fetch('https://api.example.com/data-2');
    const data3 = await $fetch('https://api.example.com/data-3');
    const data4 = await $fetch('https://api.example.com/data-4');
    // ...
  } catch (error) {
    console.error(error);
  }
}

fetchData();
```

---
layout: center
---

<strong>

async、await 和 Promise 等語言特性使得在 JavaScript 中編寫非同步程式碼更加容易。它們允許您以一種不論是<span v-mark="{ at: '1', color: '#5d8392' }">看起來還是行為表現都像同步程式碼的方式</span>，來編寫非同步程式碼，讓他更易於閱讀和理解。

</strong>

---

# Promise.all()

同時執行多個 Promise，並等待所有 Promise 完成後回傳結果。

<div class="grid grid-cols-2 gap-4">

```ts
Promise.all([
  $fetch('https://api.example.com/data-1'),
  $fetch('https://api.example.com/data-2'),
  $fetch('https://api.example.com/data-3'),
  $fetch('https://api.example.com/data-4'),
]).then(([data1, data2, data3, data4]) => {
  // ...
}).catch((error) => {
  console.error(error);
});
```

```ts
async function getData() {
  try {
    const [
      data1,
      data2,
      data3,
      data4
    ] = await Promise.all([
      $fetch('https://api.example.com/data-1'),
      $fetch('https://api.example.com/data-2'),
      $fetch('https://api.example.com/data-3'),
      $fetch('https://api.example.com/data-4'),
    ]);
    // ...
  } catch (error) {
    console.error(error);
  }
}

getData()
```

</div>

---

# Promise.race()

同時執行多個 Promise，並回傳第一個結算的結果。

```ts
Promise.race([
  $fetch('https://api.example.com/data-1'),
  $fetch('https://api.example.com/data-2'),
]).then(data => {
  console.log(data);
})
```

---

# Promise.race() 範例

超時控制（網路請求超時控制、限時操作控制）

```ts
function timeout(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);
  });
}

Promise.race([
  $fetch('https://api.example.com/data-1'),
  timeout(3000),
])
  .then(data => console.log(data))
  .catch(error => console.error(error))

```

---

# Cache

使用快取來儲存 Promise 函數呼叫的結果，從而避免發出重複請求。

<div class="grid grid-cols-2 gap-2">

```ts
const cache = new Map();

function memoizedFetch(url: string) {
  if (cache.has(url)) return cache.get(url);

  return new Promise((resolve, reject) => {
    $fetch(url)
      .then(data => {
        cache.set(url, data);
        resolve(data);
      })
      .catch(error => reject(error))
  });

}
```
<v-click>

```ts
const cache = new Map();

function memoizedFetch(url: string) {
  if (cache.has(url)) return cache.get(url);

  const promise = new Promise((resolve, reject) => {
    $fetch(url)
      .then(data => resolve(data))
      .catch(error => reject(error))
  });

  cache.set(url, promise);

  return promise
}
```

</v-click>

</div>

---

# Cache 範例

Nuxt `useAsyncData` <Repo name="nuxt/nuxt" />

```ts
asyncData.refresh = asyncData.execute = () => {
  if (nuxtApp._asyncDataPromises[key]) return nuxtApp._asyncDataPromises[key]!

  const promise = new Promise((resolve, reject) => {
      try {
        resolve(handler(nuxtApp))
      } catch (err) {
        reject(err)
      }
    })
    .then(async (_result) => { /** 略 */ })
    .catch((error: any) =>{ /** 略 */ })
    .finally(() => {
      delete nuxtApp._asyncDataPromises[key]
    })

  nuxtApp._asyncDataPromises[key] = promise
  return nuxtApp._asyncDataPromises[key]!
}
```

<!--
在 Nuxt  3 的 `useAsnycData()` 內部也用到了 cache 的技巧。這樣一來如果同時有帶有相同 key 的請求則不會重複發出請求。
-->

---

# Cache 範例

TanStack Query（React Query）<Repo name="tanstack/query" />

```ts
class QueryCache {
  #queries: Map<string, Query>

  constructor() { this.#queries = new Map<string, Query>() }

  build(options) {
    let query = this.get(options.queryHash)
    if (!query) {
      query = new Query({ /** 略 */ })
      this.add(query)
    }
    return query
  }

  add(query: Query) { this.#queries.set(query.queryHash, query) }
  remove(query: Query) { this.#queries.delete(query.queryHash) }
}

```

<span class="text-xs opacity-50">

參考閱讀：[深入淺出 TanStack Query（一）：在呼叫 useQuery 後發生了什麼事](https://mini-ghost.dev/posts/tanstack-query-source-code-1)

</span>

<!--
在 TanStack Query 中會使用 `queryHash` 來當作識別請求 context（query）的 key，只要有找到對應的 query 則會重複使用它。
-->

---

# Retry

此模式允許失敗時重試 Promise

<div class="grid grid-cols-2 gap-2">

```ts
function requestWithRetry(url) {
  let attempts = 0;

  const request = () => new Promise((resolve, reject) => {
    $fetch(url)
      .then(result => resolve(result))
      .catch(error => reject(error))
  })

  const retry = () => {
    attempts++;
    if(attempts >= 3) {
      throw new Error('Request failed after 3 attempts.');
    }
      
    return request().catch(retry);
  }

  return request().catch(retry);
}
```

```ts
async function requestWithRetry(url) {
  let attempts = 0;

  while (attempts < 3) {
    try {
      return await $fetch(url);
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed, retrying...`);
    }
  }

  throw new Error('Request failed after 3 attempts.');
}
```

</div>

<!--
提醒：JavaScript 設計模式學習手冊的 115 頁的 Promise 重試範例有錯。
-->

---

# Retry With Delay

此模式允許失敗後間隔幾秒重試 Promise

```ts
async function retry(fu, maxRetries, delay) {
  let retries = 0;

  while (retries <= maxRetries) {
    try {
      return await fu();
    } catch (error) {
      retries++;
      console.log(`Attempt ${retries} failed, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Request failed after 3 attempts.');
}

retry(() => $fetch('https://api.example.com/data-1'), 3, 1000);

```


---

# Retry 範例

axios-retry <Repo name="softonic/axios-retry" />

```ts
axiosInstance.interceptors.request.use((config) => {
  setCurrentState(config, defaultOptions);
  return config;
});

axiosInstance.interceptors.response.use(null, async ({ config }) => {
  const currentState = setCurrentState(config, defaultOptions);

  if (await shouldRetry(currentState, error)) {
    currentState.retryCount += 1;

    const { retryDelay, onRetry } = currentState;
    const delay = retryDelay(currentState.retryCount, error);

    config.transformRequest = [(data) => data];
    await onRetry(currentState.retryCount, error, config);
    return new Promise((resolve) => setTimeout(() => resolve(axiosInstance(config)), delay));
  }
  return Promise.reject(error);
});
```


---

# Retry 範例

ofetch <Repo name="unjs/ofetch" />


```ts
async function onError(context: FetchContext): Promise<FetchResponse<any>> {
  if (context.options.retry !== false) {
    const retries = context.options.retry;

    if (retries > 0) {
      const retryDelay = context.options.retryDelay || 0;
      if (retryDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
      // Timeout
      return $fetchRaw(context.request, {
        ...context.options,
        retry: retries - 1,
      });
    }
  }

  const error = createFetchError(context);
  throw error;
}
```

---
layout: center
class: text-center
---

# Thank You!

Alex Liu @ JS Patterns 讀書會
