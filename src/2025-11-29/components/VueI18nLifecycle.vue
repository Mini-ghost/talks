<template>
  <div class="relative space-y-1 text-center">
    <div class="absolute inset-0 -my-2 grid grid-cols-[6em_repeat(8,minmax(0,1fr))] z-[-1] pointer-events-none">
      <div v-for="item in 9" :key="item" class="border border-y-0 border-l-0 dark:border-[#333] light:border-[#ccc]" />
    </div>

    <div class="grid grid-cols-[6em_repeat(8,minmax(0,1fr))] [&>div]:p-px">
      <div />
      <div class="col-span-4">
        <div class="rounded dark:bg-gray/20 dark:text-gray border border-dashed dark:border-gray/50 light:border-black/50">
          編譯時
        </div>
      </div>
      <div class="col-span-4">
        <div class="rounded dark:bg-gray/20 dark:text-gray border border-dashed dark:border-gray/50 light:border-black/50">
          運行時
        </div>
      </div>
    </div>

    <div class="grid grid-cols-[6em_repeat(8,minmax(0,1fr))] [&>div]:p-px">
      <div class="dark:text-[#999] light:text-black text-end !px-2">Original</div>
      <v-click at="4">
        <div class="col-span-4" />
        <div class="col-span-2">
          <div class="rounded dark:bg-blue/20 dark:text-blue  border dark:border-blue/50 light:bg-blue-800/10 light:text-blue-800 light:border-blue-800/50">
            message-compiler
          </div>
        </div>
        <div class="col-span-2">
          <div class="rounded dark:bg-green/20 dark:text-green  border dark:border-green/50 light:bg-green-800/10 light:text-green-800 light:border-green-800/50">Vue Lifecycle</div>
        </div>
      </v-click>
    </div>

    <div class="grid grid-cols-[6em_repeat(8,minmax(0,1fr))] [&>div]:p-px">
      <div class="dark:text-[#999] light:text-black text-end !px-2">Vite Plugin</div>
      <v-click at="5">
        <div class="col-span-2" />
        <div class="col-span-2">
          <div class="rounded dark:bg-amber/20 dark:text-amber  border dark:border-amber/50 light:bg-amber-800/10 light:text-amber-800 light:border-amber-800/50">AST compiler </div>
        </div>
        <div class="col-span-4">
          <div class="rounded dark:bg-green/20 dark:text-green  border dark:border-green/50 light:bg-green-800/10 light:text-green-800 light:border-green-800/50">Vue Lifecycle </div>
        </div>
      </v-click>
    </div>
  </div>
</template>