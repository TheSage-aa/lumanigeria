import { createFileRoute } from "@tanstack/react-router";
import { InvolvePage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/involve")({
  head: () => ({
    meta: [
      { title: "Get Involved — LUMA" },
      { name: "description", content: "Join LUMA as an ambassador, volunteer, or partner. Help build HIV awareness on Nigerian campuses." },
      { property: "og:title", content: "Get Involved — LUMA" },
      { property: "og:description", content: "Ambassadors, volunteers, and partners wanted. Join LUMA." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    const setPage = useNavToPage();
    return <InvolvePage t={t} setPage={setPage} />;
  },
});
