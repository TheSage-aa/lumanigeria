import { createFileRoute } from "@tanstack/react-router";
import { setCookie } from "@tanstack/react-start/server";
import { getCloudflareEnv } from "@/lib/db.server";
import { ADMIN_COOKIE } from "@/lib/admin.server";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { password?: string };
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const env = getCloudflareEnv(request);
        if (!env.ADMIN_PASSWORD) {
          return Response.json({ ok: false, error: "Admin login not configured" }, { status: 503 });
        }
        if (typeof body.password !== "string" || body.password !== env.ADMIN_PASSWORD) {
          return Response.json({ ok: false, error: "Incorrect password" }, { status: 401 });
        }

        setCookie(ADMIN_COOKIE, body.password, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
        return Response.json({ ok: true });
      },
    },
  },
});
