import { createFileRoute } from "@tanstack/react-router";
import { AdvocacyPage, useLumaTheme } from "@/components/LumaApp";

export const Route = createFileRoute("/advocacy")({
  head: () => ({
    meta: [
      { title: "Advocacy — LUMA" },
      {
        name: "description",
        content:
          "LUMA's advocacy work on anti-discrimination policy, campus health reform, and youth voice in Nigeria's HIV plan.",
      },
      { property: "og:title", content: "Advocacy — LUMA" },
      {
        property: "og:description",
        content:
          "Pushing for campus health policy change and youth representation in Nigeria's national HIV response.",
      },
    ],
  }),
  component: AdvocacyRoute,
});

function AdvocacyRoute() {
  const { t } = useLumaTheme();
  return <AdvocacyPage t={t} />;
}
