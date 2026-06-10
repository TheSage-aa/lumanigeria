import { createFileRoute } from "@tanstack/react-router";
import LumaApp from "@/components/LumaApp.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMA — Luminating Understanding, Moving Advocacy" },
      { name: "description", content: "Youth-led organisation closing HIV information gaps in Nigerian universities — education, advocacy, and community." },
      { property: "og:title", content: "LUMA — HIV Education & Advocacy for Nigerian Universities" },
      { property: "og:description", content: "Status-neutral HIV education, campus health policy advocacy, and a peer community for Nigerian university students." },
    ],
  }),
  component: LumaApp,
});
