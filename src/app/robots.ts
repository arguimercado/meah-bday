import type { MetadataRoute } from "next";

// Private invitation: ask all crawlers to stay away.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
