import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { dateTime } from './utils/filter';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './index.css';
// import { setFakeData } from "../src/mocks/handlers";
// import { worker } from "../src/mocks/browser";

// if (import.meta.env.DEV) {
//   setFakeData();
//   worker.start();
// }

// vue-easy-lightbox
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js';
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css';

const app = createApp(App);

// dateTime 日期時間
app.config.globalProperties.$filters = {
  dateTime,
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(VueEasyLightbox);
app.use(pinia);
app.use(router);
app.use(Toast);
app.mount('#app');
