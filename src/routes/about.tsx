import { createFileRoute } from "@tanstack/react-router";
import { AboutPage, useLumaTheme } from "@/components/LumaApp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LUMA" },
      { name: "description", content: "LUMA is a youth-led organisation closing HIV information gaps in Nigerian universities. Meet our mission, approach, and founder." },
      { property: "og:title", content: "About LUMA" },
      { property: "og:description", content: "Meet the people and the mission behind LUMA's status-neutral approach to HIV on Nigerian campuses." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    return <AboutPage t={t} />;
  },
});
