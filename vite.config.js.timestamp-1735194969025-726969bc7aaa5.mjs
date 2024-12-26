// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/TM-PC%2021/Desktop/project-bolt-bolt-vue-cp8erkxz%20(1)/project/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/TM-PC%2021/Desktop/project-bolt-bolt-vue-cp8erkxz%20(1)/project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { quasar, transformAssetUrls } from "file:///C:/Users/TM-PC%2021/Desktop/project-bolt-bolt-vue-cp8erkxz%20(1)/project/node_modules/@quasar/vite-plugin/src/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/TM-PC%2021/Desktop/project-bolt-bolt-vue-cp8erkxz%20(1)/project/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: fileURLToPath(
        new URL("./src/quasar-variables.scss", __vite_injected_original_import_meta_url)
      )
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/_variables.scss";`,
      }
    }
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUTS1QQyAyMVxcXFxEZXNrdG9wXFxcXHByb2plY3QtYm9sdC1ib2x0LXZ1ZS1jcDhlcmt4eiAoMSlcXFxccHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVE0tUEMgMjFcXFxcRGVza3RvcFxcXFxwcm9qZWN0LWJvbHQtYm9sdC12dWUtY3A4ZXJreHogKDEpXFxcXHByb2plY3RcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1RNLVBDJTIwMjEvRGVza3RvcC9wcm9qZWN0LWJvbHQtYm9sdC12dWUtY3A4ZXJreHolMjAoMSkvcHJvamVjdC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7ZmlsZVVSTFRvUGF0aCwgVVJMfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7ZGVmaW5lQ29uZmlnfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQge3F1YXNhciwgdHJhbnNmb3JtQXNzZXRVcmxzfSBmcm9tIFwiQHF1YXNhci92aXRlLXBsdWdpblwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKHtcbiAgICAgIHRlbXBsYXRlOiB7dHJhbnNmb3JtQXNzZXRVcmxzfSxcbiAgICB9KSxcbiAgICBxdWFzYXIoe1xuICAgICAgc2Fzc1ZhcmlhYmxlczogZmlsZVVSTFRvUGF0aChcbiAgICAgICAgbmV3IFVSTChcIi4vc3JjL3F1YXNhci12YXJpYWJsZXMuc2Nzc1wiLCBpbXBvcnQubWV0YS51cmwpXG4gICAgICApLFxuICAgIH0pLFxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvc3R5bGVzL192YXJpYWJsZXMuc2Nzc1wiO2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IFwiL3NyY1wiLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFksU0FBUSxlQUFlLFdBQVU7QUFDL2EsU0FBUSxvQkFBbUI7QUFDM0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVEsUUFBUSwwQkFBeUI7QUFIa04sSUFBTSwyQ0FBMkM7QUFLNVMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsVUFBVSxFQUFDLG1CQUFrQjtBQUFBLElBQy9CLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLElBQUksSUFBSSwrQkFBK0Isd0NBQWU7QUFBQSxNQUN4RDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQTtBQUFBLE1BRU47QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
