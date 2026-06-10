import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage, useLumaTheme } from "@/components/LumaApp";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — LUMA" },
      { name: "description", content: "Trusted HIV resources, links, and tools for Nigerian university students." },
      { property: "og:title", content: "Resources — LUMA" },
      { property: "og:description", content: "Curated HIV resources for Nigerian campuses." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    return <ResourcesPage t={t} />;
  },
});
