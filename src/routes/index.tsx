import { createFileRoute } from "@tanstack/react-router";
import { HomePage, useLumaTheme, useNavToPage, useNavToStory } from "@/components/LumaApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LUMA — Luminating Africa" },
      { name: "description", content: "LUMA transforms HIV information into HIV action for Nigerian university students. Closing the Information-to-Action gap through education, advocacy, and community." },
      { property: "og:title", content: "LUMA — HIV Education & Advocacy for Nigerian Universities" },
      { property: "og:description", content: "Status-neutral HIV education, campus health policy advocacy, and a peer community for Nigerian university students." },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  const goStory = useNavToStory();
  return <HomePage t={t} setPage={setPage} setStoryId={goStory} />;
}
