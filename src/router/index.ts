import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Page from "@/views/page.vue"
import { reactive } from 'vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/page/A'
  },
  {
    path: '/page/:id',
    name: 'page',
    component: Page
  },
  {
    path: '/other-page/:id',
    name: 'other-page',
    component: Page
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export class State {
  static currentPaths: any = reactive([]);
}

export default router
