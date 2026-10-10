import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Match Next.js: .env.local takes precedence over .env.
config({ path: [".env.local", ".env"], quiet: true });

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
