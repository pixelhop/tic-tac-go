import { createRouter, createWebHistory } from 'vue-router';
import PageHome from './pages/PageHome.vue';
import PageNewGame from './pages/PageNewGame.vue';
import PageWaiting from './pages/PageWaiting.vue';
import PageJoinGame from './pages/PageJoinGame.vue';
import PageGame from './pages/PageGame.vue';
import PageAbout from './pages/PageAbout.vue';

const routes = [
  { path: '/', component: PageHome },
  { path: '/new-game', component: PageNewGame },
  { path: '/waiting', component: PageWaiting },
  { path: '/join-game', component: PageJoinGame },
  { path: '/game', component: PageGame },
  { path: '/about', component: PageAbout },
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
