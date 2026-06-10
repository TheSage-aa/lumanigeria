import { createFileRoute } from "@tanstack/react-router";
import { CirclePage, useLumaTheme } from "@/components/LumaApp";

export const Route = createFileRoute("/circle")({
  head: () => ({
    meta: [
      { title: "The Peer Circle — LUMA" },
      { name: "description", content: "A safe, peer-led digital community for Nigerian university students living with or affected by HIV." },
      { property: "og:title", content: "The Peer Circle — LUMA" },
      { property: "og:description", content: "A safe digital community for Nigerian university students. Peer-led. Anonymous where needed." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    return <CirclePage t={t} />;
  },
});
