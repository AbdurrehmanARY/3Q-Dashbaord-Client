import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const resolvePath = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  // Mirror the tsconfig path aliases so tests resolve @shared/@modules/@db/@config too.
  resolve: {
    alias: {
      "@shared": resolvePath("./src/shared"),
      "@modules": resolvePath("./src/modules"),
      "@db": resolvePath("./src/shared/db"),
      "@config": resolvePath("./src/shared/config"),
    },
  },
});
