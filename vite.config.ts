import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import inspect from "vite-plugin-inspect";

const root = resolve(__dirname, "./src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        login: resolve(root, "pages/login/index.html"),
        chat: resolve(root, "pages/chat/index.html"),
        registration: resolve(root, "pages/registration/index.html"),
        error500: resolve(root, "pages/error500/index.html"),
        error404: resolve(root, "pages/error404/index.html"),
      },
    },
  },
  plugins: [
    inspect(),
    handlebars({
      partialDirectory: resolve(root, "components"),
      context: {
        username: "Name",
      },
    }),
  ],
});
