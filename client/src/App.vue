<template>
  <TheHeader />

  <RouterView />

  <TheFooter />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { store } from './components/store'
import { nextTick, onBeforeMount, onMounted } from 'vue'

const getCookie = (name: string) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=')
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '')
}

onBeforeMount(() => {
  // check for a cookie
  let data = getCookie('_site_data')

  if (data !== '') {
    let cookieData = JSON.parse(data)

    // update store
    store.token = cookieData.token.token
    store.user = {
      id: cookieData.user.id,
      first_name: cookieData.user.first_name,
      last_name: cookieData.user.last_name,
      email: cookieData.user.email
    }
  }
})

onMounted(async () => {
  await nextTick()

  const payload = {
    foo: 'bar'
  }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${store.token}`)

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers
  }
})
</script>

<style scoped></style>
