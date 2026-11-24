"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  SystemEdge,
  SystemNode,
  SystemNodeId,
  SystemsMapData,
} from "@/lib/systems-map";

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

  const renderNode = (node: SystemNode, className?: string) => (
    <button
      key={node.id}
      type="button"
      aria-pressed={node.id === selectedId}
      data-lit={nodes.has(node.id)}
      onClick={() => setSelectedId(node.id)}
      className={cn("map-node", className)}
    >
      <span className="block text-[15px] font-semibold">{node.label}</span>
      <span className="map-tech mt-0.5 block text-[13px] text-muted">
        {node.tech}
      </span>
      {data.edges
        .filter((e) => e.anchor.node === node.id)
        .map((e) => (
          <span
            key={`${e.from}-${e.to}`}
            aria-hidden="true"
            className="map-link"
            data-side={e.anchor.side}
            data-lit={lit.has(e)}
          />
        ))}
    </button>
  );

  return (
    <div className="min-w-0 rounded-[10px] border bg-surface p-4 min-[561px]:p-6">
      <h2 className="text-lg font-bold leading-snug tracking-[-0.01em]">
        {title}
      </h2>
      <p className="mt-0.5 text-[15px] leading-normal text-muted">{subtitle}</p>

      <div role="group" aria-label={label} className="mt-[22px]">
        <div className="map-flow">
          {data.flow.map((n) =>
            renderNode(
              n,
              n.id === "api"
                ? "col-span-full text-center"
                : n.id === "web" || n.id === "notifications"
                  ? "max-[560px]:col-span-full"
                  : undefined
            )
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-dashed pt-[18px] min-[561px]:grid-cols-3 min-[561px]:gap-x-[22px]">
          {data.base.map((n) =>
            renderNode(
              n,
              n.id === "quality" ? "max-[560px]:col-span-full" : undefined
            )
          )}
        </div>
      </div>

      <ul
        aria-live="polite"
        className="mt-5 grid min-h-[126px] content-start gap-2.5 border-t pt-[18px] text-[15px] leading-normal"
      >
        {selected?.highlights.map((h) => (
          <li key={h.text}>
            {h.text}{" "}
            <a href={h.href} className="text-link whitespace-nowrap">
              {h.company}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
