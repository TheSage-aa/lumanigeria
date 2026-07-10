import { createFileRoute } from "@tanstack/react-router";

// Update this when a custom domain is attached to the Cloudflare Worker.
const SITE_URL = "https://lumanigeria.versatilelopez.workers.dev";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain" },
        });
      },
    },
  },
});
