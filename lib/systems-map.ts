import { getExperience } from "@/lib/portfolio-data";
import type { Locale } from "@/i18n/routing";

export type SystemNodeId =
  | "app"
  | "backoffice"
  | "web"
  | "api"
  | "payments"
  | "queues"
  | "notifications"
  | "infra"
  | "observability"
  | "quality";

interface NodeSource {
  id: SystemNodeId;
  label: { pt: string; en: string };
  tech: string;
  /** Highlight ids from `lib/portfolio-data.ts`. */
  highlights: string[];
}

export interface SystemNode {
  id: SystemNodeId;
  label: string;
  tech: string;
  highlights: { text: string; company: string; href: string }[];
}

/** `anchor` is the side of a node the connector is drawn from. */
export interface SystemEdge {
  from: SystemNodeId;
  to: SystemNodeId;
  anchor: { node: SystemNodeId; side: "down" | "up" | "right" };
}

export interface SystemsMapData {
  flow: SystemNode[];
  base: SystemNode[];
  edges: SystemEdge[];
}

// The map combines parts of different projects; it is not one real system.
const flowSource: NodeSource[] = [
  {
    id: "app",
    label: { pt: "App mobile", en: "Mobile app" },
    tech: "React Native",
    highlights: ["beehive-storyboards", "smarti-mobile"],
  },
  {
    id: "backoffice",
    label: { pt: "Backoffice", en: "Backoffice" },
    tech: "React, shadcn",
    highlights: ["beehive-backoffice", "smarti-backoffice"],
  },
  {
    id: "web",
    label: { pt: "Web", en: "Web" },
    tech: "Next.js, Vue.js",
    highlights: ["smarti-frontend"],
  },
  {
    id: "api",
    label: { pt: "APIs", en: "APIs" },
    tech: "Express, NestJS, Laravel",
    highlights: ["beehive-fullstack", "navan-legacy"],
  },
  {
    id: "payments",
    label: { pt: "Pagamentos", en: "Payments" },
    tech: "Asaas, webhooks",
    highlights: ["navan-payments", "navan-gateways"],
  },
  {
    id: "queues",
    label: { pt: "Filas e eventos", en: "Queues and events" },
    tech: "SQS, CQRS",
    highlights: ["smarti-hub"],
  },
  {
    id: "notifications",
    label: { pt: "Notificações", en: "Notifications" },
    tech: "OneSignal, SQS",
    highlights: ["beehive-notifications"],
  },
];

const baseSource: NodeSource[] = [
  {
    id: "infra",
    label: { pt: "Infra AWS", en: "AWS infra" },
    tech: "EC2, Auto Scaling",
    highlights: ["beehive-availability", "navan-aws"],
  },
  {
    id: "observability",
    label: { pt: "Observabilidade", en: "Observability" },
    tech: "Jaeger, Sentry",
    highlights: ["beehive-observability"],
  },
  {
    id: "quality",
    label: { pt: "Testes e CI/CD", en: "Tests and CI/CD" },
    tech: "Jest, Actions",
    highlights: ["beehive-cicd", "beehive-tests"],
  },
];

const edges: SystemEdge[] = [
  { from: "app", to: "api", anchor: { node: "app", side: "down" } },
  { from: "backoffice", to: "api", anchor: { node: "backoffice", side: "down" } },
  { from: "web", to: "api", anchor: { node: "web", side: "down" } },
  { from: "api", to: "payments", anchor: { node: "payments", side: "up" } },
  { from: "api", to: "queues", anchor: { node: "queues", side: "up" } },
  {
    from: "queues",
    to: "notifications",
    anchor: { node: "queues", side: "right" },
  },
];

/** Throws on an unknown highlight id, which fails the static build. */
export function getSystemsMap(locale: Locale): SystemsMapData {
  const byId = new Map(
    getExperience(locale).flatMap((e) =>
      e.highlights.map(
        (h) =>
          [
            h.id,
            { text: h.text, company: e.company, href: `#exp-${e.id}` },
          ] as const
      )
    )
  );

  const resolve = (node: NodeSource): SystemNode => ({
    id: node.id,
    label: node.label[locale],
    tech: node.tech,
    highlights: node.highlights.map((id) => {
      const highlight = byId.get(id);
      if (!highlight) {
        throw new Error(`systems-map: unknown highlight "${id}" in ${node.id}`);
      }
      return highlight;
    }),
  });

  return {
    flow: flowSource.map(resolve),
    base: baseSource.map(resolve),
    edges,
  };
}
