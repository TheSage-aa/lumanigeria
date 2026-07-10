import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  StoryPage,
  STORIES,
  useLumaTheme,
  useNavToPage,
  useNavToStory,
} from "@/components/LumaApp";

export const Route = createFileRoute("/truth_/$storyId")({
  loader: ({ params }) => {
    const story = STORIES.find((s) => s.id === params.storyId);
    if (!story && !params.storyId.startsWith("voices-")) throw notFound();
    return { story: story ?? null, storyId: params.storyId };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.story
      ? [
          { title: `${loaderData.story.title} — LUMA` },
          { name: "description", content: loaderData.story.excerpt },
          { property: "og:title", content: loaderData.story.title },
          { property: "og:description", content: loaderData.story.excerpt },
        ]
      : [{ title: "Story — LUMA" }],
  }),
  component: StoryRoute,
});

function StoryRoute() {
  const { story: loadedStory, storyId } = Route.useLoaderData();
  const [story, setStory] = useState(loadedStory);
  const [missing, setMissing] = useState(false);
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  const goStory = useNavToStory();

  useEffect(() => {
    if (loadedStory) return;
    let cancelled = false;
    fetch("/api/stories")
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        const found = json.ok ? json.stories.find((s: { id: string }) => s.id === storyId) : null;
        if (found) setStory(found);
        else setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyId]);

  if (!story) {
    return (
      <div
        style={{
          padding: "160px 32px",
          textAlign: "center",
          fontFamily: "'DM Sans',sans-serif",
          color: t.textMuted,
        }}
      >
        {missing ? "Story not found." : "Loading…"}
      </div>
    );
  }
  return <StoryPage t={t} story={story} setPage={setPage} setStoryId={goStory} />;
}
