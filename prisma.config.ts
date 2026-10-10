import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Only migrate commands need this; `prisma generate` works without it.
    url: process.env.DATABASE_URL ?? "",
  },
});
