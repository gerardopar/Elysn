import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),

      // Shared workspace packages
      "@elysn/shared": path.resolve(__dirname, "../../packages/shared/src"),

      // Client-side folder aliases
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@graphql": path.resolve(__dirname, "src/graphql"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    target: "esnext",
  },
});
