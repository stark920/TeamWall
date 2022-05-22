import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
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

const app = createApp(App);

// dateTime 日期時間
app.config.globalProperties.$filters = {
  dateTime,
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(VueAxios, axios);
app.use(piniaPluginPersistedstate);
app.use(router);
app.use(Toast);
app.provide('axios', app.config.globalProperties.axios); // provide 'axios'
app.mount('#app');
