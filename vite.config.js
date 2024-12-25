import {fileURLToPath, URL} from "node:url";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {quasar, transformAssetUrls} from "@quasar/vite-plugin";

export default defineConfig({
  plugins: [
    vue({
      template: {transformAssetUrls},
    }),
    quasar({
      sassVariables: fileURLToPath(
        new URL("./src/quasar-variables.scss", import.meta.url)
      ),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/_variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
