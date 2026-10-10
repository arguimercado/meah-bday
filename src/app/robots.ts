import type { MetadataRoute } from "next";

// Apps that fetch a page to build a link preview (the image + title card).
const PREVIEW_BOTS = [
  "facebookexternalhit",
  "Facebot",
  "meta-externalagent",
  "WhatsApp",
  "Viber",
  "TelegramBot",
  "Twitterbot",
  "Discordbot",
  "Slackbot-LinkExpanding",
  "LinkedInBot",
];

// Private invitation: let messaging apps build previews, keep search engines out.
// (Pages also carry a noindex tag, so previews never make them searchable.)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: PREVIEW_BOTS, allow: "/" },
      { userAgent: "*", disallow: "/" },
    ],
  };
}
