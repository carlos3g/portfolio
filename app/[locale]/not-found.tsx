import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="wrap py-28">
      <h1 className="section-title">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("text")}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t("back")}</Link>
      </Button>
    </main>
  );
}
