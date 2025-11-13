import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@elysn/shared": path.resolve(__dirname, "../../packages/shared/src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@graphql": path.resolve(__dirname, "./src/graphql"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
    },
  },
});
