import { defineConfig } from "vite";

export default defineConfig({
  cacheDir: "./.dist_cache",
  clearScreen: true,
  publicDir: "./assets",
  css: {
    devSourcemap: true,
  },
  preview: {
    cors: true,
    host: true,
    port: 5505,
    strictPort: true,
  },
  server: {
    cors: true,
    host: true,
    port: 5005,
    hmr: true,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "./dist",
    sourcemap: "inline",
    cssCodeSplit: true,
    manifest: true,
    chunkSizeWarningLimit: 250,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[hash].[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
});
