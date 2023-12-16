<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 clsas="mt-3">All Users</h1>
      </div>
      <hr />

      <table class="table table-compact table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users as User[]" :key="u.id">
            <td>
              <router-link :to="`/admin/users/${u.id}`">
                {{ u.last_name }}, {{ u.first_name }}
              </router-link>
            </td>

            <td>{{ u.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Security from '../components/security'
import notie from 'notie'

const users = ref([])

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

onBeforeMount(() => {
  Security.requireToken()

  fetch(`${import.meta.env.VITE_API_URL}/admin/users`, Security.requestOptions(''))
    .then((response) => response.json())
    .then((response) => {
      if (response.error) {
        notie.alert({
          type: 'error',
          text: response.message
        })
      } else {
        users.value = response.data.users
      }
    })
    .catch((error) => {
      notie.alert({
        type: 'error',
        text: error
      })
    })
})
</script>

<style scoped></style>
