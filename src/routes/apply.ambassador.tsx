import { createFileRoute } from "@tanstack/react-router";
import { AmbassadorFormPage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/apply/ambassador")({
  head: () => ({
    meta: [
      { title: "Apply as Campus Ambassador — LUMA" },
      { name: "description", content: "Apply to be the first LUMA presence on your Nigerian university campus." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    const setPage = useNavToPage();
    return <AmbassadorFormPage t={t} setPage={setPage} />;
  },
});
