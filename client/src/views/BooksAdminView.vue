<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 clsas="mt-3">Books</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import Security from '../components/security'

onBeforeMount(() => {
  Security.requireToken()
})
</script>

<style scoped></style>
