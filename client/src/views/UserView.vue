<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User</h1>
        <hr />

        <form-tag v-if="ready" name="userform" event="userEditEvent" @on-submit="submitHandler">
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
            help="Leave empty to keep existing password"
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

        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import Security from '@/components/security'
import { store } from '@/components/store'
import FormTag from '@/components/forms/FormTag.vue'
import TextInput from '@/components/forms/TextInput.vue'
import notie from 'notie'
import { useRoute, useRouter } from 'vue-router'
import { sleep } from '@/utils'

const route = useRoute()
const router = useRouter()

const user = ref({
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  password: ''
})

const ready = ref(true)

const emit = defineEmits(['error', 'success', 'warning'])

const submitHandler = () => {
  ready.value = false
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
        emit('error', data.message)
      } else {
        sleep(1000).then(() => {
          ready.value = true
          emit('success', 'User saved!')
          router.push('/admin/users')
        })
      }
    })
    .catch((error) => {
      emit('error', error)
    })
}

const confirmDelete = (id: number) => {
  notie.confirm({
    text: 'Are you sure you want to delete this user?',
    submitText: 'Delete',
    submitCallback: function () {
      console.log('will delete', id)

      let payload = {
        id
      }

      ready.value = false

      fetch(`${import.meta.env.VITE_API_URL}/admin/users/delete`, Security.requestOptions(payload))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            emit('error', data.message)
          } else {
            sleep(1000).then(() => {
              emit('success', 'User deleted!')
              router.push('/admin/users')
            })
          }
        })
    }
  })
}

const fetchUser = (id: number) => {
  ready.value = false
  fetch(`${import.meta.env.VITE_API_URL}/admin/users/get/${id}`, Security.requestOptions(''))
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        emit('error', data.message)
      } else {
        sleep(1000).then(() => {
          user.value = data
          // we want password to be empty for existing users
          user.value.password = ''
          ready.value = true
        })
      }
    })
    .catch((error) => {
      emit('error', error)
    })
}

onBeforeMount(() => {
  Security.requireToken()

  if (parseInt(String(route.params.userId), 10) > 0) {
    fetchUser(parseInt(String(route.params.userId), 10))
  }
})

// Watch for query param changes and reset form
// if param id is not 0 fetch user data
const paramWatcher = computed(() => route.params.userId)
watch(paramWatcher, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (parseInt(String(newVal), 10) === 0) {
      // new user
      user.value = {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    } else {
      // existing user
      fetchUser(parseInt(String(newVal), 10))
    }
  }
})
</script>

<style scoped></style>
