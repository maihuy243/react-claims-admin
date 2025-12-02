import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./assets"),
      constant: path.resolve(__dirname, "./constant.ts"),
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://aut.bshc.com.vn",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "/api"),
      },
    },
  },

  build: {
    assetsInlineLimit: 0, // icon không bị base64 nữa
    rollupOptions: {
      output: {
        // === JS ra root ===
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,

        // === CSS ra root, còn ảnh/icon vào assets/ ===
        assetFileNames: (assetInfo) => {
          // CSS để ở root
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return `[name].[ext]`;
          }
          // Everything else → assets/*
          return `assets/[name].[ext]`;
        },
      },
    },
  },
});
