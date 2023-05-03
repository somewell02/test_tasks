import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";
import PrimeVue from "primevue/config";

import App from "./App.vue";

import "./assets/css/index.scss";

const pinia = createPinia();

const app = createApp(App);
app.use(router).use(pinia).use(PrimeVue).mount("#app");
