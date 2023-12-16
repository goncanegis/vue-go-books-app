<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User</h1>
        <hr />
        {{ user }}
        <form-tag name="userform" event="userEditEvent" @on-submit="submitHandler">
          <text-input
            v-model="user.first_name"
            name="first-name"
            type="text"
            :required="true"
            label="First Name"
          ></text-input>

          <text-input
            v-model="user.last_name"
            name="last-name"
            type="text"
            :required="true"
            label="Last Name"
          ></text-input>

          <text-input
            v-model="user.email"
            name="email"
            type="email"
            :required="true"
            label="Email"
          ></text-input>

          <text-input
            v-if="user.id === 0"
            v-model="user.password"
            name="password"
            type="password"
            :required="true"
            label="Password"
          ></text-input>

          <text-input
            v-else
            v-model="user.password"
            name="password"
            type="password"
            label="Password"
          ></text-input>

          <hr />

          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save" />
            <router-link :to="`/admin/users`" class="btn btn-outline-secondary">Cancel</router-link>
          </div>

          <div class="float-end">
            <a
              v-if="
                Number(route.params.userId) > 0 &&
                parseInt(String(route.params.userId), 10) !== store.user?.id
              "
              class="btn btn-danger"
              href="javascript:void(0);"
              @click="confirmDelete(user.id)"
              >Delete User</a
            >
          </div>

          <div class="clearfix"></div>
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Security from '@/components/security'
import { store } from '@/components/store'
import FormTag from '@/components/forms/FormTag.vue'
import TextInput from '@/components/forms/TextInput.vue'
import notie from 'notie'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref({
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  password: ''
})

const submitHandler = () => {
  const payload = {
    id: parseInt(String(route.params.userId), 10),
    first_name: user.value.first_name,
    last_name: user.value.last_name,
    email: user.value.email,
    password: user.value.password
  }

  fetch(`${import.meta.env.VITE_API_URL}/admin/users/save`, Security.requestOptions(payload))
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        notie.alert({
          type: 'error',
          text: data.message
        })
      } else {
        notie.alert({
          type: 'success',
          text: 'Changes saved!'
        })
      }
    })
    .catch((error) => {
      notie.alert({
        type: 'error',
        text: error
      })
    })
}

const confirmDelete = (id: number) => {
  //
}

onBeforeMount(() => {
  Security.requireToken()

  if (parseInt(String(route.params.userId), 10) > 0) {
    // editing an existing user
    fetch(
      `${import.meta.env.VITE_API_URL}/admin/users/get/${route.params.userId}`,
      Security.requestOptions('')
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          notie.alert({
            type: 'error',
            text: data.message
          })
        } else {
          user.value = data

          // we want password to be empty for existing users
          user.value.password = ''
        }
      })
  }
})
</script>

<style scoped></style>
