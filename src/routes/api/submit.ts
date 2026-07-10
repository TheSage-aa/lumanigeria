import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/db.server";

const ALLOWED_FORM_TYPES = new Set([
  "Campus Ambassador Application",
  "Partnership Enquiry",
  "Volunteer Application",
  "Peer Circle Application",
  "Voices From Campus — Story Submission",
]);
const ALLOWED_FORM_TYPE_PREFIXES = ["Contact — ", "ANONYMOUS — "];

function isAllowedFormType(formType: string): boolean {
  return (
    ALLOWED_FORM_TYPES.has(formType) ||
    ALLOWED_FORM_TYPE_PREFIXES.some((prefix) => formType.startsWith(prefix))
  );
}

export const Route = createFileRoute("/api/submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { formType?: string; data?: Record<string, unknown> };
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }

        const { formType, data } = body;
        if (
          typeof formType !== "string" ||
          !isAllowedFormType(formType) ||
          typeof data !== "object" ||
          data === null
        ) {
          return Response.json({ ok: false, error: "Invalid submission" }, { status: 400 });
        }

        try {
          const env = getCloudflareEnv(request);
          if (!env.DB) {
            return Response.json({ ok: false, error: "Storage unavailable" }, { status: 503 });
          }
          await env.DB.prepare("INSERT INTO submissions (form_type, data) VALUES (?, ?)")
            .bind(formType, JSON.stringify(data))
            .run();
          return Response.json({ ok: true });
        } catch (error) {
          console.error("submission insert failed", error);
          return Response.json({ ok: false, error: "Storage failed" }, { status: 500 });
        }
      },
    },
  },
});
