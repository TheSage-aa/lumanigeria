import { createFileRoute, notFound } from "@tanstack/react-router";
import { StoryPage, STORIES, useLumaTheme, useNavToPage, useNavToStory } from "@/components/LumaApp";

export const Route = createFileRoute("/truth_/$storyId")({
  loader: ({ params }) => {
    const story = STORIES.find((s: any) => s.id === params.storyId);
    if (!story) throw notFound();
    return { story };
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
  const { story } = Route.useLoaderData();
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  const goStory = useNavToStory();
  return <StoryPage t={t} story={story} setPage={setPage} setStoryId={goStory} />;
}
