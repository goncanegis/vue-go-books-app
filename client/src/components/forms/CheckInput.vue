<template>
  <div class="form-check">
    <input
      type="checkbox"
      class="form-check-input"
      :checked="checked"
      :required="required"
      :name="name"
    />

    <label :for="name" class="form-check-label">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  name: string
  checked?: boolean
  required?: boolean
}>()
</script>

<style scoped></style>
