"use client";

import { useState } from "react";
import {
  Activity,
  Bell,
  Braces,
  Cloud,
  CreditCard,
  FlaskConical,
  Globe,
  Layers,
  LayoutDashboard,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  SystemEdge,
  SystemNode,
  SystemNodeId,
  SystemsMapData,
} from "@/lib/systems-map";

const icons: Record<SystemNodeId, LucideIcon> = {
  app: Smartphone,
  backoffice: LayoutDashboard,
  web: Globe,
  api: Braces,
  payments: CreditCard,
  queues: Layers,
  notifications: Bell,
  infra: Cloud,
  observability: Activity,
  quality: FlaskConical,
};

/** Everything upstream and downstream of a node, plus the edges in between. */
function tracePath(start: SystemNodeId, edges: SystemEdge[]) {
  const nodes = new Set<SystemNodeId>([start]);
  const lit = new Set<SystemEdge>();

  const walk = (id: SystemNodeId, from: "from" | "to", to: "from" | "to") => {
    for (const edge of edges) {
      if (edge[from] !== id) continue;
      lit.add(edge);
      nodes.add(edge[to]);
      walk(edge[to], from, to);
    }
  };

  walk(start, "from", "to");
  walk(start, "to", "from");
  return { nodes, lit };
}

interface Props {
  data: SystemsMapData;
  title: string;
  subtitle: string;
  label: string;
}

export function SystemsMap({ data, title, subtitle, label }: Props) {
  const [selectedId, setSelectedId] = useState<SystemNodeId>("payments");
  const { nodes, lit } = tracePath(selectedId, data.edges);
  const selected = [...data.flow, ...data.base].find(
    (n) => n.id === selectedId
  );

  const renderNode = (node: SystemNode, className?: string) => {
    const Icon = icons[node.id];
    return (
      <button
        key={node.id}
        type="button"
        aria-pressed={node.id === selectedId}
        data-lit={nodes.has(node.id)}
        onClick={() => setSelectedId(node.id)}
        className={cn("map-node", className)}
      >
        <span className="map-icon" aria-hidden="true">
          <Icon className="h-[17px] w-[17px]" />
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold tracking-[-0.01em]">
            {node.label}
          </span>
          <span className="map-tech mt-0.5 block text-[12.5px] text-muted">
            {node.tech}
          </span>
        </span>
        {data.edges
          .filter((e) => e.anchor.node === node.id)
          .map((e) => (
            <span
              // Remounts on selection so the signal animation restarts.
              key={`${e.from}-${e.to}-${selectedId}`}
              aria-hidden="true"
              className="map-link"
              data-side={e.anchor.side}
              data-lit={lit.has(e)}
            />
          ))}
      </button>
    );
  };

  return (
    <div className="card min-w-0 overflow-hidden !shadow-lift">
      <div className="px-5 pt-5 min-[561px]:px-7 min-[561px]:pt-6">
        <h2 className="text-lg font-bold leading-snug tracking-[-0.02em]">
          {title}
        </h2>
        <p className="mt-0.5 text-[15px] leading-normal text-muted">
          {subtitle}
        </p>
      </div>

      <div
        role="group"
        aria-label={label}
        className="dots mt-5 border-y bg-raised p-4 min-[561px]:p-6"
      >
        <div className="map-flow">
          {data.flow.map((n) =>
            renderNode(
              n,
              n.id === "api"
                ? "map-node-wide col-span-full justify-center"
                : n.id === "web" || n.id === "notifications"
                  ? "map-node-wide max-[560px]:col-span-full"
                  : undefined
            )
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-dashed border-line-strong pt-6 min-[561px]:grid-cols-3 min-[561px]:gap-x-4">
          {data.base.map((n) =>
            renderNode(
              n,
              n.id === "quality"
                ? "map-node-wide max-[560px]:col-span-full"
                : undefined
            )
          )}
        </div>
      </div>

      <div aria-live="polite" className="min-h-[148px] px-5 py-5 min-[561px]:px-7">
        <ul key={selectedId} className="map-panel grid gap-3 text-[15px] leading-normal">
          {selected?.highlights.map((h) => (
            <li key={h.text} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>
                {h.text}{" "}
                <a
                  href={h.href}
                  className="whitespace-nowrap font-semibold text-accent underline-offset-4 hover:underline"
                >
                  {h.company}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
