import { createFileRoute } from "@tanstack/react-router";
import { getCloudflareEnv } from "@/lib/db.server";

const STORY_FORM_TYPE = "Voices From Campus — Story Submission";

function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(iso: string): string {
  const d = new Date(iso.replace(" ", "T") + "Z");
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function authorLabel(data: Record<string, unknown>): string {
  const identification = typeof data["Identification"] === "string" ? data["Identification"] : "";
  const chosenName =
    typeof data["Name / Chosen Name"] === "string" ? data["Name / Chosen Name"].trim() : "";
  if (identification.startsWith("Use") && chosenName) return chosenName;
  return "Anonymous";
}

function toContentBlocks(storyText: string, excerpt: string) {
  const paragraphs = storyText
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return [{ type: "lead", text: excerpt }];
  return [
    { type: "lead", text: paragraphs[0] },
    ...paragraphs.slice(1).map((text) => ({ type: "body", text })),
  ];
}

export const Route = createFileRoute("/api/stories")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const env = getCloudflareEnv(request);
        if (!env.DB) {
          return Response.json({ ok: true, stories: [] });
        }
        const { results } = await env.DB.prepare(
          "SELECT id, data, publish_title, publish_excerpt, created_at FROM submissions WHERE form_type = ? AND status = 'published' ORDER BY created_at DESC",
        )
          .bind(STORY_FORM_TYPE)
          .all();

        const stories = results.map((row) => {
          const data = JSON.parse(row.data as string) as Record<string, unknown>;
          const storyText = typeof data["Story"] === "string" ? data["Story"] : "";
          const title = (row.publish_title as string) || "A Voice From Campus";
          const excerpt =
            (row.publish_excerpt as string) ||
            (storyText.length > 160 ? `${storyText.slice(0, 160).trim()}…` : storyText);
          return {
            id: `voices-${row.id}`,
            tag: "VOICES FROM CAMPUS",
            title,
            excerpt,
            date: formatDate(row.created_at as string),
            readTime: estimateReadTime(storyText),
            content: toContentBlocks(storyText, excerpt),
            author: authorLabel(data),
            related: [],
          };
        });
        return Response.json({ ok: true, stories });
      },
    },
  },
});
