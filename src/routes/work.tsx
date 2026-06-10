import { createFileRoute } from "@tanstack/react-router";
import { WorkPage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — LUMA" },
      { name: "description", content: "LUMA's research, advocacy, and community programmes across Nigerian universities." },
      { property: "og:title", content: "Our Work — LUMA" },
      { property: "og:description", content: "What LUMA is building across Nigerian campuses: research, advocacy, and community." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    const setPage = useNavToPage();
    return <WorkPage t={t} setPage={setPage} />;
  },
});
