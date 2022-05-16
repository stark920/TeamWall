import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import { dateTime } from "./utils/filter";
import "./index.css";
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

app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
app.mount("#app");
