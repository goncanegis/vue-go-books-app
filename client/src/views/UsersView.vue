<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 clsas="mt-3">All Users</h1>
      </div>
      <hr />

      <table v-if="ready" class="table table-compact table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`">
                {{ u.last_name }}, {{ u.first_name }}
              </router-link>
            </td>

            <td>{{ u.email }}</td>
            <td v-if="u.token.id > 0">
              <span class="badge bg-success" @click="logUserOut(u.id)">Logged in</span>
            </td>
            <td v-else>
              <span class="badge bg-danger">Not logged in</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Security from '../components/security'
import { sleep } from '@/utils'
import { store } from '@/components/store'
import notie from 'notie'

const emit = defineEmits(['error', 'success', 'warning'])

const users = ref([])
const ready = ref(false)

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

const logUserOut = (id) => {
  if (id !== store.user.id) {
    notie.confirm({
      text: 'Are you sure you want to log this user out?',
      submitText: 'Log out',
      submitCallback: function () {
        console.log('will log out', id)
      }
    })
  } else {
    emit('error', "You can't log yourself out!")
  }
}

onBeforeMount(() => {
  Security.requireToken()

  fetch(`${import.meta.env.VITE_API_URL}/admin/users`, Security.requestOptions(''))
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        emit('error', response.message)
      } else {
        sleep(1000).then(() => {
          users.value = response.data.users
          ready.value = true
        })
      }
    })
    .catch((error) => {
      emit('error', error)
    })
})
</script>

<style scoped></style>
