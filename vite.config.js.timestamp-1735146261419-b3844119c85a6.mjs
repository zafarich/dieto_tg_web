// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/wotab/OneDrive/Desktop/Startups/Codes/dieto_tg_web/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/wotab/OneDrive/Desktop/Startups/Codes/dieto_tg_web/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { quasar, transformAssetUrls } from "file:///C:/Users/wotab/OneDrive/Desktop/Startups/Codes/dieto_tg_web/node_modules/@quasar/vite-plugin/src/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/wotab/OneDrive/Desktop/Startups/Codes/dieto_tg_web/vite.config.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3b3RhYlxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFN0YXJ0dXBzXFxcXENvZGVzXFxcXGRpZXRvX3RnX3dlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcd290YWJcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTdGFydHVwc1xcXFxDb2Rlc1xcXFxkaWV0b190Z193ZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3dvdGFiL09uZURyaXZlL0Rlc2t0b3AvU3RhcnR1cHMvQ29kZXMvZGlldG9fdGdfd2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHtmaWxlVVJMVG9QYXRoLCBVUkx9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB7cXVhc2FyLCB0cmFuc2Zvcm1Bc3NldFVybHN9IGZyb20gXCJAcXVhc2FyL3ZpdGUtcGx1Z2luXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHRlbXBsYXRlOiB7dHJhbnNmb3JtQXNzZXRVcmxzfSxcclxuICAgIH0pLFxyXG4gICAgcXVhc2FyKHtcclxuICAgICAgc2Fzc1ZhcmlhYmxlczogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICBuZXcgVVJMKFwiLi9zcmMvcXVhc2FyLXZhcmlhYmxlcy5zY3NzXCIsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgKSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL3N0eWxlcy9fdmFyaWFibGVzLnNjc3NcIjtgLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBcIi9zcmNcIixcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVgsU0FBUSxlQUFlLFdBQVU7QUFDcFosU0FBUSxvQkFBbUI7QUFDM0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVEsUUFBUSwwQkFBeUI7QUFIb00sSUFBTSwyQ0FBMkM7QUFLOVIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsVUFBVSxFQUFDLG1CQUFrQjtBQUFBLElBQy9CLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLElBQUksSUFBSSwrQkFBK0Isd0NBQWU7QUFBQSxNQUN4RDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQTtBQUFBLE1BRU47QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
