<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :value="modelValue"
      :autocomplete="name + '-new'"
      class="form-control"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  min?: string
  max?: string
  modelValue?: string
  type?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  required: false,
  min: '',
  max: '',
  modelValue: '',
  type: 'text',
  label: '',
  name: ''
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped></style>
