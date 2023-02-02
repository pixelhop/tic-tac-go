import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@fontsource/orbitron';
import './style.css';
import App from './App.vue';
import router from './router';
import plausible from './plugins/plausible';

const app = createApp(App);

if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
  app.use(plausible, {
    domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
    apiHost: `https://${import.meta.env.VITE_PLAUSIBLE_DOMAIN}`,
  });
}
app.use(createPinia());
app.use(router);

app.mount('#app');
