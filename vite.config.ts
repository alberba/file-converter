import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // <--- necesario para tener "expect" global
    environment: "jsdom", // <--- necesario para React Testing Library
    setupFiles: "./setupTests.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/utils/imageUtils.ts", "src/main.tsx", "src/vite-env.d.ts"], // Excluir el archivo de utilidades de imagen
    },
  },
});
