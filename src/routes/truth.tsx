import { createFileRoute } from "@tanstack/react-router";
import { TruthPage, useLumaTheme, useNavToPage, useNavToStory } from "@/components/LumaApp";

export const Route = createFileRoute("/truth")({
  head: () => ({
    meta: [
      { title: "Campus Truth Series — LUMA" },
      {
        name: "description",
        content:
          "Status-neutral HIV stories, research, and myth-busting written for Nigerian university students.",
      },
      { property: "og:title", content: "Campus Truth Series — LUMA" },
      {
        property: "og:description",
        content: "Stories, research, and myth-busting on HIV for Nigerian campuses.",
      },
    ],
  }),
  component: TruthRoute,
});

function TruthRoute() {
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  const goStory = useNavToStory();
  return <TruthPage t={t} setPage={setPage} setStoryId={goStory} />;
}
