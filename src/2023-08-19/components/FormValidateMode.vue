<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@vorms/core'

const props = defineProps<{
  mode: 'submit' | 'change' | 'blur' | 'input'
}>()

const count = ref(0)

const { register, handleSubmit, handleReset } = useForm({
  initialValues: {
    food: '無糖綠茶',
  },
  validateMode: props.mode,
  validate({ food }) {
    count.value++
    console.log(food.includes('奶茶'))
    return {
      food: !food.includes('奶茶') ? '這不是奶茶' : undefined,
    }
  },
  onSubmit(data) {
    alert(JSON.stringify(data, null, 2))
  },
})

const { value, error, attrs } = register('food')
</script>

<template>
  <div class="grid gap-3">
    <div class="uppercase text-xs font-bold text-gray-500">
      {{ mode }} <br> 驗證次數 {{ count }}
    </div>
    <form class="text-sm" @submit="handleSubmit" @reset="handleReset">
      <div class="flex items-center gap-2 my-1">
        <label :form="mode" class="shrink-0">飲料</label>
        <input :id="mode" v-model="value" type="text" class="w-full rounded p-1.5" v-bind="attrs">
      </div>
      <small class="text-xs transition-opacity during-300" :class="{ 'text-red-500 opacity-100': !!error, 'opacity-0': !error }">{{ error ?? '&#20;' }}</small>

      <div class="flex gap-1.5 mt-4">
        <button type="reset" class="w-full border border-[#41b883] bg-[#41b883]/10 rounded p-1.5 hover:bg-[#0e8550]">
          重設
        </button>
        <button type="submit" class="w-full border border-[#41b883] bg-[#41b883] rounded p-1.5 hover:bg-[#0e8550]">
          送出
        </button>
      </div>
    </form>
  </div>
</template>
