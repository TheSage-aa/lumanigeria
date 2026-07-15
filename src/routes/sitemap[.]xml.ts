import { createFileRoute } from "@tanstack/react-router";
import { GUIDES, STORIES } from "@/components/LumaApp";

const SITE_URL = "https://lumanigeria.org";

const STATIC_PATHS = [
  "/",
  "/about",
  "/work",
  "/truth",
  "/circle",
  "/advocacy",
  "/resources",
  "/involve",
  "/contact",
  "/games",
  "/apply/ambassador",
  "/apply/volunteer",
  "/apply/partner",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          ...STATIC_PATHS,
          ...Object.keys(GUIDES).map((id) => `/resources/${id}`),
          ...STORIES.map((s) => `/truth/${s.id}`),
        ];
        const urlset = paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
