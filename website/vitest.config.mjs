import { defineConfig } from "vitest/config";

const alias = { "@": import.meta.dirname + "/src" };

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/tests/unit/**/*.test.{ts,tsx}"],
  },
  resolve: { alias },
});
