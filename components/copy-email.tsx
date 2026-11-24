"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
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

  const Icon = status === "copied" ? Check : Copy;

  return (
    <div>
      <a
        ref={address}
        href={`mailto:${email}`}
        className="text-[clamp(1.1875rem,3.4vw,2.25rem)] font-bold leading-tight tracking-[-0.03em] underline-offset-8 [overflow-wrap:anywhere] hover:underline"
      >
        {email}
      </a>
      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="button" onClick={copy}>
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          {t("copy")}
        </Button>
        <span role="status" className="text-[15px] text-muted">
          {status === "idle" ? "" : t(status)}
        </span>
      </div>
    </div>
  );
}
