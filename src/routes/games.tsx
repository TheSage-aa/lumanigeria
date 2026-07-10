import { createFileRoute } from "@tanstack/react-router";
import { GamesPage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Games — LUMA" },
      {
        name: "description",
        content:
          "Quick, playful games that teach HIV facts, bust myths, and explore campus rights.",
      },
      { property: "og:title", content: "Games — LUMA" },
      {
        property: "og:description",
        content: "Three games. Under 10 minutes each. Learn what a lecture never will.",
      },
    ],
  }),
  component: GamesRoute,
});

function GamesRoute() {
  const { t } = useLumaTheme();
  const setPage = useNavToPage();
  return <GamesPage t={t} setPage={setPage} />;
}
