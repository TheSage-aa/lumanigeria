import { createFileRoute } from "@tanstack/react-router";
import { PartnerFormPage, useLumaTheme, useNavToPage } from "@/components/LumaApp";

export const Route = createFileRoute("/apply/partner")({
  head: () => ({
    meta: [
      { title: "Partner with LUMA" },
      { name: "description", content: "Start a partnership conversation with LUMA." },
    ],
  }),
  component: () => {
    const { t } = useLumaTheme();
    const setPage = useNavToPage();
    return <PartnerFormPage t={t} setPage={setPage} />;
  },
});
