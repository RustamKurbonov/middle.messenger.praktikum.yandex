import { defineConfig } from "vite";
import path, { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import { fileURLToPath } from "url";
import inspect from "vite-plugin-inspect";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        login: resolve(__dirname, "pages/login/index.html"),
        registration: resolve(__dirname, "pages/registration/index.html"),
        error500: resolve(__dirname, "pages/error500/index.html"),
        error404: resolve(__dirname, "pages/error404/index.html"),
      },
    },
  },
  plugins: [
    inspect(),
    handlebars({
      context: {
        username: "Name",
      },
    }),
  ],
});
