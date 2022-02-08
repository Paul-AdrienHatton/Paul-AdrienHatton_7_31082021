import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export const url = "http://localhost:3000/api/";

library.add(fas);

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(router)
  .mount("#app");
