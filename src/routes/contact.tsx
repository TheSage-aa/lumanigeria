import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, useLumaTheme } from "@/components/LumaApp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LUMA" },
      { name: "description", content: "Get in touch with LUMA — partnerships, press, and general enquiries." },
      { property: "og:title", content: "Contact LUMA" },
      { property: "og:description", content: "Reach out to the LUMA team." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    return <ContactPage t={t} />;
  },
});
