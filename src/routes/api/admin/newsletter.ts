import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/db.server";
import { isAdminAuthenticated } from "@/lib/admin.server";

export const Route = createFileRoute("/api/admin/newsletter")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAdminAuthenticated(request)) {
          return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }
        const env = getCloudflareEnv(request);
        if (!env.DB) {
          return Response.json({ ok: false, error: "Storage unavailable" }, { status: 503 });
        }
        const { results } = await env.DB.prepare(
          "SELECT id, email, status, created_at FROM newsletter_subscribers ORDER BY created_at DESC",
        ).all();
        const subscribers = results.map((row) => ({
          id: row.id,
          email: row.email,
          status: row.status,
          createdAt: row.created_at,
        }));
        return Response.json({ ok: true, subscribers });
      },
    },
  },
});
