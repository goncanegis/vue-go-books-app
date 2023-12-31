import { store } from './store'
import router from '../router'

let Security = {
  // make sure user is authenticated
  requireToken: function () {
    if (store.token === '') {
      router.push('/login')
      return false
    }
  },

  // create request options and send them back
  requestOptions: function (payload: any) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${store.token}`)

    return {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }
  }
}

export default Security
