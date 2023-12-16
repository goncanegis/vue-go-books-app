<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <hr />

        <form-tag method="post" action="" name="myform" event="myevent" @on-submit="submitHandler">
          <TextInput v-model="email" label="Email" type="email" name="email" :required="true" />

          <text-input
            v-model="password"
            label="Password"
            type="password"
            name="password"
            :required="true"
          />

          <hr />
          <input
            type="submit"
            :value="ready === true ? 'Login' : 'Logging in...'"
            class="btn btn-primary"
          />
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextInput from '@/components/forms/TextInput.vue'
import FormTag from '@/components/forms/FormTag.vue'
import { ref } from 'vue'
import { store } from '../components/store'
import router from '@/router'
import { sleep } from '@/utils'

import Security from '../components/security'

const emit = defineEmits(['error', 'success', 'warning'])

const email = ref('')
const password = ref('')
const ready = ref(true)

const submitHandler = () => {
  ready.value = false

  const payload = {
    email: email.value,
    password: password.value
  }

  fetch(`${import.meta.env.VITE_API_URL}/users/login`, Security.requestOptions(payload))
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        console.log('Error', response)
        emit('error', response.message)
      } else {
        sleep(1000).then(() => {
          console.log('Token: ', response.data.token.token)
          store.token = response.data.token.token
          store.user = {
            id: response.data.user.id,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            email: response.data.user.email
          }

          // save token to cookie
          let date = new Date()
          let expDays = 1
          date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
          const expires = 'expires=' + date.toUTCString()

          // set cookie
          document.cookie =
            '_site_data=' +
            JSON.stringify(response.data) +
            '; ' +
            expires +
            '; path=/; SameSite=strict; Secure;'

          ready.value = true

          router.push('/')
        })
      }
    })
}
</script>

<style scoped></style>
