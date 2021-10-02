import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

export const url = "http://localhost:3000/api/";

createApp(App)
  .use(router)
  .mount("#app");
