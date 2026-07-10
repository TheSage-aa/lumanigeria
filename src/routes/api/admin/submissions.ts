import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/db.server";
import { isAdminAuthenticated } from "@/lib/admin.server";

const VALID_STATUSES = new Set(["pending", "reviewed", "accepted", "rejected", "published"]);

export const Route = createFileRoute("/api/admin/submissions")({
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
          "SELECT id, form_type, data, status, publish_title, publish_excerpt, created_at FROM submissions ORDER BY created_at DESC",
        ).all();
        const submissions = results.map((row) => ({
          id: row.id,
          formType: row.form_type,
          data: JSON.parse(row.data as string),
          status: row.status,
          publishTitle: row.publish_title,
          publishExcerpt: row.publish_excerpt,
          createdAt: row.created_at,
        }));
        return Response.json({ ok: true, submissions });
      },

      PATCH: async ({ request }) => {
        if (!isAdminAuthenticated(request)) {
          return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
        }
        let body: { id?: number; status?: string; publishTitle?: string; publishExcerpt?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }
        if (
          typeof body.id !== "number" ||
          typeof body.status !== "string" ||
          !VALID_STATUSES.has(body.status)
        ) {
          return Response.json({ ok: false, error: "Invalid update" }, { status: 400 });
        }
        const env = getCloudflareEnv(request);
        if (!env.DB) {
          return Response.json({ ok: false, error: "Storage unavailable" }, { status: 503 });
        }
        await env.DB.prepare(
          "UPDATE submissions SET status = ?, publish_title = COALESCE(?, publish_title), publish_excerpt = COALESCE(?, publish_excerpt) WHERE id = ?",
        )
          .bind(body.status, body.publishTitle ?? null, body.publishExcerpt ?? null, body.id)
          .run();
        return Response.json({ ok: true });
      },
    },
  },
});
