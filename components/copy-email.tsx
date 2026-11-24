"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function CopyEmail({ email }: { email: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "copied" | "selected">("idle");
  const address = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      if (address.current) {
        window.getSelection()?.selectAllChildren(address.current);
      }
      setStatus("selected");
    }
  };

  return (
    <div>
      <a
        ref={address}
        href={`mailto:${email}`}
        className="text-[clamp(1.125rem,2.6vw,1.75rem)] font-bold tracking-[-0.02em] underline-offset-4 [overflow-wrap:anywhere] hover:underline"
      >
        {email}
      </a>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="button" onClick={copy}>
          {t("copy")}
        </Button>
        <span role="status" className="text-[15px] text-muted">
          {status === "idle" ? "" : t(status)}
        </span>
      </div>
    </div>
  );
}
