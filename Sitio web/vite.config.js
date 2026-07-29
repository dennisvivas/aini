import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Sin esto, el servidor de desarrollo hace fallback de SPA y /academia
  // devuelve la home: en producción sí resuelve, y el desajuste engaña.
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        // Sitio institucional — ainilac.com
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        // Landing de la cohorte 01 — ainilac.com/academia/
        academia: fileURLToPath(new URL("./academia/index.html", import.meta.url)),
      },
    },
  },
});
