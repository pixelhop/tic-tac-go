import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VuePlausible } from 'vue-plausible';
import '@fontsource/orbitron';
import './style.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
  app.use(VuePlausible, {
    domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
    apiHost: `https://${import.meta.env.VITE_PLAUSIBLE_DOMAIN}`,
  });
}
app.use(createPinia());
app.use(router);

app.mount('#app');
