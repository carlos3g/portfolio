import type { Locale } from "@/i18n/routing";

type Localized<T> = { pt: T; en: T };

const L = <T>(value: Localized<T>, locale: Locale): T => value[locale];

interface Years {
  start: string;
  /** `null` means ongoing. */
  end: string | null;
}

export interface Highlight {
  id: string;
  text: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  /** Ongoing position. */
  current: boolean;
  highlights: Highlight[];
  stack: string[];
}

export type ProjectCover = "dashboard" | "icon" | "code" | "motion";

export interface ProjectLink {
  href: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  links: ProjectLink[];
  /** `null` renders the project as a plain row, without a card cover. */
  cover: ProjectCover | null;
}

export interface EducationItem {
  id: string;
  institution: string;
  course: string;
  location: string;
  period: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface Profile {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

interface HighlightSource {
  id: string;
  text: Localized<string>;
}

interface ExperienceSource {
  id: string;
  role: Localized<string>;
  company: string;
  location: Localized<string>;
  years: Years;
  /** Display order. The first three are visible before "show more". */
  highlights: HighlightSource[];
  stack: string[];
}

interface ProjectSource {
  id: string;
  title: string;
  summary: Localized<string>;
  stack: string[];
  links: { href: string; label: Localized<string> }[];
  cover: ProjectCover | null;
}

interface EducationSource {
  id: string;
  institution: string;
  course: Localized<string>;
  location: string;
  years: Years;
}

interface SkillGroupSource {
  id: string;
  label: Localized<string>;
  items: string[];
}

interface ProfileSource
  extends Omit<Profile, "title" | "tagline" | "summary"> {
  title: Localized<string>;
  tagline: Localized<string>;
  summary: Localized<string>;
}

const profileSource: ProfileSource = {
  name: "Carlos Mesquita",
  handle: "carlos3g",
  title: {
    pt: "Desenvolvedor Fullstack",
    en: "Fullstack Developer",
  },
  tagline: {
    pt: "Levo sistemas de pagamento, APIs e apps do desenho da arquitetura até a operação na AWS.",
    en: "I take payment systems, APIs and apps from architecture design to running on AWS.",
  },
  summary: {
    pt: "Construo aplicações escaláveis em TypeScript, Node.js, React, React Native, PHP e Laravel. Atuo de ponta a ponta, do design de arquitetura à operação em produção, com forte domínio de infraestrutura AWS e práticas de observabilidade, CI/CD e testes automatizados. Tenho experiência em sistemas de pagamentos, integrações com gateways financeiros e plataformas de alta disponibilidade.",
    en: "I build scalable applications in TypeScript, Node.js, React, React Native, PHP and Laravel. I work end to end, from architecture design to production operations, with strong command of AWS infrastructure and practices in observability, CI/CD and automated testing. I have experience with payment systems, financial gateway integrations and high-availability platforms.",
  },
  email: "carlosmesquita156@gmail.com",
  phone: "+55 86 98131-3925",
  whatsapp: "https://wa.me/5586981313925",
  github: "https://github.com/carlos3g",
  linkedin: "https://www.linkedin.com/in/carlos3g",
  cvUrl:
    "https://github.com/carlos3g/curriculum-vitae/releases/latest/download/cv.pdf",
};

const remote: Localized<string> = { pt: "Remoto", en: "Remote" };

const experienceSource: ExperienceSource[] = [
  {
    id: "beehive",
    role: {
      pt: "Desenvolvedor Fullstack Pleno",
      en: "Mid-level Fullstack Developer",
    },
    company: "Beehive News",
    location: remote,
    years: { start: "2024", end: null },
    highlights: [
      {
        id: "beehive-availability",
        text: {
          pt: "Garanti a estabilidade e alta disponibilidade da infraestrutura AWS, configurando health checks, Auto Scaling Groups e filas (SQS) para distribuir carga.",
          en: "Ensured stability and high availability of the AWS infrastructure by configuring health checks, Auto Scaling Groups and queues (SQS) to distribute load.",
        },
      },
      {
        id: "beehive-observability",
        text: {
          pt: "Implementei observabilidade completa no backend com Jaeger Tracing e Sentry, além de logging no app com Sentry e Google Analytics.",
          en: "Implemented full backend observability with Jaeger Tracing and Sentry, plus app logging with Sentry and Google Analytics.",
        },
      },
      {
        id: "beehive-tests",
        text: {
          pt: "Estruturei e implementei testes automatizados (unitários e E2E) onde não havia nenhuma cobertura.",
          en: "Designed and implemented automated tests (unit and E2E) where no coverage existed.",
        },
      },
      {
        id: "beehive-notifications",
        text: {
          pt: "Implementei todo o sistema de notificações com OneSignal, AWS SQS e outras integrações.",
          en: "Built the entire notification system with OneSignal, AWS SQS and other integrations.",
        },
      },
      {
        id: "beehive-cicd",
        text: {
          pt: "Estruturei e automatizei pipelines de CI/CD para backend e mobile com GitHub Actions, AWS CodeDeploy e Fastlane.",
          en: "Designed and automated CI/CD pipelines for backend and mobile with GitHub Actions, AWS CodeDeploy and Fastlane.",
        },
      },
      {
        id: "beehive-backoffice",
        text: {
          pt: "Desenvolvi um backoffice em React com React Router v7, shadcn e React Query.",
          en: "Built a backoffice in React with React Router v7, shadcn and React Query.",
        },
      },
      {
        id: "beehive-storyboards",
        text: {
          pt: "Desenvolvi a funcionalidade de storyboards, no backend e no app.",
          en: "Developed the storyboards feature, on both the backend and the app.",
        },
      },
      {
        id: "beehive-fullstack",
        text: {
          pt: "Atuei de ponta a ponta com Express.js, TypeScript, React Native, React, AWS e Vercel.",
          en: "Worked end to end with Express.js, TypeScript, React Native, React, AWS and Vercel.",
        },
      },
    ],
    stack: [
      "TypeScript",
      "Express.js",
      "React Native",
      "React",
      "AWS",
      "Vercel",
      "Sentry",
      "Jaeger",
    ],
  },
  {
    id: "navan",
    role: { pt: "Desenvolvedor Fullstack", en: "Fullstack Developer" },
    company: "Navan",
    location: remote,
    years: { start: "2023", end: "2024" },
    highlights: [
      {
        id: "navan-payments",
        text: {
          pt: "Planejei e implementei pagamentos, assinaturas, fluxos de cadastro e contratos, assinatura eletrônica e webhooks próprios.",
          en: "Planned and implemented payments, subscriptions, signup and contract flows, electronic signature and custom webhooks.",
        },
      },
      {
        id: "navan-aws",
        text: {
          pt: "Configurei e implementei a stack AWS do produto: SQS, S3, SES, EC2 e Lambda.",
          en: "Configured and deployed the product's AWS stack: SQS, S3, SES, EC2 and Lambda.",
        },
      },
      {
        id: "navan-gateways",
        text: {
          pt: "Integrei gateways de pagamento, como o Asaas.",
          en: "Integrated payment gateways such as Asaas.",
        },
      },
      {
        id: "navan-legacy",
        text: {
          pt: "Integrei sistemas legados em PHP puro com aplicações Laravel.",
          en: "Integrated legacy plain-PHP systems with Laravel applications.",
        },
      },
      {
        id: "navan-tests",
        text: {
          pt: "Implementei testes automatizados com Pest, PHPUnit, Jest e Maestro.",
          en: "Implemented automated tests with Pest, PHPUnit, Jest and Maestro.",
        },
      },
      {
        id: "navan-fullstack",
        text: {
          pt: "Desenvolvi aplicações full-stack com PHP, Laravel, NestJS, Next.js, React, React Native, Redis e PostgreSQL.",
          en: "Developed full-stack applications with PHP, Laravel, NestJS, Next.js, React, React Native, Redis and PostgreSQL.",
        },
      },
    ],
    stack: [
      "PHP",
      "Laravel",
      "NestJS",
      "Next.js",
      "React",
      "React Native",
      "Redis",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    id: "smarti",
    role: { pt: "Desenvolvedor Fullstack", en: "Fullstack Developer" },
    company: "Grupo Smarti",
    location: remote,
    years: { start: "2023", end: "2023" },
    highlights: [
      {
        id: "smarti-hub",
        text: {
          pt: "Atuei em um hub de pagamentos: implementei gateways e serviços AWS e migrei a arquitetura para um modelo orientado a eventos com CQRS.",
          en: "Worked on a payments hub: implemented gateways and AWS services and migrated the architecture to an event-driven design with CQRS.",
        },
      },
      {
        id: "smarti-mobile",
        text: {
          pt: "Desenvolvi apps com React Native, com Google Analytics, OneSignal e APIs de mapas, câmera e localização.",
          en: "Built apps with React Native, with Google Analytics, OneSignal and maps, camera and location APIs.",
        },
      },
      {
        id: "smarti-performance",
        text: {
          pt: "Aprimorei a performance de aplicativos existentes, diminuindo o tempo de resposta para o usuário.",
          en: "Improved the performance of existing apps, reducing user response time.",
        },
      },
      {
        id: "smarti-backoffice",
        text: {
          pt: "Desenvolvi um backoffice em React.",
          en: "Built a backoffice in React.",
        },
      },
      {
        id: "smarti-frontend",
        text: {
          pt: "No front-end, implementei novos designs e funcionalidades e atualizei projetos legados em Next.js, React e Vue.js.",
          en: "On the front end, implemented new designs and features and updated legacy projects in Next.js, React and Vue.js.",
        },
      },
    ],
    stack: ["React", "React Native", "Next.js", "Vue.js", "AWS", "CQRS"],
  },
];

const volunteerSource: ExperienceSource[] = [
  {
    id: "beecrowd",
    role: { pt: "Moderador", en: "Moderator" },
    company: "Beecrowd",
    location: remote,
    years: { start: "2020", end: null },
    highlights: [
      {
        id: "beecrowd-mentoring",
        text: {
          pt: "Mentoria e auxílio em resolução de problemas algorítmicos em C, C++, Java e Python.",
          en: "Mentoring and support in solving algorithmic problems in C, C++, Java and Python.",
        },
      },
    ],
    stack: ["C", "C++", "Java", "Python"],
  },
];

const repoLabel: Localized<string> = { pt: "Repositório", en: "Repository" };

const projectsSource: ProjectSource[] = [
  {
    id: "webhook-it",
    title: "webhook-it",
    summary: {
      pt: "URLs públicas e estáveis para webhooks, encaminhadas em tempo real para o seu localhost. Um painel interativo no terminal, com histórico e replay em SQLite local.",
      en: "Stable public URLs for webhooks, forwarded in real time to your localhost. An interactive terminal dashboard, with history and replay in local SQLite.",
    },
    stack: ["TypeScript", "Bun", "OpenTUI", "Solid", "SQLite"],
    links: [
      {
        href: "https://carlos3g.github.io/webhook-it/",
        label: { pt: "Documentação", en: "Documentation" },
      },
      { href: "https://github.com/carlos3g/webhook-it", label: repoLabel },
    ],
    cover: "dashboard",
  },
  {
    id: "shortcutfy",
    title: "Shortcutfy",
    summary: {
      pt: "Extensão para navegadores Chromium com atalhos de teclado para abas, janelas e páginas internas. Sem rastreamento e só com as permissões necessárias.",
      en: "Extension for Chromium browsers with keyboard shortcuts for tabs, windows and internal pages. No tracking, and only the permissions it needs.",
    },
    stack: ["TypeScript", "Manifest V3", "Service Worker"],
    links: [
      {
        href: "https://chromewebstore.google.com/detail/gnmfgiglpeoemibaegemgpggfnboefdg",
        label: { pt: "Chrome Web Store", en: "Chrome Web Store" },
      },
      { href: "https://github.com/carlos3g/shortcutfy", label: repoLabel },
    ],
    cover: "icon",
  },
  {
    id: "code-style",
    title: "code-style",
    summary: {
      pt: "Minhas convenções de código publicadas como pacotes: ESLint, Prettier, tsconfig e commitlint, com um scaffolder que aplica tudo em um comando.",
      en: "My code conventions published as packages: ESLint, Prettier, tsconfig and commitlint, with a scaffolder that applies them in one command.",
    },
    stack: ["TypeScript", "ESLint", "Prettier", "commitlint"],
    links: [
      {
        href: "https://www.npmjs.com/package/@carlos3g/eslint-config",
        label: { pt: "npm", en: "npm" },
      },
      { href: "https://github.com/carlos3g/code-style", label: repoLabel },
    ],
    cover: "code",
  },
  {
    id: "react-native-playground",
    title: "react-native-playground",
    summary: {
      pt: "Laboratório em Expo e React Native para animações, gestos, microinterações, gráficos, shaders e câmera.",
      en: "Expo and React Native lab for animations, gestures, micro-interactions, charts, shaders and camera.",
    },
    stack: ["React Native", "Expo", "Reanimated", "Skia"],
    links: [
      {
        href: "https://github.com/carlos3g/react-native-playground",
        label: repoLabel,
      },
    ],
    cover: "motion",
  },
  {
    id: "echoes",
    title: "Echoes",
    summary: {
      pt: "Plataforma social construída do zero: modelagem de banco, arquitetura de sistemas e ambientes de desenvolvimento com Docker e Terraform.",
      en: "Social platform built from scratch: database modeling, systems architecture and development environments with Docker and Terraform.",
    },
    stack: ["TypeScript", "NestJS", "React Native", "React", "PostgreSQL"],
    // The repository is private, so there is nothing public to link to yet.
    links: [],
    cover: null,
  },
];

const educationSource: EducationSource[] = [
  {
    id: "ads",
    institution: "Instituto Federal do Piauí",
    course: {
      pt: "Análise e Desenvolvimento de Sistemas",
      en: "Systems Analysis and Development",
    },
    location: "Pedro II, PI",
    years: { start: "2022", end: "2025" },
  },
  {
    id: "tecnico",
    institution: "Instituto Federal do Piauí",
    course: {
      pt: "Curso técnico em informática",
      en: "Technical Course in Computer Science",
    },
    location: "Pedro II, PI",
    years: { start: "2019", end: "2021" },
  },
];

const skillGroupsSource: SkillGroupSource[] = [
  {
    id: "build",
    label: { pt: "Construir", en: "Build" },
    items: [
      "TypeScript",
      "JavaScript",
      "PHP",
      "SQL",
      "Python",
      "Java",
      "C#",
      "Node.js",
      "Express.js",
      "NestJS",
      "Laravel",
      "React",
      "Next.js",
      "Vue.js",
      "React Native",
      "Expo",
      "React Query",
      "Redux",
      "Zustand",
      "shadcn/ui",
      "PostgreSQL",
      "MySQL",
      "Redis",
    ],
  },
  {
    id: "operate",
    label: { pt: "Operar", en: "Operate" },
    items: [
      "AWS EC2",
      "SQS",
      "S3",
      "SES",
      "Lambda",
      "Auto Scaling Groups",
      "CodeDeploy",
      "CloudWatch",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "Fastlane",
      "Vercel",
      "Jaeger",
      "Sentry",
    ],
  },
  {
    id: "test",
    label: { pt: "Testar", en: "Test" },
    items: [
      "Jest",
      "Vitest",
      "Pest",
      "PHPUnit",
      "React Testing Library",
      "Detox",
      "Maestro",
      "Playwright",
      "Cypress",
      "Selenium",
    ],
  },
];

function formatYears({ start, end }: Years, locale: Locale): string {
  if (start === end) return start;
  return `${start} – ${end ?? (locale === "pt" ? "presente" : "present")}`;
}

function localizeExperience(
  src: ExperienceSource,
  locale: Locale
): ExperienceItem {
  return {
    id: src.id,
    role: L(src.role, locale),
    company: src.company,
    location: L(src.location, locale),
    period: formatYears(src.years, locale),
    current: src.years.end === null,
    highlights: src.highlights.map((h) => ({
      id: h.id,
      text: L(h.text, locale),
    })),
    stack: src.stack,
  };
}

export function getProfile(locale: Locale): Profile {
  return {
    ...profileSource,
    title: L(profileSource.title, locale),
    tagline: L(profileSource.tagline, locale),
    summary: L(profileSource.summary, locale),
  };
}

export function getExperience(locale: Locale): ExperienceItem[] {
  return experienceSource.map((e) => localizeExperience(e, locale));
}

export function getVolunteer(locale: Locale): ExperienceItem[] {
  return volunteerSource.map((e) => localizeExperience(e, locale));
}

export function getProjects(locale: Locale): ProjectItem[] {
  return projectsSource.map((p) => ({
    ...p,
    summary: L(p.summary, locale),
    links: p.links.map((l) => ({ href: l.href, label: L(l.label, locale) })),
  }));
}

export function getEducation(locale: Locale): EducationItem[] {
  return educationSource.map((e) => ({
    id: e.id,
    institution: e.institution,
    course: L(e.course, locale),
    location: e.location,
    period: formatYears(e.years, locale),
  }));
}

export function getSkillGroups(locale: Locale): SkillGroup[] {
  return skillGroupsSource.map((g) => ({ ...g, label: L(g.label, locale) }));
}
