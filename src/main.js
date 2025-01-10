import {createApp} from "vue";
import {createPinia} from "pinia";
import {Quasar, Dialog, Notify, Loading} from "quasar";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import i18n from "./i18n";
import "@quasar/extras/material-icons/material-icons.css";

import "@quasar/extras/roboto-font/roboto-font.css";
// Import Quasar css
import "quasar/src/css/index.sass";
import "./style.css";

import App from "./App.vue";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(Quasar, {
  plugins: {
    Dialog,
    Notify,
    Loading,
  },
  config: {
    brand: {},
    button: {
      noCaps: true,
    },
  },
});
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");
