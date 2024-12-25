import {createI18n} from "vue-i18n";

import i18nData from "./i18nData.js";

export default createI18n({
  legacy: false,
  locale: "uz",
  fallbackLocale: "uz",
  messages: {
    ...i18nData,
  },
});
