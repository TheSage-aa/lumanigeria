import { createFileRoute } from "@tanstack/react-router";
import { TruthPage, useLumaTheme, useNavToPage, useNavToStory } from "@/components/LumaApp";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — LUMA" },
      {
        name: "description",
        content:
          "News, research, and conference coverage from the global HIV response, explained for Nigerian students.",
      },
      { property: "og:title", content: "Blog — LUMA" },
      {
        property: "og:description",
        content: "Global HIV response news and research, broken down for Nigerian campuses.",
      },
    ],
  }),
  component: BlogRoute,
});

function BlogRoute() {
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  const goStory = useNavToStory();
  return <TruthPage t={t} setPage={setPage} setStoryId={goStory} category="blog" />;
}
