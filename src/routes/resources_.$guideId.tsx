import { createFileRoute } from "@tanstack/react-router";
import { GuidePage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/resources_/$guideId")({
  head: ({ params }) => ({
    meta: [
      { title: `LUMA Guide — ${params.guideId}` },
      {
        name: "description",
        content: "A LUMA guide — readable on the site or downloadable as PDF.",
      },
    ],
  }),
  component: GuideRoute,
});

function GuideRoute() {
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  const { guideId } = Route.useParams();
  return <GuidePage t={t} guideId={guideId} setPage={setPage} />;
}
