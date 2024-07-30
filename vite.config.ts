import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "./vite-plugin-handlebars-precompile";
import viteTsconfigPaths from "vite-tsconfig-paths";

const root = resolve(__dirname, "./src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
      },
    },
  },
  plugins: [handlebars(), viteTsconfigPaths()],
});
