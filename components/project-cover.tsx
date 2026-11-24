import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/portfolio-data";

/** Built from each project's own material: its screen, icon or command. */
export function ProjectCover({
  project,
  dashboardAlt,
  className,
}: {
  project: ProjectItem;
  dashboardAlt: string;
  className?: string;
}) {
  const frame = cn("relative overflow-hidden", className);

  switch (project.cover) {
    case "dashboard":
      return (
        <div
          className={frame}
          style={{
            background:
              "radial-gradient(90% 120% at 12% 0%, #9cc6ff, transparent 60%), radial-gradient(80% 100% at 100% 100%, #0b4fb0, transparent 70%), #3b8bff",
          }}
        >
          <Image
            src="/projects/webhook-it-dashboard.svg"
            alt={dashboardAlt}
            width={1191}
            height={737}
            unoptimized
            className="cover-art absolute left-[5%] top-[9%] w-[118%] max-w-none origin-top-left"
          />
        </div>
      );
    case "icon":
      return (
        <div
          className={cn(frame, "grid place-items-center")}
          style={{
            background:
              "radial-gradient(70% 90% at 50% 40%, #e2ddff, transparent 75%), #b9b2fb",
          }}
        >
          <Image
            src="/projects/shortcutfy.svg"
            alt=""
            width={112}
            height={112}
            unoptimized
            className="cover-art h-28 w-28 rounded-[19px] shadow-[0_24px_44px_-14px_rgb(60_40_160_/_0.65)]"
          />
        </div>
      );
    case "code":
      return (
        <div
          aria-hidden="true"
          className={cn(frame, "grid place-items-center px-5")}
          style={{
            background:
              "radial-gradient(70% 90% at 30% 20%, #ffe7b8, transparent 70%), #f3b562",
          }}
        >
          <div className="cover-art w-full max-w-[19rem] overflow-hidden rounded-2xl bg-[#1d1a16] shadow-[0_24px_44px_-14px_rgb(110_60_0_/_0.6)]">
            <div className="flex gap-1.5 px-4 pt-3.5">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <p className="truncate px-4 pb-5 pt-3.5 font-mono text-[13px] text-[#f6eee2]">
              <span className="text-[#f3b562]">$ </span>npm create
              @carlos3g/config
            </p>
          </div>
        </div>
      );
    case "motion":
      return (
        <div
          aria-hidden="true"
          className={cn(frame, "grid place-items-center")}
          style={{
            background:
              "radial-gradient(70% 90% at 70% 20%, #bff5de, transparent 70%), #56cfa6",
          }}
        >
          <div className="cover-art flex items-end gap-3">
            {["#0a5f47", "#ffffff", "#0f7b5c", "#e9ff9c"].map((color, i) => (
              <i
                key={color}
                className="bob h-12 w-12 rounded-full shadow-[0_18px_30px_-10px_rgb(4_70_50_/_0.55)]"
                style={
                  { background: color, "--i": i } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}
