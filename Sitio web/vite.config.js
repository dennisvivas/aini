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
        // Landing de la cohorte 01 — ainilac.com/academia
        academia: fileURLToPath(new URL("./academia/index.html", import.meta.url)),
        // Postulación con el formulario de HubSpot — /academia/postular
        postular: fileURLToPath(new URL("./academia/postular/index.html", import.meta.url)),
        // Mentores invitados — /academia/mentores
        mentores: fileURLToPath(new URL("./academia/mentores/index.html", import.meta.url)),
        // Preguntas frecuentes — /academia/preguntas-frecuentes
        preguntas: fileURLToPath(new URL("./academia/preguntas-frecuentes/index.html", import.meta.url)),
        // Páginas legales de la academia
        terminos: fileURLToPath(new URL("./academia/terminos/index.html", import.meta.url)),
        privacidad: fileURLToPath(new URL("./academia/privacidad/index.html", import.meta.url)),
      },
    },
  },
});
