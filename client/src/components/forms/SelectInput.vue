<template>
  <div class="mb-3">
    <label :for="name" class="form-label">{{ label }}</label>
    <select :name="name" :id="name" class="form-select" :required="required">
      <option v-for="(option, index) in items" :key="index" :value="option?.value">
        {{ option?.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  name: string
  items: { value: string; text: string }[]
  required?: boolean
}>()
</script>

<style scoped></style>
