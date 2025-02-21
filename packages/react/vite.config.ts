import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "OvenplayerReact",
      fileName: (format) => `ovenplayer-react.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "ovenplayer"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          ovenplayer: "OvenPlayer",
        },
      },
    },
  },
});
