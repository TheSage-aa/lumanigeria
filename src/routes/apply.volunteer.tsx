import { createFileRoute } from "@tanstack/react-router";
import { VolunteerFormPage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/apply/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer with LUMA" },
      {
        name: "description",
        content: "Volunteer your skills — writing, design, research, translation — to LUMA.",
      },
    ],
  }),
  component: ApplyVolunteerRoute,
});

function ApplyVolunteerRoute() {
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  return <VolunteerFormPage t={t} setPage={setPage} />;
}
