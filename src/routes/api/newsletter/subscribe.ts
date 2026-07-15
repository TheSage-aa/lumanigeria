import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/db.server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/api/newsletter/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { email?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        if (!EMAIL_RE.test(email)) {
          return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
        }

        const env = getCloudflareEnv(request);
        if (!env.DB) {
          return Response.json({ ok: false, error: "Storage unavailable" }, { status: 503 });
        }

        try {
          await env.DB.prepare(
            "INSERT INTO newsletter_subscribers (email) VALUES (?) ON CONFLICT(email) DO UPDATE SET status = 'subscribed'",
          )
            .bind(email)
            .run();
          return Response.json({ ok: true });
        } catch (error) {
          console.error("newsletter subscribe failed", error);
          return Response.json({ ok: false, error: "Storage failed" }, { status: 500 });
        }
      },
    },
  },
});
