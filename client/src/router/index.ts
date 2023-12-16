import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import BooksView from '../views/BooksView.vue'
import BookView from '../views/BookView.vue'
import BooksAdminView from '../views/BooksAdminView.vue'
import BookEditView from '../views/BookEditView.vue'
import UsersView from '../views/UsersView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
    {
      path: '/books/:bookName',
      name: 'book',
      component: BookView
    },
    {
      path: '/admin/books',
      name: 'booksAdmin',
      component: BooksAdminView
    },
    {
      path: '/admin/books/:bookId',
      name: 'bookEdit',
      component: BookEditView
    },
    {
      path: '/admin/users',
      name: 'users',
      component: UsersView
    },
    {
      path: '/admin/users/:userId',
      name: 'user',
      component: UserView
    }
  ]
})

export default router
