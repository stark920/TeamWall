import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { setFakeData } from "../src/mocks/handlers";
import { worker } from "../src/mocks/browser";
import axios from "axios";
import VueAxios from "vue-axios";

if (import.meta.env.DEV) {
  setFakeData();
  worker.start();
}

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());
app.use(VueAxios, axios);
app.use(router);

app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
app.mount("#app");
