<script setup lang="ts">
import { useFieldArray, useForm } from '@vorms/core'

const { handleSubmit, handleReset } = useForm({
  initialValues: {
    foods: ['珍珠奶茶', '臭豆腐', '蔥油餅'],
  },
  onSubmit(data) {
    alert(JSON.stringify(data, null, 2))
  },
})

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
} = useFieldArray<string>('foods')
</script>

<template>
  <form class="text-xs space-y-2" @submit="handleSubmit" @reset="handleReset">
    <template v-if="fields.length">
      <TransitionGroup name="list" tag="div" class="relative space-y-2">
        <div v-for="(field, index) in fields" :key="field.key" class="flex space-x-1.5">
          <input
            v-model="field.value"
            :name="field.name"
            class="field__input"
            v-bind="field.attrs"
          >
          <button type="button" class="field__button" @click="remove(index)">
            Remove ({{ index }})
          </button>
        </div>
      </TransitionGroup>
    </template>
    <template v-else>
      沒有資料
    </template>

    <div class="method">
      <button type="button" class="method__button" @click="append('滷肉飯')">
        append('滷肉飯')
      </button>
      <button type="button" class="method__button" @click="prepend('雞蛋糕')">
        prepend('雞蛋糕')
      </button>
      <button type="button" class="method__button" @click="swap(0, 2)">
        swap(0, 2)
      </button>
      <button type="button" class="method__button" @click="remove()">
        remove()
      </button>
      <button type="button" class="method__button" @click="move(0, 2)">
        move(0, 2)
      </button>
      <button type="button" class="method__button" @click="insert(1, '黑糖粉圓')">
        insert(1, '黑糖粉圓')
      </button>
      <button
        type="button"
        class="method__button"
        @click="update(1, '脆皮炸雞')"
      >
        update(1, '脆皮炸雞')
      </button>
      <button
        type="button"
        class="method__button"
        @click="replace(['炸雞', '粽子', '包子'])"
      >
        replace(['炸雞','粽子','包子'])
      </button>
    </div>

    <div class="flex justify-end gap-2">
      <input type="reset">
      <input type="submit">
    </div>
  </form>
</template>

<style scoped>
.field__input,
.field__button,
.method__button,
input[type='submit'],
input[type='reset'] {
  border-radius: 4px;
}

.method__button,
input[type='submit'],
input[type='reset'] {
  background: #41b883;
  border: 1px solid #41b883;
  color: #344951;
  padding: 8px;
  cursor: pointer;
}

.field__input {
  width: 80%;
  border: 1px solid white;
  padding: 8px 12px;
}

.field__button {
  flex-shrink: 0;
  background: #41b883;
  border: 1px solid #41b883;
  width: 20%;
  color: #344951;
  cursor: pointer;
}

.method {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

input[type='submit'],
input[type='reset'] {
  width: 120px;
}

input[type='reset'] {
  background: #41b88355;
  color: white;
}

/* 1. declare transition */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 1s cubic-bezier(0, 0, 0.58, 1);
}

/* 2. declare enter from and leave to state */
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
