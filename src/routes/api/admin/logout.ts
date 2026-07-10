import { createFileRoute } from "@tanstack/react-router";
import { deleteCookie } from "@tanstack/react-start/server";
import { ADMIN_COOKIE } from "@/lib/admin.server";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        deleteCookie(ADMIN_COOKIE, { path: "/" });
        return Response.json({ ok: true });
      },
    },
  },
});
