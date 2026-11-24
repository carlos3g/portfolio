import Image from "next/image";
import shortcutfy from "@/public/projects/shortcutfy.webp";
import type { ProjectItem } from "@/lib/portfolio-data";

const frame =
  "flex aspect-[5/2] w-full items-center overflow-hidden bg-panel text-panel-ink";

/** Drawn from each project's own material: its terminal, art or command. */
export function ProjectCover({
  project,
  imageAlt,
}: {
  project: ProjectItem;
  imageAlt: string;
}) {
  switch (project.cover) {
    case "terminal":
      return (
        <div aria-hidden="true" className={frame}>
          <div className="grid w-full gap-1.5 px-6 font-mono text-[13px] leading-snug min-[561px]:px-8">
            <p className="truncate text-panel-muted">
              webhook-it <span className="text-panel-accent">running</span>
            </p>
            <p className="truncate">14:02:51 POST stripe-dev 200</p>
            <p className="truncate">14:02:31 POST /refunds 200</p>
            <p className="truncate text-panel-muted">
              n new - r replay - q quit
            </p>
          </div>
        </div>
      );
    case "image":
      return (
        <Image
          src={shortcutfy}
          alt={imageAlt}
          unoptimized
          className="aspect-[5/2] w-full object-cover"
        />
      );
    case "code":
      return (
        <div aria-hidden="true" className={frame}>
          <p className="w-full truncate px-6 font-mono text-[clamp(0.8125rem,1.5vw,1.0625rem)] min-[561px]:px-8">
            <span className="text-panel-accent">$ </span>npm create
            @carlos3g/config
          </p>
        </div>
      );
    case "type":
      return (
        <div
          aria-hidden="true"
          className="flex aspect-[5/2] w-full items-end overflow-hidden bg-accent px-6 pb-5 text-on-accent min-[561px]:px-8"
        >
          <p className="text-[clamp(1.5rem,3.2vw,2.25rem)] font-extrabold leading-none tracking-[-0.035em]">
            Reanimated
            <br />+ Skia
          </p>
        </div>
      );
    default:
      return null;
  }
}
