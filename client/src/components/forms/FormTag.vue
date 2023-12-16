<template>
  <form
    @submit.prevent="submit"
    :event="event"
    :ref="name"
    :id="`form-${name}`"
    autocomplete="off"
    :method="method"
    :action="action"
    class="needs-validation"
    novalidate
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  method?: string
  action?: string
  name: string
  event?: string
}>()

const emit = defineEmits(['on-submit'])

const submit = () => {
  let myForm = document.getElementById(`form-${props.name}`) as HTMLFormElement

  if (myForm.checkValidity()) {
    emit('on-submit')
  }

  myForm.classList.add('was-validated')
}
</script>

<style scoped></style>
