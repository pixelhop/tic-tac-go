import { createRouter, createWebHistory } from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageNewGame from './pages/PageNewGame.vue';

const routes = [
  { path: '/', component: PageHome },
  { path: '/new-game', component: PageNewGame },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
