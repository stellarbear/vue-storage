import {createRouter, createWebHistory} from 'vue-router';
import UserEntryView from '../views/UserEntryView.vue';
import UserListView from '../views/UserListView.vue';
import UserCreateView from '../views/UserCreateView.vue';
import UserUpdateView from '../views/UserUpdateView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/users'},
    {path: '/users', component: UserListView},
    {path: '/users/create', component: UserCreateView},
    {path: '/users/update/:id', component: UserUpdateView},
    {path: '/users/:id', component: UserEntryView},
  ]
});

export default router;
